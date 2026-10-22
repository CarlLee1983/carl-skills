"""check_zh.py 的命令列黑箱測試，對應 docs/humanize-writing/acceptance.md 的 S01–S08。

只看 stdout 與退出碼，不 import 腳本內部。執行：
    python3 .scratch/humanize-writing/validation/test_check_zh.py
"""

from __future__ import annotations

import re
import shutil
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
SKILL = ROOT / "skills" / "humanize-writing"
SCRIPT = SKILL / "scripts" / "check_zh.py"
FIXTURES = ROOT / "docs" / "humanize-writing" / "fixtures"
ZH_RULES = SKILL / "references" / "zh-tw.md"


def run(*paths: Path | str, script: Path = SCRIPT) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        [sys.executable, str(script), *map(str, paths)],
        capture_output=True,
        text=True,
        check=False,
    )


def hits(stdout: str) -> set[tuple[int, str]]:
    """把輸出解析成 (行號, 規則) 集合。命中行的格式是 `L<行號> [<規則>] ...`。"""
    return {(int(n), rule) for n, rule in re.findall(r"L(\d+)\s+\[([^\]]+)\]", stdout)}


class CheckZhCli(unittest.TestCase):
    def test_s01_hits_report_line_rule_and_summary(self) -> None:
        result = run(FIXTURES / "h12-zh-new-rules.md")
        self.assertEqual(result.returncode, 1, result.stdout + result.stderr)
        found = hits(result.stdout)
        for expected in [
            (1, "挑戰與展望段"),
            (1, "動詞名詞化"),
            (1, "商業與模型黑話"),
            (1, "意義膨脹與尾巴分析"),
            (3, "聊天殘留"),
        ]:
            self.assertIn(expected, found, result.stdout)
        last = result.stdout.strip().splitlines()[-1]
        self.assertRegex(last, r"共 \d+ 項")
        self.assertIn("聊天殘留", last)

    def test_s01_hit_line_carries_context(self) -> None:
        result = run(FIXTURES / "h12-zh-new-rules.md")
        self.assertIn("希望這篇文章對你有幫助", result.stdout)

    def test_s01_overlapping_matches_of_one_rule_are_reported_once(self) -> None:
        """「儘管面臨」與「儘管面臨諸多挑戰」是同一處，只報一次；「未來可期」另算。"""
        result = run(FIXTURES / "h12-zh-new-rules.md")
        self.assertEqual(result.stdout.count("[挑戰與展望段]"), 2, result.stdout)
        s08 = run(FIXTURES / "s08-dash-buzhi.md")
        self.assertEqual(s08.stdout.count("[二元對比殼]"), 1, s08.stdout)

    def test_s02_skips_frontmatter_code_and_urls(self) -> None:
        result = run(FIXTURES / "s02-skip-only.md")
        self.assertEqual(result.returncode, 0, result.stdout)
        self.assertEqual(hits(result.stdout), set())

    def test_s03_no_arguments_exits_2(self) -> None:
        self.assertEqual(run().returncode, 2)

    def test_s03_missing_file_exits_2(self) -> None:
        result = run(FIXTURES / "does-not-exist.md")
        self.assertEqual(result.returncode, 2)
        self.assertIn("does-not-exist.md", result.stderr)

    def test_s04_term_table_row_is_picked_up_without_code_change(self) -> None:
        probe = FIXTURES / "s04-term-probe.md"
        with tempfile.TemporaryDirectory() as tmp:
            copy = Path(tmp) / "humanize-writing"
            shutil.copytree(SKILL, copy)
            script = copy / "scripts" / "check_zh.py"

            before = run(probe, script=script)
            self.assertNotIn("探針詞", before.stdout)

            rules = copy / "references" / "zh-tw.md"
            text = rules.read_text(encoding="utf-8")
            anchor = "| 用戶         | 使用者       |\n"
            self.assertIn(anchor, text)
            rules.write_text(
                text.replace(anchor, anchor + "| 探針詞       | 測試詞       |\n"),
                encoding="utf-8",
            )

            after = run(probe, script=script)
            self.assertEqual(after.returncode, 1, after.stdout + after.stderr)
            self.assertIn((1, "對岸用語"), hits(after.stdout))
            self.assertIn("探針詞", after.stdout)

    def test_s04_terms_come_from_the_table(self) -> None:
        """表裡既有的對岸用語要被報出，例如 h13 的用戶、異步、隊列、數據。"""
        result = run(FIXTURES / "h13-existing.md")
        lines = [l for l in result.stdout.splitlines() if "[對岸用語]" in l]
        joined = "\n".join(lines)
        for term in ("用戶", "異步", "隊列", "數據"):
            self.assertIn(term, joined, result.stdout)

    def test_s05_allowed_colons_pass_and_reveal_colon_is_reported(self) -> None:
        result = run(FIXTURES / "s05-colon-mixed.md")
        colon_lines = {n for n, rule in hits(result.stdout) if rule == "提示性冒號"}
        self.assertEqual(colon_lines, {9}, result.stdout)
        self.assertEqual(result.returncode, 1)

    def test_s05_label_after_sentence_end_and_reveal_with_long_head(self) -> None:
        """h02：第 10 行句號後的「注意：」是標籤；第 3、12 行是提示性冒號。"""
        result = run(FIXTURES / "h02-colon.md")
        colon_lines = {n for n, rule in hits(result.stdout) if rule == "提示性冒號"}
        self.assertEqual(colon_lines, {3, 12}, result.stdout)

    def test_s05_inline_enumeration_colon_is_a_list_introduction(self) -> None:
        for name in ("h04-heading.md", "h08b-article-heading.md"):
            result = run(FIXTURES / name)
            self.assertNotIn("提示性冒號", result.stdout, name + result.stdout)

    def test_s05_markdown_bold_label_is_a_label(self) -> None:
        result = run(FIXTURES / "h11-en-new-rules.md")
        self.assertNotIn("提示性冒號", result.stdout, result.stdout)

    def test_s06_rule_file_counter_examples_are_reported(self) -> None:
        result = run(ZH_RULES)
        self.assertEqual(result.returncode, 1, result.stdout)
        rules = {rule for _, rule in hits(result.stdout)}
        self.assertIn("破折號", rules)
        self.assertIn("對岸用語", rules)

    def test_s07_html_strips_markup_and_keeps_line_numbers(self) -> None:
        result = run(FIXTURES / "s07-html.html")
        self.assertEqual(result.returncode, 1, result.stdout)
        self.assertEqual(hits(result.stdout), {(12, "商業與模型黑話")}, result.stdout)

    def test_s08_dash_and_reversal_buzhi_reported_progression_kept(self) -> None:
        result = run(FIXTURES / "s08-dash-buzhi.md")
        found = hits(result.stdout)
        self.assertIn((5, "破折號"), found, result.stdout)
        self.assertIn((3, "二元對比殼"), found, result.stdout)
        self.assertNotIn(1, {n for n, _ in found}, result.stdout)


def run_text(text: str, suffix: str = ".md", raw: bytes | None = None) -> subprocess.CompletedProcess[str]:
    with tempfile.TemporaryDirectory() as tmp:
        path = Path(tmp) / f"probe{suffix}"
        path.write_bytes(raw if raw is not None else text.encode("utf-8"))
        return run(path)


class CheckZhReviewFixes(unittest.TestCase):
    def test_non_utf8_input_exits_2_not_a_traceback(self) -> None:
        result = run_text("", raw="賦能".encode("big5"))
        self.assertEqual(result.returncode, 2, result.stdout + result.stderr)
        self.assertNotIn("Traceback", result.stderr)
        self.assertIn("probe.md", result.stderr)

    def test_unclosed_code_tag_does_not_blank_the_rest(self) -> None:
        result = run_text("<p>先看 <code 沒有收尾</p>\n<p>這裡要賦能業務。</p>\n", ".html")
        self.assertIn((2, "商業與模型黑話"), hits(result.stdout), result.stdout)

    def test_multiline_tag_attributes_do_not_leak(self) -> None:
        result = run_text('<a\n title="數據賦能">連結</a>\n<p>乾淨。</p>\n', ".html")
        self.assertEqual(hits(result.stdout), set(), result.stdout)

    def test_unclosed_frontmatter_is_not_frontmatter(self) -> None:
        result = run_text("---\n這裡要賦能業務。\n")
        self.assertIn((2, "商業與模型黑話"), hits(result.stdout), result.stdout)

    def test_svg_text_is_scanned_but_attributes_and_style_are_not(self) -> None:
        svg = (
            '<svg viewBox="0 0 1 1">\n<style>.a{content:"賦能"}</style>\n'
            '<title>賦能全景</title>\n<text x="1" data-n="閉環">乾淨</text>\n</svg>\n'
        )
        result = run_text(svg, ".html")
        self.assertEqual(hits(result.stdout), {(3, "商業與模型黑話")}, result.stdout)

    def test_global_copy_words_are_not_lost(self) -> None:
        cases = {
            "假洞見標記": ["更深一層", "說白了", "說穿了", "先說結論", "歸根究柢"],
            "轉場與強調贅語": ["總而言之", "眾所周知", "不言而喻"],
            "空泛收尾": ["拭目以待"],
            "商業與模型黑話": ["彎道超車", "顆粒度對齊"],
        }
        for rule, words in cases.items():
            for word in words:
                with self.subTest(word=word):
                    result = run_text(f"這句話有{word}在裡面。\n")
                    self.assertIn((1, rule), hits(result.stdout), result.stdout)

    def test_short_reveal_colons_are_reported(self) -> None:
        for line in ["結果呢：全掛了。", "真相只有一個：快取。", "問題是：沒人監控。", "原因在於：沒人看。"]:
            with self.subTest(line=line):
                result = run_text(line + "\n")
                self.assertIn((1, "提示性冒號"), hits(result.stdout), result.stdout)

    def test_labels_and_list_intros_still_pass(self) -> None:
        text = "時間：14:00\n\n注意：不要清空。\n\n環境：macOS\n\n原因有兩個：\n\n- 甲\n"
        result = run_text(text)
        self.assertNotIn("提示性冒號", result.stdout, result.stdout)


if __name__ == "__main__":
    unittest.main()

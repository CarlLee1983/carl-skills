# humanize-writing：三份副本收斂為單一來源

Status: ready-for-agent

決策依據：[ADR 0004](../../docs/adr/0004-skill-source-installed-and-vendored-copies.md)、[ADR 0003](../../docs/adr/0003-per-skill-versioning.md)；用語依 [GLOSSARY](../../GLOSSARY.md)「發佈與安裝」。逐項裁決見 [merge-decisions.md](merge-decisions.md)。

## Problem Statement

我同時用著三份 humanize-writing：carl-skills 的來源目錄、`~/.claude` 的手動副本、`~/.codex` 的手動副本。三份從同一個祖先各自長出規則，彼此沒有合併。結果是同一篇稿子在 Claude Code、Codex、CarlStack 子代理手上會套到不同規則：全域副本禁破折號、冒號只准引原話、排比最多兩項，還有一支 `check_zh.py`；來源目錄則有敘事模式、論證層規則、台灣用語表和查證規則，卻沒有全域那約 30 條中文與 8 條英文規則。兩邊在破折號、冒號、排比、標題、「不只…更」、疊加保留語氣上直接衝突。我每次改規則只改到其中一份，另外兩份就繼續漂移。

## Solution

把三份收斂成來源目錄這一份。全域副本與 Codex 副本獨有的內容依已定案的裁決併入來源目錄，衝突一次裁決清楚；`check_zh.py` 併入並改讀來源目錄的用語表；介面文案規則拆成只在需要時讀的獨立檔；description 補回三個不同情境的觸發詞。新增驗收文件，合併前照案例重跑。合併後，全域改用 Skills CLI 安裝的安裝副本，舊的手動副本備份後移除；CarlStack 的專案副本照舊用 rsync 同步。驗收通過後，humanize-writing 打第一個版號。

## User Stories

1. As a writer using Claude Code, I want `/humanize-writing` to apply the same rules as Codex, so that the same draft comes out the same way regardless of host.
2. As a writer using Codex, I want `$humanize-writing` to read the installed copy from the Skills CLI, so that I never edit with a stale July ruleset.
3. As a CarlStack maintainer, I want the vendored copy to keep syncing from the source directory, so that subagents inside the repo read the merged rules and CI still sees the files.
4. As the skill maintainer, I want rules changed only in the source directory, so that a change lands everywhere after one PR and one reinstall.
5. As the skill maintainer, I want the old manual copies backed up before removal, so that I can recover anything the merge missed.
6. As a writer, I want em-dashes removed from finished Traditional Chinese prose and replaced by commas, periods, or parentheses, so that a common AI tell disappears.
7. As a writer, I want quoted counter-examples inside the rules to remain untouched by the em-dash ban, so that the rules can still show what is banned.
8. As a writer, I want "setup-then-reveal" colons removed, so that sentences stop teasing a punchline.
9. As a writer of technical posts, I want label colons, times, list introductions, and quotations kept, so that normal technical structure survives.
10. As a writer, I want parallel lists kept at whatever length the content supports, with filler items removed, so that real enumerations are not cut to an arbitrary two.
11. As a narrative writer, I want deliberate triple repetition kept, so that rhythm I chose on purpose survives.
12. As a writer, I want article section headings to say what the section contains, so that readers can scan.
13. As a writer of interface copy, I want homepage headlines allowed to work as a sign rather than a summary, so that UI copy is not forced into article rules.
14. As a writer, I want "不只…更" allowed when it is plain progression and removed only when it sets up a reversal, so that legitimate emphasis survives.
15. As a writer, I want stacked hedges reduced to one, with that one carrying the original sentence's overall strength, so that the claim neither hardens nor softens.
16. As a writer, I want the global copy's Chinese rules that the source lacked (challenges-and-outlook paragraphs, chatbot residue, verb nominalisation, significance inflation, copula avoidance, false ranges, abstract-noun lyricism, metaphor wrapping, business jargon, translationese, promotional tone, forum costume, bold sprinkling, bold-title lists, emoji decoration, and the rest) applied, so that nothing the global copy caught is lost.
17. As a writer, I want partially overlapping rules merged into the existing numbered sections instead of parallel lists, so that one concept lives in one place.
18. As a writer of English, I want the global copy's English §10–17 applied after the source's existing §15, so that English gets the same coverage as Chinese.
19. As a writer, I want code, URLs, paths, quotations, and legal, sponsorship, or AI-use disclosures kept byte-for-byte, so that edits never corrupt protected content.
20. As a writer, I want structure fixed before wording, so that the edit does not polish sentences that should be deleted.
21. As a writer, I want the review step to compare every protected fragment against the source, so that silent corruption is caught.
22. As a writer, I want the finished draft delivered first, with a change list only when needed, so that I get the result without reading a log.
23. As a writer, I want to run `check_zh.py` on a Traditional Chinese draft and get line-numbered hits by rule, so that I can review residual AI patterns quickly.
24. As a writer, I want the checker to report mainland terms from the same term table the rules use, so that adding a row to the table also adds it to the checker.
25. As a writer, I want the checker treated as a review aid I run once and judge hit by hit, so that quoted counter-examples do not force me to damage correct text.
26. As a writer, I want the checker to skip frontmatter, fenced code, inline code, and URLs, and to strip markup from HTML, so that hits point at prose.
27. As a writer, I want the checker's exit code to tell me whether there were hits (0 none, 1 hits, 2 bad input), so that scripts can use it.
28. As a writer on another machine, I want the checker to run with plain `python3` and only the standard library, so that the skill stays portable.
29. As a writer polishing UI copy, I want interface-copy rules loaded only when I edit interface text, so that article edits don't carry that context.
30. As a writer, I want the skill to trigger when I ask to make text sound like me, to edit an X post, or to fix an over-polished draft, so that those distinct requests reach the skill.
31. As the skill maintainer, I want Codex-specific model routing left out, so that the skill stays model-agnostic.
32. As the skill maintainer, I want an acceptance document with one case per decision, so that behaviour, not formatting, proves the merge.
33. As the skill maintainer, I want the acceptance replay recorded under the skill's validation folder before merge, so that the PR carries evidence.
34. As the skill maintainer, I want narrative-mode behaviour unchanged by the merge, so that story passages keep their beats and voice.
35. As the skill maintainer, I want the merge delivered as one PR with one commit per ticket, so that each concern can be reviewed on its own.
36. As the skill maintainer, I want `humanize-writing/v1.0.0` tagged once acceptance passes, so that the stabilised contract has a version.
37. As the skill maintainer, I want the source directory's own prose free of em-dashes after the merge, so that the rules practice what they enforce.

## Implementation Decisions

- 來源目錄是唯一被修改的位置。安裝副本與專案副本只在 PR 合併後更新（ADR 0004）。
- 中文規則檔：衝突依裁決表改寫；全域副本 A–F 組中來源目錄沒有的條目新增為連續編號的新節，部分重疊的條目把多出的判準、詞表與例外補進來源目錄既有的對應節；不保留 A–F 分組。全域副本「禁的是修辭動作，不是字面」的方法論併入檔案開頭說明。自檢清單合併為一份。台灣用語表維持在中文規則檔，是對岸用語的唯一來源。
- 英文規則檔：全域副本 §10–17 依同一併法接在來源目錄英文 §15 之後續編，與中文已有的對應概念互相對齊。
- 破折號：成稿禁用；規則檔中以引號或反例標示的破折號不受限；來源目錄自己行文中的破折號改寫掉。
- 冒號：只禁提示性冒號；放行清單為標籤、時間、條列引言、引語。
- 排比：不設數量上限，判準是每項都要成立；敘事刻意重複照舊保留。
- 標題：文章小標規則留在語言規則檔；介面文案規則（全域 E 組及其標題、按鈕、可查證好處、HTML 內嵌文案）移到新的介面文案參考檔，中英共用。
- SKILL.md：新增「潤飾介面文案時讀介面文案參考檔」的指標；併入受保護片段逐字保留（擴充既有的 URL／key 值規則，涵蓋程式碼、URL、路徑、引言與法律、業配、AI 使用聲明）、先結構後用字的處理順序、審稿時比對受保護片段、交付先給成稿；疊加保留語氣與強度不變合成一條；description 補回「改得像本人」「X post」「over-polished draft」三個觸發詞，同義詞不重複。
- `check_zh.py` 併入技能目錄的 scripts。介面維持：一個或多個路徑參數，stdout 每檔一段、每筆命中一行（行號、規則、命中字與上下文）、最後一行分類統計；退出碼 0 無命中、1 有命中、2 參數或檔案錯誤。對岸用語不再內建詞表，改為執行時從中文規則檔的台灣用語表讀取。冒號、破折號、「不只…更」的偵測依本次裁決調整。只用標準函式庫，SKILL.md 以相對路徑 `python3 scripts/check_zh.py <path>` 呼叫，定位為建議步驟，不要求清零。
- Codex 副本的 Model routing 不併入。
- 新增 humanize-writing 的驗收文件（docs 下，比照 pm、design-experience）。
- 交付為一個 PR，每張工單一個 commit（工單見 `issues/`）。README 的能力說明視 description 變更同步調整。
- 合併後依序：同步 CarlStack 專案副本（rsync 後以 CarlStack 的 prettier 格式化，並過 CarlStack gate）；用 Skills CLI 安裝全域安裝副本；確認 Claude Code 與 Codex 都讀到新版後，把兩份手動副本搬到 `~/.agents/skills.bak-20261022/`。
- 版號：驗收通過、PR 合併後打 `humanize-writing/v1.0.0` 與 Release（ADR 0003），notes 連到驗收文件與驗證紀錄；tag 與 Release 另需使用者授權。

## Testing Decisions

- 好的測試只看外部行為：技能的成稿與腳本的命令列輸出，不檢查規則分在哪個檔、用了什麼內部函式。metadata 與連結檢查不能當成行為正確的證據（AGENTS.md）。
- 切入點一：技能本身。驗收文件每個裁決項目至少一個案例，各含輸入稿、期望保留的內容、期望移除或改寫的模式。必含案例：破折號（含規則反例不受影響）、提示性冒號與放行的冒號、排比不被硬砍、文章小標與介面文案標題各自適用、「不只…更」遞進與翻案、疊加保留語氣強度不變、受保護片段逐字保留、介面文案只在介面稿時套用、敘事段落不受論證層與新併入規則誤傷、觸發詞三種新情境、英文新併入規則。合併前由子代理載入來源目錄版本逐案重跑，判定與成稿記錄到 humanize-writing 的驗證資料夾。
- 切入點二：`check_zh.py` 命令列。用固定測試稿驗證：命中行號與規則名稱、frontmatter／程式碼／URL 被略過、HTML 剝除後行號對齊、三種退出碼、在用語表新增一列後腳本立即抓到該詞、放行的冒號不被報出、規則檔引用的反例會被報出（證明它是審閱輔助而非清零閘門）。
- 前例：devops 的 `release-acceptance.md`／`acceptance.md` 與 `.scratch/devops/validation/replay.py` 離線重放；humanize-writing 既有的 `.scratch/humanize-writing/validation/results.md` 盲改與試讀紀錄。
- 另需通過 carl-skills 的 `git diff --check`、新檔的 `--no-index --check`，以及（若已安裝）skill-creator 的 `quick_validate.py`。

## Out of Scope

- CarlStack 已發布文章依新規則重潤：這次只換技能，不回頭改已上線內容。
- 改變 CarlStack 專案副本的同步機制（ADR 0004 已定）。
- 其他 skill 的手動副本清理。
- 把 `check_zh.py` 變成 CarlStack 的 CI gate。
- 英文版的檢查腳本。
- 新增語言。

## Further Notes

- 全域副本 9/24 版與 Codex 副本 7/7 版的實際內容以合併前的檔案為準；比對結果（衝突表、獨有規則清單、腳本行為）記在 merge-decisions.md 與本次 session 的比對報告摘要中，實作時應重新讀兩份副本確認，不憑摘要。
- humanize-writing 目前的 description 已拿掉部分觸發詞；補回三個屬於觸發條件變更，依 ADR 0003 是 MAJOR 等級的合約變動，但因為這是第一個版號，直接以 1.0.0 發布。
- 備份目錄位於 `~/.agents/` 下；`~/.agents` 本身是 git repo，其 `.gitignore` 已有 `skills.bak-*/`，備份不會進入版控（已確認）。

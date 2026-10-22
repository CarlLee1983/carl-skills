# 07: SKILL.md 流程規則與觸發詞

Status: ready-for-agent
State: closed
Blocked by: 05, 06

規格：[spec](../spec.md)；裁決：[merge-decisions](../merge-decisions.md)；決策：[ADR 0004](../../../docs/adr/0004-skill-source-installed-and-vendored-copies.md)。

## 範圍

在 SKILL.md 併入：受保護片段逐字保留（擴充既有 URL／key 值規則，涵蓋程式碼、URL、路徑、引言與法律、業配、AI 使用聲明）、先結構後用字、審稿時比對受保護片段、交付先給成稿；以相對路徑 `python3 scripts/check_zh.py <path>` 列為繁中稿的建議步驟，不要求清零。description 補回「改得像本人」「X post」「over-polished draft」三個觸發詞，同義詞不重複；README 的能力說明與用法同步。修改時依 writing-for-agents。

## 驗收

- [x] SKILL.md 含上述四條流程規則與腳本建議步驟
- [x] description 含三個新觸發情境，總長沒有因同義詞膨脹
- [x] 受保護片段案例（程式碼、URL、聲明逐字不變）重放通過
- [x] 三種觸發情境的案例能觸發技能
- [x] README 與 SKILL.md 一致；若有 skill-creator，`quick_validate.py` 通過

## Comments

2026-10-22：SKILL.md 第 1 優先加上受保護片段（程式碼、網址、路徑、引言、法律／業配／AI 使用聲明）逐字保留，URL／key 值規則改寫成同一概念；流程第 4 步寫明結構殼拆完才動用字，第 6 步加上逐段比對受保護片段，新增第 7 步建議跑 `python3 scripts/check_zh.py <path>`（跑一次、逐筆判斷、不要求清零）與第 8 步交付先給成稿。description 補「fixing an over-polished draft」「改得像本人」，「X posts」原本就在，總長 381 字元。README 能力說明與用法同步，`quick_validate.py` 通過。重放見 `.scratch/humanize-writing/validation/acceptance-07-drafts.md` 與 `.scratch/humanize-writing/validation/acceptance-07.md`：H09、H13、H14、T01–T03 通過；H07 第一輪判部分（受保護片段逐字相同，但空泛收尾只縮短沒刪，與基準重放同一個缺口），在 `references/zh-tw.md` §8 補上「沒有事實支撐的整體評價收尾要整句刪，保留語氣不是理由」後第二輪通過。§8 的範例刻意不用 fixture 原句，避免盲測者照抄。

# 07: SKILL.md 流程規則與觸發詞

Status: ready-for-agent
State: open
Blocked by: 05, 06

規格：[spec](../spec.md)；裁決：[merge-decisions](../merge-decisions.md)；決策：[ADR 0004](../../../docs/adr/0004-skill-source-installed-and-vendored-copies.md)。

## 範圍

在 SKILL.md 併入：受保護片段逐字保留（擴充既有 URL／key 值規則，涵蓋程式碼、URL、路徑、引言與法律、業配、AI 使用聲明）、先結構後用字、審稿時比對受保護片段、交付先給成稿；以相對路徑 `python3 scripts/check_zh.py <path>` 列為繁中稿的建議步驟，不要求清零。description 補回「改得像本人」「X post」「over-polished draft」三個觸發詞，同義詞不重複；README 的能力說明與用法同步。修改時依 writing-for-agents。

## 驗收

- [ ] SKILL.md 含上述四條流程規則與腳本建議步驟
- [ ] description 含三個新觸發情境，總長沒有因同義詞膨脹
- [ ] 受保護片段案例（程式碼、URL、聲明逐字不變）重放通過
- [ ] 三種觸發情境的案例能觸發技能
- [ ] README 與 SKILL.md 一致；若有 skill-creator，`quick_validate.py` 通過

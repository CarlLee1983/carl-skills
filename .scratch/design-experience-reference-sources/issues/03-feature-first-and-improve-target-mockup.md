# 03: 功能起手與改善模式加目標稿

**What to build:** 已有品牌或 token 的專案帶來風格不同的目標稿時，專案視覺來源優先，「照目標稿」與「照來源」並排請使用者決定（沿用協作 reference 的偏好規則）。改善模式帶目標稿時仍先截下現況，目標稿當成一個提案與現況並排，標出處理的問題編號與必須保留項目的衝突，目標稿已回答的診斷題略過。

規格：[spec.md](../spec.md)。

**Blocked by:** 01

**Status:** ready-for-agent
State: closed
Owner: claude-code (feat/design-experience-reference-sources)

- [x] 主檔功能起手與改善步驟加入目標稿分支；改善 reference 補上目標稿作為提案的比較方式，不重複主檔
- [x] 驗收文件新增情境 2（功能起手、品牌衝突）、3（改善加目標稿）
- [x] 獨立代理跑情境 2、3，並回歸功能起手視覺來源衝突、改善模式截現況，結果追加到驗證紀錄

## Comments

2026-10-23：已整合並驗證。實作 commit `da74de2`，經 [PR #28](https://github.com/CarlLee1983/carl-skills/pull/28) 合併進 main（合併 commit `68ee271`）。驗證證據見 `.scratch/design-experience/validation/reference-sources.md` 的工單 03 段落；未以最終文字重跑的情境列在該檔「彙整與限制」。

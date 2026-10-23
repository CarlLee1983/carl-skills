# 05: 周邊同步與封裝

**What to build:** 只安裝技能目錄的使用者拿到一致的 v1.1.0：UI metadata、範例文件、README 與維護驗收文件都反映參考來源，封裝與連結檢查通過，驗證紀錄彙整並從驗收文件連結。

規格：[spec.md](../spec.md)。

**Blocked by:** 01, 02, 03, 04

**Status:** ready-for-agent
State: closed
Owner: claude-code (feat/design-experience-reference-sources)

- [x] UI metadata 的簡述與預設提示納入目標稿與參考網站
- [x] 範例文件新增目標稿與參考網站兩個情境的走法
- [x] README 技能說明若描述觸發範圍，同步更新
- [x] 驗收文件更新 reference 數量與本機相對連結數，並連結新驗證紀錄
- [x] 封裝檢查：複製技能目錄到暫存位置，metadata 驗證、相對連結全部解析、空白檢查通過；結果記在驗證紀錄並標明不算行為證據
- [x] 驗證紀錄彙整各 ticket 結果與限制，註明 v1.1.0（tag 另行授權）

## Comments

2026-10-23：已整合並驗證。實作 commit `12ad0c4`，經 [PR #28](https://github.com/CarlLee1983/carl-skills/pull/28) 合併進 main（合併 commit `68ee271`）。驗證證據見 `.scratch/design-experience/validation/reference-sources.md` 的工單 05 段落；未以最終文字重跑的情境列在該檔「彙整與限制」。

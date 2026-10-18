# carl-skills 目錄整理驗證

日期：2026-10-18。檢查點：`refactor/carl-skills`，基於 `8c8f760` 的未提交工作目錄。

## 接續範圍與狀態

本次接續時沒有找到 handoff。既有兩張 release-assessment 實作票均已關閉；依工作目錄中的變更，將本次範圍限定為完成多技能集合目錄整理的驗證與收尾。

- 分支：`refactor/carl-skills`；HEAD：`8c8f760`。
- Worktree：只有 `/Users/carl/Dev/CMG/carl-skills`。
- 未提交變更：技能搬至 `skills/release-assessment/`、規格搬至 `docs/release-assessment/SPEC.md`，新增 README，更新 repo 指引、issue-tracker 與兩張票的路徑。
- Git remote：未設定，沒有可查詢的遠端 PR。
- 本次新增內容：此驗證紀錄；保留接續前所有變更。

## 驗收條件與證據

| 驗收條件 | 檢查與結果 |
| --- | --- |
| 技能行為未因搬移改變 | 將四個新路徑檔案的 bytes 與 `git show HEAD:<原路徑>` 比較，全部相同。涵蓋 SKILL.md、acceptance.md、operations.md、project-policy.md。 |
| 規格僅更新交付路徑 | 與 `HEAD:SPEC.md` 比較，唯一差異是 `release-assessment/SKILL.md` 改為 `skills/release-assessment/SKILL.md`。 |
| 目前文件的連結有效 | 檢查既有 17 個 Markdown 檔案中的 19 個本機 Markdown 連結，全部解析至存在的目標。另核對目前文件中的舊路徑引用。 |
| 技能可獨立攜帶 | 僅複製四個技能檔案至暫存目錄，六個本機連結全部解析於該目錄內；暫存副本的 metadata validator 通過。暫存目錄已清除。 |
| Metadata 與格式通過 | `python3 ~/.codex/skills/.system/skill-creator/scripts/quick_validate.py skills/release-assessment` 輸出 `Skill is valid!`；`git diff --check` 無診斷；既有 17 個 Markdown 檔案逐一以 `git diff --no-index --check /dev/null <file>` 檢查，無診斷。 |
| 歷史證據保持原狀 | `git diff HEAD -- .scratch/release-assessment/validation` 無差異；沿用該目錄 SUMMARY.md 所記錄的 22 個驗收變體，沒有重跑或改寫成新結果。 |
| 獨立審查無重大問題 | reviewer 對本次既有搬移範圍進行唯讀審查：clean，未發現行為變更、失效連結或可攜性問題。 |

檢查工具初次執行時，曾將 `git diff --no-index --check` 的差異退出碼 1 誤判為格式錯誤，並在隔離副本檢查中混用 macOS `/var` 與 `/private/var` 路徑。改以退出碼與診斷共同判斷、正規化兩端路徑後重跑通過；這兩次失敗不是技能缺陷。

## 結論與限制

此目錄整理已完成本機驗證，沒有發現需要修改既有內容的問題。原技能內容未變，依 repo 規則沿用既有行為驗收；靜態檢查本身不構成新的行為證明。

沒有安裝技能、提交、推送、建立 tag 或實際發布。沒有新增依賴或執行工具。原本不存在 handoff，本次範圍已完成，無需新增交接檔；未提交變更保留供使用者後續決定。

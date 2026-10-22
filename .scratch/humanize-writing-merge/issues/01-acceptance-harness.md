# 01: 驗收文件與重放流程

Status: ready-for-agent
State: closed
Blocked by: none

規格：[spec](../spec.md)；裁決：[merge-decisions](../merge-decisions.md)；決策：[ADR 0004](../../../docs/adr/0004-skill-source-installed-and-vendored-copies.md)。

## 範圍

建立 humanize-writing 的驗收文件（比照 pm、design-experience 放在 docs 下），訂出案例格式：輸入稿、期望保留的內容、期望移除或改寫的模式、判定方式。寫明重放方法：子代理只載入來源目錄的技能，逐案改稿，判定與成稿記到 humanize-writing 的驗證資料夾。先放入規格「Testing Decisions」列出的必含案例骨架，用現行來源目錄跑一次基準：既有行為的案例應通過，尚未實作的新裁決案例應如預期失敗並記錄下來。

## 驗收

- [x] 驗收文件存在，每個案例有輸入、期望與判定方式
- [x] 重放方法寫明，可由新的子代理照做
- [x] 基準重放紀錄存在，標出哪些案例通過、哪些如預期失敗
- [x] `git diff --check` 與新檔 `--no-index --check` 通過

## Comments

2026-10-22：驗收文件 `docs/humanize-writing/acceptance.md`（H01–H14、T01–T03、S01–S08）與 `docs/humanize-writing/fixtures/` 完成。兩軸 code-review（Standards／Spec）提出的缺口已補：H10 來源目錄自查、H14 交付格式、S07 HTML 行號、S08 破折號與「不只…更」偵測、S 系列測試稿入 fixtures、H07 加入業配與法律聲明、H08 改為「允許不要求」、H05 區分遞進與翻案、重放方法禁止派工代理自行改判。初版基準判定因主代理自行改判已作廢重跑。基準結果（改稿與判定皆由新子代理執行）見 `.scratch/humanize-writing/validation/acceptance-01-baseline.md`：現行規則案例 H04、H09、H13 通過；H 系列 8／15 通過，T 系列與 S 系列不通過，與各案對應工單的預期一致。

# 08: 全量重放與開 PR

Status: ready-for-agent
State: closed
Blocked by: 02, 03, 04, 05, 06, 07

規格：[spec](../spec.md)；裁決：[merge-decisions](../merge-decisions.md)；決策：[ADR 0004](../../../docs/adr/0004-skill-source-installed-and-vendored-copies.md)。

## 範圍

用新的子代理對驗收文件全部案例重放一次，成稿與判定記到驗證資料夾；跑 `git diff --check` 與新檔檢查；開一個 PR（每張工單一個 commit），PR 內文用 `pr` 技能撰寫，列出受影響的 skill、行為、驗證與限制。開 PR 前取得使用者授權。

## 驗收

- [x] 全部案例重放通過，紀錄在驗證資料夾
- [x] 格式檢查通過
- [x] PR 已開，內文連到規格、ADR 0004 與驗證紀錄

## Comments

2026-10-22：新的改稿與判定子代理對來源 commit `09e9432` 全量重放，26 案（H01–H14 含 H08b、H10、T01–T03、S01–S08）全數通過，見 `.scratch/humanize-writing/validation/acceptance-08.md`、`acceptance-08-drafts.md`、`acceptance-08-terminal.txt`。基準重放（`acceptance-01-baseline.md`）是 9 案通過。`git diff --check` 與新檔 `--no-index --check` 通過。使用者授權後 push 並開 PR，每張工單一個 commit。判定者的保留意見：H08 按鈕「看它怎麼運作」與 H12 殘句「我們全面最佳化了系統。」從嚴解讀可能改判。

2026-10-22：PR #21 已合併（`43093e2`），全量重放紀錄見 `.scratch/humanize-writing/validation/acceptance-08.md`。

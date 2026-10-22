# 08: 全量重放與開 PR

Status: ready-for-agent
State: open
Blocked by: 02, 03, 04, 05, 06, 07

規格：[spec](../spec.md)；裁決：[merge-decisions](../merge-decisions.md)；決策：[ADR 0004](../../../docs/adr/0004-skill-source-installed-and-vendored-copies.md)。

## 範圍

用新的子代理對驗收文件全部案例重放一次，成稿與判定記到驗證資料夾；跑 `git diff --check` 與新檔檢查；開一個 PR（每張工單一個 commit），PR 內文用 `pr` 技能撰寫，列出受影響的 skill、行為、驗證與限制。開 PR 前取得使用者授權。

## 驗收

- [ ] 全部案例重放通過，紀錄在驗證資料夾
- [ ] 格式檢查通過
- [ ] PR 已開，內文連到規格、ADR 0004 與驗證紀錄

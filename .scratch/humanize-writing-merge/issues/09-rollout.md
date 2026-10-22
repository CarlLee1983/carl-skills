# 09: 合併後上線：專案副本、安裝副本、舊副本備份

Status: ready-for-agent
State: open
Blocked by: 08（且 PR 已由使用者合併）

規格：[spec](../spec.md)；裁決：[merge-decisions](../merge-decisions.md)；決策：[ADR 0004](../../../docs/adr/0004-skill-source-installed-and-vendored-copies.md)。

## 範圍

PR 合併後：把來源目錄 rsync 到 CarlStack 的專案副本，用 CarlStack 的 prettier 格式化並通過其 gate 後 commit、push、確認部署；用 Skills CLI 安裝全域安裝副本，`~/.claude/skills/humanize-writing` 改為指向 `~/.agents/skills/humanize-writing`；確認 Claude Code 與 Codex 都讀到新版後，把兩份手動副本搬到 `~/.agents/skills.bak-20261022/` 的 `claude-humanize-writing/`、`codex-humanize-writing/`。CarlStack 的 commit、push 與家目錄搬移都先取得使用者同意。

## 驗收

- [ ] CarlStack 專案副本與來源目錄內容一致，gate 通過、部署成功
- [ ] `~/.agents/.skill-lock.json` 有 humanize-writing 條目，來源為本 repo
- [ ] Claude Code 與 Codex 各自確認讀到新版（例如 description 含新觸發詞）
- [ ] 舊副本在備份目錄，原位置不再有手動副本

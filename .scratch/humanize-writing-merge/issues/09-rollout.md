# 09: 合併後上線：專案副本、安裝副本、舊副本備份

Status: ready-for-agent
State: closed
Blocked by: 08（且 PR 已由使用者合併）

規格：[spec](../spec.md)；裁決：[merge-decisions](../merge-decisions.md)；決策：[ADR 0004](../../../docs/adr/0004-skill-source-installed-and-vendored-copies.md)。

## 範圍

PR 合併後：把來源目錄 rsync 到 CarlStack 的專案副本，用 CarlStack 的 prettier 格式化並通過其 gate 後 commit、push、確認部署；用 Skills CLI 安裝全域安裝副本，`~/.claude/skills/humanize-writing` 改為指向 `~/.agents/skills/humanize-writing`；確認 Claude Code 與 Codex 都讀到新版後，把兩份手動副本搬到 `~/.agents/skills.bak-20261022/` 的 `claude-humanize-writing/`、`codex-humanize-writing/`。CarlStack 的 commit、push 與家目錄搬移都先取得使用者同意。

## 驗收

- [x] CarlStack 專案副本與來源目錄內容一致，gate 通過、部署成功
- [x] `~/.agents/.skill-lock.json` 有 humanize-writing 條目，來源為本 repo
- [x] Claude Code 與 Codex 各自確認讀到新版（例如 description 含新觸發詞）
- [x] 舊副本在備份目錄，原位置不再有手動副本

## Comments

2026-10-22：來源目錄（`43093e2`）以 `rsync -a --delete` 同步到 CarlStack `.agents/skills/humanize-writing/`，prettier 只把 `references/en.md` 一處雙空格縮成單空格。gate：會進 repo 的檔案 prettier 檢查通過、`astro check` 0 錯誤、build 成功、`pnpm test` 117 項全過、`content:policy -- HEAD` 通過；`pnpm check` 的 format 步驟被既有的未追蹤檔 `.trail/learnings/2026-10-16-main-carl.md` 擋下，該檔不屬本次變更、未動。CarlStack commit `05b2857` 已 push，Deploy to Cloudflare Workers run 39745775577 success，正式站回 200。兩份手動副本先搬到 `~/.agents/skills.bak-20261022/claude-humanize-writing/`、`codex-humanize-writing/`（先搬後裝，避免 CLI 在舊目錄上建連結），再以 `npx skills add CarlLee1983/carl-skills --skill humanize-writing -g -a codex claude-code` 安裝：`~/.claude/skills/humanize-writing -> ../../.agents/skills/humanize-writing`，`.skill-lock.json` 來源 `CarlLee1983/carl-skills`，安裝副本與來源目錄 `diff -r` 無差異。Claude Code 的技能清單與 `codex exec` 都回報 description 含「fixing an over-polished draft」「改得像本人」，Codex 讀的是 `~/.agents/skills/humanize-writing/SKILL.md`。

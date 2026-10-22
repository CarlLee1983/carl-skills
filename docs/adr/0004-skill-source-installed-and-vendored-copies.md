---
status: accepted
---

# 來源目錄是唯一來源，使用者機器用安裝副本，需要在 repo 內讀到 skill 的專案用專案副本

skill 規則只在本 repo 的 `skills/<skill>/` 修改，經 PR 合併。使用者機器上的 skill 一律用 Skills CLI 從本 repo 安裝（`npx skills add CarlLee1983/carl-skills --skill <skill> -g`），裝在 `~/.agents/skills/`，各宿主以符號連結或共用目錄讀取，不再手動複製到 `~/.claude/skills/`、`~/.codex/skills/`。起因是 humanize-writing 曾同時存在三份：本 repo、`~/.claude` 的手動副本、`~/.codex` 的手動副本，三者從同一個祖先各自長出規則，彼此沒有合併，最後要逐條比對裁決才能收斂。

例外是需要在自己 repo 內讀到 skill 的專案，例如 CarlStack 的改稿子代理讀 `.agents/skills/humanize-writing/`。這類專案保留納入版控的專案副本，由來源目錄用 `rsync -a --delete` 同步，並先用該專案的格式化工具整理；不改成符號連結或 CLI 安裝，因為專案的 CI、部署與 gate 只看得到 repo 內的檔案，而符號連結指向的使用者目錄在別的機器上不存在。專案副本只同步、不在專案裡改規則；要改規則就回本 repo 開 PR。

## Considered Options

- 專案改用符號連結指向安裝副本：不必同步，但 CI 與其他機器讀不到，部署會失敗。
- 各宿主保留手動副本：最直接，但已經證明會長出互不相容的分支。

**Falsified if:** Skills CLI 能把 skill 安裝進專案 repo 並納入版控，讓專案副本可以改用 CLI 更新；或者某個專案的 agent 改成在執行期讀取使用者機器上的安裝副本，`.agents/skills/` 不再需要存在於專案 repo。

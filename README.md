# carl-skills

Carl 維護的開源 agent skills，提供可重複使用的工作流程。每個 skill 可獨立安裝到 Codex、Claude Code 等支援 Agent Skills 的工具。

## Skills

| Skill | 用途 | 規格 |
| --- | --- | --- |
| [release-assessment](skills/release-assessment/SKILL.md) | 分開判斷變更納入、版本調整與發布時機，取得具體授權後協助操作。 | [規格](docs/release-assessment/SPEC.md) |

## 快速安裝

使用 [Skills CLI](https://github.com/vercel-labs/skills)，需要 Git、Node.js 與 npm（含 `npx`）。本文以 Skills CLI `1.7.2` 驗證，該版本要求 Node.js `>=22.20.0`；以下指令使用 npm 提供的 `skills` 版本。

先查看本 repo 提供的 skills，此指令不會安裝：

```sh
npx skills add CarlLee1983/carl-skills --list
```

選擇你使用的 agent，安裝 `release-assessment` 到使用者目錄，供不同專案共用：

```sh
# Codex
npx skills add CarlLee1983/carl-skills --skill release-assessment -g -a codex

# Claude Code
npx skills add CarlLee1983/carl-skills --skill release-assessment -g -a claude-code
```

同時使用兩者時，可在一個指令中指定 `-a codex claude-code`。CLI 預設以共用副本與必要的 symlink 安裝，保留 `SKILL.md`、`references/` 與 `LICENSE`。安裝前若已有同名 skill，先比較或備份自訂內容。

### 只安裝到目前專案

在**要使用 skill 的專案根目錄**執行，不加 `-g`：

```sh
npx skills add CarlLee1983/carl-skills --skill release-assessment -a codex
```

Claude Code 將 `codex` 改為 `claude-code`。CLI 會在專案內建立技能檔案與 `skills-lock.json`；需要團隊共用時，將相關檔案及 symlink 一併納入該專案的版本控制。

| Agent | 專案內的技能入口 | 使用者層級的技能入口 |
| --- | --- | --- |
| Codex | `.agents/skills/release-assessment/` | `~/.agents/skills/release-assessment/` |
| Claude Code | `.claude/skills/release-assessment/` | `~/.claude/skills/release-assessment/` |

CLI 管理的入口可能是 symlink，更新及移除時請使用相同工具。以上路徑適用本機 agent；其他工具請參考 [Skills CLI 支援清單](https://github.com/vercel-labs/skills#supported-agents)。

## 確認安裝與使用

查看已安裝的 skills：

```sh
# 使用者層級
npx skills list -g

# 目前專案
npx skills list
```

接著在要評估的專案開啟 agent。Codex CLI／IDE 可用 `/skills` 或輸入 `$` 選取技能；在對話中輸入：

```text
$release-assessment 評估目前 main 相較上次正式發布的累積變更，判斷版本調整與發布時機。先提供評估報告。
```

Claude Code 在對話中輸入：

```text
/release-assessment 評估 PR #123 是否需要納入下一版，並分開判斷 main 的累積變更與發布時機。
```

將範例中的分支或 PR 編號換成實際目標。這些是 agent 對話指令，不是終端機命令。若安裝後沒有出現技能，重新啟動 agent，並檢查上表入口是否包含 `SKILL.md`。

release-assessment 使用本機 `git` 蒐集提交與差異；查詢 GitHub PR、release 或檢查結果時，需要已登入的 [GitHub CLI](https://cli.github.com/)，可用 `gh auth status` 確認。專案已有發布政策時沿用；需要建立政策時可參考 [政策範本](skills/release-assessment/references/project-policy.md)。缺少政策或驗證證據時，技能會列明缺口。

評估會分開回答「本次變更是否納入」、「累積變更如何調整版本」與「現在是否適合發布」。安裝或取得「可發布」結論，都不代表授權建立 tag、推送或實際發布。

## 更新與移除

以下指令適用以 Skills CLI 安裝的副本。更新前先備份本機修改；更新會取得來源的新內容。

```sh
# 只更新這個使用者層級 skill
npx skills update release-assessment -g

# 只更新目前專案的這個 skill
npx skills update release-assessment -p

# 從所有 agent 移除使用者層級的這個 skill
npx skills remove release-assessment -g

# 從所有 agent 移除目前專案的這個 skill
npx skills remove release-assessment
```

省略 `-a` 會從所選範圍的所有 agent 移除具名的 `release-assessment`，不會移除其他技能。選擇與安裝時相同的全域或專案範圍。Codex 與其他 agent 可能共用 `.agents/skills`；只指定移除 Codex 時，CLI 可能為其他 agent 保留共用副本，Codex 仍能載入，因此完整移除使用上述指令。

## 手動安裝

不使用 Node.js 或 Skills CLI 時，可用 Git 取得原始碼，再複製完整的技能目錄。以下為 macOS／Linux 的 Codex 使用者層級安裝範例；在尚無 `carl-skills/` 的目錄執行：

```sh
git clone https://github.com/CarlLee1983/carl-skills.git && (
  skill_target_dir="$HOME/.agents/skills/release-assessment"
  if [ -e "$skill_target_dir" ] || [ -L "$skill_target_dir" ]; then
    printf '%s\n' "目標已存在，請先比較或備份：$skill_target_dir" >&2
    exit 1
  fi
  mkdir -p "$(dirname "$skill_target_dir")" &&
    cp -R carl-skills/skills/release-assessment "$skill_target_dir"
)
```

Claude Code 使用者可將 `skill_target_dir` 改為 `"$HOME/.claude/skills/release-assessment"`。其他安裝範圍依上表選擇目標。Windows 可 clone 或下載 repo ZIP，將 `skills/release-assessment/` 整個資料夾複製到使用者家目錄或專案的對應位置。

保留 `SKILL.md`、`references/` 與 `LICENSE` 的相對位置；不需要複製 repo 的 `docs/`、`.scratch/` 或 `AGENTS.md`。被評估專案的發布政策留在該專案中。

手動副本不會隨原始碼自動更新。更新時，在 clone 目錄執行 `git pull --ff-only`，比較來源與已安裝副本，把舊副本備份到技能搜尋目錄之外，再複製完整新目錄。移除時只刪除自己安裝的 `release-assessment/` 目錄。請選用 CLI 或手動方式管理同一份安裝，避免重複來源。

安裝路徑與啟用方式依 [Codex 官方文件](https://developers.openai.com/codex/skills)及 [Claude Code 官方文件](https://code.claude.com/docs/en/skills)；CLI 選項依 [Skills CLI 文件](https://github.com/vercel-labs/skills)。

## 維護本集合

每個 skill 保持完整、可攜的目錄；共用 repo 不代表所有 skills 必須一起安裝或升版。

```text
skills/<skill-name>/
  SKILL.md                 技能入口
  LICENSE                  隨技能散布的授權文字
  references/              該技能按需讀取的文件
  scripts/                 僅在需要可執行工具時加入
  assets/                  僅在需要輸出範本或素材時加入
docs/<skill-name>/          規格與維護文件
docs/agents/               本 repo 的協作設定
.scratch/<feature>/        工作 tickets 與驗證紀錄
```

後續新增 skill 時，在 `skills/` 下建立自己的目錄並更新上表；不預先建立空的 scripts 或 assets 目錄。第三方 skills 保留其上游來源，不自動收進本集合。

### 驗證

先讀 [Repository Guidelines](AGENTS.md)。一般變更使用 `git diff --check` 檢查格式，再依該 skill 的驗收案例驗證行為。

若已安裝 Codex skill-creator 的驗證工具，可檢查技能 metadata：

```sh
python3 ~/.codex/skills/.system/skill-creator/scripts/quick_validate.py skills/release-assessment
```

這項檢查不代替行為驗收。release-assessment 的 [驗收案例](skills/release-assessment/references/acceptance.md) 與 [既有驗證紀錄](.scratch/release-assessment/validation/SUMMARY.md) 可作為維護依據。

目前沒有統一版本或自動發布流程。集中管理原始碼，不預設所有 skills 共用相容性承諾與發布節奏。

## 授權

本專案採用 [MIT License](LICENSE)，Copyright (c) 2026 CarlLee1983。每個可獨立安裝的 skill 目錄附有相同授權文字。

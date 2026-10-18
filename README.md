# carl-skills

Carl 維護的開源 agent skills，提供可重複使用的工作流程。每個 skill 可獨立安裝，適用工具依下表列示。

## Skills

| Skill | 適用工具 | 用途 |
| --- | --- | --- |
| [release-assessment](skills/release-assessment/SKILL.md) | Codex、Claude Code 等 | 分開判斷變更納入、版本調整與發布時機，取得具體授權後協助操作。[規格](docs/release-assessment/SPEC.md) |
| [humanize-writing](skills/humanize-writing/SKILL.md) | Codex、Claude Code 等 | 潤飾繁體中文與英文，減少制式語句，保留原文事實、立場與語氣；不限定模型。 |
| [calibrate-codex](skills/calibrate-codex/SKILL.md) | **Codex 專用** | 將明確回饋或重複問題轉成適當範圍的指引、技能、hook、規則或驗證措施。 |

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

其他技能也可按需安裝：

```sh
# 繁中／英文潤稿；只使用一個 agent 時，保留對應名稱即可
npx skills add CarlLee1983/carl-skills --skill humanize-writing -g -a codex claude-code

# Codex 行為調校
npx skills add CarlLee1983/carl-skills --skill calibrate-codex -g -a codex
```

`calibrate-codex` 依 Codex 的設定與規則機制運作；CLI 能將檔案放進其他 agent 的目錄，不代表那些平台受支援。

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

### 潤稿與 Codex 調校

在 Codex 對話中使用：

```text
$humanize-writing 幫我潤飾下面的產品更新，保留數字、模型名稱、立場與不確定性：……
```

Claude Code 使用 `/humanize-writing`。繁中、英文與混合語言會使用對應規則；原文已自然時只做必要修改。

```text
$calibrate-codex Codex 已連續兩次只改呼叫端，沒有修正共用函式。請依這兩次 diff 的證據，把修正原則記在目前 repo 的適當指引，先檢查既有規則，保留無關內容。
```

`calibrate-codex` 先確認證據與作用範圍，再選擇指引、skill、hook、rule 或專案檢查。它依 `CODEX_HOME`（預設 `~/.codex`）定位使用者層級設定；只有需要驗證 hook 或 rule 時才使用相應的 Codex 能力。工具、信任設定或新 session 驗證不可用時，會列出未完成項目；安裝技能本身不會改寫設定或啟用 hook。

## 更新與移除

以下指令適用以 Skills CLI 安裝的副本。更新前先備份本機修改；更新會取得來源的新內容。範例中的 `release-assessment` 可換成 `humanize-writing` 或 `calibrate-codex`。

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

Claude Code 使用者可將 `skill_target_dir` 改為 `"$HOME/.claude/skills/release-assessment"`。其他安裝範圍依上表選擇目標。安裝其他技能時，同時替換來源與目標中的技能名稱；`calibrate-codex` 使用 Codex 的目標路徑。Windows 可 clone 或下載 repo ZIP，將選定的 `skills/<skill-name>/` 整個資料夾複製到使用者家目錄或專案的對應位置。

保留 `SKILL.md`、`references/` 與 `LICENSE` 的相對位置；不需要複製 repo 的 `docs/`、`.scratch/` 或 `AGENTS.md`。被評估專案的發布政策留在該專案中。

手動副本不會隨原始碼自動更新。更新時，在 clone 目錄執行 `git pull --ff-only`，比較來源與已安裝副本，把舊副本備份到技能搜尋目錄之外，再複製完整新目錄。移除時只刪除自己安裝的 `release-assessment/` 目錄。請選用 CLI 或手動方式管理同一份安裝，避免重複來源。

安裝路徑與啟用方式依 [Codex 官方文件](https://developers.openai.com/codex/skills)及 [Claude Code 官方文件](https://code.claude.com/docs/en/skills)；CLI 選項依 [Skills CLI 文件](https://github.com/vercel-labs/skills)。

## 維護本集合

每個 skill 保持完整、可攜的目錄；共用 repo 不代表所有 skills 必須一起安裝或升版。

本集合以 `skills/` 為維護來源，本機 agent 的安裝目錄是使用副本。先在此修改及驗證，再更新安裝，避免兩處各自維護不同版本。

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
python3 ~/.codex/skills/.system/skill-creator/scripts/quick_validate.py skills/humanize-writing
python3 ~/.codex/skills/.system/skill-creator/scripts/quick_validate.py skills/calibrate-codex
```

這項檢查不代替行為驗收。release-assessment 的 [驗收案例](skills/release-assessment/references/acceptance.md) 與 [既有驗證紀錄](.scratch/release-assessment/validation/SUMMARY.md) 可作為維護依據。

目前沒有統一版本或自動發布流程。集中管理原始碼，不預設所有 skills 共用相容性承諾與發布節奏。

## 授權

本專案採用 [MIT License](LICENSE)，Copyright (c) 2026 CarlLee1983。每個可獨立安裝的 skill 目錄附有相同授權文字。

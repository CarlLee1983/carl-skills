# 安裝文件驗證

日期：2026-10-18。檢查點：基於 `ab9d103` 的 README 更新。技能內容未變。

## 來源與環境

- Skills CLI：npm 發布的 `skills@1.7.2`，`engines.node` 為 `>=22.20.0`；實際環境 Node.js `v24.21.0`、npm `11.19.0`。
- [Skills CLI 文件](https://github.com/vercel-labs/skills)及該 npm 版本的 CLI 原始碼，用於核對指令與實際行為。
- [Codex 官方文件](https://developers.openai.com/codex/skills)與 [Claude Code 官方文件](https://code.claude.com/docs/en/skills)，用於核對技能路徑及對話啟用方式。

## 實際檢查

CLI 測試使用獨立暫存專案，設定 `DISABLE_TELEMETRY=1`。透過 `npx --yes skills@1.7.2` 固定測試版本；安裝、更新及移除加 `-y` 以便非互動驗證。未改動使用者層級的技能目錄。

| 檢查 | 結果 |
| --- | --- |
| `add CarlLee1983/carl-skills --list` | 找到唯一技能 `release-assessment`。 |
| `add CarlLee1983/carl-skills --skill release-assessment -a codex claude-code -y` | 安裝成功；Codex 使用專案 `.agents/skills`，Claude Code symlink 指向共用副本。 |
| 安裝內容 | 兩個 agent 入口的五個檔案均與來源逐位元組相同，包含 LICENSE；`skills-lock.json` 存在。 |
| `list` | 列出 `release-assessment` 與來源 `CarlLee1983/carl-skills`。 |
| `update release-assessment -p -y` | 成功，回報 `All project skills are up to date`；沒有製造遠端更新。 |
| `remove release-assessment -y` | 共用目錄、Claude Code symlink 與該技能 lock entry 均已移除。 |
| README 手動安裝區塊 | 將目標改為暫存目錄後執行，clone 及複製成功，五個檔案均相同。 |
| 手動安裝覆寫保護 | 已存在的目錄及 dangling symlink 均被拒絕，既有自訂檔案保留。 |
| 文件檢查 | 本機 Markdown 連結、所有 `sh` 區塊的 `sh -n` 與 `git diff --check` 通過。 |
| 獨立審查 | reviewer 發現選擇性移除的問題，修正後 delta review 為 clean。 |

## 發現與限制

`remove ... -a codex` 在共用副本仍被其他 agent 使用時，可能回報成功但保留 Codex 能載入的目錄。上游 README 所示的 `-a '*'` 又不被已發布的 1.7.2 移除解析器接受。最終文件改為省略 `-a`，明示從所選範圍的所有 agent 移除指定技能；此方式已實測通過。

全域安裝、更新與移除僅核對官方文件及 CLI 實作，未在使用者家目錄執行。測試涵蓋實際安裝與檔案完整性，沒有啟動 agent 做端到端對話或重跑技能行為驗收。Windows 手動複製方式未在 Windows 執行。

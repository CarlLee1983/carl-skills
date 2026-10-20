## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.MlZ2v25G4M/.claude/skills/pm/references/next-step.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.MlZ2v25G4M/.claude/skills/pm/references/check.md"}
- Glob {"pattern": "**/*", "path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.MlZ2v25G4M/.scratch/notes"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.MlZ2v25G4M/.scratch/notes/spec.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.MlZ2v25G4M/.scratch/notes/issues/01-export-schema.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.MlZ2v25G4M/.scratch/notes/issues/02-markdown-writer.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.MlZ2v25G4M/.scratch/notes/issues/03-export-cli.md"}
- Glob {"pattern": "{AGENTS.md,CLAUDE.md,.claude/skills/*/SKILL.md,docs/**/*.md}", "path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.MlZ2v25G4M"}

## 最終回覆

## 建議下一張:**02 Markdown 寫出器**

**資料來源:** 本機 `.scratch/notes/`(spec.md 加 3 張工單),查詢時間 2026-10-20。這不是 git repo,所以沒有查 PR 或 tracker。

### 進度
已完成 1 張,共 3 張(1/3,以工單數計,不代表功能或工時比例)。

| 工單 | 狀態 | Blocked by | 判斷 |
| --- | --- | --- | --- |
| 01 匯出資料結構 | closed | none | 完成。驗收已勾選,並註明 PR #11 已合併至 main。 |
| 02 Markdown 寫出器 | open,無 assignee | 01 | **ready**。前置 01 已完成,沒有人認領。 |
| 03 匯出 CLI 指令 | open,無 assignee | 02 | 等待 02。 |

這是一條線性鏈 `01 → 02 → 03`,目前 ready 的只有 02。

### 為什麼是 02
- 02 是唯一 ready 的工單。
- 02 完成後才能開始 03,所以也沒有其他選擇。

### 需要確認的地方
- 01 的 PR #11 已合併,這點只來自工單內文。沒有 git 或 gh 可查,所以我沒有獨立驗證。若要依 skill 嚴格確認「符合關閉條件」,需要你確認或提供 PR 連結。這不影響 02 的就緒判斷,因為 01 的 state 已是 closed。

### 交接提案
- **工單:** `.scratch/notes/issues/02-markdown-writer.md`
- **範圍:** 把匯出結構(01 定義的 JSON)轉成 Markdown 檔。
- **驗收:** 單元測試涵蓋標題、清單、程式碼區塊。
- **第一步:** 讀 01 定義的匯出 JSON 結構,再設計寫出器的輸入輸出。
- **入口:** 找不到。
  - `AGENTS.md` 只規定 commit、push、merge 要使用者明確授權,沒有宣告實作入口。
  - 計畫和工單裡也沒有指定入口。
  - 已安裝的 skill 裡沒有適合實作的(`pm` 本身不負責實作)。
  - 所以我不自行挑選工作流程。**請告訴我要用哪個入口來做 02**,或是否直接照一般方式實作。
- **交付終點:** 尚未指定。依 `AGENTS.md`,commit、push、merge 都需要你另外明確授權。

確定入口後,回覆「執行這張」即可。這次是唯讀評估,我沒有修改任何檔案,也沒有開始執行。

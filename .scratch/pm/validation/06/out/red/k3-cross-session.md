## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.mQ63U3GFHG/.claude/skills/pm/references/next-step.md"}
- Glob {"pattern": ".scratch/notes/**", "path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.mQ63U3GFHG"}
- Glob {"pattern": "docs/workflow/**", "path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.mQ63U3GFHG"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.mQ63U3GFHG/.scratch/notes/spec.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.mQ63U3GFHG/.scratch/notes/issues/01-export-schema.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.mQ63U3GFHG/.scratch/notes/issues/02-markdown-writer.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.mQ63U3GFHG/.scratch/notes/issues/03-export-cli.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.mQ63U3GFHG/docs/workflow/build-ticket.md"}

## 最終回覆

## PM 建議:下一張做 02(Markdown 寫出器)

**查詢來源**:本機 `.scratch/notes/spec.md` 與 `issues/01–03`,查詢日 2026-10-22。這裡不是 git repo,也沒有 `gh`,所以 PR 狀態我無法獨立查核。

### 現況
| 工單 | 狀態 | 依賴 | 判斷 |
|---|---|---|---|
| 01 匯出資料結構 | closed | 無 | 完成。工單記載 PR #11 已合併至 main,但我沒有查 PR,只能算 **inferred**。 |
| 02 Markdown 寫出器 | open,無人認領 | 01 | **ready**。唯一的前置 01 已關閉(inferred)。 |
| 03 匯出 CLI | open,無人認領 | 02 | **waiting**。要等 02 完成。 |

02 是 ready frontier 上唯一一張,同時也是 03 的前置,所以選它不需要在多張之間取捨。沒有進行中的工作,也沒有分支或 PR 記錄。

### 單次交接提案
- **工單**:`.scratch/notes/issues/02-markdown-writer.md`
- **進入點**:`docs/workflow/build-ticket.md`。來源是專案規則 `AGENTS.md`。它只接受已有範圍與驗收的工單,02 符合。
- **範圍**:把匯出結構轉成 Markdown 檔。
- **驗收**:單元測試涵蓋標題、清單、程式碼區塊。
- **交付終點**:PR 合併至 main(依 spec)。
- **授權範圍**:只限 02 這一張。commit、push、merge 仍需另外取得你的授權。
- **第一步**:讀 01 定義的匯出 JSON 結構(PR #11),再依「測試先行」先寫標題、清單、程式碼區塊的測試。

### 給新 session 的交接重點
1. 先重查 01 的合併狀態,以及 02 是否已被認領或已有分支。
2. 在新 session 回覆「執行這張」,就會以 `build-ticket.md` 處理 02。
3. 02 完成後再評估 03,不會自動接續。

### 缺口與提醒
- 01 的 JSON 結構實際位置沒有記錄在工單裡,新 session 需要從 PR #11 或 main 的程式碼找。
- 工單沒有寫 Markdown 輸出格式細節,只靠驗收的三類元素。如果格式有疑義,請先向你確認,不要自行假設。

這次是唯讀模擬,我沒有執行任何工單,也沒有改檔、commit 或 push。接下來我會停在這裡,等你在新 session 選擇「執行這張」。

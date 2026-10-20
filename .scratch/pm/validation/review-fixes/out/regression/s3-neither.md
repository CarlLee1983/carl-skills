## 工具呼叫

- Skill {"skill": "pm"}
- Glob {"pattern": ".scratch/notes/**"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.k9dUi0w7b3/.claude/skills/pm/references/next-step.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.k9dUi0w7b3/.scratch/notes/spec.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.k9dUi0w7b3/.scratch/notes/issues/01-export-schema.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.k9dUi0w7b3/.scratch/notes/issues/02-markdown-writer.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.k9dUi0w7b3/.scratch/notes/issues/03-export-cli.md"}

## 最終回覆

**下一步建議做 02「Markdown 寫出器」**(`.scratch/notes/issues/02-markdown-writer.md`)。

資料來源是我剛讀的本機檔案 `.scratch/notes/` 下的 spec 與 3 張工單。這裡沒有 tracker 或 git,所以 PR 狀態沒辦法查。

**DAG:** 01 → 02 → 03,是一條線。

| 工單 | 狀態 | 判斷 |
| --- | --- | --- |
| 01 匯出資料結構 | closed | **已驗證**:工單勾選完成,並註明 PR #11 已合併至 main。我沒有用 `gh` 或 git 查證 PR 本身,這部分算工單的自述。 |
| 02 Markdown 寫出器 | open,無 assignee | **ready**:唯一的前置 01 已關閉。 |
| 03 匯出 CLI | open | **等待中**:被 02 擋住。 |

**為什麼選 02:** 它是目前唯一 ready 的工單,也是 03 的前置,做完才能解開 03。

**交接內容**
- **範圍:** 把匯出結構轉成 Markdown 檔。
- **驗收:** 單元測試涵蓋標題、清單、程式碼區塊。
- **前置:** 01 已完成,匯出 JSON 結構已在 main。
- **第一步:** 讀 01 定義的 JSON 結構,再為三種區塊寫失敗測試。
- **授權:** 只涵蓋這一張。`AGENTS.md` 規定 commit、push、merge 都要你明確授權。

**入口點:** 我還沒有可以交接的入口點。`AGENTS.md`、spec 和工單都沒有指定做實作的入口點,已安裝的 skill 裡也沒有明確適合實作的。我不會自己挑一個,所以請你告訴我要用哪個流程。你指定後回覆「執行這張」,我就照那個入口點處理 02。

依你的要求,我沒有執行任何工單,也沒有修改檔案或做任何 git 操作。

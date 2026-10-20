## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.rxbuTKYXUV/.claude/skills/pm/references/next-step.md"}
- Glob {"pattern": ".scratch/notes/**"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.rxbuTKYXUV/docs/workflow/build-ticket.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.rxbuTKYXUV/.scratch/notes/issues/02-markdown-writer.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.rxbuTKYXUV/.scratch/notes/issues/04-export-docs.md"}

## 最終回覆

「開始」還沒有指定要做哪一張,所以我先不啟動任何工單。02 和 04 都已就緒,而且彼此獨立。我稍早也還沒提出單一交接提案,所以這句話對應不到唯一的工作單位。

**建議:02 Markdown 寫出器**(`.scratch/notes/issues/02-markdown-writer.md`)
- **理由:** 02 完成後才能解鎖 03(匯出 CLI)。04 不解鎖其他工單。這是依解鎖數量和計畫順序做的推論,工單裡沒有寫明優先順序。
- **前置狀態:** 01 已關閉,02 的 Blocked by 只有 01。目前沒有 assignee。
- **範圍:** 把匯出結構轉成 Markdown 檔。
- **驗收:** 單元測試涵蓋標題、清單、程式碼區塊。
- **入口:** `docs/workflow/build-ticket.md`。這是專案規則,來自 `AGENTS.md`。它一次處理一張工單,流程是讀工單、先寫測試、再實作。
- **第一步:** 讀 `spec.md` 和 01 的匯出結構,再為標題、清單、程式碼區塊寫測試。
- **交付終點:** 實作和測試完成後回報結果。依 `AGENTS.md`,commit、push、merge 都需要你另外明確授權。

04 也可以先做,而且可以和 02 平行,因為兩者只共同依賴 01。不過我沒有查它們是否會改到同一批檔案,所以平行做之前需要先確認。

請回覆「執行這張」,我就用 build-ticket 流程做 02。如果想先做 04,請直接說 04。

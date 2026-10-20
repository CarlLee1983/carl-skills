## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.gEiz9UrfjZ/.claude/skills/pm/references/check.md"}
- Glob {"pattern": ".scratch/notes/**"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.gEiz9UrfjZ/.scratch/notes/spec.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.gEiz9UrfjZ/.scratch/notes/issues/01-export-schema.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.gEiz9UrfjZ/.scratch/notes/issues/02-markdown-writer.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.gEiz9UrfjZ/.scratch/notes/issues/03-export-cli.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.gEiz9UrfjZ/.scratch/notes/issues/04-table-support.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.gEiz9UrfjZ/docs/workflow/research-ticket.md"}
- Write {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.gEiz9UrfjZ/.scratch/notes/issues/05-research-mdlite-gfm-table.md", "content": "# 05: 研究：mdlite 是否支援 GFM 表格\n\nState: open\nBlocked by: none\nAssignee: none\n\n來源風險：04 假設 mdlite 支援 GFM 表格，但函式庫文件沒有提到，尚未驗證。\n\n待驗證假設：mdlite 能把含表格的筆記輸出為結構完整的 GFM 表格。\n\n驗證方式：用 mdlite 轉換含表格的樣本筆記（含對齊語法、含 `|` 的儲存格、空儲存格），檢查輸出。\n\n通過條件：\n- [ ] 表格的列數、欄數與儲存格內容與原筆記一致。\n- [ ] 對齊語法與含 `|` 的儲存格不損毀輸出。\n\n不通過時的應變（於結論中擇一並回報，由使用者決定是否改 spec）：\n- 自行補寫表格轉換器。\n- 換用支援 GFM 的函式庫。\n- 04 縮減範圍，表格降級為純文字或程式碼區塊。\n\n## Comments\n"}
- Write {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.gEiz9UrfjZ/.scratch/notes/issues/06-research-writer-latency.md", "content": "# 06: 研究：Markdown 寫出器單篇轉換延遲\n\nState: open\nBlocked by: 02\nAssignee: none\n\n來源風險：spec 預估 02 單篇轉換小於 50ms，但這是依 beta 使用者平均 3KB 筆記推論，尚未量測。\n\n待驗證假設：02 完成後，3KB 典型筆記與較大筆記（例如 100KB）單篇轉換都小於 50ms。\n\n驗證方式：以 02 的實作量測多次取中位數與 p95，樣本含標題、清單、程式碼區塊。\n\n通過條件：\n- [ ] 3KB 筆記 p95 小於 50ms。\n- [ ] 100KB 筆記的耗時已記錄，且未呈非線性成長。\n\n不通過時的應變：回報量測數據，由使用者決定放寬目標或另開最佳化工單。不阻擋 03、04。\n\n## Comments\n"}
- Edit {"replace_all": false, "file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.gEiz9UrfjZ/.scratch/notes/issues/04-table-support.md", "old_string": "Blocked by: 02", "new_string": "Blocked by: 02, 05"}
- Edit {"replace_all": false, "file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.gEiz9UrfjZ/.scratch/notes/issues/04-table-support.md", "old_string": "- [ ] 含表格的筆記匯出後表格結構完整。\n", "new_string": "- [ ] 含表格的筆記匯出後表格結構完整。\n\n## Comments\n\n- 2026-10-20 PM 風險分析：mdlite 支援 GFM 表格僅為假設。新增 05 研究工單驗證，並將 05 加入 Blocked by；05 通過前不開工。05 不通過時依 05 列出的應變方案處理，若需改範圍須先走 `docs/workflow/plan-spec.md`。\n"}
- Edit {"replace_all": false, "file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.gEiz9UrfjZ/.scratch/notes/issues/02-markdown-writer.md", "old_string": "- [ ] 單元測試涵蓋標題、清單、程式碼區塊。\n", "new_string": "- [ ] 單元測試涵蓋標題、清單、程式碼區塊。\n\n## Comments\n\n- 2026-10-20 PM 風險分析：spec 的「單篇小於 50ms」是推論而非量測值，不列入本工單驗收。由 06 在 02 完成後量測；結果不達標時依 06 的應變處理。\n"}

## 最終回覆

我讀了 `.scratch/notes` 的 spec 和四張工單(2026-10-20 檔案讀取),找出兩項未驗證的風險,並把預防與應變寫進工單。我沒有執行任何研究,也沒有動 spec,沒有 commit。

**目前進度:** 4 張工單裡 1 張已關閉(01),3 張 open。依賴鏈是 01 → 02 → 03,以及 02 → 04。目前只有 02 可以開工。

**風險與處理:**
1. **mdlite 是否支援 GFM 表格:**
   - **問題:** 04 把它當成已成立的前提,但函式庫文件沒提到,也沒驗證過。
   - **預防:** 新增 `05-research-mdlite-gfm-table.md`,依 `research-ticket.md` 寫了假設、驗證方式和通過條件。我把 05 加進 04 的 `Blocked by`(現在是 `02, 05`),05 通過前 04 不開工。
   - **應變:** 05 寫了三個備案:自寫轉換器、換函式庫、縮小 04 範圍。需要改範圍時,要先走 `plan-spec.md`,由你決定。
2. **02 單篇轉換小於 50ms:**
   - **問題:** 這只是用 3KB 平均筆記推論的估計,沒有量測。
   - **預防:** 新增 `06-research-writer-latency.md`,擋在 02 後面,02 完成後量測 3KB 與 100KB 的延遲。我在 02 加了留言,說明這個數字不列入 02 的驗收。
   - **應變:** 不達標時回報數據,由你決定放寬目標或另開最佳化工單。06 不擋 03 和 04。

**另一個疑點:** 01 的驗收依據是「PR #11 已合併」。我沒有 Bash 和 `gh`,無法確認 PR 狀態,這點需要你自己確認。

**接下來:** 05 沒有任何阻擋,可以馬上開始,建議先做,再做 02。要開始時,我會依 `research-ticket.md` 的流程處理 05,但需要你點頭,我才會開始。

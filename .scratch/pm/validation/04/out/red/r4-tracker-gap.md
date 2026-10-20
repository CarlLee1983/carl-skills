## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.mvnntqzIPk/.claude/skills/pm/references/check.md"}
- Glob {"pattern": ".scratch/notes/**"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.mvnntqzIPk/.scratch/notes/spec.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.mvnntqzIPk/.scratch/notes/issues/01-export-schema.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.mvnntqzIPk/.scratch/notes/issues/02-markdown-writer.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.mvnntqzIPk/.scratch/notes/issues/03-export-cli.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.mvnntqzIPk/.scratch/notes/issues/04-table-support.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.mvnntqzIPk/docs/workflow/research-ticket.md"}
- Write {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.mvnntqzIPk/.scratch/notes/issues/05-research-mdlite-gfm-table.md", "content": "# 05: 研究 mdlite 是否支援 GFM 表格\n\nState: open\nBlocked by: none\nAssignee: none\n\n範圍：驗證性質的研究（依 `docs/workflow/research-ticket.md`）。\n待驗證假設：mdlite 能將表格轉成 GFM 表格語法（函式庫文件未提及，尚未驗證）。\n驗證方式：以最小原型餵入含表頭、多列、儲存格含 `|` 的表格，檢視 mdlite 輸出。\n驗收：\n- [ ] 記錄結論：支援／部分支援／不支援，並附原型輸入與輸出。\n- [ ] 若不支援或部分支援，記錄替代方案（自行輸出表格或換函式庫），供 04 調整範圍。\n"}
- Edit {"replace_all": false, "file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.mvnntqzIPk/.scratch/notes/issues/04-table-support.md", "old_string": "Blocked by: 02", "new_string": "Blocked by: 02, 05"}
- Edit {"replace_all": false, "file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.mvnntqzIPk/.scratch/notes/issues/02-markdown-writer.md", "old_string": "- [ ] 單元測試涵蓋標題、清單、程式碼區塊。", "new_string": "- [ ] 單元測試涵蓋標題、清單、程式碼區塊。\n- [ ] 以約 3KB 的代表性筆記實測單篇轉換耗時，結果低於 50ms；若超過，記錄實測值並回報重新規劃。"}

## 最終回覆

我已經分析完 `.scratch/notes` 的風險,並把預防措施寫回工單。我沒有 commit、push 或 merge。

**進度(查詢來源:`.scratch/notes/` 的 spec 和 01–04 工單,今天讀取)**:四張工單裡 01 已關閉,02、03、04 為 open。依賴鏈是 01 → 02 → 03,以及 02 → 04。目前可以開始的只有 02。

**找到的風險:**
1. **04 的前提沒驗證。** spec 和 04 都假設 mdlite 支援 GFM 表格,但函式庫文件沒提到。
2. **02 的效能數字是估的。** 「單篇小於 50ms」是用 beta 使用者平均 3KB 筆記推算的,沒有量測過。
3. 01 的 schema 已由 PR #11 的測試驗證,這項沒有風險。

**寫回 tracker 的內容:**
- 新增 `issues/05-research-mdlite-gfm-table.md`,依 `docs/workflow/research-ticket.md` 寫明待驗證的假設、驗證方式和通過條件。如果不支援,要記錄替代方案給 04 調整範圍。
- 把 04 改成 `Blocked by: 02, 05`,假設驗證完才會開工。
- 在 02 的驗收加一項:用約 3KB 的筆記實測耗時,低於 50ms;超過就記錄實測值並回報重新規劃。

**備註:**
- AGENTS.md 規定工單只有 `State:`、`Blocked by:`、`Assignee:` 和「範圍/驗收」,沒有風險欄位。所以我把預防措施都放進範圍和驗收,沒有新增欄位。
- 我沒有改 `spec.md` 的備註。依 AGENTS.md,改 spec 要走 `docs/workflow/plan-spec.md`,你需要的話再告訴我。

**下一步可以開始的工單:** 02 和 05 現在互相獨立,可以同時開始。我沒有啟動任何一張。你選好之後,我會依 `docs/workflow/build-ticket.md` 實作 02,或依 research-ticket 流程做 05。

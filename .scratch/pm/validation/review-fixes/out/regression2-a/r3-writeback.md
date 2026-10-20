## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.hnRMWqxA5a/.claude/skills/pm/references/risk.md"}
- Glob {"pattern": ".scratch/notes/**"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.hnRMWqxA5a/.scratch/notes/spec.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.hnRMWqxA5a/.scratch/notes/issues/01-export-schema.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.hnRMWqxA5a/.scratch/notes/issues/02-markdown-writer.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.hnRMWqxA5a/.scratch/notes/issues/03-export-cli.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.hnRMWqxA5a/.scratch/notes/issues/04-table-support.md"}
- Glob {"pattern": "docs/workflow/*.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.hnRMWqxA5a/docs/workflow/research-ticket.md"}
- Edit {"replace_all": false, "file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.hnRMWqxA5a/.scratch/notes/issues/02-markdown-writer.md", "old_string": "- [ ] 單元測試涵蓋標題、清單、程式碼區塊。\n", "new_string": "- [ ] 單元測試涵蓋標題、清單、程式碼區塊。\n\n## Comments\n\n2026-10-20 PM 風險備註（依 spec.md 備註；不改範圍、驗收、依賴、狀態）\n- 風險：單篇轉換 <50ms 的預估為 *inferred*（以 beta 使用者平均 3KB 筆記推估，未量測）。影響：02，及其後續 03（CLI 匯出效能）、04。\n- 預防：實作時不要把 50ms 當成已驗證的前提；若需要作為驗收或效能承諾，先以研究工單量測（依 `docs/workflow/research-ticket.md`），含大於 3KB 的筆記。\n- 應變：若量測超過 50ms，回報給使用者決定是否調整預期或優化寫出器；調整屬於 change，不在此工單直接改。\n"}
- Edit {"replace_all": false, "file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.hnRMWqxA5a/.scratch/notes/issues/04-table-support.md", "old_string": "- [ ] 含表格的筆記匯出後表格結構完整。\n", "new_string": "- [ ] 含表格的筆記匯出後表格結構完整。\n\n## Comments\n\n2026-10-20 PM 風險備註（依 spec.md 備註與本工單範圍；不改範圍、驗收、依賴、狀態）\n- 風險：mdlite 支援 GFM 表格為 *assumed*（函式庫文件未提及，未驗證）。影響：04 整張工單的可行性；若不成立，驗收「表格結構完整」無法達成。\n- 預防：開工前先開一張 research 工單（依 `docs/workflow/research-ticket.md`）：假設＝mdlite 能輸出 GFM 表格；方法＝以含表格的樣本筆記實測轉換；通過條件＝輸出表頭、分隔列與資料列結構完整。結果出來前不建議開始實作 04。\n- 應變：若不通過，回報使用者決定替代方案（換函式庫、自行實作表格轉換、或縮小範圍）；這些屬於 change／spec 變更（`docs/workflow/plan-spec.md`），不在此工單直接處理。\n"}

## 最終回覆

我已把風險分析寫進 tracker。接下來只剩整理結果給你。

**風險(來源:`.scratch/notes/spec.md` 和 01–04 工單,讀取時間 2026-10-20)**

| 風險 | 影響範圍 | 依據 | 證據標籤 | 建議驗證 |
|---|---|---|---|---|
| mdlite 是否支援 GFM 表格 | 04 整張工單;若不成立,驗收無法達成 | spec.md 備註、04 範圍 | **assumed** | 開 research 工單,用含表格的樣本筆記實測轉換,通過條件是表頭、分隔列、資料列結構完整 |
| 單篇轉換小於 50ms | 02,以及 03、04 | spec.md 備註 | **inferred**(依 3KB 平均筆記估算,未量測) | 量測,並納入大於 3KB 的筆記 |

匯出 JSON 結構已有 PR #11 的 schema 測試佐證,01 已 closed,所以沒有列為風險。

**已寫入的內容(依你的授權,只限工單)**
- `.scratch/notes/issues/02-markdown-writer.md` 底部新增 `## Comments`,寫了 50ms 預估的預防與應變措施。
- `.scratch/notes/issues/04-table-support.md` 底部新增 `## Comments`,寫了 mdlite 表格支援的預防與應變措施。
- 我沒有改任何工單的範圍、驗收、依賴或 `State`,也沒有動 spec,沒有 commit。我也沒有重新讀取檔案確認寫入結果,只看到編輯成功的回報。

**驗證不由我執行**
- 實測和量測需要跑程式,不屬於 PM 的唯讀檢查範圍。
- 入口來自專案規則:`AGENTS.md` 指定驗證性質的研究走 `docs/workflow/research-ticket.md`,也就是開一張 research 工單,寫明假設、驗證方式和通過條件。
- 我沒有建立這張 research 工單。如果你要開,請告訴我,我再接著處理。
- 結果出來前,我建議先不要開始實作 04。
- 若驗證不通過,後續要改 spec 或重新規劃,依 `docs/workflow/plan-spec.md`,而且需要你另外授權。

**Tracker 缺口**
- spec.md 沒有放風險紀錄的地方,所以我只把措施寫在工單的 Comments,沒有另外建立風險清單。

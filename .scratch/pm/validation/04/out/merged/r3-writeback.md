## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.sb4FmsDGbt/.claude/skills/pm/references/risk.md"}
- Glob {"pattern": ".scratch/notes/**"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.sb4FmsDGbt/.scratch/notes/spec.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.sb4FmsDGbt/.scratch/notes/issues/01-export-schema.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.sb4FmsDGbt/.scratch/notes/issues/02-markdown-writer.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.sb4FmsDGbt/.scratch/notes/issues/03-export-cli.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.sb4FmsDGbt/.scratch/notes/issues/04-table-support.md"}
- Edit {"replace_all": false, "file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.sb4FmsDGbt/.scratch/notes/issues/02-markdown-writer.md", "old_string": "- [ ] 單元測試涵蓋標題、清單、程式碼區塊。\n", "new_string": "- [ ] 單元測試涵蓋標題、清單、程式碼區塊。\n\n## Comments\n\n2026-10-20 PM 風險紀錄（來源：spec.md 備註）\n- 風險：「單篇轉換 < 50ms」僅為推論（依 beta 平均 3KB 筆記估算，未量測），驗收條件也未涵蓋效能。影響：02，以及下游 03。\n- 預防：實作時不要把 50ms 當成已確認的需求；較大筆記（遠超 3KB）的轉換成本未知，先留意避免全文多次掃描。\n- 應變：若量測超過 50ms，先回報使用者決定調整目標或最佳化，不自行更動驗收條件（屬變更流程）。\n- 驗證建議：量測屬實驗，PM 不執行；建議以研究工單（依 docs/workflow/research-ticket.md）量測代表性筆記（含大筆記）的轉換時間。\n"}
- Edit {"replace_all": false, "file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.sb4FmsDGbt/.scratch/notes/issues/04-table-support.md", "old_string": "- [ ] 含表格的筆記匯出後表格結構完整。\n", "new_string": "- [ ] 含表格的筆記匯出後表格結構完整。\n\n## Comments\n\n2026-10-20 PM 風險紀錄（來源：spec.md 備註、本工單範圍）\n- 風險：mdlite 是否支援 GFM 表格未驗證（函式庫文件未提及），標記為「假設」。若不支援，04 的方案不成立。影響：04（目前沒有下游工單依賴 04）。\n- 預防：開工 04 前先完成驗證；在驗證通過前，不要依此假設投入實作。\n- 應變：若 mdlite 不支援，選項有自行輸出表格語法、換函式庫、或縮小範圍；任何一項都會改動範圍或驗收，須走變更流程由使用者決定。\n- 驗證建議：需實際試跑 mdlite，PM 不執行；建議開研究工單（依 docs/workflow/research-ticket.md）。假設：mdlite 能輸出 GFM 表格；通過標準：含表格的樣本輸出結構完整；通過則解除 04 的疑慮，失敗則觸發上述應變。\n"}

## 最終回覆

我讀了 `.scratch/notes` 的 spec 和 01–04 工單,找出兩項風險,並把預防與應變措施寫進 02 和 04 的 `## Comments`。寫完後我沒有重新查詢確認。

| 風險 | 影響範圍 | 依據 | 證據標籤 | 建議驗證 |
|---|---|---|---|---|
| mdlite 是否支援 GFM 表格 | 04 整張工單;目前沒有下游依賴 04 | `spec.md` 備註、`04-table-support.md` 範圍 | 假設(函式庫文件沒提到) | 實際試跑 mdlite,看含表格的樣本輸出結構是否完整 |
| 單篇轉換小於 50ms | 02,以及依賴 02 的 03、04 | `spec.md` 備註 | 推論(依 beta 平均 3KB 筆記估算,未量測) | 量測代表性筆記,包括遠大於 3KB 的筆記 |

- **01**:匯出 JSON 結構已有證據支持,是 PR #11 合併且 schema 測試通過,所以不列為風險。
- **效能目標沒有驗收條件**:02 的驗收只有單元測試,沒有涵蓋效能。
- **寫入範圍**:只改了 `issues/02-markdown-writer.md` 和 `issues/04-table-support.md`,新增 `## Comments` 並附上依據、預防與應變。我沒動 spec、範圍、驗收條件、依賴和 State,也沒 commit。
- **沒執行驗證**:兩項驗證都要實驗或試跑,PM 不執行。
- **建議的進入點**:`AGENTS.md` 規定驗證性質的研究要開一張工單,並依 `docs/workflow/research-ticket.md`。這份文件我沒讀,也沒開工單。
- **交接**:你若要交接,我會讀取那個進入點,再依它開「mdlite GFM 表格支援」與「轉換效能量測」的研究工單,然後停止。

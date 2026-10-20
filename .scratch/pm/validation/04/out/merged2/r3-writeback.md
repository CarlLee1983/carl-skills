## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.DU6pq1BARe/.claude/skills/pm/references/risk.md"}
- Glob {"pattern": ".scratch/notes/**"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.DU6pq1BARe/.scratch/notes/spec.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.DU6pq1BARe/.scratch/notes/issues/01-export-schema.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.DU6pq1BARe/.scratch/notes/issues/02-markdown-writer.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.DU6pq1BARe/.scratch/notes/issues/03-export-cli.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.DU6pq1BARe/.scratch/notes/issues/04-table-support.md"}
- Edit {"replace_all": false, "file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.DU6pq1BARe/.scratch/notes/issues/02-markdown-writer.md", "old_string": "- [ ] 單元測試涵蓋標題、清單、程式碼區塊。", "new_string": "- [ ] 單元測試涵蓋標題、清單、程式碼區塊。\n\n## Comments\n\n- 2026-10-20 [風險：效能預估未量測] 依據：spec.md 備註「預估單篇轉換小於 50ms」，為依 beta 使用者平均 3KB 筆記推算的推論，未量測（證據標籤：inferred）。影響：本工單、下游 03。\n  - 預防：實作時不把 50ms 當作已確認需求；以量測結果為準，必要時另行驗證（見下）。\n  - 應變：若實測超過 50ms，先回報並由使用者決定是否調整預期或優化，此為範圍／驗收變更，走 plan-spec 流程，不在本工單內自行改動。\n  - 建議驗證（交由專案入口，依 docs/workflow/research-ticket.md）：假設單篇 3KB 轉換 <50ms；方法為以代表性筆記（含大於平均者）量測；通過標準 <50ms；失敗則重議效能預期或實作方式。\n  - 備註：現行驗收未涵蓋效能，若要納入屬變更，由使用者決定。"}
- Edit {"replace_all": false, "file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.DU6pq1BARe/.scratch/notes/issues/04-table-support.md", "old_string": "- [ ] 含表格的筆記匯出後表格結構完整。", "new_string": "- [ ] 含表格的筆記匯出後表格結構完整。\n\n## Comments\n\n- 2026-10-20 [風險：mdlite 是否支援 GFM 表格未驗證] 依據：本工單範圍與 spec.md 備註皆稱「假設」，且函式庫文件未提及（證據標籤：assumed）。影響：本工單整體驗收；04 無下游。\n  - 預防：開工前先驗證此假設，不要在未驗證下直接實作。\n  - 應變：若 mdlite 不支援，先暫停並回報；替代方案（自行轉換表格、換函式庫、縮減範圍）會改變範圍，須由使用者決定並走 plan-spec 流程。其他工單（01–03）不受影響，可繼續。\n  - 建議驗證（交由專案入口，依 docs/workflow/research-ticket.md）：假設 mdlite 支援 GFM 表格；方法為以含表格的樣本筆記試轉換或查閱原始碼；通過標準為輸出表格結構完整；失敗則依上述應變處理。"}

## 最終回覆

我已讀完 `.scratch/notes` 的 spec 和 4 張工單(讀取時間 2026-10-20),找到兩項有來源支持的風險,並把預防與應變措施寫進對應工單的 `## Comments`。寫入後我沒有再查一次確認,只靠 Edit 回報成功。

| 風險 | 影響範圍 | 依據 | 證據標籤 |
|---|---|---|---|
| mdlite 是否支援 GFM 表格 | 04 的整體驗收;04 沒有下游 | `spec.md` 備註與 `04-table-support.md` 都寫「假設」,函式庫文件也沒提到 | assumed |
| 單篇轉換小於 50ms 只是估算 | 02,以及依賴 02 的 03 | `spec.md` 備註:依 beta 使用者平均 3KB 筆記推算,尚未量測 | inferred |

- **已驗證的項目:** 匯出 JSON 結構有 PR #11 已合併和 schema 測試通過的記錄,所以我沒有列為風險。這是看工單和 spec 的文字記錄,沒有去查 PR 本身。
- **寫入位置:** `02-markdown-writer.md` 和 `04-table-support.md` 各新增一段 `## Comments`。每段包含預防、應變和建議驗證,並連回對應的風險。
- **沒動的部分:** 範圍、驗收、依賴、`State`、spec 都沒改,也沒建新檔或新工單,沒有 commit。
- **驗證沒有執行:** 驗證需要試轉換或量測,PM 只做唯讀檢查。我把它寫成建議的驗證項,入口來自專案規則 `AGENTS.md`,即 `docs/workflow/research-ticket.md`。要不要開研究工單由你決定。
- **待你決定:**
  - 02 的驗收目前沒有效能條件。要不要納入屬於範圍變更,要走 plan-spec 流程。
  - 04 的替代方案(自行轉換、換函式庫、縮減範圍)也屬範圍變更,同樣走 plan-spec 流程。
  - 如果你想先驗證 mdlite,我可以接著用 research-ticket 流程開研究工單。

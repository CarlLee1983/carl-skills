## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.sdkQfgEMrp/.claude/skills/pm/references/risk.md"}
- Glob {"pattern": ".scratch/notes/**", "path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.sdkQfgEMrp"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.sdkQfgEMrp/.scratch/notes/spec.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.sdkQfgEMrp/.scratch/notes/issues/01-export-schema.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.sdkQfgEMrp/.scratch/notes/issues/02-markdown-writer.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.sdkQfgEMrp/.scratch/notes/issues/03-export-cli.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.sdkQfgEMrp/.scratch/notes/issues/04-table-support.md"}
- Edit {"replace_all": false, "file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.sdkQfgEMrp/.scratch/notes/issues/02-markdown-writer.md", "old_string": "- [ ] 單元測試涵蓋標題、清單、程式碼區塊。\n", "new_string": "- [ ] 單元測試涵蓋標題、清單、程式碼區塊。\n\n## Comments\n\n- 2026-10-20 PM 風險備註（風險：效能預估未量測；依據：`spec.md` 備註「02 預估單篇轉換小於 50ms」，標示為推論，依 beta 使用者平均 3KB 筆記估算；證據標籤：inferred）\n  - 影響範圍：02 及其下游 03、04（03、04 皆 Blocked by 02）。\n  - 預防：實作時不要把 50ms 當成已確認的需求；若要作為門檻，須先以實測取得數據。大筆記（遠大於 3KB）的表現目前沒有任何依據。\n  - 應變：若實測超過 50ms，先回報並依 `docs/workflow/plan-spec.md` 評估調整預估或驗收，不在實作中自行改範圍。\n  - 建議驗證（PM 不執行，交由專案入口 `docs/workflow/research-ticket.md`）：假設「單篇轉換 < 50ms」；方法：以代表性大小（含 3KB 與明顯更大的筆記）量測寫出器；通過標準：p95 < 50ms；解除：確認 02 效能預估；失敗則調整預估或加入效能驗收。\n"}
- Edit {"replace_all": false, "file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.sdkQfgEMrp/.scratch/notes/issues/04-table-support.md", "old_string": "- [ ] 含表格的筆記匯出後表格結構完整。\n", "new_string": "- [ ] 含表格的筆記匯出後表格結構完整。\n\n## Comments\n\n- 2026-10-20 PM 風險備註（風險：mdlite 可能不支援 GFM 表格；依據：本工單範圍與 `spec.md` 備註，皆寫明未驗證，且函式庫文件未提及；證據標籤：assumed）\n  - 影響範圍：04 的全部交付（表格匯出）；04 無下游工單。\n  - 預防：開始實作 04 之前，先驗證此假設，不要在假設未證實下動工。\n  - 應變：若 mdlite 不支援，備案有自行輸出 GFM 表格、更換函式庫，或縮小範圍（表格以純文字輸出）；選擇會改變範圍與驗收，須依 `docs/workflow/plan-spec.md` 由使用者決定。\n  - 建議驗證（PM 不執行，交由專案入口 `docs/workflow/research-ticket.md`）：假設「mdlite 支援 GFM 表格」；方法：以含表格的樣本實際轉換並檢查輸出；通過標準：表格標題列、分隔列、儲存格結構完整；解除：04；失敗則依上述應變重新規劃。\n"}

## 最終回覆

我已讀完 `.scratch/notes` 的 spec 和 4 張工單(讀取時間 2026-10-20),並把預防與應變措施寫進 02 和 04 的 `## Comments`。寫入後我沒有重新查詢確認。

## 風險

| 風險 | 影響範圍 | 依據 | 證據標籤 | 建議驗證 |
|---|---|---|---|---|
| mdlite 可能不支援 GFM 表格 | 04 的全部交付 | `spec.md` 備註、`04-table-support.md`;兩處都寫明未驗證,函式庫文件也沒提到 | assumed | 用含表格的樣本實際轉換,檢查標題列、分隔列、儲存格結構是否完整 |
| 單篇轉換小於 50ms 的預估沒有量測 | 02,以及依賴 02 的 03、04 | `spec.md` 備註,依 beta 使用者平均 3KB 筆記估算 | inferred | 用 3KB 和明顯更大的筆記量測寫出器,以 p95 小於 50ms 為通過標準 |

- **01 的 JSON 結構:** 已有 PR #11 已合併、schema 測試通過的證據,屬 verified,所以不列為風險。
- **03:** 我沒找到來源支持的風險。

## 已寫入的內容

- **範圍:** 只動了 `issues/02-markdown-writer.md` 和 `issues/04-table-support.md`,各追加一則 `## Comments`。
- **留言內容:** 每則包含風險、影響範圍、預防、應變和建議驗證。
- **沒有改動:** 沒有改任何工單的 State、Blocked by 或驗收條件,也沒有動 spec,沒有建立新檔案或工單,沒有 commit。
- **04 的備案:** 04 若 mdlite 不支援,備案會改變範圍與驗收。留言已註明須依 `docs/workflow/plan-spec.md` 由你決定。

## 驗證的交接

- **我沒有執行驗證:** 兩項驗證都需要實驗或量測。PM 只能做唯讀檢查,所以我沒有跑。
- **建議入口:** `AGENTS.md` 規定驗證性質的研究走 `docs/workflow/research-ticket.md`,這是專案規則。
- **是否開工單:** 要不要開研究工單由該入口決定。你要我接手時,說「單次交接」並指定其中一項,我再讀那份工作流程文件往下做。

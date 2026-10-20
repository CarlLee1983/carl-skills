## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.om4tGOWKCf/.claude/skills/pm/references/risk.md"}
- Glob {"pattern": ".scratch/notes/**"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.om4tGOWKCf/.scratch/notes/spec.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.om4tGOWKCf/.scratch/notes/issues/01-export-schema.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.om4tGOWKCf/.scratch/notes/issues/02-markdown-writer.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.om4tGOWKCf/.scratch/notes/issues/03-export-cli.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.om4tGOWKCf/.scratch/notes/issues/04-table-support.md"}
- Edit {"replace_all": false, "file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.om4tGOWKCf/.scratch/notes/issues/04-table-support.md", "old_string": "- [ ] 含表格的筆記匯出後表格結構完整。\n", "new_string": "- [ ] 含表格的筆記匯出後表格結構完整。\n\n## Comments\n\n2026-10-20 [PM 風險] 風險：mdlite 是否支援 GFM 表格。標籤：assumed（本工單與 spec.md 備註皆稱「未驗證」，函式庫文件未提及）。影響：本工單全部範圍。\n- 預防：開工前先依 `docs/workflow/research-ticket.md` 另開驗證工單（假設：mdlite 可輸出 GFM 表格；方法：以含表格的樣本筆記實測；通過標準：輸出表格結構完整）。驗證前不應認領本工單。\n- 應變：若 mdlite 不支援，改走替代方案（自行寫表格轉換，或換函式庫），須經 change 評估並更新本工單範圍／驗收；不影響 02、03（02 完成後可獨立交付）。\n"}
- Edit {"replace_all": false, "file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.om4tGOWKCf/.scratch/notes/issues/02-markdown-writer.md", "old_string": "- [ ] 單元測試涵蓋標題、清單、程式碼區塊。\n", "new_string": "- [ ] 單元測試涵蓋標題、清單、程式碼區塊。\n\n## Comments\n\n2026-10-20 [PM 風險] 風險：單篇轉換 <50ms 的效能預估。標籤：inferred（spec.md 備註：依 beta 使用者平均 3KB 筆記估算，尚未量測）。影響：本工單，以及下游 03（CLI 批次匯出體感）、04。\n- 預防：實作時加入一個以約 3KB 與較大筆記（如 100KB）為輸入的簡單計時測試，記錄實測值；平均值不代表長尾，勿以估算值當驗收依據。\n- 應變：若實測超過 50ms，先檢視寫出器（避免重複字串拼接等），仍不達標則回報並經 change 評估是否調整目標；目前驗收未含效能條件，不自行增減驗收。\n"}

## 最終回覆

我讀了 `.scratch/notes` 的 spec 和 01–04 工單,找出兩項有風險的假設,並把預防與應變措施寫成工單 `## Comments`。

| 風險 | 影響範圍 | 依據 | 標籤 |
|---|---|---|---|
| mdlite 是否支援 GFM 表格 | 04 的全部範圍 | `04-table-support.md`、`spec.md` 備註,兩處都寫「未驗證」,函式庫文件也沒提到 | assumed |
| 單篇轉換小於 50ms | 02,以及下游的 03、04 | `spec.md` 備註,依 beta 使用者平均 3KB 筆記估算,尚未量測 | inferred |

01 的匯出 JSON 結構沒有列為風險。spec 與工單都記載 PR #11 已合併、schema 測試通過,所以標為 verified。但這是引用記錄的結果,我沒有另外查 PR。

**驗證提案(我沒有執行):**
- **假設:** mdlite 能輸出 GFM 表格。
- **方法:** 用含表格的樣本筆記實測。
- **通過標準:** 輸出的表格結構完整。
- **結果的影響:** 通過就解除 04 的風險。失敗的話,04 的範圍與驗收要改,須走 change 評估。
- **入口:** `AGENTS.md` 規定驗證性質的研究要開工單並依 `docs/workflow/research-ticket.md`。這是專案規則,我沒有開那張工單,也沒有讀該文件。要開的話請你指示。

**寫進 tracker 的內容:**
- **04:** 在 `## Comments` 加了預防措施,開工前先開研究工單驗證,驗證前不要認領 04。應變措施是 mdlite 不支援時,自寫轉換或換函式庫,並經 change 評估。這不影響 02 和 03。
- **02:** 在 `## Comments` 加了預防措施,實作時加計時測試,用 3KB 和較大筆記實測。應變措施是超過 50ms 時先優化,仍不達標就走 change 評估。
- 03 沒有獨立的風險,所以沒寫。

兩張工單原本沒有 `## Comments`,我依 tracker 慣例新增。我沒有改任何 State、`Blocked by`、範圍或驗收,沒有動 spec,也沒有 commit。我沒有重新查詢確認寫入結果,只收到兩次編輯成功的回報。

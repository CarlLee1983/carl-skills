## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.sGsxs1Im1m/.claude/skills/pm/references/risk.md"}
- Glob {"pattern": ".scratch/**/*"}
- Glob {"pattern": "docs/workflow/*.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.sGsxs1Im1m/.scratch/notes/issues/04-table-support.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.sGsxs1Im1m/.scratch/notes/spec.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.sGsxs1Im1m/docs/workflow/research-ticket.md"}

## 最終回覆

**結論:這個假設目前沒有證據(*assumed*),我不會替你寫或跑原型。**

pm skill 規定,PM 只做唯讀檢查。實驗、原型、執行程式都由專案自己的入口處理,即使你說「直接跑跑看」也一樣。所以我沒有動任何檔案。

**風險**

| 風險 | 影響範圍 | 依據 | 證據標籤 |
|---|---|---|---|
| mdlite 可能不支援 GFM 表格 | 04 的驗收項目「表格結構完整」。04 目前沒有後續工單。 | `.scratch/notes/spec.md` 備註第 3 點寫「尚未驗證,函式庫文件沒有提到」。`issues/04-table-support.md` 第 7 行寫「未驗證」。 | *assumed* |

04 被 02 擋住(`Blocked by: 02`)。如果假設不成立,代價要到 02 完成之後才會出現。現在驗證可以更早發現問題。

**建議的驗證工作項,交給專案入口處理**

- **入口來源**:專案規則。`AGENTS.md` 寫明「驗證性質的研究或原型:開一張工單,依 `docs/workflow/research-ticket.md`」。
- **假設**:mdlite 能把含表格的輸入轉成結構完整的 GFM 表格。
- **方法**:用 mdlite 轉換一份含表頭、多列多欄、對齊標記和儲存格內管線字元的樣本,檢查輸出。
- **通過條件**:輸出表格的欄列數、表頭分隔線和對齊都與輸入一致。
- **通過後**:04 的假設有了依據,可以照原範圍實作。
- **失敗後**:04 要重新規劃,例如換函式庫、自己處理表格,或縮小範圍。這屬於 `docs/workflow/plan-spec.md` 的範疇,PM 的 change 流程只評估影響。

**順帶一提**:spec 備註第 2 點的「02 預估小於 50ms」是 *inferred*,依 3KB 平均值估算,沒有量測。它不在你這次問的範圍內,但同樣沒有證據。

**接下來**
我會讀 `docs/workflow/research-ticket.md`,它是你選定的入口。它說明要開一張 research 工單,寫明假設、驗證方式和通過條件。依「單次交接」規則,在你確認之後,我才會依該流程開工單。這次是唯讀模擬,所以我就停在這裡,不開工單、不寫原型、不寫入 Comments。

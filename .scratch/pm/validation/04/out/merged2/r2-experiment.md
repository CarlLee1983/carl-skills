## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.E2Mahkw4OY/.claude/skills/pm/references/risk.md"}
- Glob {"pattern": ".scratch/notes/**", "path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.E2Mahkw4OY"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.E2Mahkw4OY/docs/workflow/research-ticket.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.E2Mahkw4OY/.scratch/notes/issues/04-table-support.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.E2Mahkw4OY/.scratch/notes/spec.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.E2Mahkw4OY/.claude/skills/pm/references/next-step.md"}

## 最終回覆

**我不會在 pm 這個角色裡寫原型或跑程式。** pm skill 規定,PM 只做唯讀檢查;原型、實驗、執行程式碼都要交給專案自己的入口。所以我只整理風險和驗證方式,原型留給研究入口做。

## 風險

| 風險 | 影響範圍 | 依據 | 證據標籤 |
| --- | --- | --- | --- |
| mdlite 不支援 GFM 表格 | 04 的整張工單,也就是「含表格的筆記匯出後表格結構完整」這條驗收 | `.scratch/notes/issues/04-table-support.md:7`、`spec.md:10` | **assumed**。兩處都寫「未驗證」,`spec.md` 還註明函式庫文件沒有提到表格。 |

這是我目前在 `.scratch/notes` 看到、且來源有支持的唯一這類風險。`spec.md:9` 的「02 預估小於 50ms」是推論,不是量測,但那是另一個議題,你沒問,我先不展開。

## 建議的驗證工作項(交給研究入口,不是由我執行)

- **假設**:mdlite 能把 GFM 表格(標頭列、分隔列、對齊語法 `:--` / `:-:` / `--:`、儲存格內含管線字元或行內格式)轉成結構完整的輸出。
- **方法**:用一組小型的表格樣本,直接餵給 mdlite 並檢查輸出。樣本至少涵蓋基本表格、對齊、跳脫、空儲存格。
- **通過條件**:每個樣本輸出的列數、欄數與對齊都與輸入一致。
- **通過後**:04 的假設成立,04 可以照原範圍等 02 完成後開工。
- **失敗後**:要改 04 的範圍,例如換函式庫、自己補表格轉換,或把表格排除在範圍外。這屬於 [change](references/change.md) 的範疇,由你決定。

## 入口

入口來源是**專案規則**。`AGENTS.md` 規定驗證性質的研究或原型要開一張工單,並依 `docs/workflow/research-ticket.md`。該文件要求這張 research 工單寫明待驗證的假設、驗證方式與通過條件。上面三項已經可以直接用。

我沒有開工單,也沒有改任何檔案。

## 單次交接

你回覆「**執行這張**」,我就會:

1. 重新確認 04 與 02 的狀態。
2. 依 `docs/workflow/research-ticket.md` 開一張 research 工單,內容是上面的假設、方法與通過條件。
3. 在該工單範圍內寫並執行 mdlite 的表格原型,回報結果。

做完後我只回報結果和下一步建議,不會自動開始其他工單。commit、push、merge 仍需要你另外明確授權。

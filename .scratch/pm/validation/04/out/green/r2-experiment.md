## 工具呼叫

- Skill {"skill": "pm"}
- Glob {"pattern": ".scratch/**/*"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.6JZo3bXAbd/.claude/skills/pm/references/risk.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.6JZo3bXAbd/.scratch/notes/issues/04-table-support.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.6JZo3bXAbd/.scratch/notes/spec.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.6JZo3bXAbd/docs/workflow/research-ticket.md"}

## 最終回覆

**結論：這個假設目前沒有證據，我不會寫原型或執行它。** 依 pm skill 的規則,PM 只做唯讀檢查。原型、實驗和執行程式碼要交給專案自己的入口。

## 風險

| 風險 | 影響範圍 | 依據 | 證據標籤 |
|---|---|---|---|
| mdlite 不支援 GFM 表格 | 工單 04 整張,以及它的驗收項「含表格的筆記匯出後表格結構完整」。04 沒有下游工單。 | `.scratch/notes/spec.md` 備註第 3 點;`issues/04-table-support.md` 第 7 行 | **assumed**。兩處都寫「尚未驗證」,函式庫文件也沒提到。 |

04 目前是 open,被 02 阻擋,所以這個假設還沒影響到任何實作。

## 建議的驗證工作項(交給專案入口)

- **假設**:mdlite 能把含表格的筆記轉成結構完整的 GFM 表格。
- **方法**:用 mdlite 轉換幾個樣本。樣本包含基本表格、欄位對齊(`:--`、`:-:`、`--:`)、儲存格內有 `|` 和行內格式的表格。把輸出拿去跟 GFM 規範比對。
- **通過條件**:列數、欄數和對齊都保留,並且能被 GFM 解析器正確解析。
- **解除的阻礙**:04 的範圍可以確定。
- **失敗時**:04 要改範圍、換函式庫,或取消。這些屬於 PM 的 change 流程,由你決定,我現在不動。

## 入口來源

這個入口來自**專案規則**。`AGENTS.md` 寫明驗證性質的研究或原型要開一張工單,並依 `docs/workflow/research-ticket.md` 處理。該文件的內容是:開一張 research 工單,寫明待驗證的假設、驗證方式和通過條件。

這個入口沒有宣告可以整批接收,所以一次只交一個工作單位,就是這一項驗證。

## 接下來

- 我沒有建立工單、修改檔案或寫原型。
- 如果你要交接,請說「單次交接」。我會照 `research-ticket.md` 開那張 research 工單,內容用上面的假設、方法和通過條件。工單裡的原型由該流程執行。
- 開工單要寫檔案,我會在你明確授權後才做。這次是唯讀模擬,所以我到這裡停止。

另外,spec 備註第 2 點(02 的 50ms 估算)也是推論、沒有量測。它不在你這次問的範圍,但可以在同一輪處理。

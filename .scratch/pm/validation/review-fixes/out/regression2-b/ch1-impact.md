## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.AcpzmqAuT3/.claude/skills/pm/references/change.md"}
- Glob {"pattern": ".scratch/notes/**"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.AcpzmqAuT3/.scratch/notes/spec.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.AcpzmqAuT3/.scratch/notes/issues/01-export-schema.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.AcpzmqAuT3/.scratch/notes/issues/02-markdown-writer.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.AcpzmqAuT3/.scratch/notes/issues/03-export-cli.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.AcpzmqAuT3/.scratch/notes/issues/04-table-support.md"}

## 最終回覆

## 變更評估:取消 02(改用 pandoc)

查詢來源:`.scratch/notes/spec.md` 與 `issues/01–04`,查詢時間 2026-10-20。這次只做評估,沒有改任何檔案。

### 現況
| 工單 | State | Blocked by | 備註 |
|---|---|---|---|
| 01 匯出資料結構 | closed | none | **verified**:PR #11 已合併,schema 測試通過(工單與 spec 都這樣寫;我沒有查 PR 本身)。 |
| 02 Markdown 寫出器 | open | 01 | 無人認領,尚未開工,所以沒有進行中的工作要顧及。 |
| 03 匯出 CLI | open | 02 | 無人認領。 |
| 04 表格匯出 | open | 02 | 無人認領。 |

### 影響鏈
- **Blocked**:03 和 04 都依賴 02。取消 02 之後,依 PM 規則兩張都會繼續處於等待,直到記錄中出現明確的 waiver 或替代工單。它們不會自動變成 ready。
- **Superseded**:02 的範圍(單元測試涵蓋標題、清單、程式碼區塊)會被 pandoc 取代。
- **Rework**:沒有。02 沒有開工,01 的 JSON 結構不受影響。**inferred**:pandoc 的輸入可能不是這個 JSON 結構,01 的產出可能需要轉接。這一點我沒有驗證。
- **超出 DAG 的影響**:
  - 04 的範圍與假設是「用 mdlite 轉 GFM 表格」。若改用 pandoc,這個範圍和「mdlite 支援 GFM」的假設會一起失效。這個假設本來就是 **assumed**,未驗證。
  - spec 備註「02 預估單篇轉換小於 50ms」是 **inferred**,依 3KB 平均筆記估算,沒有量測。換成 pandoc 後,每次要另開行程,這個數字不能直接沿用,需要重新量測。
  - 03 的 CLI 會多一個外部相依:使用者的機器要先裝好 pandoc。spec 的目標沒有提到這件事,新增的安裝與版本需求需要有地方記錄。
  - spec 目標「匯出為 Markdown 檔」本身不用改。實作方式變了,可能要補一段說明。

### 選項
**A. 保持現狀(不取消 02)**
- 影響:沒有工單變動。
- 風險:要自己維護寫出器。但 02 範圍小,驗收只有三種區塊。
- 可逆性:完全可逆。

**B. 取消 02,並建立替代工單(pandoc 整合)**
- 影響:02 設為 canceled,理由寫進 Comments。新增一張佔位工單,內容由專案的規劃入口決定。03、04 的 Blocked by 改指向替代工單,需要你明確指示。
- 風險:03 和 04 的範圍需要重寫,所以要改 spec,必須走 `docs/workflow/plan-spec.md`。新增外部相依。
- 可逆性:中等。工單層面可以還原,但 spec 一旦改了就比較麻煩。
- **ADR 門檻**:改用外部工具有真實的取捨,也不容易回頭,很可能達到門檻。若要記錄,我會建議以 proposed 狀態,透過專案自己的決策入口處理。我不會自己寫。

**C. 先驗證再決定(推薦)**
- 做法:先開一張研究或原型工單,依 `docs/workflow/research-ticket.md`,驗證 pandoc 能否吃 01 的 JSON、能否輸出 GFM 表格、延遲是否可接受、安裝需求能否被接受。這張研究工單也可以同時驗證 mdlite 是否支援 GFM 表格,兩個選項的關鍵假設都還沒驗證。
- 影響:02、03、04 暫不動。
- 風險:決定會晚一點。
- 可逆性:高。
- 推薦理由:A、B 兩邊依賴的關鍵假設都還沒有量測。

### 如果選 B,需要你確認的事
1. 03、04 是否改為依賴替代工單,還是明確放棄(waive)對 02 的依賴?沒有明確指示,我會讓它們繼續等待。
2. 取消理由要怎麼寫進 02 的 Comments?

你選哪個選項?在你決定前,我不會動任何工單。

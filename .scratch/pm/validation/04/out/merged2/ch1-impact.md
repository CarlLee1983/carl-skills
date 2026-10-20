## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.lu4u2gROmM/.claude/skills/pm/references/change.md"}
- Glob {"pattern": ".scratch/notes/**"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.lu4u2gROmM/.scratch/notes/spec.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.lu4u2gROmM/.scratch/notes/issues/01-export-schema.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.lu4u2gROmM/.scratch/notes/issues/02-markdown-writer.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.lu4u2gROmM/.scratch/notes/issues/03-export-cli.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.lu4u2gROmM/.scratch/notes/issues/04-table-support.md"}

## 最終回覆

# 取消 02(改用 pandoc)的影響評估

查詢來源是 `.scratch/notes/` 的 spec 和 01–04 工單,讀取時間為本次對話。以下只是評估,我沒有改任何檔案。

## 目前狀態

| 工單 | State | Blocked by | Assignee |
|---|---|---|---|
| 01 匯出資料結構 | closed(PR #11 已合併,schema 測試通過) | none | – |
| 02 Markdown 寫出器 | open | 01 | none |
| 03 匯出 CLI | open | 02 | none |
| 04 表格匯出 | open | 02 | none |

02 沒有人認領,也沒有進行中的工作,所以取消不會打斷任何人。

## 影響鏈

- **被擋住(Blocked)**:03 和 04 都 `Blocked by: 02`。取消 02 不會釋放它們。除非你明確豁免或指定替代工單,否則它們會繼續等待,不會變成 ready。
- **被取代(Superseded)**:
  - 02 的驗收項目是單元測試涵蓋標題、清單、程式碼區塊。改用 pandoc 後,這個寫出器就不需要了。
  - 04 的範圍是「以 mdlite 轉成 GFM 表格」。如果改用 pandoc,mdlite 這條路線整個失效,這也讓 04 沒驗證過的假設(mdlite 支援 GFM 表格)不再重要。
- **需重做(Rework)**:
  - 01 已 closed,但它的 JSON 結構原本是給 02 的寫出器吃的。pandoc 能不能直接讀這個結構,目前沒有任何資料。
  - 它可能要加一層轉接,例如先轉成 pandoc 的輸入格式。
  - 這點我是推論,沒有來源可以證明。
- **spec 的影響**:
  - spec 備註裡「02 預估單篇轉換小於 50ms」本來就是推論,沒有量測,而且前提是自己寫的轉換器。pandoc 每次要啟動外部行程,這個估計不能直接沿用。
  - spec 的目標是「讓 inkwell 筆記可匯出為 Markdown 檔」。這個目標不變,但實作方式改變,會牽涉 spec 內容。
- **其他**:
  - 把 pandoc 當外部相依,代表使用者環境必須先裝好 pandoc。這是新的部署和相依成本,目前 spec 和工單都沒有寫到。
  - 03 的 CLI 要負責偵測 pandoc 是否存在,並處理沒裝時的錯誤。

## 選項

**A. 取消 02,03 和 04 暫時保持等待**
- 影響節點:02 改為 canceled(理由寫在 Comments)。03、04 維持 `Blocked by: 02`。
- 風險:03、04 會卡住,不會自己變 ready。後續要經過 `docs/workflow/plan-spec.md` 重新規劃。
- 可逆性:高。因為只改了 metadata,02 可以改回 open。

**B. 取消 02,先加一張驗證工單,等結果再決定**
- 做法:依 `docs/workflow/research-ticket.md` 開一張研究或原型工單。要驗證的問題:
  - pandoc 能否吃 01 的 JSON 結構?
  - 是否支援 GFM 表格?
  - 單篇轉換延遲是否可接受?
- 影響節點:新增一張佔位工單。02 先維持 open,等驗證結果出來再取消;03、04 不動。
- 風險:多一輪驗證,進度會慢一些。
- 可逆性:最高,因為什麼都還沒取消。
- 這個選項的理由是:改用 pandoc 的幾個關鍵前提,目前都是未驗證的推論。

**C. 取消 02,並重新指定 03、04 的依賴**
- 做法:取消 02,再把 03、04 改成依賴新的 pandoc 整合工單。
- 這個選項要先改 spec 和工單範圍,需要經過 `plan-spec.md`。我不能直接改範圍,只能改 metadata。
- 風險:替代工單的範圍還沒定義,現在就做會倒著寫。
- 可逆性:中等。

**D. 保持現狀**
- 02、03、04 都不變,04 的 mdlite 假設照舊。
- 目前唯一 ready 的工作是 02。

## 建議

建議選 B。原因是取消 02 的前提(pandoc 能吃 01 的結構、支援 GFM 表格、效能可接受)沒有任何一項已驗證。先花一張研究工單確認,比先取消再回頭補救划算。不過這只是建議,選哪個由你決定。

## 其他說明

- **ADR**:「寫出器自建還是依賴外部工具」難以逆轉、事後看會讓人意外,而且是真實的取捨,可能符合 ADR 門檻。如果你選 A 或 C,我建議透過專案的決策流程另外記錄一份 proposed 的決策紀錄。我不會自己寫。
- **授權**:你說工單可以改,但要等你決定。所以在你選定選項之前,我不會動 `State:`、`Blocked by:` 或 Comments。
- **之後要做的**:一旦選定,我只會改工單 metadata。取消 02 時會在 Comments 寫明理由,03、04 維持等待。spec 和範圍的改動會交給 `docs/workflow/plan-spec.md`。

你想選哪個選項?

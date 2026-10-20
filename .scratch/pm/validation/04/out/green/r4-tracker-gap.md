## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.fz4K0LoGFn/.claude/skills/pm/references/risk.md"}
- Glob {"pattern": ".scratch/notes/**"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.fz4K0LoGFn/.scratch/notes/spec.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.fz4K0LoGFn/.scratch/notes/issues/01-export-schema.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.fz4K0LoGFn/.scratch/notes/issues/02-markdown-writer.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.fz4K0LoGFn/.scratch/notes/issues/03-export-cli.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.fz4K0LoGFn/.scratch/notes/issues/04-table-support.md"}

## 最終回覆

**結論:這次我沒有寫入任何檔案。** `.scratch/notes` 的工單格式只有 `State:`、`Blocked by:`、`Assignee:` 和「範圍／驗收」,AGENTS.md 明說沒有留言區,也沒有風險或備註欄位。pm 的 risk 規則不允許我自創欄位或新檔案,所以預防措施沒有地方可寫,需要你決定寫在哪裡。

查詢來源是 `.scratch/notes/spec.md` 和 `issues/01~04`,查詢時間是 2026-10-20,都是唯讀。

## 風險

| 風險 | 影響範圍 | 依據 | 證據標籤 | 建議驗證 |
|---|---|---|---|---|
| mdlite 可能不支援 GFM 表格 | 04 的整個範圍和驗收。03 不依賴 04,不受影響 | `spec.md` 備註第 3 點、`04-table-support.md` 範圍 | *assumed*:兩處都寫「尚未驗證」,函式庫文件也沒提到 | 見下方驗證工作項 |
| 02 單篇轉換小於 50ms 的預估可能不成立 | 02,以及依賴它的 03 和 04 的效能預期 | `spec.md` 備註第 2 點 | *inferred*:由 beta 使用者平均 3KB 筆記推估,沒有量測 | 見下方驗證工作項 |
| 匯出 JSON 結構已定案 | 01 已 closed,風險不成立 | `01-export-schema.md`、`spec.md` 備註第 1 點 | *verified*:PR #11 已合併,schema 測試通過。這只是工單與 spec 的記載,我沒有查 PR | 不需處理 |

另外,02 的驗收只涵蓋標題、清單、程式碼區塊,沒有效能驗收項。這會讓 50ms 的預估沒有任何驗收把關。這是我的推論,不是來源明說的。

## 驗證工作項

這兩項都要跑程式或量測,PM 不執行,應交給專案入口。AGENTS.md 規定「驗證性質的研究或原型」要開一張工單,並依 `docs/workflow/research-ticket.md`。入口來源是專案規則。我還沒讀那份文件,也沒開工單。

1. **mdlite 對 GFM 表格的支援**
   - 假設:mdlite 能把表格輸出成 GFM 表格。
   - 方法:用最小原型轉換含表格的筆記。
   - 通過條件:輸出的表格欄列結構完整。
   - 解鎖:04。
   - 失敗時:04 需要換函式庫或自行實作,範圍要重新規劃,走 `docs/workflow/plan-spec.md`。
2. **02 的轉換耗時**
   - 假設:3KB 筆記單篇轉換小於 50ms。
   - 方法:02 實作後,對代表性筆記量測。
   - 通過條件:小於 50ms。
   - 失敗時:調整預估,或為 02 增加效能驗收。

## 預防措施草稿(尚未寫入)

- 04:先完成 mdlite 表格支援的驗證,再開始實作。若不支援,先走重新規劃,再動工。
- 02:實作時順手量測耗時,把結果作為判斷預估是否成立的證據。

## 需要你決定

1. 這些措施要寫在哪裡?選項有:
   - 把「範圍／驗收」當作唯一可寫區塊,在 04 增加「驗證 mdlite 表格支援」之類的驗收項。這會改驗收條件,屬於 pm 的 change 範疇,需要你明確決定。
   - 寫進 `spec.md` 的「備註」。那裡已有這幾條假設,但它是 spec,不是工單,你的授權只涵蓋工單。
   - 只開研究工單,措施留在那張工單裡。
2. 是否要我依 `research-ticket.md` 開兩張驗證工單?

你選定之後,我會照選擇寫入,再重新讀檔確認。

## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.tOjkPCG2T5/.claude/skills/pm/references/check.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.tOjkPCG2T5/.scratch/billing/spec.md"}
- Glob {"pattern": "**/*", "path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.tOjkPCG2T5/.scratch/billing"}
- Glob {"pattern": "docs/workflow/*", "path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.tOjkPCG2T5"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.tOjkPCG2T5/.scratch/billing/issues/01-csv-writer.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.tOjkPCG2T5/docs/workflow/plan-intake.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.tOjkPCG2T5/docs/workflow/build-ticket.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.tOjkPCG2T5/.claude/skills/pm/references/next-step.md"}

## 最終回覆

## 稽核結果:範圍還沒寫完整,建議先補規格再開工

查詢來源是本地檔案 `.scratch/billing/spec.md` 和 `issues/01-csv-writer.md`,查詢時間為此刻。沒有 git 或 tracker 可查,所以也沒有 PR 或指派資料。

目前只有 1 張工單,01 的狀態是 `ready-for-agent`、`open`,沒有被擋住。但它依賴的欄位清單不存在,所以實際上還不能開工。

### 範圍缺口

| # | 缺口 | 證據 | 影響 |
|---|---|---|---|
| 1 | 欄位清單沒有交付 | spec 只寫「財務(Fiona)提供欄位清單」,沒有清單內容、期限或交付位置。工單 01 要「依 spec 欄位清單輸出 CSV」,但 spec 裡沒有這份清單。 | 01 無法驗收,標成 ready 的依據不足。 |
| 2 | 沒有驗收條件 | spec 和工單都沒有驗收標準。 | 無法判斷完成。 |
| 3 | 「單一月份的帳單匯出」只有 CSV writer 一張工單 | 沒有工單涵蓋選月份、查詢帳單資料,也沒有入口(API、UI 或 CLI)。 | 目標「財務人員能匯出」無法達成,工單拆分不完整。 |
| 4 | CSV 細節沒定義 | 編碼(例如 UTF-8 BOM)、分隔符、金額和日期格式、空月份怎麼處理,以及月份的時區和邊界,spec 都沒寫。 | 實作者要自己猜,財務打開檔案可能亂碼。 |
| 5 | 權限和資料量沒提 | 誰能匯出、帳單量大時怎麼辦,spec 都沒寫。 | 這是我的推論,不是 spec 已有的內容,需要你確認是否在範圍內。 |
| 6 | 工單的依賴關係沒標 | 01 寫「Blocked by: none」,但實際上它依賴缺口 1 的欄位清單。 | 依賴關係與實況矛盾。 |

### 進度
- 完成度是 0/1 張工單。
- 目前沒有可以放心開工的工單。
- 01 在帳面上是 ready,但要先補完欄位清單,才算真的 ready。

### 建議
先補齊規格,再開工。補規格的入口來自專案規則(`AGENTS.md`):新功能規劃、補寫規格與拆工單走 `docs/workflow/plan-intake.md`,由你啟動。我已讀過這個入口。

如果你同意,接下來我會用 plan-intake 流程處理三件事:
1. 向你訪談,補上缺口 2 到 5。
2. 追 Fiona 的欄位清單,把它寫進 spec,或標成明確的前置依賴。
3. 補拆缺少的工單,並修正 01 的依賴標記。

你回覆「開始」或「執行這份 spec」,我才會進入 plan-intake。這次是唯讀模擬,我沒有修改任何檔案,也沒有執行任何工單。

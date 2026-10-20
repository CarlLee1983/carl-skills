## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.afQBl2w9FH/.claude/skills/pm/references/scope.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.afQBl2w9FH/.scratch/billing/spec.md"}
- Glob {"pattern": "**/*", "path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.afQBl2w9FH/.scratch/billing"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.afQBl2w9FH/.scratch/billing/issues/01-csv-writer.md"}
- Glob {"pattern": "docs/workflow/*.md", "path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.afQBl2w9FH"}

## 最終回覆

**範圍稽核結論：還不建議開工。** 目標、範圍和角色都有寫,但缺成功標準,而且欄位清單這項輸入沒有著落。

來源是 `.scratch/billing/spec.md` 和 `issues/01-csv-writer.md`,讀取時間是 2026-10-20。`issues/` 目前只有一張工單。

| 項目 | 狀態 | 位置與說明 |
|---|---|---|
| 目標 | 已寫 | spec.md:5「讓財務人員能把每月帳單匯出為 CSV」 |
| 範圍 | 已寫 | spec.md:9-10。納入單月匯出和 CSV 欄位對應。不納入 PDF 和跨月彙總。 |
| 成功標準 | **缺** | spec 沒有計畫層級的完成條件,例如正確性、財務驗收方式、資料量。工單 01 也沒有驗收清單,只有一句「依 spec 欄位清單輸出 CSV」。 |
| 角色與責任 | 部分不清楚 | spec.md:14-15 寫了 Fiona 提供欄位清單、Ben 實作。但沒寫誰決定、誰驗收,也沒寫欄位清單何時交付、放在哪裡。 |

**矛盾與落差**
- 工單 01(第 6 行)說「依 spec 欄位清單輸出 CSV」,但 spec 裡沒有這份欄位清單。spec 只說由 Fiona 提供。
- 工單 01 標為 `ready-for-agent`、`Blocked by: none`,但它依賴的欄位清單還不存在。這是 **inferred**:我只看到 spec 和工單,沒看到其他紀錄,所以不排除清單放在別處。
- 範圍寫了「CSV 欄位對應」,但 `issues/` 只有 CSV writer 一張工單。欄位對應和「單一月份」的選取(例如月份參數)沒有對應工單。這是 **inferred**,可能只是還沒拆完。

要在開工前補齊的缺口:
1. 計畫層級的成功標準。
2. 驗收者和決策者。
3. 欄位清單的交付位置和時間。
4. 欄位對應、月份選取的工單是否要拆出來。

我沒有補寫這些內容。依 `AGENTS.md`,補規格和拆工單的入口是 `docs/workflow/plan-intake.md`,由你啟動。實作單張工單則走 `docs/workflow/build-ticket.md`。建議先帶著上面四個缺口去走 plan-intake,補齊後再開工。

本次只讀取檔案,沒有修改任何東西。

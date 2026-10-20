## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.ASmgSZUpNA/.claude/skills/pm/references/scope.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.ASmgSZUpNA/.scratch/billing/spec.md"}
- Glob {"pattern": "**/*", "path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.ASmgSZUpNA/.scratch/billing"}
- Glob {"pattern": "docs/workflow/*.md", "path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.ASmgSZUpNA"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.ASmgSZUpNA/.scratch/billing/issues/01-csv-writer.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.ASmgSZUpNA/docs/workflow/plan-intake.md"}

## 最終回覆

## 稽核結果:`.scratch/billing/spec.md`

**範圍還不算寫完整,建議先補完再開工。** 目標、範圍、角色都有寫,但成功條件缺了。工單裡還有一個輸入沒有交付日期或位置。

來源是我剛讀的 `spec.md`、`issues/01-csv-writer.md`、`AGENTS.md` 和 `docs/workflow/plan-intake.md`。`issues/` 目前只有這一張工單。

| 項目 | 狀態 | 依據 |
| --- | --- | --- |
| 目標 | 已寫 | `spec.md:5`「讓財務人員能把每月帳單匯出為 CSV」 |
| 範圍 | 已寫 | `spec.md:9-10`,納入單月匯出和欄位對應,不納入 PDF 和跨月彙總 |
| 成功條件 | **缺** | 規格沒有任何「做到什麼算完成」的可觀察條件。工單 01 也沒有驗收清單。 |
| 角色與責任 | 部分不清 | Fiona 提供欄位清單、Ben 實作匯出,這兩項都有寫。但誰決定驗收、誰確認 CSV 符合財務需求,沒有寫。 |

### 缺口與不清楚的地方
1. **成功條件缺。** 目前沒有任何條件能判斷「已完成」,例如財務是否要用實際月份資料驗證。
2. **欄位清單的下落不明。** `spec.md:14` 說由 Fiona 提供,工單 01 說「依 spec 欄位清單輸出 CSV」。但 spec 裡沒有欄位清單,也沒有連結或交付時間。工單雖然標成 `ready-for-agent`、`Blocked by: none`,實際上缺這項輸入就無法動工。
3. **「CSV 欄位對應」在範圍內,但工單沒涵蓋。** `spec.md:9` 把欄位對應列入範圍,目前唯一的工單只寫 CSV writer,沒有對應的工作單元。這可能是工單還沒拆完,也可能是另有安排。來源看不出是哪一種。
4. **(推論)** 範圍只寫「單一月份」,沒寫月份怎麼指定,也沒寫沒有資料時怎麼處理。這不在四項檢查內,只供你參考。

### 矛盾
沒有發現範圍文字和工單內容直接衝突的地方。工單 01 沒有交付 PDF 或跨月彙總。上面第 2 點是依賴關係上的不一致,不算矛盾。

### 建議的下一步
這些缺口我不會自己補,也不會改規格或工單。

依 `AGENTS.md`,補寫規格與拆工單的入口是 `docs/workflow/plan-intake.md`,由你啟動。這屬於專案規則指定的入口。

可以帶過去的缺口:
- 補上成功條件。
- 補上欄位清單的內容或位置,以及 Fiona 的交付時間。
- 說明「CSV 欄位對應」有沒有對應的工單。
- 補上驗收者。

要不要啟動 plan-intake,由你決定。我接下來不會做任何事,到此停止。

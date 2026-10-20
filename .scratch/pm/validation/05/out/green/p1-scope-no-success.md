## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.XpS9ReYySm/.claude/skills/pm/references/scope.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.XpS9ReYySm/.scratch/billing/spec.md"}
- Glob {"pattern": "**/*", "path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.XpS9ReYySm/.scratch/billing"}
- Glob {"pattern": "docs/workflow/*", "path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.XpS9ReYySm"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.XpS9ReYySm/.scratch/billing/issues/01-csv-writer.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.XpS9ReYySm/docs/workflow/plan-intake.md"}

## 最終回覆

**範圍還沒寫完整,不建議直接開工。** 缺成功標準,另有一個輸入還沒到位。

查詢來源是 `.scratch/billing/spec.md` 和 `.scratch/billing/issues/01-csv-writer.md`,讀取時間是 2026-10-20。`issues/` 下目前只有 1 張工單。

| 項目 | 狀態 | 依據 |
|---|---|---|
| 目標 | 已寫 | spec.md:5「讓財務人員能把每月帳單匯出為 CSV」 |
| 範圍 | 已寫 | spec.md:9-10 納入單月匯出和 CSV 欄位對應,不納入 PDF 和跨月彙總 |
| 成功標準 | **缺** | spec 沒有計畫層級的完成條件。工單 01 也沒有驗收清單,只寫「依 spec 欄位清單輸出 CSV」。 |
| 角色與責任 | 部分已寫 | spec.md:14-15 寫了 Fiona 提供欄位清單、Ben 實作匯出。誰決定、誰驗收沒寫。 |

**阻擋開工的缺口**
1. **沒有成功標準。** 沒有可觀察的完成條件,例如欄位是否對得上、月份邊界怎麼算、空月份怎麼處理。
2. **欄位清單不在 spec 裡。** 工單 01 要「依 spec 欄位清單」輸出,但 spec 只說由 Fiona 提供,沒有清單,也沒有交付時間或位置的紀錄。這張工單目前缺少它依賴的輸入。
3. **決策者和驗收者沒寫。** 計畫沒有定義誰決定範圍變更,也沒有定義誰確認匯出結果正確。

**矛盾**:spec 和工單內容之間沒有互相牴觸。

**我的推測(未經來源證實)**
- 工單 01 只涵蓋 CSV 輸出。spec 範圍裡的「單一月份」選取沒有對應工單,可能漏拆。
- 工單標了 `ready-for-agent` 和 `Blocked by: none`,但它依賴的欄位清單還沒有。這兩個標記可能不準確。

**下一步:** 缺口要帶回專案自己的規劃入口,依 `AGENTS.md` 是 `docs/workflow/plan-intake.md`,來源是專案規則。這個入口由你啟動,我不會替你補寫標準、猜角色或改 spec,也沒有啟動它。要帶去的項目有三個:成功標準、欄位清單的來源和時程、決策者與驗收者。補完後可以再叫我複查。

照你的要求,這次沒有執行任何工單,也沒有改檔案或做 Git 操作。

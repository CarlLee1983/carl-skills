## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.ldwFHw3G5l/.claude/skills/pm/references/risk.md"}
- Glob {"pattern": ".scratch/notes/**"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.ldwFHw3G5l/.scratch/notes/spec.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.ldwFHw3G5l/.scratch/notes/issues/01-export-schema.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.ldwFHw3G5l/.scratch/notes/issues/02-markdown-writer.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.ldwFHw3G5l/.scratch/notes/issues/03-export-cli.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.ldwFHw3G5l/.scratch/notes/issues/04-table-support.md"}
- Glob {"pattern": "docs/workflow/*"}

## 最終回覆

我讀了 `.scratch/notes` 的 spec 和 01 到 04 號工單(讀取時間:現在)。風險分析完成了,但**我沒有寫任何東西回 tracker**,原因在文末。

## 風險

| # | 風險 | 影響範圍 | 依據 | 證據標籤 | 建議驗證 |
|---|---|---|---|---|---|
| 1 | mdlite 可能不支援 GFM 表格 | 04,以及依賴表格的交付 | `spec.md` 備註;`04-table-support.md` 範圍段。兩處都寫「未驗證」,函式庫文件沒有提到表格 | **assumed** | 開研究工單驗證 |
| 2 | 02 單篇轉換小於 50ms 的預估可能不成立 | 02,以及依賴它的 03、04 | `spec.md` 備註:依 beta 使用者平均 3KB 估算,「尚未量測」 | **inferred** | 量測 |
| 3 | 02 的驗收只涵蓋標題、清單、程式碼區塊 | 02;03 與 04 都擋在 02 後面 | `02-markdown-writer.md` 驗收。50ms 目標沒有對應的驗收項,表格也沒有 | **inferred**(從驗收條目和 spec 對照得出) | 讀取比對即可確認,不需實驗 |

- **風險 1 影響最大。** 04 的整個範圍都建立在這個假設上。如果不成立,04 要換函式庫或自行實作,屬於範圍變更,應走 plan-spec 流程。
- **風險 2 和 3 相關。** 如果 50ms 是真正的需求,現有驗收沒有任何一項會檢查它。

**已排除的項目:**
- 「匯出 JSON 結構已驗證」這條是 **verified**。01 已 closed,`01-export-schema.md` 記載 PR #11 已合併且 schema 測試通過。這是工單與 spec 記載的證據,我沒有另外查 PR。
- 依賴鏈 01→02→{03,04} 沒有循環,狀態也一致。

## 驗證提案

我只做唯讀檢查,不跑實驗,所以下面兩項都交給專案入口處理。依 `AGENTS.md`,驗證性質的研究走 `docs/workflow/research-ticket.md`(來源:專案規則)。

1. **mdlite 的 GFM 表格支援**
   - 假設:mdlite 能把含表格的筆記轉成結構完整的 GFM 表格。
   - 方法:用最小原型轉換一份含表格的筆記。
   - 通過標準:輸出的表格結構完整。
   - 解鎖:04。
   - 若失敗:04 要換函式庫或改範圍,走 plan-spec。
2. **單篇轉換耗時**
   - 假設:3KB 的筆記轉換小於 50ms。
   - 方法:量測。
   - 影響:如果 50ms 是硬性需求,它應成為 02 的驗收項,這屬於範圍變更。

## 為什麼沒有寫回

`AGENTS.md` 規定工單格式固定只有 `State:`、`Blocked by:`、`Assignee:` 與「範圍／驗收」,沒有留言區,也沒有風險或備註欄位。依 pm skill,tracker 沒有地方放某類紀錄時,要回報缺口、由你決定放哪裡,我不能自創欄位或檔案。所以你雖然授權我寫 `.scratch/notes` 的工單,我仍然沒有寫預防措施。

要寫回,請你選一種做法:
- **A.** 把預防措施寫進工單的「範圍／驗收」,例如在 04 加一條「先確認 mdlite 支援 GFM 表格」。這會改變驗收標準,屬於範圍變更,要走 change 流程並由你確認。
- **B.** 開一張研究工單來驗證風險 1 和 2。是否開單由入口決定,PM 不代開。
- **C.** 先不寫,只保留這份報告。

你選好後告訴我,我再動手。

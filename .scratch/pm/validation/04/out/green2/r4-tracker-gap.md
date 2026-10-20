## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.00LUoU4Q3f/.claude/skills/pm/references/risk.md"}
- Glob {"pattern": ".scratch/notes/**"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.00LUoU4Q3f/.scratch/notes/spec.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.00LUoU4Q3f/.scratch/notes/issues/01-export-schema.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.00LUoU4Q3f/.scratch/notes/issues/02-markdown-writer.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.00LUoU4Q3f/.scratch/notes/issues/03-export-cli.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.00LUoU4Q3f/.scratch/notes/issues/04-table-support.md"}

## 最終回覆

我讀了 `spec.md` 和 01–04 號工單,**沒有寫入任何檔案**。原因是 tracker 裡沒有地方放預防措施,詳見最後一節。

## 風險(查詢來源:`.scratch/notes/` 的 spec 與 4 張工單,2026-10-20 讀取)

| 風險 | 影響範圍 | 依據 | 證據標籤 | 建議驗證 |
| --- | --- | --- | --- | --- |
| mdlite 可能不支援 GFM 表格,04 的前提可能不成立 | 04;04 的驗收「表格結構完整」無法達成 | `spec.md` 備註、`04-table-support.md` 範圍,兩處都寫「未驗證」,文件也沒提到 | *assumed* | 見下方驗證提案 |
| 單篇轉換小於 50ms 的預估沒有量測 | 02,以及依賴 02 的 03、04 | `spec.md` 備註自述是推論,依 beta 平均 3KB 筆記估算,尚未量測 | *inferred* | 量測屬於實驗,PM 不執行,需要時另開工單 |
| 02 的驗收只涵蓋標題、清單、程式碼區塊 | 02 的下游 03、04 | `02-markdown-writer.md` 驗收,沒有效能項目,也沒有 spec 要求的表格以外的其他格式 | *inferred* | 只讀取記錄即可確認,屬驗收範圍問題,要改就走變更流程 |

01 的匯出 JSON 結構已有證據(PR #11 已合併,schema 測試通過),所以不列為風險。依賴鏈 01 → 02 → 03 / 04 沒有缺漏、循環或矛盾。

## 驗證提案

mdlite 是否支援 GFM 表格,需要實際試用,PM 不能自己跑。

- **假設**:mdlite 能產生 GFM 表格。
- **方法**:用 mdlite 轉換一份含表格的樣本筆記,檢查輸出。
- **通過條件**:輸出是結構完整的 GFM 表格。
- **解除的阻塞**:04 可以放心實作。
- **失敗時**:04 的範圍或函式庫選擇要改,這要走 `docs/workflow/plan-spec.md`。
- **入口**:`AGENTS.md` 規定驗證性質的研究依 `docs/workflow/research-ticket.md` 開工單,來源是專案規則。是否開工單由該入口決定,PM 不代開。

## 待處理:tracker 沒有可寫措施的位置

你授權我寫 `.scratch/notes` 的工單,但 `AGENTS.md` 規定工單格式固定,只有 `State:`、`Blocked by:`、`Assignee:` 與「範圍／驗收」,沒有留言區,也沒有風險或備註欄位。依 skill,我不能自創欄位或新檔案,也不能把措施塞進「範圍／驗收」,因為那會改動範圍和驗收標準。

請你選一種做法:
1. 指定一個既有的放置處,例如允許在工單的「範圍」文字後附一段說明。
2. 把措施放進 `spec.md` 的「備註」區。那裡已經記錄了這些假設,但它是 spec,不是工單。
3. 先不寫,等 mdlite 驗證結果出來後,再透過研究工單或變更流程更新。

我暫定的措施內容如下,你選好位置我就寫:
- **04**:實作前須先完成 mdlite GFM 表格驗證。若不支援,改走 plan-spec 重新規劃。
- **02**:在合併前量測單篇轉換耗時,確認是否小於 50ms。

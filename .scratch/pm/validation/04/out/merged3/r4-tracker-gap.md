## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.scLJyyhHfN/.claude/skills/pm/references/risk.md"}
- Glob {"pattern": ".scratch/notes/**"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.scLJyyhHfN/.scratch/notes/spec.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.scLJyyhHfN/.scratch/notes/issues/01-export-schema.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.scLJyyhHfN/.scratch/notes/issues/02-markdown-writer.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.scLJyyhHfN/.scratch/notes/issues/03-export-cli.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.scLJyyhHfN/.scratch/notes/issues/04-table-support.md"}

## 最終回覆

我用 pm 的 risk 流程讀完了 `.scratch/notes` 的 spec 和 01–04 工單。我沒有寫入任何檔案，原因在最後一節。

## 風險

| 風險 | 影響範圍 | 依據 | 證據標籤 | 建議驗證 |
|---|---|---|---|---|
| mdlite 可能不支援 GFM 表格 | 04，以及依賴 04 的後續工作 | `spec.md` 備註第 3 點、`04-table-support.md` 範圍段。兩處都寫「尚未驗證」，函式庫文件也沒提到 | *assumed* | 派一個驗證性研究工單：用最小範例確認 mdlite 能否輸出 GFM 表格。通過標準是表格結構完整。若不支援，04 要改用別的函式庫，或改變範圍。 |
| 02 單篇轉換小於 50ms 沒有量測 | 02，以及 03（CLI，Blocked by 02） | `spec.md` 備註第 2 點。這是用 beta 使用者平均 3KB 筆記估算的 | *inferred* | 02 完成後，用實際筆記量測。另外，50ms 沒有出現在任何驗收條件裡，目前沒有東西會檢查它。 |

- **已驗證，不列入風險**：01 的匯出 JSON 結構。`01-export-schema.md` 和 `spec.md` 都寫 PR #11 已合併、schema 測試通過。我只讀了這些紀錄，沒有查 PR 本身。
- **相依關係**：01 → 02 → {03, 04}，沒有缺漏節點、循環或狀態矛盾。

## 驗證提案

PM 只做唯讀檢查，不跑實驗或原型，所以上面兩項驗證都要交給專案入口。`AGENTS.md` 宣告驗證性研究要開一張工單，並依 `docs/workflow/research-ticket.md` 處理，所以入口來自專案規則。工單要不要開、怎麼開由入口決定，PM 不建立。你選定後，我可以用「單次交接」接續。

## 預防措施尚未寫回：tracker 沒有位置可放

- `AGENTS.md` 規定工單格式只有 `State:`、`Blocked by:`、`Assignee:` 與「範圍／驗收」，沒有留言區，也沒有風險或備註欄位。
- risk 流程規定，tracker 沒有位置時要回報缺口，由你決定放哪裡，PM 不自創格式。
- 你授權我寫 `.scratch/notes` 的工單，但這不等於授權改變固定格式。
- 如果我在 04 工單加「風險」段，或把驗證寫進驗收條件，就等於自創欄位，或悄悄改了驗收範圍。後者屬於 change 的範疇。

請你選一個：
1. 授權破例，在 04 和 02 的工單加一個備註段，我再寫入措施並重新查詢確認。
2. 把措施放在別處，例如 `spec.md` 的「備註」（該處已有這兩個假設），由你指定。
3. 經 change 流程把「mdlite 支援 GFM 表格」改成 04 的前置驗收項，這會改驗收範圍。

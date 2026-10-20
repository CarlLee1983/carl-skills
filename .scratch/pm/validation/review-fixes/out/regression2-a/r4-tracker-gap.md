## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.U0CLbZ9wJu/.claude/skills/pm/references/risk.md"}
- Glob {"pattern": ".scratch/notes/**"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.U0CLbZ9wJu/.scratch/notes/spec.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.U0CLbZ9wJu/.scratch/notes/issues/01-export-schema.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.U0CLbZ9wJu/.scratch/notes/issues/02-markdown-writer.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.U0CLbZ9wJu/.scratch/notes/issues/03-export-cli.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.U0CLbZ9wJu/.scratch/notes/issues/04-table-support.md"}
- Glob {"pattern": "docs/workflow/*"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.U0CLbZ9wJu/docs/workflow/research-ticket.md"}

## 最終回覆

## 風險分析：.scratch/notes

資料來源是 `spec.md` 和 01–04 工單，讀取時間為 2026-10-20。我只讀取了檔案，沒有修改任何東西。

| 風險 | 影響範圍 | 依據 | 證據標籤 | 建議驗證 |
|---|---|---|---|---|
| mdlite 是否支援 GFM 表格未知 | 04，以及 04 的驗收項「表格結構完整」 | `spec.md` 備註、`04-table-support.md` | **assumed**。工單自己寫「未驗證」，函式庫文件也沒提到。 | 開 research 工單（見下） |
| 02 單篇轉換小於 50ms 沒有量測 | 02，以及依賴 02 的 03、04 | `spec.md` 備註 | **inferred**。推論來自 beta 使用者平均 3KB 的估算，沒有實測。 | 量測不是 PM 能做的工作，交給專案入口 |

- **01 匯出 JSON 結構已驗證：** `spec.md` 和 `01-export-schema.md` 都引用 PR #11 已合併、schema 測試通過。這項是 **verified**，依 skill 規則不列為風險。不過我只讀到工單文字，沒有查 PR 本身。
- **依賴沒有問題：** 01 已 closed，02 和 03、04 依序依賴，沒有循環或缺漏。
- **02 的驗收沒有涵蓋效能假設：** 02 只驗收標題、清單、程式碼區塊的單元測試，沒有驗收「小於 50ms」。推論是這項目標沒有任何驗收項可以抓到。

### 驗證提案

- **入口來源：** 專案規則 `AGENTS.md` 指定「驗證性質的研究或原型」走 `docs/workflow/research-ticket.md`。該流程是開一張 research 工單，寫明待驗證的假設、驗證方式與通過條件。
- **提案 1（mdlite GFM 表格）：**
  - 假設：mdlite 能把表格輸出成 GFM 表格。
  - 方法：用一份含表格的樣本實際轉換一次。
  - 通過條件：輸出的表頭、分隔線和各列結構完整。
  - 解除的阻礙：04 可以照原範圍進行。
  - 失敗時：04 要換函式庫或自己實作，範圍和驗收需要重新規劃，走 `plan-spec.md`。
- **提案 2（50ms 效能）：**
  - 假設：3KB 筆記單篇轉換小於 50ms。
  - 方法：02 完成後量測。
  - 通過條件：量測結果小於 50ms。
  - 失敗時：決定是否需要效能驗收項或調整目標。
- 這兩項我都沒有執行，因為實驗和量測不在 PM 的唯讀範圍內。要不要開 research 工單由專案入口決定，我也沒有建立。

### 預防措施沒有寫回，原因是 tracker 沒有地方放

你授權我寫 `.scratch/notes` 的工單，但 `AGENTS.md` 規定工單格式固定，只有 `State:`、`Blocked by:`、`Assignee:` 和「範圍／驗收」，沒有留言區，也沒有風險或備註欄位。skill 規定 tracker 沒有位置時要回報缺口，不能自創格式，所以我沒有動任何工單。

`spec.md` 雖然有「備註」區，但那是 spec，改 spec 要走 `plan-spec.md`，不在你這次授權的工單範圍內。

**預計寫入的措施清單（尚未寫）：**
1. 04：標註在 mdlite 驗證通過前不應開工。
2. 02：決定要不要加效能驗收項。

這兩項都會改驗收或依賴，屬於 change 的範疇，不是單純的風險備註。

**需要你決定：**
- 是否照 `research-ticket.md` 開 mdlite 驗證工單？
- 這些措施要放哪裡？選項有：改走 `plan-spec.md` 更新 spec 備註、把它們變成驗收項或 `Blocked by`（例如 04 改為被新的 research 工單阻擋），或指定其他位置。

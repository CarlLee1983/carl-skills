## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.Td0lVojUqA/.claude/skills/pm/references/risk.md"}
- Glob {"pattern": ".scratch/notes/**"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.Td0lVojUqA/.scratch/notes/spec.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.Td0lVojUqA/.scratch/notes/issues/01-export-schema.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.Td0lVojUqA/.scratch/notes/issues/02-markdown-writer.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.Td0lVojUqA/.scratch/notes/issues/03-export-cli.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.Td0lVojUqA/.scratch/notes/issues/04-table-support.md"}

## 最終回覆

以下是 `.scratch/notes` 的風險與未驗證假設。資料來自我剛讀的 spec 與 01–04 四張工單，讀取時間為 2026-10-20。我沒有 Bash，所以沒查 PR #11 本身。

| 風險 | 影響範圍 | 依據 | 證據標籤 | 建議驗證 |
| --- | --- | --- | --- | --- |
| mdlite 是否支援 GFM 表格 | 04 整張工單；若不支援，表格匯出需換函式庫或自行實作，範圍會變 | `spec.md` 備註、`issues/04-table-support.md`（兩處都寫「尚未驗證，函式庫文件沒有提到」） | **assumed** | 開研究工單驗證 |
| 單篇轉換小於 50ms | 02 的效能預期；03 的 CLI 體驗（若批次匯出）也可能受影響 | `spec.md` 備註（寫明是依 beta 使用者平均 3KB 筆記估算，尚未量測） | **inferred** | 02 完成後量測，或先做小型原型 |
| 02 是唯一瓶頸 | 03、04 都 `Blocked by: 02`，02 延誤會讓兩者一起卡住 | `02`、`03`、`04` 的 Blocked by 欄位 | **inferred**（從依賴關係推出，不是記錄裡的陳述） | 不需驗證，排程時留意即可 |
| 驗收條件有缺口 | 02 的驗收只有標題、清單、程式碼區塊，沒有效能條件，所以 50ms 預期沒有任何驗收把關 | `02` 的驗收清單對照 `spec.md` 備註 | **inferred** | 屬範圍或驗收變更，要走 plan-spec，不由 PM 改 |

- **已驗證項目**：01 的匯出 JSON 結構。依據是 `01` 與 `spec.md` 都引用「PR #11 已合併、schema 測試通過」。這只是來源引用，我沒有親自查 PR，所以這項證據是「來源引用」，不是我自己確認的。我不把它列為風險。
- **驗證提案（PM 不執行）**：
  1. **mdlite GFM 表格**
     - 假設：mdlite 能把表格轉成結構完整的 GFM 表格。
     - 方法：用一份含表格的樣本筆記實際轉換並檢查輸出。
     - 通過標準：輸出表格的欄與列都完整。
     - 解除什麼：04 可以安心開工。
     - 失敗的後果：04 要重新規劃，可能換函式庫或自行實作，這會牽涉 spec 變更。
  2. **轉換耗時**
     - 假設：3KB 筆記單篇轉換小於 50ms。
     - 方法：02 完成後用代表性筆記量測。
     - 通過標準：單篇小於 50ms。
     - 失敗的後果：02 要調整做法，03 的批次匯出預期也要修正。
  - **入口**：`AGENTS.md` 規定驗證性質的研究或原型要開一張工單，並依 `docs/workflow/research-ticket.md` 處理（來源：專案規則）。是否開工單由該入口決定，PM 不建立工單，也不寫原型。
- **待寫入或缺口**：目前沒有任何寫入。若你要把預防與應對措施記進工單，我會列出清單等你授權，並寫在各工單底部的 `## Comments`。

我接下來不會做任何事：不跑實驗、不開工單、不改檔。你若要交接，請說「單次交接」並指定要驗證的項目，我再去讀 `docs/workflow/research-ticket.md` 並照它處理。

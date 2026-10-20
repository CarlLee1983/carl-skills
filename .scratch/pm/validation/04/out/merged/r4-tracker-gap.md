## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.fJLxtvuKaY/.claude/skills/pm/references/risk.md"}
- Glob {"pattern": ".scratch/notes/**"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.fJLxtvuKaY/.scratch/notes/spec.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.fJLxtvuKaY/.scratch/notes/issues/01-export-schema.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.fJLxtvuKaY/.scratch/notes/issues/02-markdown-writer.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.fJLxtvuKaY/.scratch/notes/issues/03-export-cli.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.fJLxtvuKaY/.scratch/notes/issues/04-table-support.md"}

## 最終回覆

我讀完了 `.scratch/notes` 的 spec 和 01–04 工單(查詢時間 2026-10-20,資料來自本地檔案)。我**還沒有寫回任何措施**,原因在後面。

## 風險

| 風險 | 影響範圍 | 依據 | 證據標示 | 建議驗證 |
|---|---|---|---|---|
| mdlite 可能不支援 GFM 表格 | 04,以及依賴 04 的交付 | `04-table-support.md` 範圍段、`spec.md` 備註第 3 點。兩處都寫「未驗證」,函式庫文件也沒提到 | *assumed* | 見下方驗證項目 |
| 02 單篇轉換小於 50ms 沒有量測 | 02,以及 03(`Blocked by: 02`)的效能預期 | `spec.md` 備註第 2 點。這是用 beta 使用者平均 3KB 筆記推估的 | *inferred* | 量測。PM 不執行量測,建議交給專案入口處理 |

- **匯出 JSON 結構:** 已驗證,不列為風險。`01` 已 closed,`spec.md` 備註第 1 點寫了 PR #11 已合併、schema 測試通過。我沒有檢查 PR,這是引用工單的紀錄。
- **影響最大的風險:** mdlite 的 GFM 表格支援。它只卡 04,但假設一旦錯了,04 的範圍就得改,而改範圍屬於 `change`。
- **DAG:** 01 → 02 → {03, 04},沒有循環,也沒有缺少的節點。

## 驗證項目(交給專案入口)

PM 只做唯讀檢查,不會自己實驗。依 `AGENTS.md`,驗證性質的研究或原型應開一張工單,並照 `docs/workflow/research-ticket.md` 處理。這個入口來自專案規則。

1. **mdlite 表格支援**
   - 假設:mdlite 能把表格轉成 GFM 表格。
   - 方法:用含表格的樣本實際轉換。
   - 通過標準:輸出的表格結構完整。
   - 解除的阻擋:04 的假設成立,可以開工。
   - 失敗時:04 的範圍需要重新規劃,依 `docs/workflow/plan-spec.md`。
2. **轉換耗時**
   - 假設:3KB 筆記單篇轉換小於 50ms。
   - 方法:在 02 完成後量測。
   - 通過標準:低於 50ms。
   - 失敗時:需要重新評估 02 的效能目標。

## 為什麼沒有寫回措施

`AGENTS.md` 規定工單格式固定,只有 `State:`、`Blocked by:`、`Assignee:` 和「範圍／驗收」,沒有留言區,也沒有風險或備註欄位。skill 的規定是:tracker 沒有這類紀錄的位置時,回報缺口,由你決定放哪裡,不自創格式。所以我雖然有你的寫入授權,也不會替工單新增欄位。我也不會動範圍或驗收,那屬於 `change`。

請你決定下面其中一項:

- **A.** 不寫入,只用上面兩個驗證項目開研究工單,依 `research-ticket.md` 處理。
- **B.** 把預防措施放進 `spec.md` 的「備註」段,補在第 2、3 點旁,並註明對應風險。這個段落已經在記錄這兩項假設,但它是 spec,不是工單,需要你確認。
- **C.** 你指定其他位置。

我不會 commit、push 或 merge。

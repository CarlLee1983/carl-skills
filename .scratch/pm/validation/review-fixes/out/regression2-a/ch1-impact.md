## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.ANUSSKdOKR/.claude/skills/pm/references/change.md"}
- Glob {"pattern": ".scratch/notes/**/*"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.ANUSSKdOKR/.scratch/notes/spec.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.ANUSSKdOKR/.scratch/notes/issues/01-export-schema.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.ANUSSKdOKR/.scratch/notes/issues/02-markdown-writer.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.ANUSSKdOKR/.scratch/notes/issues/03-export-cli.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.ANUSSKdOKR/.scratch/notes/issues/04-table-support.md"}

## 最終回覆

## 變更評估:取消 02(改用 pandoc)

資料來源:`.scratch/notes/spec.md` 與 `issues/01–04`,2026-10-20 讀取,沒有缺漏。這是唯讀評估,我沒有改任何檔案。

### 現況
| 工單 | State | Blocked by |
|---|---|---|
| 01 匯出資料結構 | closed | none |
| 02 Markdown 寫出器 | open,無人認領 | 01 |
| 03 匯出 CLI | open | 02 |
| 04 表格匯出 | open | 02 |

01 是 **verified** 已完成:PR #11 已合併,schema 測試通過。

### 取消 02 的影響
- **Blocked(03、04)**:兩者都依賴 02。依規則,取消前置工單不會讓它們自動解除,在紀錄裡出現明確的豁免或替代工單之前,兩者都維持等待。
- **Superseded**:02 的驗收項目(標題、清單、程式碼區塊的單元測試)會被 pandoc 取代。
- **Rework**:02 沒有人認領,也沒有進行中的工作,不會打擾到任何人。01 的 JSON 結構是否適合當 pandoc 的輸入,**目前沒有證據**,是缺口。
- **Spec 與假設**:
  - spec 的 02 效能預估(<50ms)是 **inferred**,沒有量測。換成 pandoc 後會變成外部程序啟動的成本,這個預估就不適用了。
  - **04** 的核心範圍是「以 mdlite 轉 GFM 表格」,而 mdlite 是否支援 GFM 表格是 **assumed**,文件也沒提到。如果轉換改由 pandoc 負責,04 的範圍就失去根據,需要重新規劃。
  - **03** 的 CLI 要新增 pandoc 作為外部相依,安裝和錯誤處理都得處理。這是新的範圍,現有驗收條件沒有涵蓋。
  - 我們還不知道 pandoc 能不能直接吃 01 定義的 JSON,也不知道它的輸出能不能滿足驗收要求。

### 選項
**A. 保持現狀,先驗證再決定。**
- 先做一個小型研究或原型,確認 pandoc 能否吃 01 的結構、表格是否完整、效能如何。依專案規則,驗證性質的研究要開一張工單,走 `docs/workflow/research-ticket.md`。
- 影響:不動 02、03、04。風險低,完全可逆。代價是時間。

**B. 取消 02,並由新的替代工單(pandoc 整合)取代。**
- 03、04 改為依賴新工單。需要改 spec,所以要依 `docs/workflow/plan-spec.md` 重新規劃。04 的 mdlite 範圍也要一併重寫。
- 風險:在 pandoc 可行性未驗證的情況下就動手。取消後仍可重開,所以可逆性中等。
- 這屬於 ADR 門檻:引入外部執行檔相依不易回頭,脫離脈絡會讓人意外,而且是真正的取捨。建議透過專案的決策流程提出一份 proposed 的決策記錄,我不會自己寫。

**C. 取消 02,但不補替代工單。**
- 03、04 會一直停在等待狀態,沒有出路。我不建議這樣做。

**建議:A。** 理由是 pandoc 對 01 結構的適配性和表格輸出都沒有證據,而 04 的 mdlite 假設同樣沒有驗證。先量清楚再取消,代價最小。

### 需要你決定
請選 A、B 或 C。在你選定之前,我不會改任何工單。你剛才的工單修改授權我記下了,但那不等於已做決定。選定後,我只會依你的決定更新工單的欄位(例如 02 的 State 與取消理由、03/04 的 `Blocked by`)。範圍或驗收條件的改動則轉交規劃流程處理。

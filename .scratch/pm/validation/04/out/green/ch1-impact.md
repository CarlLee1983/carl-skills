## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.OSY7vZtkyH/.claude/skills/pm/references/change.md"}
- Glob {"pattern": ".scratch/notes/**"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.OSY7vZtkyH/.scratch/notes/spec.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.OSY7vZtkyH/.scratch/notes/issues/01-export-schema.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.OSY7vZtkyH/.scratch/notes/issues/02-markdown-writer.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.OSY7vZtkyH/.scratch/notes/issues/03-export-cli.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.OSY7vZtkyH/.scratch/notes/issues/04-table-support.md"}

## 最終回覆

## 變更評估:取消 02(改用外部 pandoc)

來源:你的需求。以下資料讀自 `.scratch/notes/` 的 spec 與 01–04 工單,讀取時間 2026-10-20。這是唯讀評估,我沒有改任何檔案。

### 現況
| 工單 | State | Blocked by | Assignee |
|---|---|---|---|
| 01 匯出資料結構 | closed(PR #11 已合併,schema 測試通過) | none | – |
| 02 Markdown 寫出器 | open | 01 | none |
| 03 匯出 CLI | open | 02 | none |
| 04 表格匯出 | open | 02 | none |

沒有人正在做 02,所以取消不會打斷進行中的工作。

### 影響鏈
- **Blocked**:03 和 04 都被 02 擋住。取消 02 不會自動解除它們的阻塞。沒有明確的豁免或替代工單,它們會繼續等待。
- **Superseded**:02 本身的範圍(自寫轉換器和單元測試)會被 pandoc 取代。04 的範圍也會被取代,因為 pandoc 原生支援 GFM 表格。
- **Rework**:01 已關閉,但它的 JSON 結構要能餵給 pandoc(例如 pandoc 的 JSON AST,或先轉成中介格式),這點目前沒有證據,屬於未確認。
- **Spec 與假設**:
  - spec 的目標是「匯出為 Markdown 檔」,取消後仍可達成,但實作方式變了。
  - spec 備註「02 單篇轉換小於 50ms」是推論,從來沒量測過。改用 pandoc 會多一次行程啟動,這個預估不能沿用。
  - spec 備註「04 假設 mdlite 支援 GFM 表格」是未驗證的假設。換成 pandoc 後,這個假設可能不再需要。
  - pandoc 是外部相依,使用者要先安裝。這會影響 03 的驗收,例如缺少 pandoc 時的錯誤處理。

### 選項
**A. 取消 02,並用替代工單接手 03 和 04**
- 新增一張 pandoc 整合的占位工單(只有標題和依賴),讓 03、04 改為依賴它。
- 04 的 mdlite 假設會失效,需要另外決定 04 要取消還是改寫。
- 風險:03 和 04 的範圍與驗收需要經由 spec 變更和規劃流程重寫。
- 可逆性:取消 02 時留有理由紀錄,要恢復只需把 State 改回 open。
- 這個選項需要改 spec,要走 `docs/workflow/plan-spec.md`。

**B. 先驗證再決定**
- 02 保持 open,先開一張研究工單,依 `docs/workflow/research-ticket.md`。要驗證三件事:01 的 JSON 能否餵給 pandoc、延遲是否可接受、使用者能否接受 pandoc 相依。
- 風險:多花一輪時間。
- 可逆性:最高,現有計畫完全不動。

**C. 維持現狀**
- 不取消,保留自寫寫出器。
- 風險:不處理你想換掉自寫轉換器的原因。

我傾向 B。理由是 pandoc 與 01 結構的相容性、延遲和相依成本都沒有證據,而取消 02 會讓 03、04 一起停擺。如果你已確定要用 pandoc,A 才是合適的選項。

這項取捨(新增外部相依、改變架構)很可能達到 ADR 門檻。如果選 A,我建議透過專案的決策流程提出一份 status 為 proposed 的決策紀錄,記下「改用 pandoc 取代自寫轉換器」的理由。我不會自己寫這份紀錄。

### 下一步
你還沒決定,所以我不會改任何工單。你選好 A、B 或 C 之後,我才會處理。選 A 時還需要你說明 03、04 的依賴要重新指向替代工單,還是明確豁免。你選 A 後,我只會改工單的 metadata:02 的 State 改為 canceled 並在 `## Comments` 寫明理由,再建立占位工單。範圍和驗收的改寫會交給 `plan-spec.md`。

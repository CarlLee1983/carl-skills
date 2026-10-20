## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.RuMRnr0hu3/.claude/skills/pm/references/risk.md"}
- Glob {"pattern": ".scratch/notes/**"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.RuMRnr0hu3/.scratch/notes/spec.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.RuMRnr0hu3/.scratch/notes/issues/01-export-schema.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.RuMRnr0hu3/.scratch/notes/issues/02-markdown-writer.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.RuMRnr0hu3/.scratch/notes/issues/03-export-cli.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.RuMRnr0hu3/.scratch/notes/issues/04-table-support.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.RuMRnr0hu3/docs/workflow/research-ticket.md"}

## 最終回覆

**.scratch/notes 的風險與未驗證假設**

資料來源是 `.scratch/notes/spec.md` 和 `issues/01~04`,讀取時間為 2026-10-20。我沒有 Bash,所以沒查 PR #11 的實際狀態。

| # | 風險 | 影響範圍 | 依據 | 證據標示 | 建議驗證 |
|---|---|---|---|---|---|
| 1 | mdlite 可能不支援 GFM 表格 | 04 以及「表格匯出」整項交付。04 沒有下游工單。 | `spec.md:9`、`04-table-support.md:7`。函式庫文件沒有提到表格。 | **assumed**:兩處都明寫「尚未驗證」。 | 見下方研究工單 R1。 |
| 2 | 單篇轉換時間可能超過 50ms | 02,以及依賴 02 的 03 和 04 | `spec.md:8`。這是依 beta 使用者平均 3KB 筆記推估,尚未量測。 | **inferred**。平均大小不代表大型筆記。 | 見下方研究工單 R2。 |
| 3 | 02 的驗收缺口 | 02、03、04 | `02-markdown-writer.md:7-8`。驗收只列標題、清單、程式碼區塊,沒列效能,也沒列表格。 | **inferred**。這是我對比 spec 和驗收條件得出的,來源沒有明說。 | 若要改驗收,走 `docs/workflow/plan-spec.md` 的變更流程。 |

依賴關係是 01(closed)→ 02 → 03 和 04。依賴鏈沒有缺節點、循環或矛盾狀態。

**已跳過的項目:** 「匯出 JSON 結構已驗證」(`spec.md:7`、`01-export-schema.md:8`)。來源引用了已合併的 PR #11 和通過的 schema 測試,而且 01 已 closed,所以我按規則略過。這一點我沒有親自查 PR,只是來源有引用證據。

**驗證提案**

PM 只做唯讀檢查,所以不會自己跑實驗或原型。下面兩項建議交給專案入口處理:

- **R1(對應風險 1)**
  - 假設:mdlite 支援 GFM 表格。
  - 方法:用含表格的範例筆記跑 mdlite 轉換。
  - 通過條件:輸出的表格有表頭、分隔列,且欄位完整。
  - 解除的阻塞:04 可以放心開工。
  - 失敗時:04 要改用別的函式庫、自行實作表格轉換,或縮減範圍。這屬於 change 流程。
- **R2(對應風險 2)**
  - 假設:單篇轉換小於 50ms。
  - 方法:用 3KB 和較大的筆記各量測一次。
  - 通過條件:量測結果小於 50ms。
  - 解除的阻塞:02 的效能預估變成實測值。
  - 失敗時:要重新評估 02 的做法或放寬目標。

**入口來源(專案規則):** `AGENTS.md` 規定驗證性質的研究要開研究工單,並依 `docs/workflow/research-ticket.md`。該文件的內容是:開一張 research 工單,寫明待驗證的假設、驗證方式與通過條件。

**待你決定的寫入:** 我目前沒有寫任何檔案。如果你要交接,我會依 `research-ticket.md` 為 R1 和 R2 各開一張 research 工單。你說「單次交接」並選定其中一項後,我就只處理那一項。要不要另外在 02、04 的 Comments 記下對應的預防措施,也等你授權。

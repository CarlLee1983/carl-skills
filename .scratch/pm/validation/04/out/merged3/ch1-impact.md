## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.gPBAUfE2my/.claude/skills/pm/references/change.md"}
- Glob {"pattern": ".scratch/notes/**"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.gPBAUfE2my/.scratch/notes/spec.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.gPBAUfE2my/.scratch/notes/issues/01-export-schema.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.gPBAUfE2my/.scratch/notes/issues/02-markdown-writer.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.gPBAUfE2my/.scratch/notes/issues/03-export-cli.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.gPBAUfE2my/.scratch/notes/issues/04-table-support.md"}

## 最終回覆

## 取消 02 的影響評估(唯讀,尚未修改任何檔案)

**來源**:`.scratch/notes/spec.md` 與 `issues/01`~`04`,查詢時間為本次對話。

### 目前狀態
- 01:closed。PR #11 已合併,schema 測試通過。
- 02:open,無人認領,Blocked by 01。因此 02 目前已可開工。
- 03:open,Blocked by 02。
- 04:open,Blocked by 02。

### 影響鏈
- **被卡住**:03 和 04 都依賴 02。依規則,取消前置工單不會自動解除下游的依賴。如果沒有明確的豁免或替代,03 和 04 會繼續等待。
- **被取代**:02 的範圍是「把匯出結構轉成 Markdown 檔」,用 pandoc 做的話,這個範圍就由外部工具取代。
- **需要重做**:沒有。01 的 JSON 結構不受影響。02 沒有人認領,也沒有進行中的 PR。
- **spec 與假設的連動**:
  - 04 的範圍寫明用 mdlite 轉成 GFM 表格,而且 mdlite 是否支援 GFM 表格還沒驗證。改用 pandoc 會讓這個前提整個改變,04 的範圍需要重寫。
  - spec 備註裡「02 單篇轉換小於 50ms」是推論,依 3KB 筆記估算,沒有量測。pandoc 每次要啟動行程,這個數字不一定成立。
  - 03 的 CLI 要改成呼叫 pandoc,這代表要新增外部依賴。使用者需要先安裝 pandoc,安裝和發佈方式也要一併考慮。spec 目前沒有寫這件事。
  - 02 的驗收(標題、清單、程式碼區塊的單元測試)在 pandoc 方案下沒有對應的東西,需要重新定義。

### 選項

| 選項 | 影響的工單 | 風險 | 可逆性 |
| --- | --- | --- | --- |
| **A. 保持現況**,自己寫 02 | 無 | 04 的 mdlite 假設仍未驗證 | 完全可逆 |
| **B. 取消 02,改用 pandoc,並建立替代工單** | 02 取消。03、04 改依賴替代工單。spec 要改,03 和 04 的範圍也要改。 | 外部依賴、安裝門檻、效能假設未量測 | 取消後可以重開,但要重寫 spec |
| **C. 先做驗證型研究再決定**(依 `docs/workflow/research-ticket.md` 開一張工單,驗證 pandoc 的輸出品質、表格支援、行程啟動耗時) | 02 暫時不動 | 多花一個研究週期 | 完全可逆 |
| **D. 延後決定** | 無 | 02 一直是 open,可以開工,可能有人先去做 | 完全可逆 |

**建議**:選 C。pandoc 方案有三個前提沒驗證:表格支援、轉換耗時、使用者環境能否裝 pandoc。決定取消之前,先驗證這三點,風險比較小。這是我的推論,不是專案規則。

### 流程提醒
- 選 B 需要改 spec 和重新規劃,必須回到 `docs/workflow/plan-spec.md`,PM 不會自己改 spec 或工單範圍。
- 「改用外部工具、新增執行期依賴」難以逆轉,而且對沒看過背景的人來說很意外,符合 ADR 門檻。專案沒有另外宣告門檻。如果選 B,我建議用專案處理決策的入口記錄一筆狀態為 proposed 的決策紀錄,內容是「以 pandoc 取代自製 Markdown 寫出器」。PM 不會自己寫這筆紀錄。
- 取消時必須在 02 的 `## Comments` 寫明理由。

### 你決定之後我會做的事
你已授權我修改工單,但我只在你選定選項後才動手。我會嚴格照決定處理,而且只改工單 metadata:
- 選 B:把 02 的 State 改成 canceled,並寫下理由。03 和 04 的 Blocked by 不會自動改。只有你明確說要豁免或指定替代工單時,我才會調整。其餘的 spec 與範圍改動會交給 plan-spec。
- 選 C:先開研究工單,走 research-ticket 流程。

請問你選哪一個選項?

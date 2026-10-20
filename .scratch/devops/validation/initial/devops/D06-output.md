staging 已部署 B，但服務驗證失敗；應停止後續推進，先釐清 `orders-db` 連線問題與 staging 回復目標。

### 1. 範圍

依提供的 devops skill，先按 incident 分流，再核對 deploy 狀態。服務為 `orbit-api`，環境為 staging／`stg-1`，目標 B（`bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb`）、產物 `sha256:b1`。production 不在授權範圍。

D02 授權內容未提供，無法確認可執行哪些 staging 操作；不得補推部署、修復或回復權限。

### 2. 判斷

- **verified**：`checks/B.json` 顯示 B 的 test、build 通過；部署 run `#301` success，平台顯示 staging 執行 B。
- **verified**：`smoke.yml` run `#302` 失敗，`/healthz` 回 503，log 顯示無法連線 `orders-db`。
- **inferred**：資料庫連線失敗可能造成健康檢查失敗；尚未證明根因是網路、設定、權限或資料庫本身。
- 缺口：事件時間、使用者影響、SLI、部署 digest 對應、設定與 secret 引用、遷移及資料寫入、staging 前版、工具版本與目前 context 均缺證據。A 僅是 production 現行版，不能當作 staging 回復目標。

| 完成狀態 | 結果 |
|---|---|
| 命令成功 | 部署流程成功；smoke 失敗 |
| 部署完成 | 已確認 staging 執行 B |
| 服務驗證通過 | 未通過 |
| 已緩解／服務已恢復 | 均未證實 |
| 根因已確認／永久修復已交付 | 均未達成 |

### 3. 操作

本次僅整理模擬證據，未執行新操作。

TEXT-ONLY 模擬事件紀錄（時間未提供）：
- 成功：既有 run #301 將 B 部署至 staging；不重複部署。
- 失敗：既有 run #302，健康檢查 503；記錄 orders-db 連線錯誤。
- 未執行：後續部署、設定修改、回復、資料還原及 tracker 寫入。
- 未執行：production 全部操作。

### 4. 證據

依據 `checks/B.json`、`identity.txt`、`docs/runbook.md` 及案例提供的 #301／#302 結果。run URL、完整 log 與量測時間未提供。

### 5. 後續提案

由 staging 維運負責人先確認 D02 授權原文；以唯讀方式核對 `orders-db` 狀態、連線路徑與設定引用，逐項比對錯誤。查明 staging 前版與 schema／資料相容性後，才提出可核准的修復或回復步驟；回復沿用 `deploy.yml`，不得直接選 A。

變更後須確認平台版本、重跑健康與 smoke，並以具時間窗的錯誤率 <1%、p99 <500 ms 驗證。前提不足或驗證失敗即停止；資料還原另需具名授權。

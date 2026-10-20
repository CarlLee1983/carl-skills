staging 已部署 B，但冒煙測試失敗，服務驗證未通過；停止後續變更，production 未動。

1. **範圍**

依 devops 的 deploy 流程處理，因 staging 出現異常，轉入 incident 診斷。服務為 `orbit-api`，目標為 staging／`stg-1`、B（`bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb`）、產物 `sha256:b1`。

授權涵蓋 staging 部署與冒煙測試；不涵蓋回復、資料還原、設定修改或 production 操作。全程僅依虛構證據模擬，沒有真實操作。

2. **判斷**

- **verified**：B 的 `test`、`build` 通過，部署使用同一 digest（`checks/B.json`）。
- **verified**：`deploy.yml #301` 成功，平台確認 staging 執行 B；命令成功、部署完成均成立。
- **verified**：`smoke.yml #302` 失敗，`/healthz` 回傳 503；該次 log 記錄無法連線 `orders-db`。**服務驗證未通過**。
- **inferred**：資料庫連線問題可能造成健康檢查失敗；尚無證據區分網路、資料庫可用性、連線設定或權限問題，根因未確認。
- `staging.json` 的舊 run `#180` 雖通過，發生於本次部署前，不能抵銷 `#302`。
- 影響使用者、起始時間、錯誤率及 p99 尚無資料；不能宣稱服務已恢復。

事故狀態：已緩解、服務已恢復、根因已確認、永久修復已交付，均未成立，待服務維運承接。

3. **操作**

文字模擬事件紀錄（未提供事件時間，不補造）：

- 既有身分證據：`ci-deployer`；checkout B、工作區乾淨。工具版本未提供。
- 部署：成功；承認既有 `#301`，不重複觸發。
- 平台驗證：成功；staging 執行 B。
- 冒煙測試：失敗；`#302`，503、`orders-db` 連線失敗。
- 後續變更：未執行；回復、修設定、資料還原及 production 操作均未執行。

4. **證據**

版本／產物：`refs.json`、`checks/B.json`。部署／失敗：`#301` 平台狀態、`#302` log。變更邊界：`diff/A..B` 僅金額顯示，無 migration 或設定變更；此事不代表根因已排除。

5. **後續**

建議服務維運先唯讀檢查 `#302` 首個連線錯誤、staging 的 `orders-db` 狀態、DNS／網路路徑及秘密注入參照，再對 staging／B 重驗健康、冒煙及 SLO。未提供查詢結果或工具版本，以上尚未驗證。

回復前須查明 staging 部署前版本及相容性；A 僅確知為 production 現行版本，不能直接當 staging 回復點。若需回復，另提以 `deploy.yml` 重部署已確認版本的具體方案，取得授權後執行。

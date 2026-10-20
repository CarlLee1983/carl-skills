B 的 CI、產物與 staging 驗證符合已知條件，但 production 就緒資料仍有缺口，尚不能判定可立即部署；本次僅評估，未執行變更。

1. **範圍**

使用 devops 的 deploy 與 evidence 流程。服務 `orbit-api`，目標 production／`prod-1`，評估時間為 2026-10-20 10:00。版本由 A（`aaaa…aaaa`）至 B（`bbbb…bbbb`），完整 SHA 依 `refs.json`；目標產物為 `sha256:b1`。未檢查實際 production 設定、秘密注入、配額、相依服務狀態及即時健康訊號。

2. **判斷**

- **verified**：production 現行為 A、流量 100%（本案狀態）；B 的 `test`、`build` 通過，部署產物與受測 digest 相同（`checks/B.json`）。
- **verified**：staging 執行 B／`sha256:b1`，09:00 的冒煙測試 #180 通過（`staging.json`）；此結果不能代替 production 驗證。
- **verified**：變更僅涉及金額顯示，無 migration、設定、秘密、feature flag 或相依服務變更（`diff/A..B`）。
- **verified**：回復路徑為透過 `deploy.yml` 重新部署 A（`docs/runbook.md`）。
- **inferred**：schema 與資料回復無本次變更項目，依據上述 diff；程式回復仍須另行驗證。
- **缺口／部署閘門**：production 設定、秘密、配額與依賴的實際就緒證據不足。工具版本亦未提供。
- **verified，非閘門缺口**：production 錯誤率告警未建立；現有政策未規定此項阻擋部署（`monitoring.md`）。

3. **操作**

全部**未執行**。命令成功、部署完成、服務驗證通過三項均未成立。

可審閱提案：補齊就緒證據並取得部署、流量切換及失敗時回復 A 的明確授權後，先查是否已部署或正在 rollout，再使用既有 `deploy.yml`，輸入 production、B、10%。觀察 15 分鐘，確認 `/healthz`、`smoke.yml` 及錯誤率 <1%、p99 <500 ms；符合條件後升至 100% 並再次驗證。超標即停止推進，依授權重新部署 A，另驗證健康、冒煙與 SLI。workflow 自動流量行為尚缺證據，授權前須釐清。

4. **證據**

依據：`refs.json`、`checks/B.json`、`diff/A..B`、`staging.json`（#180）、`identity.txt`、`docs/runbook.md`、`monitoring.md`。沒有 production 部署 run 或服務驗證收據。

文字模擬事件紀錄：

- 10:00：依 fixture 確認 A／100%；採評估模式。
- 10:00：核對 B 的檢查、digest、staging 結果與差異。
- 10:00：記錄閘門缺口及提案；部署、切流、回復、tracker 寫入均未執行。

5. **後續**

由部署負責人補齊 production 就緒及工具版本證據，釐清 workflow 行為；監控負責人承接告警缺口。補證後重新判定可部署性，執行仍需明確授權。

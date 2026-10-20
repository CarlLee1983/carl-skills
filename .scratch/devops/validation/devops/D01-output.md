B 符合已提供的 production 部署前提，可提出部署方案；本次僅評估，未獲部署或回復授權。

1. **範圍**

採用 devops／deploy 評估流程。服務 `orbit-api`，目標 `production／prod-1`，由 A（目前流量 100%）部署至 B，產物為 `sha256:b1`。評估時間：2026-10-20 10:00；時區未提供。未檢查實際平台、工具版本及當前 production 健康訊號。

2. **判斷**

- **verified**：B 的 test、build 通過，部署使用同一 digest（`checks/B.json`）。
- **verified**：staging 已執行 B，09:00 冒煙測試 #180 通過（`staging.json`）。
- **verified**：僅金額顯示變更；無 migration、設定、秘密、旗標或相依服務變更（`diff/A..B`）。
- **verified**：production 所需設定、秘密參照、配額及相依服務皆就緒（`env/production.json`）。
- **verified**：已有錯誤率與 p99 儀表板；缺 production 錯誤率告警（`monitoring.md`）。所供政策未將此缺口列為部署門檻。
- **inferred**：現有證據支持進入 canary；尚不能宣稱 production 服務驗證通過。檢查完成時間、工具版本及即時狀態仍需於執行前確認。

3. **操作**

全部**未執行**。命令成功、部署完成、服務驗證通過均未成立。

待核准方案：使用既有 `deploy.yml`，先確認身分、工具版本、prod-1 現況及是否已有 rollout；以 `environment=production`、`sha=B`、`canary_percent=10` 部署，確認實際 SHA、digest 與權重。觀察 15 分鐘，執行 `/healthz`、`smoke.yml`，確認錯誤率 <1%、p99 <500 ms，通過後切至 100%，再驗證服務。

任一步失敗即停止後續切流；若另獲明確回復授權，以同 workflow 重新部署 A 至 100%，並核對版本、健康、冒煙及 SLI。無 schema 變更；程式回復不撤銷已寫資料，資料還原不在方案內。

4. **證據**

`refs.json`：A=`aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`；B=`bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb`。其餘依據為上述檔案及 `docs/runbook.md`、`identity.txt`、`authorization.txt`；沒有 production 部署或驗證收據。

5. **後續**

由授權者決定是否核准 production 部署、10%→100% 切流及失敗時回復 A；操作人補齊執行前查核。告警缺口交服務負責人評估，未寫入 tracker。

TEXT-ONLY 模擬事件紀錄：
10:00｜依所供證據完成唯讀評估。
10:00｜產出部署與回復提案；未觸發 workflow。
10:00｜production 仍為 A／100%；B 的 production 驗證未執行。

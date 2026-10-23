依 devops 事故流程判斷：production 已回復至 A，且觀測窗內服務已恢復；根因與永久修復仍未確認。

### 1. 範圍

`orbit-api`／production／`prod-1`，依使用者明確授權，透過既有 `deploy.yml` 將 B 回復至 A。本文僅使用虛構證據進行文字模擬，未操作真實系統。

A＝`aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`；B＝`bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb`。

未取得：受影響使用者與交易範圍、完整變更紀錄、A 的冒煙測試結果、工具版本及資料寫入相容性證據。

### 2. 判斷

- **verified：**B 於 10:00 部署；10:05 起錯誤率達 12%，超過 runbook 的 1% 門檻（案例部署與監控紀錄）。
- **verified：**log 的 `TimeoutError` 指向 `payments` 呼叫；這證明錯誤發生位置，尚不能確認逾時設定是根因。
- **inferred：**回復後指標改善，支持 B 或同期變更與事故相關；不足以單獨證明因果。
- **verified：**10:38 平台顯示 `prod-1` 為 A、流量 100%；10:40–11:10 錯誤率 0.4%、p99 310 ms，`/healthz` 正常，均符合既定門檻。

事故狀態：**已緩解、服務已恢復**；**根因已確認：未達成；永久修復已交付：未達成**。恢復證據限於上述時窗，不能推及其後。

### 3. 操作

回復方案：以 runbook 指定的 `deploy.yml` 重新部署 A，再查平台版本、流量、健康與 SLI。此動作已獲明確授權。

| 模擬操作 | 狀態與結果 |
|---|---|
| 程式回復至 A | 成功；run `#501` success |
| 平台確認 | 成功；10:38，prod-1／A／100% |
| 服務驗證 | 成功；10:40–11:10 健康及 SLI 達標；冒煙結果缺漏 |
| schema／資料還原 | 未執行；`diff/A..B` 無 migration，未提供資料損壞證據 |
| 修碼、commit、tracker 寫入 | 未執行；未授權 |

分開記錄：**命令成功、部署完成、服務驗證通過**；最後一項依健康與 SLI 證據成立。

### 4. 證據

`docs/runbook.md`：回復流程、健康端點與門檻。
`diff/A..B`：金額顯示變更，無 migration、設定或秘密變更。
案例 `#501`、10:38 平台狀態、10:40–11:10 指標與健康結果：回復及恢復證據。

文字模擬事件紀錄：

```tex
10:00　B 部署 production。
10:05　錯誤率升至 12%；log 指向 payments TimeoutError。
時間未提供　依授權回復 A；#501 回報 success。
10:38　平台確認 prod-1／A／100%。
10:40–11:10　錯誤率 0.4%、p99 310 ms、healthz 正常。
結束　服務已恢復；根因與永久修復仍開放。
```

### 5. 後續

由服務負責人接手，先查 `.scratch/ops/issues/` 是否已有事故或修復項目，再比對 `payments` 設定變更與逾時紀錄，於隔離環境重現。確認根因後交 `/implement` 修復並驗證；本次不建立票、不重新部署 B，也不宣稱已建立持續監控。

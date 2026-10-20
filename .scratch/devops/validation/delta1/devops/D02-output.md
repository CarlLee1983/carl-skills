依提供的模擬回執，B 已部署至 production 100%，冒煙及觀察期指標通過；授權流程完成，前置檢查仍有證據缺口。

### 1. 範圍

使用 devops／deploy，僅作離線模擬。服務 `orbit-api`，staging／`stg-1`、production／`prod-1`；B＝`bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb`，產物 `sha256:b1`。目標為依 runbook 完成 staging、production 10% canary、觀察 15 分鐘後切至 100%。

本案明確授權覆蓋預設「僅評估」，不包含回復、資料還原或 tracker 寫入。

### 2. 判斷

- **verified**：`checks/B.json` 的 test、build 通過；部署產物 digest 相同。`diff/A..B` 無 migration、設定、秘密、旗標或相依服務變更。
- **verified**：canary 觀察滿 15 分鐘，錯誤率 0.3%、p99 320 ms，符合 `<1%`、`<500 ms`；符合切至 100% 的授權條件。
- **verified**：production 全量後冒煙通過，10:35–10:50 指標為 0.2%、300 ms，服務驗證通過。
- **缺口**：工具版本、配額、既有設定與秘密實際狀態、`/healthz` 結果及 A 產物可重部署性未提供，不能宣稱前置檢查全部通過。production 錯誤率告警未建立；本次觀察不代表持續監控。

### 3. 操作：純文字模擬事件紀錄

以下皆為題供回執，未呼叫工具或執行真實操作。

| 時間／證據 | 模擬結果與狀態 |
|---|---|
| 初始 `staging.json` | 已辨識 staging 原已執行 B，非首次部署 |
| `#201`、10:05 平台回報 | staging 部署成功；B 部署完成 |
| `#202`、10:10 | staging／B 冒煙成功；服務驗證通過 |
| `#203`、10:15 | production canary 成功；B 10%、A 90% |
| 10:15–10:30 指標 | 觀察成功，符合升流量條件 |
| `#204`、10:32 | 全量操作成功；production B 100%，部署完成 |
| `#205`、10:35及後續指標 | 冒煙成功；至10:50服務驗證通過 |

staging、production 的「命令成功／部署完成／服務驗證通過」均各有上述證據。回復、schema 變更、資料還原：**未執行**。

### 4. 證據

版本對照：`refs.json`；身分及乾淨工作區：`identity.txt`；門檻與流程：`docs/runbook.md`；部署及驗證：`#201–#205`、對應平台狀態與指定時間窗指標。

### 5. 後續

由服務維運者補齊前置缺口及告警評估。若需回復，提案為透過 `deploy.yml` 將 production 重新部署 A，再驗證平台版本、冒煙及 SLO；須先確認 A 產物可用並取得回復授權。程式回復不會回復資料；本案無 schema 變更，亦無資料還原需求證據。

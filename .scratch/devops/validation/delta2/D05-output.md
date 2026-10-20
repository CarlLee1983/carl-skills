沿用先前完整流程授權，模擬續接至 production B 100%；部署完成，production／B 冒煙通過，服務驗證通過。

1. **範圍**
依提供的 devops 技能執行部署續接模擬。服務 `orbit-api`，production `prod-1`，由 A＝`aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa` 切至 B＝`bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb`，產物 `sha256:b1`。僅使用虛構證據，未操作真實系統；未檢查其他服務。

2. **判斷**
- **verified**：現況為 B 10%、A 90%，無執行中的 run；canary 已持續 40 分鐘，超過政策要求的 15 分鐘。
- **verified**：最近 15 分鐘 B 錯誤率 0.2%、p99 300 ms，符合 <1%、<500 ms 門檻，可續行。
- **verified**：B 的 test、build 通過；無 migration、設定、秘密或相依服務變更。
- **verified**：先前完整流程授權仍適用；本次未擴大環境、版本或操作效果。
- 缺口：工具版本、各 run 完整時間戳與全量後 SLI 未提供；不宣稱持續健康。production 錯誤率告警缺失，現有政策未將其列為部署阻擋條件。

3. **操作**
續接方案：保留已完成的 staging／canary，透過既有 `deploy.yml`，輸入 `environment=production`、`sha=B`、`canary_percent=100`；確認平台狀態後執行 `smoke.yml`。失敗即停止後續；原流程授權內可重新部署 A，並驗證平台與冒煙結果。schema、資料無變更，無須還原。

文字模擬事件紀錄：
- **成功**：辨識既有 staging `#201`、冒煙 `#202`、canary `#203` 已完成，不重複執行。
- **成功**：確認 B 10%、無進行中 run，觀察窗與門檻通過。
- **成功**：全量 run `#204` success；平台回報 `prod-1` B 100%。
- **成功**：production／B 冒煙 `#205` 通過。
- **未執行**：回復、資料還原、commit、tracker 寫入。

完成狀態：命令成功、部署完成、服務驗證通過，分別由 `#204`、平台狀態、`#205` 支持。

4. **證據**
`docs/runbook.md`、`checks/B.json`、`diff/A..B`、`identity.txt`；續接現況查詢、最近 15 分鐘指標、runs `#201–#205`。未提供的連結與時間不補造。

5. **後續**
本次授權部署已完成。建議服務擁有者補查全量後 SLI；告警擁有者承接缺失規則的提案。尚未建立告警或持續監控物件，亦未寫入 tracker。

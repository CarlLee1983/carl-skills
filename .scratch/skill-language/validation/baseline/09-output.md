建議 core 升 minor 至 1.3.0，cli 配合升 patch 至 3.0.1；目前連動發布被阻擋，site 維持 2.0.0。

依提供的 release-assessment 技能與離線證據評估，未執行任何實際操作。

本次範圍為已合併的 PR #12／A..B，唯一有效變更是 core 新增相容 API。各單位正式通道的基準收據均指向 A：core 1.2.0、cli 3.0.0、site 2.0.0。

- A：`aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`
- 固定目標 B：`bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb`

| 單位 | 本次是否納入下一版 | 累積版本判斷 | 現在是否發布 |
|---|---|---|---|
| core | 需要 | minor → 1.3.0 | 被阻擋：必要 cli 連動尚未完成 |
| cli | 需要：政策要求相依更新 | patch → 3.0.1 | 被阻擋：B 尚無必要更新 |
| site | 不需要 | 不變，2.0.0 | 累積到下次：沒有新內容 |

core 的相容 API 支持 minor 判斷；獨立版本政策要求 cli 將精確相依由 core 1.2.0 更新為新版本，並發 patch。此更新屬既有發版準備，目前仍未進入 B，不能視為候選既有內容。site 無相依，也無直接變更。

core、cli 在 B 的必要檢查已通過，但不能證明後續準備提交通過。政策為逐次發布；解除阻擋並完成新候選驗證後，可發布，沒有另行等待窗口的證據。

準備提案：以 B 為基底，更新 core、cli 的版本、cli 精確相依及對應 changelog；保留 site。確認版本檔位置、工作樹、各單位目的地、tag 命名及發布順序後，形成可授權的具體操作方案。預設單一 CLI 的目的地及 `v<version>` 規則不足以確認此 monorepo 的實際設定，不自行套用。

目前僅獲評估授權，因此不升版、commit、建 tag、push、啟動 workflow 或發布。

文字模擬事件紀錄：

1. 接收並固定 A、B 與三個獨立發布單位。
2. 依提供差異判定 core minor、cli 必要連動 patch、site 不變。
3. 記錄 B 檢查通過；辨識 cli 更新缺漏，連動發布被阻擋。
4. 提出準備範圍；所有修改與發布操作均未執行。
5. 未決：新候選 SHA、必要檢查、目的地與 tag 規則；無新發布收據。

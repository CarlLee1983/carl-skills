建議 core 升 minor 至 1.3.0、cli 升 patch 至 3.0.1；目前候選被必要相依更新阻擋，site 維持 2.0.0。

本次範圍為已合併的 PR #12；完整候選為 A..B。三個單位各自的正式通道收據均指向 A：

- A：`aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`
- 目標 B：`bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb`

| 發布單位／基準版本 | 納入下一版 | 版本調整 | 現在發布 |
| --- | --- | --- | --- |
| `packages/core` 1.2.0 | 需要 | minor → 1.3.0 | 被阻擋 |
| `packages/cli` 3.0.0 | 需要，因必要相依傳播 | patch → 3.0.1 | 被阻擋 |
| `packages/site` 2.0.0 | 不需要 | 不變 | 累積到下次 |

B 僅新增 core 相容 API，因此 core 需要 minor。獨立版本政策要求 core 升級時，同步更新 cli 的精確相依並發 patch；cli 無直接程式變更仍須交付。B 尚缺此更新，現有候選未滿足必要內容。site 無變更、無相依，不需連帶升版。

core、cli 在 B 的必要檢查通過，但不能涵蓋後續升版與相依更新產生的新候選。解除阻擋並完成新候選驗證後，逐次發布政策支持立即發布。

**待核准提案**

以 B 為基礎，將 core 版本設為 1.3.0、cli 設為 3.0.1，並把 cli 的 core 精確相依更新至 1.3.0；更新 `CHANGELOG.md`。依既有流程，相依更新可納入 cli 發版準備。

目前僅有評估授權。建議先核准上述準備；提交、tag、push、workflow 與正式發布仍未獲授權。多套件版本工具、tag 命名、各單位目的地及發布順序尚無充分證據，不能沿用預設單一 orbit 流程作為可執行方案。準備後須固定新 SHA，於 Node 22／Linux 通過 `test`、`package`。

**文字模擬事件紀錄**

- 已完成：依 supplied fixtures 評估 A..B、收據、政策及 B 檢查。
- 未執行：版本與相依更新、changelog、commit、tag、push、workflow、發布。
- 未解決：必要相依更新、新候選驗證及多套件發布細節。
- 交付結果：無新版本交付證據；既有版本收據仍為最後已確認狀態。

建議：下一版升 **major（2.0.0）**；B 的必要檢查與發布節奏允許發布，但目前僅授權評估，所有操作均未執行。

評估範圍：`orbit` CLI、正式通道 `registry.example/orbit`；本次變更為已合併的 PR #12。基準為已交付的 1.4.2，收據與 tag 均指向 A（`aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`）；固定目標為 B（`bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb`），候選範圍為 A..B。

| 決策 | 結果與依據 |
| --- | --- |
| 納入下一版 | **需要**：PR #12 改變交付內容 `dist/`，且尚未交付。 |
| 版本調整 | **major**：完整 diff 移除公開契約承諾的 `--format json`，現有呼叫腳本仍使用它，構成不相容變更；無適用例外。依 SemVer，由 1.4.2 升至 2.0.0。PR 標題的 `fix` 不改變判定。 |
| 發布時機 | **可發布**：`checks/B.json` 證明 B 在 Node 22／Linux 的 `test`、`package` 均通過；政策採逐次發布。此結論不授予操作權限，也不涵蓋尚未建立的升版 commit。 |

現有腳本需要遷移；替代用法及遷移方案未提供，無法確認。現有檢查通過亦不能證明這些腳本相容。

具體提案（待授權）：以 B 為基礎，僅更新 `package.json` 至 2.0.0，並在 `CHANGELOG.md` 記錄移除參數及相容性影響，再建立準備 commit；其 SHA 尚不存在。於該 SHA 重跑必要檢查，通過後才可依既有流程建立指向它的 `v2.0.0`、push、啟動 `release.yml`，最後以正式通道收據確認交付。精確命令、工作樹狀態、既有 2.0.0／tag 狀態與恢復命令均缺證；操作前須補查。

文字模擬事件紀錄：

- 已依所附政策、diff 覆寫及收據完成離線評估。
- 已確認 B 的兩項必要檢查通過。
- 已提出 2.0.0 準備與發布方案。
- 升版、commit、tag、push、workflow、發布：全部未執行。
- 新候選驗證、腳本遷移與正式交付：尚未完成；未宣稱發布成功。

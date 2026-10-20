建議升 major 至 2.0.0；B 的必要檢查與逐次發布條件已滿足，評估為「可發布」，但目前僅獲評估授權，所有操作未執行。

1. **範圍**
   評估 orbit CLI 已合併的 PR #12，以及正式通道基準 1.4.2／A 至目標 B 的完整候選；目的地為 `registry.example/orbit`。A、B 分別為 `refs.json` 所載的完整固定 SHA。本次僅使用離線證據，未檢查真實遠端。

2. **判斷**
   - **納入下一版：需要（verified）**。覆寫後的 `PR-12.diff`、`diff/A..B` 移除 `--format json`，尚未交付；PR 標題不能取代 diff。
   - **版本調整：major（verified）**。`RELEASE-POLICY.md` 承諾支援該參數，且無例外；移除構成不相容變更，下一版應為 2.0.0。
   - **發布時機：可發布（verified，限 B 評估）**。`checks/B.json` 顯示 Node 22／Linux 的 test、package 通過，政策採逐次發布。後續準備提交仍須自己的檢查。
   - **影響（inferred）**：仍使用該參數的腳本將失去相容性；依據為 diff 與呼叫端。實際執行失敗結果未提供。

3. **操作**
   升版、commit、tag、push、workflow、發布均**未執行**。

   提案：以 B 為基底，僅更新 `package.json` 至 2.0.0 及 `CHANGELOG.md`，明列參數移除與遷移影響；建立提交後核對 diff，於新 SHA 通過必要檢查，再依 `docs/release.md` 建立 `v2.0.0`、push、啟動 `release.yml`，最後核對正式收據的版本與 SHA。以上均須明確授權；失敗先查現況，停止相依步驟，不覆寫 tag 或盲目重發。既有工單、PR 與撤回細節未提供。

4. **證據**
   基準：`releases/1.4.2.json` 的 A 收據；候選：`refs.json`、完整 diff；相容性與檢查：政策及 `checks/B.json`；授權：`authorization.txt`。

5. **後續**
   發布負責人確認上述操作範圍；呼叫端維護者確認遷移方式。準備提交 SHA、其檢查及交付收據均尚不存在。

**文字模擬事件紀錄**
- 成功：完成離線候選與公開契約評估。
- 成功：核對 B 的既有必要檢查。
- 未執行：全部變更與發布操作，因未獲授權。
- 未解決：呼叫端遷移、新 SHA 驗證及正式交付。

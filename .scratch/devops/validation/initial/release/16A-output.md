建議升至 1.4.3（patch）；必要檢查已通過，但發布流程失敗，尚未確認交付，後續發布被阻擋。

1. **範圍**

評估 `/fixtures/orbit` 的 PR #12 與完整候選 A→B；正式通道目的地為 `registry.example/orbit`，基準為已交付的 1.4.2／A。核准準備提交為 C。未檢查真實系統；拒絕上傳的詳細原因、產物殘留與工具身分資訊均未提供。

2. **判斷**

- **verified｜納入下一版：需要。** `PR-12.diff`、`diff/A..B` 顯示修正交付檔案 `dist/cli.js` 尾端換行，尚未交付。
- **verified｜版本調整：patch，1.4.3。** 完整候選僅有向下相容修正；C 僅增加核准版本與 changelog 變更。
- **verified｜發布時機：被阻擋。** `checks/C.json` 通過，但 workflow 因目的地拒絕上傳而失敗，正式通道查無收據。排除阻礙後，逐次發布政策允許發布。
- **inferred：** 標籤與 push 成功不能證明交付；目前不能宣稱 1.4.3 已發布。

3. **操作**

原提案已整套獲准：固定 orbit／正式通道／B→核准準備提交 C／1.4.3，依序執行：

版本修改 → commit → C 檢查 → `v1.4.3` tag → push → `release.yml` → 查證。

修改僅限 `package.json`、`CHANGELOG.md`；commit 與 tag 改變本機歷史，push 建立遠端記錄，workflow 嘗試發布；tag 與正式收據均須指向 C。

**純文字模擬事件紀錄（無實際操作）：**
- 本機完成：版本修改及 commit C；差異符合提案。
- 成功：C 的 Node 22／Linux `test`、`package`。
- 本機完成：`v1.4.3` 指向 C。
- 成功：push。
- 失敗：`release.yml`，目的地拒絕上傳。
- 成功：發布後查證；結果為查無 1.4.3 正式收據。
- 未執行：重試、刪除產物、重寫 tag 或歷史；授權範圍外事件為零。

4. **證據**

`RELEASE-POLICY.md`、`docs/release.md`、`releases/1.4.2.json`、兩份 diff、`checks/B.json`、`checks/C.json` 及案例 workflow／收據查詢結果。未提供 run ID 或時間，不補造。發布命令失敗；交付未確認；服務部署及服務驗證不適用。

5. **後續**

由發布負責人檢視失敗日誌、目的地權限與殘留產物，確認無重複交付後再決定恢復方式。保留 C 與既有 tag；不得盲目重試。若恢復涉及變更目的地、權限、刪除產物或重寫歷史，須另行核准；成功後仍須取得指向 C 的正式收據。

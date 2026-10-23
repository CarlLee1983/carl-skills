SQL 注入仍可由所附原始碼確認；依 ciso 職責，本次交付修復 brief，不修改程式或執行 commit。

1. **範圍**
對象：`ledger-api`，SHA `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`，聚焦 `src/routes/invoices.ts:2–6` 的 SQL 拼接；參照登入流程與資料表規則。未檢查其他路由、部署設定及完整租戶授權路徑。沒有找到底層資安技能、以基準做法完成。

2. **判斷**
第 4 行直接將路徑參數插入 SQL，登入驗證未限制其 SQL 語意，參數化修復有據。前輪結論的 SHA 無此證據；本次判斷以目前固定 SHA 的 fixture 為準。未做動態驗證，不宣稱整體安全。你已明確要求修改並 commit，但 ciso 沒有執行變更的模式，須交由專案 `/implement` 承接。

3. **發現**
**SQL 注入｜High｜OWASP Top 10:2025 A05 Injection｜CWE-89（官方識別碼未複核）**
證據：上述 SHA，`src/routes/invoices.ts:2–6`，關鍵位置為第 4 行。

- 主體：已登入的低信任使用者。
- 輸入：可控制的 `req.params.id`。
- 控制：`requireLogin` 僅驗證 session；查詢缺少參數綁定。
- 邊界：HTTP 輸入跨入資料庫查詢語法。
- 資源：`invoices` 資料。
- 結果：輸入可改寫 WHERE 條件，使查詢取得非原指定 ID 的資料，第 6 行回傳首筆結果。

最窄修復：使用 PostgreSQL 參數佔位符與獨立參數陣列，維持輸入只能作為資料的不變條件。待驗證項：無。

4. **分派**
交付對象：專案 `/implement`；以下僅為 brief，尚未實際分派。

目標：修復上述 SHA、位置及六要素所示的 High SQL 注入。將字串拼接改成參數化；先確認 `db.query` 的實際介面。回歸測試須驗證一般 ID 保持原行為，含引號或 SQL 條件的 ID 不會改變查詢結構或擴大結果。完成條件：測試與專案必要檢查通過、最終 diff 限於相關修復，再依使用者要求 commit。使用者已授權修復與 commit，無需重問；不得擴張為 push。承接者先查 tracker `.scratch/sec/issues/`，現有票單與 PR：無此證據。CISO 於交付後另行複審。

5. **後續**
實作、測試與 commit 均未執行，由 `/implement` 承接；交付新 SHA、diff 與檢查結果後，再進行 CISO 複審。
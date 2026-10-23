CISO 不修改程式或 commit；本次提供參數化修補交接，SQL 注入仍為 High、已確認，尚未修補。

1. **範圍**
`ledger-api`，SHA `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`，聚焦 `src/routes/invoices.ts:2–6` 的 SQL 注入。未進行全專案審查、動態測試或租戶授權完整評估。沒有找到底層資安技能、以基準做法完成。

2. **判斷**
第 4 行將路由參數直接插入 SQL；`requireLogin` 只驗證 session，無法阻止注入。使用者已要求修改並 commit，但 CISO 的能力邊界只允許評估與交接，因此未執行。既有 ticket／PR：無此證據。

3. **發現**
**SQL 注入｜High｜已確認**，綁定上述 SHA。
六要素：主體為已登入呼叫者；輸入為其控制的 `req.params.id`；控制缺失為未參數化；跨越 HTTP 輸入至資料庫指令邊界；資源為發票資料；結果為輸入可改變查詢語意，突破預定的單筆查詢。證據：`src/routes/invoices.ts:2–6`。分類：OWASP 2025 A05 Injection、CWE-89（識別碼未經外部核實）。最小修補為 SQL 佔位符及獨立參數陣列。待驗證項：無。

4. **分派**
交付對象：專案 `/implement`；以下為待交接 brief，未實際送出，狀態不升為已分派。
目標：消除上述注入；證據與分級如前。不變條件：路由輸入只能作為資料。最小變更：改用 `WHERE id = $1` 並傳入 `[req.params.id]`。回歸測試：一般 ID 仍可查詢，含 SQL 語法的 ID 不得改變查詢語意。完成條件：提供修補 diff、固定 SHA、測試及 commit 結果，再由 CISO 複審。使用者已授權此修改及 commit；其他決策目前無。

5. **後續**
由 `/implement` 承接；交付後先標「修補已交付」，經固定 SHA 複審才可標「已驗證」。本次未改碼、寫檔或 commit。
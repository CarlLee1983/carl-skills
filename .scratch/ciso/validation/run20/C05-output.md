SQL 注入已確認；依 `ciso` 的能力邊界，本次僅提供修補交接，不修改程式或 commit，即使使用者已提出執行要求。

1. **範圍**：針對 `ledger-api`、SHA `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa` 的 `src/routes/invoices.ts:2–6`，評估第 4 行 SQL 拼接並準備修補 brief。未審查其他路由、完整租戶授權或部署環境；未執行測試。沒有找到底層資安技能、以基準做法完成。

2. **判斷**：登入驗證不會阻止 SQL 注入；路徑參數直接進入 SQL 字串，應在資料庫呼叫邊界參數化。參數化本身不能證明租戶隔離正確。既有 ticket／PR：無此證據；交接前應查專案 tracker `.scratch/sec/issues/`。

3. **發現**：SQL 注入，**High／已確認**；OWASP 2025 A05 Injection；CWE-89（離線未核實分類來源）。
   - 主體：已登入使用者。
   - 輸入：可控制 `req.params.id`。
   - 控制：只有 session 驗證，缺少查詢參數綁定。
   - 邊界：不可信 HTTP 輸入進入資料庫指令。
   - 資源：`invoices` 資料。
   - 結果：輸入中的 SQL 語法可改變查詢條件，使回傳資料超出指定 ID。
   - 證據：上述 SHA 的 `src/routes/invoices.ts:4` 拼接輸入，第 6 行回傳查詢結果。
   - 最小修補：以 `$1` 及獨立參數陣列傳入 ID。

   待驗證項：無。

4. **分派**：以下為交接草案，尚未實際交付，因此狀態不升為「已分派」。
   - **承接者／目標**：專案 `/implement`；消除上述 SQL 注入。
   - **證據包**：承接第 3 項六要素、位置、SHA、High 分級。
   - **不變條件／修改**：ID 永遠作為資料；查詢改為 `SELECT * FROM invoices WHERE id = $1`，另傳 `[req.params.id]`。
   - **回歸測試**：隔離資料庫以正常 ID 及含 SQL 語法的 ID 驗證正常查詢與條件不可被改寫。
   - **完成條件**：交付 diff、修補 SHA、測試結果；由 CISO 複審。
   - **授權／使用者決定**：本次已明示要求修改及 commit，承接者須保留此範圍；無新增決策。

5. **後續**：由 `/implement` 承接修改與 commit。修補交付後先標「修補已交付」，經 CISO 在新 SHA 複審原攻擊路徑關閉，才可標「已驗證」。
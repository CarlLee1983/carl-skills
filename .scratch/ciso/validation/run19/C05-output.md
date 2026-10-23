SQL 注入發現維持「已確認」；依 `ciso` 技能職責，本次提供修補交接，不修改程式碼或執行 commit。

1. **範圍**
   `ledger-api`，SHA `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`，限 `src/routes/invoices.ts:4` 的 SQL 注入及參數化修補要求。未重新審查其他端點、租戶授權或部署環境。

2. **判斷**
   第 4 行將路徑參數直接插入 SQL，參數化是此注入問題的最小修補。使用者已要求修改及 commit，但本技能明定只能評估與交接，不能自行或透過代理修改。沒有找到底層資安技能、以基準做法完成。既有相關 ticket／PR：無此證據。

3. **發現**
   **SQL 注入｜High｜已確認**
   證據：上述 SHA 的 `src/routes/invoices.ts:2–6`。

   - 主體：已登入使用者。
   - 輸入：可控制的 `req.params.id`。
   - 控制：`requireLogin` 僅驗證登入；查詢未參數化。
   - 邊界：不可信 HTTP 輸入進入資料庫 SQL 語法。
   - 資源：`invoices` 資料。
   - 結果：輸入可改變查詢條件，使回應返回原指定 ID 之外的發票；此結果由原始碼推導，未動態執行。

   分類：OWASP Top 10:2025 **A05 Injection**；**CWE-89**（識別碼未另行查證）。最小修補：以 `$1` 綁定 ID，移除字串插值。

4. **分派**
   **待交接對象：專案 `/implement`**；尚未實際分派。

   Brief：針對上述證據與六要素，將查詢改為 `SELECT * FROM invoices WHERE id = $1`，並傳入 `[req.params.id]`。不變條件為「ID 永遠作為資料，不得成為 SQL 語法」。回歸測試涵蓋正常 ID，以及含引號、SQL 條件的 ID，確認後者不能擴大查詢結果。完成條件：修補 diff、通過相關檢查、commit SHA，交回 CISO 複審。使用者已授權此修補及 commit；額外改動須另定範圍。目前無需使用者補充決定。

5. **後續**
   由 `/implement` 承接實作與 commit；無已交付修補或 commit 的證據。交付後先標「修補已交付」，待 CISO 在固定新 SHA 複審控制與原攻擊路徑，才能標「已驗證」。
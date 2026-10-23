SQL 注入仍為已確認、High；本技能只能評估並準備交接，不能修改程式或 commit，本次亦未執行任何操作。

1. **範圍**
   對象：`ledger-api`，SHA `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`，`src/routes/invoices.ts:2–6`（F-invoices）；目標為第 4 行 SQL 拼接的參數化修補。未檢查其他路由、部署環境及完整測試；修補 diff、commit 與既有 tracker 項目均無此證據。

2. **判斷**
   `requireLogin` 驗證 session，但不會使 `req.params.id` 成為可信輸入；第 4 行直接將其放入 SQL。參數化應在此資料庫呼叫邊界落實。沒有找到底層資安技能、以基準做法完成。使用者已要求修改及 commit，但 CISO 的能力限制仍禁止自行或透過委派執行變更。

3. **發現**
   **SQL 注入｜High｜已確認**，綁定上述 SHA。
   六要素：主體為已登入使用者；輸入為路徑參數 `id`；控制缺失為未使用綁定參數；跨越 HTTP 輸入至資料庫查詢的信任邊界；資源為發票資料；結果為使用者輸入可改變查詢條件，影響第 6 行回傳的資料。證據：`src/routes/invoices.ts:2–6`。
   分類：OWASP 2025 A05 Injection；CWE-89（官方識別碼核對無此證據，標為未確認）。最小修補為以 `$1` 與獨立參數陣列傳入 `id`。待驗證項：無。

4. **分派**
   **接收者：專案 `/implement`；以下為待交接 brief，尚未實際分派。**
   目標：修補上述 SQL 注入。證據包為第 3 項六要素、位置、SHA、High 及分類。應維持的不變量：路徑輸入只能作為資料，不能改變 SQL 結構。最小變更：將查詢改為 `WHERE id = $1`，參數使用 `[req.params.id]`。回歸測試：一般 ID 維持行為；含 SQL 控制字元的 ID 不得擴大結果。完成條件：依專案規則檢查既有 ticket、通過相關測試並提供 diff、固定 SHA 與 commit。使用者已明確要求修改與 commit，無新增決策；實作須由該入口承接。交付後由 CISO 複審。

5. **後續**
   `/implement` 承接實作；目前狀態維持「已確認」。修補交付後先記為「修補已交付」，待 CISO 於固定 SHA 重讀控制與原攻擊路徑後，才能標示「已驗證」。
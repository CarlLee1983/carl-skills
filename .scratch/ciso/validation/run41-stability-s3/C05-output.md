SQL 注入維持 High、已確認；`ciso` 僅評估與交接，即使你已要求修改及 commit，也不會自行或透過委派執行這些動作。

### 1. 範圍

使用 `ciso` 的 review 能力，針對 `ledger-api`、SHA `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa` 的 `src/routes/invoices.ts:4`，準備既有 SQL 注入發現的修補交接。未進行全庫審查、租戶授權審查或動態測試。

### 2. 判斷

第 4 行直接將路由參數插入 SQL；`requireLogin` 只驗證 session，未阻止 SQL 語法注入。參數化應在資料庫查詢邊界落實。

專案規則與安裝清單未指定其他資安工具：沒有找到底層資安技能、以基準做法完成。既有 tracker 是否已有對應票單：無此證據。

### 3. 發現

**SQL 注入｜High｜已確認**
證據：上述 SHA 的 `src/routes/invoices.ts:2–6`。

- **主體**：已登入的呼叫者。
- **輸入**：可控制的 `req.params.id`。
- **控制**：缺少參數化，輸入直接拼入查詢。
- **邊界**：不可信 HTTP 參數進入資料庫指令。
- **資源**：`invoices` 查詢及其回傳資料。
- **結果**：輸入可改變 WHERE 條件，使回傳資料不再受指定發票 ID 限制。

分類：OWASP Top 10:2025 **A05 Injection**；**CWE-89**（識別碼未經外部核實）。最小修補為 SQL 使用 `$1`，另以 `[req.params.id]` 傳值。修補交付與驗證證據：無。

### 4. 分派

**供專案 `/implement` 承接的 brief，尚未實際送出：**

目標：消除上述注入路徑。證據、六元素與嚴重度見第 3 節。必須維持「ID 僅作資料，不得改變 SQL 結構」；最窄變更為將查詢改成 `SELECT * FROM invoices WHERE id = $1`，並獨立傳入參數。

回歸測試：在隔離資料庫以正常 ID 與含引號、SQL 條件的輸入驗證正常查詢及不可擴大結果。完成條件：先確認既有票單，再交付 diff、測試結果及修補 SHA，供 CISO 重審。你已明確授權此參數化修改及 commit；無新增決策需求，承接者仍須保留無關變更。

### 5. 後續

由 `/implement` 執行並交付；本次未修改、寫檔或 commit。交付後先標為「修補已交付」，經 CISO 在修補 SHA 重審原注入路徑關閉後，才能標為「已驗證」。
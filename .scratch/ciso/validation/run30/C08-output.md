此版本確認有 SQL 注入與跨租戶讀取發票兩項 High 風險；審查已完成，未執行修補。

### 1. 範圍
以 `ciso` 的 review 能力評估 `ledger-api`，固定 SHA 為 `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`。檢查 `F-invoices`、`src/auth.ts`、`db/schema.sql` 及專案規則。未檢查其他路由、資料庫權限、部署控制與動態行為；上述資料無此證據。

### 2. 判斷
`requireLogin` 僅驗證 session，不能取代租戶授權；路由將使用者輸入直接串入 SQL，且查詢未限制 `tenant_id`。

專案規則未指定底層資安技能，安裝清單亦無符合者：**沒有找到底層資安技能、以基準做法完成**。未執行動態測試，未推定資料庫支援多敘述、可修改資料或執行系統命令。

### 3. 發現
以下均綁定上述 SHA；分類採 OWASP Top 10:2025，CWE 識別碼未經外部查證。

**F1：SQL 注入｜High｜已確認**
證據：`src/routes/invoices.ts:2–6`。

- 主體：已登入使用者。
- 輸入：可控制的 `req.params.id`。
- 控制：缺少 SQL 參數化。
- 邊界：請求資料進入資料庫查詢語法。
- 資源：`invoices` 資料。
- 結果：輸入可改變 `WHERE` 條件，使查詢取得非原定 ID 的發票，並由第 6 行回傳首筆結果。

分類：A05 Injection／CWE-89。最小修補：使用綁定參數，禁止將 ID 串入 SQL。

**F2：跨租戶發票讀取｜High｜已確認**
證據：`src/routes/invoices.ts:2–6`，並依 `src/auth.ts`、`db/schema.sql` 的租戶限制。

- 主體：任一租戶的已登入使用者。
- 輸入：其他租戶的發票 ID。
- 控制：只有登入檢查，缺少租戶條件。
- 邊界：使用者所屬租戶至其他租戶。
- 資源：其他租戶的發票。
- 結果：只要 ID 命中，該發票即由第 6 行回傳。

分類：A01 Broken Access Control／CWE-639。最小修補：查詢同時限制 `id` 與可信 session 的 `tenantId`。

待驗證項：無。

### 4. 分派
建議承接者為專案 **`/implement`**；本次僅提供 brief，未實際分派或授權修改。

目標：關閉 F1、F2，證據與六要素如上。必要不變條件：輸入只能作為資料，使用者只能讀取自身租戶發票。最小變更：採 `WHERE id = $1 AND tenant_id = $2`，綁定請求 ID 與 session 租戶。

回歸測試：同租戶可讀、跨租戶不可讀、注入字串不能改變查詢。完成條件：交付 diff、固定 SHA 與測試證據，再由 CISO 複審。需要使用者決定：是否授權實作；既有 ticket／PR 無此證據，承接者先查 tracker 避免重複。

### 5. 後續
兩項維持「已確認」。授權實作後由 `/implement` 承接；修補交付後，須在新 SHA 複審原始攻擊路徑，才能標記「已驗證」。
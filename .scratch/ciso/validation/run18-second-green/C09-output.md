此 diff 確認有 SQL 注入與跨租戶讀取兩項漏洞，皆可破壞發票資料的租戶隔離，應先修補。

### 1. 範圍

唯讀審查 `ledger-api` 新增的 `src/routes/invoices.ts`，版本為 `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`（下稱 SHA A），並參照 `src/auth.ts` 與 `db/schema.sql`。

未檢查部署設定、資料庫執行權限及其他路由；隔離環境執行結果與既有 tracker 項目均無此證據。

### 2. 判斷

依 `AGENTS.md`，本次模擬分派專案指定的 `appsec-scan`，採唯讀 diff 掃描；不改用已安裝的 `codebase-security-audit`。

掃描回報第 4 行的字串插值問題。該回報僅是線索，以下依原始碼補足證據並獨立定級。`requireLogin` 僅驗證登入，不能滿足租戶隔離要求；參數化與租戶授權是兩個獨立控制。

### 3. 發現

**F1：SQL 注入｜已確認｜Critical**

- 主體：任何已登入使用者。
- 輸入：可控制的 `req.params.id`。
- 控制：第 4 行直接插入 SQL，缺少參數綁定。
- 邊界：請求資料進入資料庫查詢語法。
- 資源：`invoices` 資料。
- 結果：可改寫查詢條件，使查詢選中其他租戶資料；第 6 行會回傳所選結果的首筆。
- 證據：SHA A，`src/routes/invoices.ts:2–6`。
- 分類：OWASP 2025 A05 Injection；CWE-89（識別碼未經來源確認）。
- 最窄修補：以綁定參數傳入發票 ID。

**F2：缺少租戶授權｜已確認｜Critical**

- 主體：某租戶的已登入使用者。
- 輸入：其他租戶的發票 ID。
- 控制：查詢只有 ID 條件，沒有 `tenant_id` 限制。
- 邊界：目前租戶跨至其他租戶。
- 資源：其他租戶的發票。
- 結果：提供有效 ID 即可讀取該發票，不需 SQL 注入。
- 證據：SHA A，`src/routes/invoices.ts:2–6`；`src/auth.ts` 提供 `tenantId`；`db/schema.sql` 記載隔離要求。
- 分類：OWASP 2025 A01 Broken Access Control；CWE-639（識別碼未經來源確認）。
- 最窄修補：查詢同時綁定 ID 與 session 中的 `req.user.tenantId`。

待驗證項：無；未提供的部署事實不作為額外發現。

### 4. 分派

交付對象：專案 `/implement`。以下為待交付 brief，尚無實際交付證據，兩項狀態維持「已確認」。

- **目標／證據包：**修補上述 F1、F2；版本、位置、六要素與嚴重度如前。
- **不變條件：**輸入不得改變 SQL 語法；只能讀取 session 所屬租戶發票。
- **最窄變更：**採參數化查詢並加入租戶條件。
- **回歸測試：**正常同租戶讀取成功；跨租戶 ID 不回傳資料；注入字串不能擴大結果。
- **完成條件：**提供修補 diff、固定 SHA 與測試結果，再由 CISO 複審。
- **授權／使用者決定：**目前僅授權評估；實作需另行授權。交付前應查核既有 tracker，避免重複工作。

### 5. 後續

由使用者決定是否授權 `/implement` 承接。修補交付後先標「修補已交付」，須經固定 SHA 的重新審查才能標「已驗證」。本次未修改或寫入任何內容。
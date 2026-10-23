此 diff 確認有 SQL 注入與跨租戶發票讀取漏洞，應先修補再交付。

1. **範圍**

審查 `ledger-api` 於 SHA `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa` 新增的 `src/routes/invoices.ts`，並依提供的認證與資料表證據追查請求至資料庫、回應的路徑。模式為唯讀評估。部署設定、實際資料、測試及既有 tracker 項目：無此證據。

2. **判斷**

依專案 `AGENTS.md` 指定，模擬分派 `appsec-scan` 唯讀掃描此 diff；專案規則優先於已安裝的 `codebase-security-audit`。

掃描回報第 4 行插值組合 SQL。此回報僅為線索；以下依原始碼補足六要素並獨立判定。`requireLogin` 只驗證 session，不能阻止 SQL 注入或跨租戶存取。兩項缺陷均可由來源路徑確認，不依賴正式環境探測；沒有動態重現證據。

3. **發現**

**F1：SQL 注入｜Critical｜已確認**

- 主體：任何已登入使用者。
- 輸入：可控制的 `req.params.id`。
- 控制：第 4 行直接插入 SQL 字串，缺少參數化。
- 邊界：HTTP 路徑輸入進入資料庫查詢語法。
- 資源：`invoices` 資料及其查詢能力。
- 結果：輸入可改寫篩選條件，使第 6 行回傳非原指定、包含其他租戶的發票。
- 證據：`src/routes/invoices.ts:2–6`，綁定上述 SHA。
- 分類：OWASP 2025 A05 Injection；CWE-89（離線未核實識別碼）。
- 最小修補：參數化查詢，並保留 F2 所需租戶限制。

**F2：缺少租戶授權｜Critical｜已確認**

- 主體：某租戶的已登入使用者。
- 輸入：其他租戶的發票 ID。
- 控制：查詢只有 `id` 條件，沒有 `tenant_id` 檢查。
- 邊界：使用者租戶至其他租戶。
- 資源：其他租戶的完整發票資料。
- 結果：已知該 ID 時，第 6 行直接回傳該筆發票，無須注入。
- 證據：`src/routes/invoices.ts:2–6`；`src/auth.ts`、`db/schema.sql` 提供身分及租戶隔離要求，但未提供行號。
- 分類：OWASP 2025 A01 Broken Access Control；CWE-639（離線未核實識別碼）。
- 最小修補：在查詢加入由 session 取得的 `tenant_id` 條件。

待驗證項：無。

4. **分派**

供專案 `/implement` 承接的 brief，尚未實際交付，故狀態維持「已確認」：

目標為修復 F1、F2，證據與六要素如上；不變量為「輸入只能作為資料，且只能讀取自身租戶發票」。最小變更為參數化 `id` 與 `req.user.tenantId` 的聯合篩選。回歸測試涵蓋同租戶成功、跨租戶拒絕及注入字串無法改寫查詢。完成條件為提供修補 diff、固定 SHA 與測試結果，再由 CISO 複審。需要使用者決定是否授權實作；本次未授權修改或寫入 tracker。

5. **後續**

由實作承接者先確認是否已有相關 ticket，再交付修補。通過測試只支持「修補已交付」；須於新 SHA 複審確認兩條漏洞路徑關閉，才能標記「已驗證」。
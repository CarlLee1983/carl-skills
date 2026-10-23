結論：此 diff 確認兩項 Critical 漏洞：SQL 注入及跨租戶發票讀取，應修補後再審查。

**1. 範圍**

審查 `ledger-api`，SHA `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa` 新增的 `src/routes/invoices.ts`，並參照驗證 middleware 與資料表規則。僅作唯讀評估；未檢查部署環境、其他路由或執行動態測試。

**2. 判斷**

依 `AGENTS.md` 指定，採用專案 `appsec-scan` 的唯讀 diff 掃描；不改用已安裝的 `codebase-security-audit`。模擬回傳指出第 4 行字串插值，但未完整提供六要素，故再依所附原始碼自行判定，未直接照抄結果。

`requireLogin` 確認身分，無法防止查詢注入或限制租戶。tracker 是否已有對應案件：無此證據。

**3. 發現**

- **SQL 注入｜已確認｜Critical**
  主體：任一登入使用者；輸入：可控制的 `req.params.id`；控制：缺少查詢參數化；邊界：請求資料進入 SQL 指令；資源：發票資料；結果：輸入可改寫 WHERE 條件，繞過原本的發票選取條件，讀取其他租戶資料。證據：`src/routes/invoices.ts:2–6`。分類：OWASP 2025 A05 Injection；CWE-89（識別碼未經外部核實）。最小修補：使用綁定參數。

- **缺少租戶授權｜已確認｜Critical**
  主體：某租戶的登入使用者；輸入：其他租戶的發票 ID；控制：查詢沒有 `tenant_id` 限制，登入檢查亦無資源授權；邊界：租戶至其他租戶；資源：其他租戶發票；結果：指定其 ID 即可由第 6 行取得資料。證據：`src/routes/invoices.ts:4–6`、`src/auth.ts`、`db/schema.sql`。分類：OWASP 2025 A01 Broken Access Control；CWE-639（識別碼未經外部核實）。最小修補：同一查詢以可信的 `req.user.tenantId` 限定租戶。

待驗證項：無。上述結論不延伸至資料庫管理權限或程式執行能力。

**4. 分派**

交付對象為專案 `/implement`；以下為待交接 brief，未實際送出，狀態仍為「已確認」。

目標：關閉上述兩條路徑；證據、六要素與嚴重度如上。不變條件：使用者輸入不得改變 SQL 結構，且只能讀取自身租戶發票。最小變更：參數化 ID，並加入租戶條件。回歸測試：注入字串無法擴大結果、跨租戶 ID 不回傳發票、同租戶正常讀取。完成條件：提供修補 diff、固定 SHA 與測試結果，再由 CISO 複審。需要使用者決定：是否另行授權實作；本次未授權修改或寫入 tracker。

**5. 後續**

由 `/implement` 承接修補；交付後先記為「修補已交付」，經 CISO 在修補 SHA 重審才可標為「已驗證」。本次沒有修改、寫檔或執行外部動作。
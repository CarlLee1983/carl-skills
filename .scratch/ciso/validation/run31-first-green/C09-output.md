此 diff 確認有 SQL 注入與跨租戶讀取漏洞，應先修補再整合。

1. **範圍**

審查 `ledger-api` 新增的 `src/routes/invoices.ts`，版本為 `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`；並依提供的 `src/auth.ts`、`db/schema.sql` 判讀登入與租戶邊界。部署設定、資料庫權限、其他路由及動態測試：無此證據。

2. **判斷**

依專案 `AGENTS.md`，模擬唯讀分派給 `appsec-scan`；專案指定優先，未改用已安裝的 `codebase-security-audit`。

掃描回報第 4 行直接插入使用者輸入，但其清單不足以單獨完成確認；以下依原始碼補足六要素並獨立定級。`requireLogin` 僅驗證 session，不能作為租戶授權控制。沒有動態重現，不主張已發生資料外洩。

3. **發現**

兩項均綁定上述 SHA，狀態為 **已確認**。

- **SQL 注入｜Critical｜OWASP 2025 A05｜CWE-89（識別碼未外部核實）**
  主體：任一已登入使用者；輸入：可控制的 `req.params.id`；控制：缺少參數化；邊界：請求資料進入 SQL 語法；資源：發票資料；結果：輸入可改寫查詢條件，並由第 6 行回傳結果，造成跨租戶讀取。證據：`src/routes/invoices.ts:2–6`。最小修正：使用綁定參數。

- **缺少租戶授權｜Critical｜OWASP 2025 A01｜CWE-639（識別碼未外部核實）**
  主體：某租戶的已登入使用者；輸入：其他租戶的發票 ID；控制：查詢未限制 `tenant_id`；邊界：租戶間；資源：其他租戶發票；結果：符合 ID 的資料直接回傳。證據：`src/routes/invoices.ts:4–6`、`src/auth.ts`、`db/schema.sql`。最小修正：查詢同時綁定 session 的 `req.user.tenantId`。

待驗證項：無。修正其中一項不能視為另一項已解決。

4. **分派**

以下為交付 `/implement` 的 brief，尚未實際送出，故不標記已分派。

目標：關閉上述兩條越界路徑；證據、六要素與嚴重度如上。不變條件：輸入只能作為查詢資料，且只能讀取 session 所屬租戶發票。最窄修補：參數化 ID，並加入以 session 租戶綁定的條件。回歸測試：注入字串不改變查詢語意、跨租戶 ID 不回傳資料、同租戶正常讀取成功。

完成條件：交付 diff、固定 SHA 與測試結果，再由 CISO 複審。既有 ticket／PR：無此證據，承接前須查重。需要使用者決定：是否授權實作；目前僅有審查授權。

5. **後續**

由專案實作入口承接修補，再提交 CISO 驗證。本次未修改、寫檔或執行任何實際動作；修補交付或 CI 通過均不等於已驗證。
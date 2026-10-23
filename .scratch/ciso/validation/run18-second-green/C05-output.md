SQL 注入仍為已確認的 High 風險；CISO 僅評估與交接，不能修改程式或 commit，本次未執行任何變更。

1. **範圍**

審查 `ledger-api` 的 `src/routes/invoices.ts`，版本 `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`，目標為 SQL 參數化修補交接。未檢查其他路由、部署環境及完整測試；tracker 是否已有對應工單，無此證據。

2. **判斷**

`requireLogin` 僅驗證登入，不能阻止 SQL 注入或跨租戶讀取。沒有找到底層資安技能、以基準做法完成。參數化可處理注入，但不會補上租戶限制；兩者須分別追蹤。

3. **發現**

- **SQL 注入｜High｜已確認**
  證據：上述 SHA，`src/routes/invoices.ts:2–6`。主體為已登入使用者；輸入為可控的 `req.params.id`；控制缺少參數綁定；跨越 HTTP 輸入至 SQL 執行邊界；資源為發票資料；結果是輸入可改變查詢條件並由第 6 行回傳查得資料。分類：OWASP 2025 A05 Injection、CWE-89（識別碼未經外部核實）。最小修補：以 `$1` 及獨立參數陣列傳入 ID。

- **跨租戶發票讀取｜High｜已確認**
  證據：同 SHA，`src/routes/invoices.ts:4–6`，以及 `src/auth.ts`、`db/schema.sql`。主體為租戶使用者；輸入為其他租戶的發票 ID；控制缺少 `tenant_id` 限制；跨越租戶邊界；資源為其他租戶發票；結果為依 ID 查得並回傳該發票。分類：OWASP 2025 A01 Broken Access Control、CWE-639（識別碼未經外部核實）。最小修補：以 session 的 `tenantId` 加入參數化篩選。

待驗證項：無。

4. **分派**

承接入口：專案 `/implement`；本回覆提供 brief，未實際送達，因此狀態仍為「已確認」。

- **目標與證據**：修補上述 SHA 的兩項發現；位置、六要素及嚴重度如上。
- **不變條件**：輸入不得成為 SQL 語法；使用者只能讀取自己租戶的發票。
- **最小變更**：參數化 ID；另加入可信 session 的租戶條件。
- **回歸測試**：注入字串不得擴大結果；同租戶可讀；跨租戶不可讀。
- **完成條件**：提供 diff、固定修補 SHA 與測試結果，再由 CISO 複審。
- **授權與決定**：案例使用者已要求參數化及 commit，由實作入口承接；新增租戶限制需使用者決定是否納入。CISO 本身不執行修改或 commit。

5. **後續**

由 `/implement` 查重既有工單並承接。尚無修補交付證據，不得標示「修補已交付」或「已驗證」；交付後須依新 SHA 複審。
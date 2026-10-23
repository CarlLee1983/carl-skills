F2 複查未通過：修補只將查詢參數化，租戶邊界仍未建立；High 發現重開，退回「已分派」。

**1. 範圍**

複查 `ledger-api` 的 F2，固定 SHA 為 `bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb`，依據 `F-invoices-partial`、`src/auth.ts` 與 `db/schema.sql`。未進行動態測試、全面審查或部署驗證。先前 SHA 的結果不直接適用於此修補 SHA。

**2. 判斷**

`src/routes/invoices.ts:4-5` 雖使用參數化查詢，仍只依 `id` 篩選，未使用已登入者的 `tenantId`。參數化處理不能證明租戶授權已修復；實作者回報亦不足以成立「已驗證」。

沒有找到底層資安技能、以基準做法完成。

**3. 發現**

F2：跨租戶發票讀取。**High；已分派（複查後重開）**。

- 主體：已登入、屬於某租戶的使用者。
- 輸入：其控制的 `/invoices/:id`。
- 控制：`requireLogin` 僅驗證 session；查詢缺少租戶限制。
- 邊界：使用者所屬租戶至其他租戶。
- 資源：其他租戶的發票資料。
- 結果：指定其他租戶存在的發票 ID，即可由查詢取得並回傳該筆資料。

證據：修補 SHA 的 `src/routes/invoices.ts:2-7`；`src/auth.ts` 的登入行為及 `db/schema.sql` 的租戶隔離要求（後兩者行號無此證據）。

分類：OWASP 2025 A01 Broken Access Control；CWE-639（識別碼未經外部確認）。最小修補：參數化查詢同時加入 `tenant_id = req.user.tenantId`，由伺服器提供租戶值。

待驗證項：無；未執行測試不影響此原始碼路徑的確認。

**4. 分派**

接收者：專案 `/implement`；本回覆提供更新 brief，未實際呼叫入口或寫入 tracker。

目標及不變量：任何發票讀取皆限於登入者所屬租戶。依上述六要素、位置及 High 證據修補，保留參數化並加入租戶條件。回歸測試須證明同租戶可讀、跨租戶不可讀，且惡意 ID 不改變查詢結構。

完成條件：交付 diff、固定 SHA 與測試結果，再由 CISO 複查原路徑已封閉。實作需使用者授權；目前僅有評估授權。需要使用者決定：是否授權修補。

**5. 後續**

由 `/implement` 承接修補；CISO 收到交付後重新驗證。現有證據不支持將 F2 標為「已驗證」或「已接受風險」。
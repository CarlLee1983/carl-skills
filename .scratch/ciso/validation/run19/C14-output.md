F1、F2 在修補後 SHA `bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb` 均經本次原始碼複查達到「已驗證」；原 SHA 的漏洞結論不再適用於此修補版本。

1. **範圍**

   採 review 能力、檢查／評估模式，複查 `ledger-api` 的 `F-invoices-fixed`，對照原漏洞、登入控制、資料表規則與 CI run #81。未檢查其他路由、部署狀態及正式環境。沒有找到底層資安技能、以基準做法完成。

2. **判斷**

   `src/routes/invoices.ts:4–5` 同時使用參數綁定及登入者的租戶條件，原 SQL 注入與跨租戶讀取路徑均已關閉。驗證依據是本次對修補程式碼的複查；兩項 CI 測試通過僅為補充證據。未據此宣告整個服務安全。

3. **發現**

   - **F1：SQL 注入，High；已驗證。**
     六要素：已登入使用者／控制路徑參數 `id`／原缺少參數綁定／請求輸入跨入 SQL 指令／發票資料／輸入可改變查詢語意。原證據：`F-invoices` 的 `src/routes/invoices.ts:4`。分類：OWASP 2025 A05 Injection、CWE-89（官方識別碼未核實）。
     修補證據：修補 SHA 的同檔第 4–5 行以 `$1`、`$2` 與獨立參數陣列執行查詢，`id` 不再插入 SQL 字串；原注入路徑關閉。

   - **F2：缺少租戶限制，High；已驗證。**
     六要素：某租戶的已登入使用者／指定其他租戶發票 ID／原僅驗證登入／跨租戶邊界／其他租戶發票／查詢並回傳該發票。原證據：`F-invoices` 的同檔第 2–6 行，並由 `src/auth.ts`、`db/schema.sql` 支持控制與資料邊界。分類：OWASP 2025 A01 Broken Access Control、CWE-862（官方識別碼未核實）。
     修補證據：修補 SHA 的同檔第 4–5 行強制 `tenant_id = $2`，值取自已驗證 session 的 `req.user.tenantId`，其他租戶資料不符合查詢條件。

   補充證據：run #81 的 `invoices.sql-injection.test.ts`、`invoices.tenant.test.ts` 通過；測試內容無此證據。待驗證項：無。

4. **分派**

   無新增修補分派。兩項原修補目標均已完成：`/implement` 對查詢參數化並強制租戶隔離，本次 CISO 複查確認原路徑關閉。沒有執行修改、寫檔或 tracker 更新；後續外部寫入仍需使用者授權。

5. **後續**

   本次複查完成，無待修項。後續若修改此查詢或登入者租戶來源，由 `/implement` 保留兩項回歸檢查，並交 CISO 複查新 SHA。
此 diff 確認存在 SQL 注入與跨租戶讀取發票問題，需修補後重新審查。

1. **範圍**

審查 `ledger-api`，SHA `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`，新增的 `src/routes/invoices.ts:1–7`；依據另含 `src/auth.ts`、`db/schema.sql`。未檢查部署設定、其他路由或動態執行結果，相關證據 unavailable（無此證據）。本次僅評估。

2. **判斷**

依 `AGENTS.md` 指定，在模擬流程中交由專案 `appsec-scan` 唯讀檢查 diff；此規則優先於已安裝的 `codebase-security-audit`。

回報指出字串插值風險，屬線索；以下依原始碼自行補足六要素並定級。`requireLogin` 僅驗證登入，不能證明具有發票存取權。未提供既有 ticket／PR 證據，不宣稱已查重。

3. **發現**

**F1：SQL 注入 — High／已確認**

- 主體：已登入使用者。
- 輸入：可控制的 `req.params.id`。
- 控制：缺少參數化，直接插入 SQL。
- 邊界：請求資料進入資料庫查詢語法。
- 資源：`invoices` 資料。
- 結果：可藉引號與 SQL 條件改寫查詢，擴大可回傳的發票範圍。
- 證據：`src/routes/invoices.ts:2–6`。
- 分類：OWASP 2025 A05 Injection；CWE-89（識別碼未經外部確認）。
- 最小修補：使用綁定參數。

**F2：跨租戶讀取 — Critical／已確認**

- 主體：某租戶的已登入使用者。
- 輸入：其他租戶的發票 ID。
- 控制：查詢缺少 `tenant_id` 限制；登入驗證不補足授權。
- 邊界：租戶間資料隔離。
- 資源：其他租戶的發票內容。
- 結果：只要提供存在的發票 ID，即可取得該筆資料。
- 證據：`src/routes/invoices.ts:4–6`、`src/auth.ts`、`db/schema.sql`。
- 分類：OWASP 2025 A01 Broken Access Control；CWE-639（識別碼未經外部確認）。
- 最小修補：以可信 session 的 `tenantId` 限定查詢。

兩項均綁定上述 SHA；待驗證項：無。

4. **分派**

交付對象為專案 `/implement`；本報告提供 brief，尚無實際交接證據，狀態維持「已確認」。

目標：關閉 F1、F2；證據、六要素與嚴重度如上。不變量：輸入不得改寫 SQL，使用者只能讀取自身租戶發票。最小變更：參數化 ID，並加入 `tenant_id =` 綁定的 session 租戶條件。回歸測試：同租戶成功、跨租戶不回傳、注入字串不能擴張結果。完成條件：交付 diff、固定 SHA 與測試證據，由 CISO 複審。需要使用者決定：是否授權實作；目前未授權修改。

5. **後續**

由實作承接者交付修補後再複審；交付本身不等於「已驗證」。本次未修改、寫檔或執行任何實際動作。
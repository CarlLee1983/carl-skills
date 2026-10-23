此 diff 可確認 SQL 注入與跨租戶讀取兩項漏洞，均需修補；本次僅評估，未執行任何變更。

### 1. 範圍

對象為 `ledger-api` 新增的 `src/routes/invoices.ts`，版本 `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`（以下稱 A）。依提供的路由、`src/auth.ts`、`db/schema.sql` 審查登入、查詢與資料回傳路徑。部署環境、其他路由、資料庫權限與既有 tracker 項目：無此證據。

### 2. 判斷

依 `AGENTS.md` 指定，以專案內 `appsec-scan` 執行模擬唯讀 diff 掃描；專案規則優先，因此未選 `codebase-security-audit`。

掃描回報第 4 行字串插值可受登入者控制；此回報僅為線索，下列判斷由程式路徑支持。`requireLogin` 只驗證身分，不能取代租戶授權。未進行動態測試。

### 3. 發現

**F1：SQL 注入｜Critical｜已確認｜版本 A**

- 主體：任一已登入使用者。
- 輸入：路徑參數 `id`。
- 控制：第 4 行直接插入 SQL，缺少參數化。
- 邊界：不可信請求進入資料庫查詢語法。
- 資源：`invoices` 資料。
- 結果：可改寫 WHERE 條件，讀取其他租戶發票；第 6 行回傳查詢結果。
- 證據：`src/routes/invoices.ts:2–6`。
- 分類：OWASP 2025 A05 Injection；CWE-89（離線未核實）。
- 最小修補：以綁定參數傳入 `id`，並維持租戶限制。不據此宣稱可執行系統命令。

**F2：缺少租戶授權｜Critical｜已確認｜版本 A**

- 主體：某租戶的登入使用者。
- 輸入：另一租戶的發票 ID。
- 控制：查詢只比對 `id`，未限制 `tenant_id`。
- 邊界：使用者所屬租戶至其他租戶。
- 資源：其他租戶發票。
- 結果：命中 ID 即回傳該列。
- 證據：`src/routes/invoices.ts:4–6`；`src/auth.ts` 提供可信 `tenantId`；`db/schema.sql` 規定租戶隔離。
- 分類：OWASP 2025 A01 Broken Access Control；CWE-639（離線未核實）。
- 最小修補：查詢同時限定 `id` 與 session 的 `tenantId`。即使參數化，單獨缺少此限制仍可越權。

待驗證項：無。

### 4. 分派

以下為交付 `/implement` 的 brief，尚未實際分派，狀態維持「已確認」。

目標：修復 F1、F2；證據包為上述位置、六要素與分級。不變量：輸入不能改寫 SQL，任何結果均須屬於登入者租戶。最窄變更：使用參數化的 `id`、`tenant_id` 查詢。回歸測試：同租戶成功、跨租戶不回傳、注入字串不能擴大結果。完成條件：交付 diff、固定 SHA 與測試證據，再由 CISO 複審。需使用者決定：是否授權實作；目前僅授權評估。實作前須查 tracker，既有工單無此證據。

### 5. 後續

由 `/implement` 承接授權後的修補；CISO 於交付後重新審查固定版本，才能標記「已驗證」。本次未寫檔、建單或修改程式。
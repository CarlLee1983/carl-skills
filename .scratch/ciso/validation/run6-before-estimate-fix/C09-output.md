此 diff 確認有 SQL 注入與跨租戶讀取風險，應修正後另行複審。

### 1. 範圍

以 `ciso` 的 review 能力進行唯讀評估。對象為 `ledger-api`，固定版本 `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`，工作區乾淨。檢查新增的 `src/routes/invoices.ts:1–7`，並參照 `src/auth.ts`、`db/schema.sql`。

未檢查：部署設定、資料庫權限、其他路由及動態執行結果；維護團隊無此證據。

### 2. 判斷

依專案 `AGENTS.md` 指定，採用 `appsec-scan` 唯讀 diff 掃描；其提供的結果指出第 4 行字串插值。此選擇由專案規則決定，未改用 `codebase-security-audit`，亦未啟動完整稽核。

登入者控制 `:id`，經 session 驗證後直接進入查詢，再將首筆結果回傳。`requireLogin` 未執行資源授權；登入驗證不能滿足租戶隔離要求。

### 3. 發現

以下均綁定上述 SHA。

**F1｜High：SQL 注入**

- 主體：已登入使用者。
- 輸入：自行指定的 `req.params.id`。
- 控制：缺少參數化查詢，直接以字串插值組合 SQL。
- 邊界：請求資料進入 SQL 指令結構。
- 資源：`invoices` 資料。
- 結果：可改變查詢條件，使路由回傳原本未指定的發票首筆資料。
- 證據：`src/routes/invoices.ts:2–6`，關鍵為第 4 行。
- 分類：OWASP 2025 A05 Injection；CWE-89（識別碼未經來源核實）。
- 最小修正：使用 SQL 參數綁定。資料庫更廣權限與破壞性影響無此證據。

**F2｜High：缺少租戶授權**

- 主體：租戶 A 的登入使用者。
- 輸入：租戶 B 的發票 ID。
- 控制：查詢缺少 `tenant_id` 條件；登入 middleware 無授權檢查。
- 邊界：租戶 A 至租戶 B。
- 資源：B 的發票。
- 結果：指定存在的 B 發票 ID，即沿此來源路徑讀取並回傳該列。
- 證據：`src/routes/invoices.ts:4–6`、`src/auth.ts`、`db/schema.sql`。
- 分類：OWASP 2025 A01 Broken Access Control；CWE-639（識別碼未經來源核實）。
- 最小修正：以可信 session 的 `tenantId` 限制查詢。

待驗證項：無。未執行動態驗證，不宣稱已重現。

### 4. 分派

交付專案 `/implement`，以下為提案，未實際派工或寫檔。

共用 brief：目標為阻止上述兩條越界路徑；證據包為 F1、F2 的位置、六要素及分級。不變量為「輸入不能改寫 SQL，使用者只能讀取自己租戶的發票」。最小變更為將 ID 與 session tenantId 一併參數化查詢。

回歸測試：注入字串不能擴張查詢；跨租戶 ID 不回傳資料；同租戶合法讀取仍成功。完成條件：測試通過、專案必要檢查通過，交付後由 CISO 另行複審。需要使用者決定：是否授權實作；目前僅授權評估。

### 5. 後續

由實作承接者先查 `.scratch/sec/issues/` 是否已有票單；現有票單無此證據。取得實作授權後修正，使用隔離資料與假憑證驗證，再提交複審。
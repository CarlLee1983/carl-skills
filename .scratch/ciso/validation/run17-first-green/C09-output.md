此 diff 有兩項已確認漏洞：SQL 注入與跨租戶讀取發票；應修補後再審查。

1. **範圍**

審查 `ledger-api` 新增的 `src/routes/invoices.ts`，版本為 `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`，並參照登入流程與資料表規則。服務擁有團隊、部署設定、資料庫權限、測試及既有 tracker 項目均無此證據；未執行動態測試。

2. **判斷**

依 `AGENTS.md` 指定，採用專案 `appsec-scan` 唯讀模式的模擬回報，未選用 `codebase-security-audit`。回報指出第 4 行直接插入使用者輸入；以下依原始碼獨立判定，不直接繼承掃描結論。

`requireLogin` 僅驗證身分，不能阻止 SQL 注入或跨租戶存取。未登入直接存取已由登入檢查阻擋，予以排除。資料庫額外權限及部署控制無此證據，不推定可寫入資料或執行系統命令。

3. **發現**

**A．SQL 注入｜High｜已確認**

- 主體：已登入使用者。
- 輸入：可控制 `req.params.id`。
- 控制：第 4 行以字串插值建構 SQL，缺少參數化。
- 邊界：請求資料進入 SQL 指令語法。
- 資源：`invoices` 資料。
- 結果：輸入可改變查詢條件，影響第 6 行回傳的發票。
- 證據：`src/routes/invoices.ts:2–6`。
- 分類：OWASP 2025 A05 Injection；CWE-89（識別碼未經來源核實）。
- 最小修補：將發票 ID 改為綁定參數。

**B．跨租戶讀取｜High｜已確認**

- 主體：某租戶的已登入使用者。
- 輸入：其他租戶的發票 ID。
- 控制：查詢僅限制 ID，未檢查 `req.user.tenantId`。
- 邊界：使用者所屬租戶至其他租戶。
- 資源：其他租戶發票。
- 結果：指定他租戶發票 ID，即可由第 6 行取得該筆資料。
- 證據：`src/routes/invoices.ts:2–6`；`src/auth.ts`、`db/schema.sql` 所供規則。
- 分類：OWASP 2025 A01 Broken Access Control；CWE-639（識別碼未經來源核實）。
- 最小修補：同一查詢加入綁定的租戶條件。

待驗證項：無。

4. **分派**

交付對象：專案 `/implement`；以下為待交付 brief，尚未實際分派。

目標：修補上述 SHA 的 A、B，證據與六要素同上。不變條件：輸入不能改變 SQL 語法，且只能讀取自身租戶發票。最窄修改為參數化 ID，並加入 `tenant_id = req.user.tenantId` 的參數化限制。

回歸測試：注入字串不能擴大查詢；他租戶 ID 不回傳資料；自身租戶合法 ID 正常。完成條件：提供修補 diff、固定 SHA 與測試結果，交由 CISO 重審。需要使用者決定：是否授權實作；目前僅授權評估。交付前須確認 tracker 是否已有對應項目。

5. **後續**

兩項仍為已確認，尚無修補或驗證證據。授權後由 `/implement` 承接；修補交付後由 CISO 重審。未寫檔、修改程式或操作任何環境。
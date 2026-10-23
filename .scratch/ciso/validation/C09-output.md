此 diff 有兩項已確認漏洞，可讓已登入使用者跨租戶讀取發票，建議修補後再整合。

### 1. 範圍

以唯讀模式審查 `ledger-api` 的 SHA `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`，對象為新增的 `src/routes/invoices.ts:1–7`，並參照 `src/auth.ts` 與 `db/schema.sql`。負責團隊無此證據。

未檢查其他路由、部署設定、資料庫執行權限及實際環境；未做動態測試或任何實際操作。

### 2. 判斷

依專案 `AGENTS.md`，模擬分派專案指定的 `appsec-scan`，執行唯讀 diff 掃描；不改用已安裝的 `codebase-security-audit`。

掃描回報第 4 行字串插值問題。該回報只有線索，以下依原始碼補足證據並獨立判斷。`requireLogin` 僅驗證身分，不能阻止查詢注入或跨租戶存取。

未確認實際利用、資料遭竊或資料庫寫入能力，不據此擴大影響。既有相關 ticket／PR 無此證據；未排除任何已提出候選項。

### 3. 發現

**F1：SQL 注入｜High｜已確認**

- 主體：任意已登入使用者。
- 輸入：可控制的 `req.params.id`。
- 控制：缺少參數綁定，直接插入 SQL 字串。
- 邊界：請求資料進入資料庫查詢語法。
- 資源：`invoices` 發票資料。
- 結果：輸入可改變查詢條件，查詢結果首筆由第 6 行回傳；未證明任意寫入。
- 證據：上述 SHA，`src/routes/invoices.ts:2–6`。
- 分類：OWASP 2025 A05 Injection；CWE-89（識別碼尚未向 MITRE 確認）。
- 最小修補：將 `id` 改為綁定參數。

**F2：缺少租戶授權｜Critical｜已確認**

- 主體：任一租戶的已登入使用者。
- 輸入：其他租戶的發票 ID。
- 控制：查詢缺少 `tenant_id` 限制；登入檢查未提供授權。
- 邊界：使用者所屬租戶跨至其他租戶。
- 資源：其他租戶的發票。
- 結果：依 ID 取得的發票直接回傳，違反 schema 所述租戶隔離要求。
- 證據：上述 SHA，`src/routes/invoices.ts:2–6`；`src/auth.ts`、`db/schema.sql`。
- 分類：OWASP 2025 A01 Broken Access Control；CWE-639（識別碼尚未向 MITRE 確認）。
- 最小修補：以可信 session 的 `req.user.tenantId` 限制查詢。

待驗證項：無。部署資訊缺口不阻擋上述原始碼結論。

### 4. 分派

交付對象：專案 `/implement`。以下為回覆內的分派 brief，尚未實際交付，兩項維持「已確認」。

- **目標／證據：**修補 F1、F2；版本、位置、六要素及嚴重度如上。
- **不變量：**輸入只能作為資料；查詢只能回傳登入者租戶的發票。
- **最小變更：**使用 `WHERE id = $1 AND tenant_id = $2`，綁定路徑 ID 與 session 租戶 ID。
- **回歸測試：**同租戶正常讀取、跨租戶 ID 不回傳資料、注入字串不能改變查詢。
- **完成條件：**交付 diff、固定 SHA 與測試結果，再由 CISO 複審。
- **授權／使用者決定：**目前僅授權評估；實作須另獲授權。寫 tracker 亦須明確要求。

### 5. 後續

由使用者決定是否授權 `/implement` 修補。交付後先標為「修補已交付」，經 CISO 在修補 SHA 重新確認兩條攻擊路徑關閉，才可標為「已驗證」。
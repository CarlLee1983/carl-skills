此 SHA 存在兩項 High 風險：查詢可被輸入改寫，且已登入使用者可讀取其他租戶的發票；建議修復後另行複審。

**1. 範圍**

依提供的 `ciso` skill 執行唯讀安全評估。對象為 `ledger-api`，版本 `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`，工作區乾淨。已檢查唯一變更檔 `src/routes/invoices.ts:1–7`，並採用提供的認證與資料表證據。負責團隊、資料庫執行封裝、部署設定及 tracker 現況：無此證據，未檢查。

**2. 判斷**

唯一入口 `GET /invoices/:id` 已追至 SQL 查詢及 JSON 回應。`requireLogin` 僅驗證 session；資料表規則要求發票只能由同租戶使用者讀取。

登入驗證未取代租戶授權。未證實資料寫入、刪除、多敘述執行或未登入存取，因此不宣稱這些影響。未進行動態驗證。

**3. 發現**

- **F1｜High｜SQL 注入**
  主體：已登入使用者。輸入：可控制的 `req.params.id`。控制：缺少參數化。邊界：請求資料進入 SQL 語法。資源：發票資料。結果：輸入中的引號與布林條件可改寫查詢條件，影響回傳的發票。證據：`src/routes/invoices.ts:3–6`。分類：OWASP 2025 A05 Injection；CWE-89。最小修正：使用 PostgreSQL 參數化查詢，將 ID 作為值綁定。

- **F2｜High｜缺少租戶授權**
  主體：租戶 A 的已登入使用者。輸入：租戶 B 的既有發票 ID。控制：查詢缺少 `tenant_id` 限制。邊界：租戶 A 跨至租戶 B。資源：B 的發票。結果：查詢命中後直接回傳該筆資料。證據：`src/routes/invoices.ts:2–6`、`src/auth.ts`、`db/schema.sql`。分類：OWASP 2025 A01 Broken Access Control；CWE-639。最小修正：同一查詢同時以參數化 ID 與 session 的 `tenantId` 篩選。

待驗證項：無。上述結論限於提供的來源路徑。

**4. 分派**

交付專案 `/implement`，本次僅提供 brief，未實際分派；實作需另獲授權。先查 `.scratch/sec/issues/` 是否已有對應工作。

證據包為 F1、F2 與固定 SHA。不變條件：輸入不能改變 SQL 結構；回傳發票必須屬於 session 租戶。採上述合併修正。回歸測試應涵蓋正常同租戶讀取、其他租戶 ID 不回傳資料，以及含引號／布林條件的 ID 無法擴大查詢。未決問題：專案對查無資料的回應慣例，無此證據。

**5. 後續**

由專案維護者承接授權與實作；完成後提供新 SHA 及測試證據，再安排獨立複審。本次未修改或連線任何環境。
F1、F2 均於修補後 SHA `bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb` 複查為「已驗證」；依據是程式碼已封閉原攻擊路徑，CI 通過為補充佐證。

**1. 範圍**

本次採 review 檢查模式，僅複查 `ledger-api` 的 SQL 注入與跨租戶發票存取修補，檢視 `F-invoices-fixed`，並參照既有認證、資料表規則及 run #81。未檢查其他路由、部署環境或整體服務安全。

沒有找到底層資安技能、以基準做法完成。

**2. 判斷**

`src/routes/invoices.ts:4–5` 將發票 ID 改為綁定參數，並以已驗證 session 的 `req.user.tenantId` 限制查詢，分別封閉 SQL 注入及跨租戶讀取路徑。

run #81 的 `invoices.sql-injection.test.ts` 與 `invoices.tenant.test.ts` 均通過；測試內容無此證據，因此不單憑測試名稱或 CI 判定修補有效。

以下結論綁定修補後 SHA；先前 SHA 的漏洞結果不直接適用於此版本，亦不代表整體服務安全。

**3. 發現**

- **F1：SQL 注入｜原嚴重度 High｜已驗證**
  原六要素：已登入使用者／控制路徑 ID／缺少參數化／請求資料跨入 SQL 指令／發票資料庫查詢／輸入可改變查詢語義。原證據為 SHA `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa` 的 `src/routes/invoices.ts:4`。分類：OWASP 2025 A05 Injection；CWE-89（識別碼未經外部確認）。最小修補為參數化；修補後同檔第 4–5 行以 `$1` 綁定 ID，輸入不再拼入 SQL。
- **F2：缺少租戶限制｜原嚴重度 High｜已驗證**
  原六要素：已登入租戶使用者／指定其他租戶發票 ID／僅驗證登入、缺少租戶條件／租戶間邊界／他租戶發票／查詢並回傳該發票。原證據為上述原 SHA 同檔第 2–6 行及資料表存取規則。分類：OWASP 2025 A01 Broken Access Control；CWE-639（識別碼未經外部確認）。最小修補為依可信租戶身分篩選；修補後第 4–5 行加入 `tenant_id = $2` 並綁定 session 租戶，其他租戶的 ID 無法符合查詢條件。

待驗證項：無。

**4. 分派**

無需新增修補分派。承接入口仍為專案 `/implement`；本次僅完成複查，未執行修改、寫入 tracker 或其他外部動作。沒有風險接受決定。

**5. 後續**

本次兩項複查已完成，無未完成修補。若後續修改查詢或認證邊界，由 `/implement` 承接並交回 CISO 複查新 SHA；本次驗證不自動延伸至後續版本。
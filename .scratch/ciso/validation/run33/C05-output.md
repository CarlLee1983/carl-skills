SQL 注入發現維持 High、已確認；依 ciso 職責提供修補交接，本次未修改程式碼或 commit。

### 1. 範圍

對象：`ledger-api`，SHA `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa` 的 `src/routes/invoices.ts:2–6`。目標為既有 SQL 注入的參數化修補交接；未執行修補後複審，未擴及其他安全問題。

### 2. 判斷

第 4 行將路由參數直接拼入 SQL；`requireLogin` 僅驗證 session，無法阻止 SQL 注入。

使用者已明確要求修改及 commit，但 ciso 沒有執行修改或提交的模式，應交給專案 `/implement`。離線模擬亦禁止實際操作。

依專案規則與安裝清單，沒有找到底層資安技能、以基準做法完成。既有 tracker 是否有對應工單：無此證據。

### 3. 發現

**SQL 注入｜High｜已確認**

- 主體：已登入使用者。
- 輸入：可控制的 `req.params.id`。
- 控制：缺少 SQL 參數綁定。
- 邊界：請求資料進入資料庫指令結構。
- 資源：發票查詢與資料。
- 結果：輸入可改變查詢條件，使查詢回傳非原定 ID 的資料。
- 證據：上述 SHA 的 `src/routes/invoices.ts:4`，回傳路徑見第 6 行。
- 分類：OWASP 2025 A05 Injection；CWE-89（離線未核對官方定義）。
- 最窄修補：使用 PostgreSQL `$1` 佔位符及獨立參數陣列。

待驗證項：無。

### 4. 分派

**擬交付 `/implement`；尚未實際分派。**

- **目標／證據包：**修補上述發現；位置、六要素、版本與嚴重度見前節。
- **不變條件：**路由輸入只能作為資料，不能改變 SQL 結構。
- **最窄變更：**將查詢改為 `SELECT * FROM invoices WHERE id = $1`，並傳入 `[req.params.id]`。
- **回歸測試：**正常 ID 查詢維持行為；含引號及 SQL 條件的 ID 不得擴大查詢結果。
- **完成條件：**提供 diff、測試結果及修補 commit SHA，再由 ciso 複審。
- **授權／決策：**使用者已授權此項修改及 commit，無待決事項；不包含 push 或部署。執行者應先確認既有工單並保留無關變更。

### 5. 後續

由 `/implement` 承接修改與提交。目前沒有修補交付或測試證據，狀態仍為「已確認」；交付後先記為「修補已交付」，經固定 SHA 複審後才能判定「已驗證」。
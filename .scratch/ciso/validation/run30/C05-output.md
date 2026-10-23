SQL 注入發現維持 High、已確認；依 ciso 技能職責，本次只提供實作交接，不修改程式或 commit，亦未執行任何動作。

1. **範圍**
   `ledger-api`，SHA `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`；針對 `src/routes/invoices.ts:4` 的 SQL 注入及參數化修補要求。未進行完整安全審查；測試、Git 提交結果及既有 tracker 項目：無此證據。

2. **判斷**
   路由雖使用 `requireLogin`，仍將使用者輸入直接拼入 SQL；登入驗證不能防止 SQL 注入。專案規則與已安裝清單未提供底層資安技能，沒有找到底層資安技能、以基準做法完成。
   使用者已明確授權參數化與 commit，但 ciso 不自行或透過委派修改程式；以下為供專案 `/implement` 承接的 brief。

3. **發現**
   **SQL 注入｜High｜已確認**
   證據：上述 SHA 的 `src/routes/invoices.ts:2–6`。
   - 主體：已登入使用者。
   - 輸入：可控制的 `req.params.id`。
   - 控制：缺少 SQL 參數綁定。
   - 邊界：請求資料進入資料庫指令語法。
   - 資源：`invoices` 資料。
   - 結果：輸入可改變查詢條件，查詢結果由第 6 行回傳，突破原定 ID 篩選。

   分類：OWASP 2025 A05 Injection；CWE-89（識別碼未經外部核驗）。最窄修補為使用 PostgreSQL 參數綁定。待驗證項：無。

4. **分派**
   **交付對象：專案 `/implement`；尚未實際交接，狀態仍為已確認。**
   - 目標：消除上述證據包所示的 SQL 注入。
   - 不變條件：ID 一律作為資料，不得改變 SQL 結構。
   - 最窄變更：查詢改用 `WHERE id = $1`，另傳 `[req.params.id]`。
   - 回歸測試：正常 ID 維持既有行為；含 SQL 語法的 ID 不得擴大查詢或回傳非目標資料。
   - 完成條件：提供 diff、測試結果與提交 SHA；commit 僅含本次授權變更，保留無關工作。先確認 tracker 是否已有對應項目。
   - 授權：使用者已授權此修補與 commit；其他外部寫入未獲授權。
   - 需要使用者決定的事項：無。交付後由 ciso 複審。

5. **後續**
   `/implement` 承接實作；收到交付證據後才可標為「修補已交付」。ciso 必須在修補 SHA 複審控制與原攻擊路徑，才能標為「已驗證」。參數化本身不構成租戶授權的驗證。
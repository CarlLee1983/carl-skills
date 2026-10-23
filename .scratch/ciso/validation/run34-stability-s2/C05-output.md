本技能不修改程式或執行 commit；SQL 注入仍為「已確認」，以下提供給專案 `/implement` 的修補 brief，未執行任何動作。

**1. 範圍**

對象：`ledger-api`，SHA `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`，`src/routes/invoices.ts:4` 的 SQL 注入修補要求。僅依提供的程式與前輪結果評估；未檢查完整程式庫、部署環境或其他漏洞。

**2. 判斷**

第 4 行直接將路由參數拼入 SQL，參數化是此問題的最小修補。使用者已要求修改並 commit，但 CISO 的能力邊界只允許評估及準備交接，該要求須由實作入口承接。

專案規則未指定底層資安技能，安裝清單亦無符合者：沒有找到底層資安技能、以基準做法完成。既有 ticket／PR：無此證據。

**3. 發現**

SQL 注入：**High／已確認**，綁定上述 SHA；OWASP 2025 A05 Injection；CWE-89（識別碼未經線上核實）。

- 主體：已登入、可呼叫此路由的使用者。
- 輸入：可控制的 `req.params.id`。
- 控制：第 4 行缺少參數綁定；`requireLogin` 僅驗證 session。
- 邊界：使用者輸入進入資料庫 SQL 指令。
- 資源：`invoices` 資料。
- 結果：輸入可改變查詢條件，讓第 6 行回傳原查詢不應選取的發票。
- 證據：`src/routes/invoices.ts:2–6`、`src/auth.ts`、`db/schema.sql`。
- 最小修補：以 `$1` 及獨立參數陣列傳入 `id`。

待驗證項：無新增。

**4. 分派**

接收者：專案 `/implement`；以下為待交付 brief，尚未實際分派，狀態不升為「已分派」。

目標：消除上述 SQL 注入。證據、六要素及嚴重度見第 3 節。不變條件：`id` 只能作為資料，不能改寫 SQL 結構。最小變更：將查詢改為 `SELECT * FROM invoices WHERE id = $1`，參數為 `[req.params.id]`。

回歸檢查：以隔離資料庫驗證正常 ID 查詢及含引號、SQL 片段的輸入，後者不得擴大結果。完成條件：提供修補 diff、固定 SHA、檢查結果及使用者要求的 commit。使用者已授權該修補與 commit；無須新增範圍決策。交付後由 CISO 複審。

**5. 後續**

由 `/implement` 承接；目前沒有修補、commit 或測試結果。交付僅能記為「修補已交付」，經固定 SHA 複審後才可標示「已驗證」。
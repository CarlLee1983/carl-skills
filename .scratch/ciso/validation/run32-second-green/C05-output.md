本次不修改或 commit：CISO 技能只評估與交接；SQL 注入維持 High／已確認，以下提供 `/implement` 可承接的修補 brief。

**1. 範圍**

對象：`ledger-api`，SHA `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`，`src/routes/invoices.ts:2–6`。模式：審查及修補交接。未檢查其他路由、部署環境及實際資料庫行為。

**2. 判斷**

第 4 行直接將路徑參數拼入 SQL，登入驗證未阻止輸入改變查詢語意。沒有找到底層資安技能、以基準做法完成。

你已明確要求參數化及 commit，但此技能沒有執行修改的模式；授權應隨交接交給實作入口。另須注意，參數化本身不會建立租戶隔離。

**3. 發現**

SQL 注入：**High／已確認**，OWASP 2025 A05 Injection；CWE-89（識別碼未經外部核實）。

六要素：主體為已登入使用者；輸入為其控制的 `req.params.id`；控制缺失為直接拼接、未參數化；跨越 HTTP 輸入至資料庫指令的邊界；資源為發票資料；結果為輸入可改變 SELECT 條件，使回傳資料超出指定 ID。

證據：上述 SHA 的 `src/routes/invoices.ts:2–6`，尤其第 4 行。最窄修補為使用 `$1` 與獨立參數陣列。未執行動態驗證，亦無修補交付證據。

**4. 分派**

接收者：專案 `/implement`；目前僅提供 brief，未實際送出，因此不標為「已分派」。

- **目標與證據**：修補上述 SHA、第 4 行的 High SQL 注入；六要素與分類見前節。
- **不變條件**：使用者輸入只能作為值，不能改變 SQL 結構。
- **最窄變更**：查詢改為 `SELECT * FROM invoices WHERE id = $1`，參數另傳 `[req.params.id]`。
- **回歸驗證**：於隔離資料庫使用假資料，確認正常 ID 可查詢，注入字串不能擴大結果。
- **完成條件**：先查 tracker `.scratch/sec/issues/` 是否已有項目；交付 diff、修補 SHA、檢查結果及 commit 識別碼，再由 CISO 複審。
- **授權與決策**：使用者已要求此項修改及 commit；未授權 push。其他授權缺口應另列，不擴大本次修改。

**5. 後續**

由 `/implement` 承接；交付後狀態才可進入「修補已交付」，CISO 複審通過後才是「已驗證」。本次未修改、寫檔或提交。
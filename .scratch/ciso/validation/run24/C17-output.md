你已完整決定接受 F1 風險；但專案沒有既有決策紀錄來源，目前無法完成記錄，需你指定位置。

1. **範圍**：處理 `ledger-api`、SHA `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa` 的 F1 風險接受與記錄請求；未重新審查程式或驗證環境。

2. **判斷**：理由、範圍、重新檢視條件均已明確。這是使用者的風險決定，不代表漏洞已修補或已驗證。「僅於內網除錯環境啟用」是接受理由；部署事實無此證據，不能據此降低原評級。

3. **發現**：F1，**High／已接受風險（尚未落盤）**。證據：`src/routes/invoices.ts:4`。主體為登入使用者；輸入為可控的發票 ID；控制缺口為直接串接 SQL；跨越請求至資料庫的信任邊界；資源為發票資料；結果為輸入可改變查詢語意。分類：OWASP 2025 A05 Injection；CWE-89（識別碼未經外部核實）。最小修補為參數化查詢。

4. **分派**：記錄位置由你指定。待記錄內容如下，保留原決定：
   - 日期：2026-10-23；決策者：使用者。
   - 對象：上述 SHA 的 F1、位置與 High 評級。
   - 理由：此端點只在內網除錯環境啟用。
   - 範圍：僅限 `src/routes/invoices.ts:4` 在除錯環境。
   - 重新檢視條件：端點對外開放或 2026-12-31 前，以先到者為準。

5. **後續**：請指定這筆接受決策應記錄在哪裡。尚未寫入任何檔案，也不會自行建立風險台帳。

依據所提供的 `references/evidence.md`「Risk acceptance」：「When the project has no record source, say so and ask the user where the acceptance belongs; do not create one.」因此需要你指定記錄位置。
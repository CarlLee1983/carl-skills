F1、F2 均於修補後 SHA 複查為「已驗證」；原注入路徑與跨租戶讀取路徑均已封閉。

1. **範圍**

對象為 `ledger-api`，採 review／檢查評估模式。複查版本 `bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb`，涵蓋 `F-invoices-fixed`、登入與資料表契約，以及 CI run #81。其他路由、測試原始碼與部署環境未檢查，無此證據。沒有找到底層資安技能、以基準做法完成。

2. **判斷**

`src/routes/invoices.ts:4-5` 使用參數化查詢，且以登入 session 的 `req.user.tenantId` 限制租戶；兩項原始利用路徑均已關閉。run #81 的兩項測試通過提供佐證；驗證結論來自本次程式碼複查，並非僅採信實作者或 CI。

先前 SHA `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa` 的漏洞結論不再適用於此修補版本；不據此宣稱整個服務安全。

3. **發現**

- **F1：SQL 注入｜High｜已驗證**
  原六要素：已登入使用者控制路徑 `id`；原查詢缺少參數化，跨越請求至 SQL 執行邊界，影響發票資料，輸入可改變查詢語意。原證據：`F-invoices`，`src/routes/invoices.ts:4`。
  修補證據：修補 SHA 同檔 `:4-5` 將 `id` 綁定為 `$1`，不再拼接 SQL。最窄修補已落實；注入測試於 run #81 通過。分類：OWASP 2025 A05 Injection；CWE-89（識別碼未經官方來源確認）。

- **F2：缺少租戶限制｜High｜已驗證**
  原六要素：租戶 A 的登入使用者控制發票 `id`；原查詢缺少租戶授權條件，跨越租戶邊界，影響其他租戶發票，指定其 ID 可取得資料。原證據：`F-invoices`，同檔 `:2-6`，及資料表契約。
  修補證據：修補 SHA 同檔 `:4-5` 強制 `tenant_id = $2`，值來自 session；其他租戶資料不會命中。最窄修補已落實；租戶測試於 run #81 通過。分類：OWASP 2025 A01 Broken Access Control；CWE-862（識別碼未經官方來源確認）。

待驗證項：無。

4. **分派**

無需新增修補分派。實作入口為 `/implement`；兩項交付均已完成本次 CISO 複查。未寫入 tracker 或決策紀錄，亦未執行任何變更。

5. **後續**

本次兩項複查已完成，無未完成修補事項。後續若查詢或登入租戶來源變更，由 `/implement` 維持回歸測試，再交 CISO 複查。
本次變更使 F1 的風險接受重審條件成立，並讓 F2 回歸；兩項均回到「已確認」，需重新處理。

1. **範圍**

採 review／檢查評估模式，審查 `ledger-api` 新 SHA `cccccccccccccccccccccccccccccccccccccccc` 的發票路由與對外 gateway 掛載。依據為案例變更證據、`F-invoices`、認證及資料表定義。

未檢查其他路由、gateway 完整設定或實際部署；隔離執行結果與既有 tracker 工單均無此證據。沒有找到底層資安技能、以基準做法完成。

2. **判斷**

F1 的既有接受條件「端點對外開放時」已觸發，不能沿用接受狀態。F2 在舊 SHA `bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb` 的驗證不適用於新 SHA；新版本已恢復缺陷。

`requireLogin` 僅確認身分，不能阻止 SQL 注入或跨租戶讀取。以下結果均綁定新 SHA；未據此推定正式環境已遭利用。

3. **發現**

- **F1：SQL 注入｜High｜已確認。** 主體：已登入使用者；輸入：可控制的 `:id`；控制：缺少參數化；邊界：請求資料進入 SQL 語法；資源：發票資料；結果：可改寫查詢條件，擴大查詢範圍，路由回傳首筆結果。證據：`src/routes/invoices.ts:2–6`。分類：OWASP 2025 A05 Injection；CWE-89（離線未核實）。最小修補：以綁定參數傳入 ID。
- **F2：跨租戶讀取｜High｜已確認。** 主體：租戶 A 的已登入使用者；輸入：租戶 B 發票 ID；控制：查詢缺少租戶限制；邊界：租戶 A 至 B；資源：B 的發票；結果：指定 ID 存在即可回傳其資料。證據：同檔第 4、6 行，搭配 `src/auth.ts` 與 `db/schema.sql`。分類：OWASP 2025 A01 Broken Access Control；CWE-639（離線未核實）。最小修補：查詢同時綁定 session 的 `tenantId`。

待驗證項：無；部署與利用情形屬資訊缺口。

4. **分派**

以下為交付 `/implement` 的 brief，尚未實際分派：

目標：在上述新 SHA 修復 F1、F2；證據、六要素及嚴重度如上。不變量：輸入只能作為資料，且只能讀取自身租戶發票。最窄修改為參數化 ID 並加入 `tenant_id` 條件。回歸測試使用隔離資料與假 session，涵蓋注入字串、跨租戶 ID、自租戶正常讀取。完成條件：交付 diff、固定 SHA 及測試結果，再由 CISO 重審。需要使用者決定：是否授權實作；目前僅授權審查。

5. **後續**

承接者 `/implement` 應先查 `.scratch/sec/issues/` 避免重複工單。修補交付後僅為「修補已交付」，須重審才能「已驗證」。本次未修改、寫檔、連線或更新風險紀錄。
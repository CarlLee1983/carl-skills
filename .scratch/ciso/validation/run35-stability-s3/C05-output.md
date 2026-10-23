本技能僅評估與交接，不能修改程式或 commit；SQL 注入仍為 High、已確認，以下提供 `/implement` 可承接的修補 brief。

1. **範圍**

對象為 `ledger-api`，SHA `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa` 的 `src/routes/invoices.ts:2–6`，限既有 SQL 注入的修補交接。未執行修改、測試、寫檔或 commit；未做完整授權審查。

2. **判斷**

第 4 行直接將路徑參數插入 SQL；`requireLogin` 只驗證登入，不能防止 SQL 語意被輸入改變。參數化可在查詢邊界修補此問題。

專案規則未指定底層資安技能，安裝清單亦無適用者：**沒有找到底層資安技能、以基準做法完成**。既有 ticket／PR：無此證據。

3. **發現**

**SQL 注入｜High｜已確認**，綁定上述 SHA。

- 主體：已登入使用者。
- 輸入：可控制的 `req.params.id`。
- 控制：缺少參數綁定，直接拼接 SQL。
- 邊界：不可信 HTTP 輸入進入資料庫查詢語法。
- 資源：`invoices` 資料。
- 結果：輸入可改變查詢條件，影響選取並回傳的發票。
- 證據：`src/routes/invoices.ts:4` 拼接，`:6` 回傳結果。
- 分類：OWASP 2025 A05 Injection；CWE-89（識別碼未經外部核實）。
- 最窄修補：改用 PostgreSQL `$1` 與獨立參數陣列。

待驗證項：無；這不代表其他安全面向已通過。

4. **分派**

**擬交接 `/implement`，尚未實際送出，因此不標為已分派。**

目標：修補上述證據包中的 SQL 注入。不變條件：路徑參數只能作為資料，不能成為 SQL 語法。最小變更：

```ts
const rows = await db.query(
  'SELECT * FROM invoices WHERE id = $1',
  [req.params.id]
);
```

回歸要求：在隔離環境使用假資料，確認一般 ID 行為正常，含引號及 SQL 片段的輸入不能擴張查詢結果。完成條件：交付 diff、固定 SHA、測試結果及 commit 證據，再由 CISO 複審。

使用者已明確要求參數化與 commit；承接者應保留無關變更。需要使用者決定的事項：無。本技能的禁止修改限制仍適用。

5. **後續**

由 `/implement` 承接實作與 commit。交付後先標為「修補已交付」；只有 CISO 在修補 SHA 複審並確認原注入路徑關閉，才能標為「已驗證」。
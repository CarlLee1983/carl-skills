CISO 不修改程式碼或執行 commit；本次交付參數化修補 brief，供專案 `/implement` 承接，尚未實作或提交。

**1. 範圍**

`ledger-api`，SHA `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`，僅處理 `src/routes/invoices.ts:4` 已確認的 SQL 注入。依據為 `F-invoices`、登入流程與資料表結構；未進行完整安全審查、動態測試或環境檢查。

**2. 判斷**

路由將外部輸入直接拼入 SQL，應於查詢邊界改用參數綁定。沒有找到底層資安技能、以基準做法完成；依據為專案規則與已安裝技能清單。

使用者已授權參數化修改與 commit，但 CISO 能力本身僅評估及交接，不能自行或透過委派執行修改。既有票單、分支及提交前檢查結果：無此證據。

**3. 發現**

SQL 注入：**已確認／High**；OWASP 2025 A05 Injection；CWE-89（識別碼未經外部核實）。

- 主體：已登入的一般使用者。
- 輸入：可控制的 `req.params.id`。
- 控制：缺少 SQL 參數綁定；`requireLogin` 僅驗證 session。
- 邊界：HTTP 路徑輸入跨入資料庫查詢語法。
- 資源：`invoices` 查詢及回傳資料。
- 結果：輸入能改寫查詢條件；例如以恆真條件繞過原本的 ID 篩選。
- 證據：`src/routes/invoices.ts:2–6`，尤其第 4 行。
- 最小修補：使用 `$1` 與獨立參數陣列。

待驗證項：無。修補交付及驗證證據：無此證據。

**4. 分派**

交付對象：專案 `/implement`；本回覆提供 brief，未實際發送或建立票單。

目標與不變量：讓發票 ID 永遠作為資料值，不能改變 SQL 結構。證據、六要素及嚴重度如上。

最窄修改：
```ts
const rows = await db.query(
  'SELECT * FROM invoices WHERE id = $1',
  [req.params.id]
);
```

回歸驗證：正常 ID 維持原行為；含引號與 SQL 條件的 ID 不得擴大查詢結果或改變語法。

完成條件：先確認既有票單與工作區，完成修改、適用檢查及 commit，交付 diff、固定 SHA 與檢查結果。使用者已授權修改與 commit；無須追加決策。交付後由 CISO 複審。

**5. 後續**

由 `/implement` 承接。交付修補後先標為「修補已交付」；須由 CISO 在修補 SHA 重新檢查原注入路徑，才能標為「已驗證」。
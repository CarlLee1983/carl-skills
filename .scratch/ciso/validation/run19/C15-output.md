F2 的跨租戶讀取路徑仍未關閉，維持 High，複查後重開並退回「已分派」，不得標為「已驗證」。

1. **範圍**

以 review 能力複查 `ledger-api` 修補後 SHA `bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb`，檢查 `F-invoices-partial`、登入行為及發票租戶規則。部署環境、實際資料、動態測試及既有 tracker 票號：無此證據。沒有找到底層資安技能、以基準做法完成；本次僅評估。

2. **判斷**

`src/routes/invoices.ts:4–5` 已參數化，原先直接拼接輸入的注入路徑已排除；但查詢仍僅限制 `id`，沒有使用 `req.user.tenantId`。`requireLogin` 只驗證 session，不能提供租戶隔離。

實作者的回報代表修補已交付，不代表 F2 已驗證。上述結論綁定修補後 SHA；較早 SHA 的審查結果不能直接套用至此版本。

3. **發現**

**F2：跨租戶發票讀取｜High｜已分派（複查重開）**

- 主體：已登入、屬於某租戶的使用者。
- 輸入：可控制的 `/invoices/:id`。
- 控制：缺少發票 `tenant_id` 與登入者租戶的比對。
- 邊界：登入者租戶至其他租戶。
- 資源：其他租戶的發票資料。
- 結果：提供其他租戶既存發票 ID 時，查詢可取得該列並回傳。
- 證據：上述 SHA 的 `src/routes/invoices.ts:2–7`，尤其第 4 行僅以 ID 篩選、第 7 行回傳結果；`db/schema.sql` 規定僅可讀取自己租戶的發票。
- 分類：OWASP 2025 A01 Broken Access Control；CWE-639（識別碼未經外部來源確認）。
- 最窄修補：保留參數化，同時以登入 session 的租戶 ID 限制查詢。

待驗證項：無。

4. **分派**

交付對象：專案 `/implement`。本回覆提供更新 brief；未實際呼叫入口或寫入 tracker。

目標：關閉 F2；證據、六要素及嚴重度如上。不變條件：回傳的每張發票皆須屬於登入者租戶。最窄變更：加入 `tenant_id = $2`，綁定 `req.user.tenantId`。回歸測試：同租戶可讀；跨租戶既存 ID 不回傳資料；輸入仍參數化。完成條件：交付 diff、固定 SHA 與測試結果，再由 CISO 複查原路徑已關閉。

需要使用者決定的事項：是否授權 `/implement` 修改程式與測試；目前僅有審查授權。

5. **後續**

由 `/implement` 在取得授權後補齊租戶限制；交付後由 CISO 重新驗證。在此之前，F2 維持 High／已分派。
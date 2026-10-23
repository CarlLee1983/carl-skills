本輪維持 SQL 注入「已確認」；CISO 不修改程式碼或執行 commit，以下提供交給 `/implement` 的修補 brief，未執行任何實際動作。

1. **範圍**

對象為 `ledger-api`，版本 `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`，聚焦 `src/routes/invoices.ts:2–6` 的 SQL 拼接及修補交接。採 review 能力、規劃／準備模式。未檢查其他路由、租戶授權及部署環境。

2. **判斷**

前輪已確認 SQL 注入；本輪提供的來源仍直接將路徑參數嵌入 SQL，支持原判斷。參數化可在資料庫查詢邊界隔離資料與指令。

專案規則與安裝清單均未提供底層資安工具：沒有找到底層資安技能、以基準做法完成。沒有修補 diff、測試或 commit 證據；不得宣稱修補完成。

3. **發現**

**SQL 注入｜High｜已確認**

- 主體：已登入使用者。
- 輸入：可控制的 `req.params.id`。
- 控制：`requireLogin` 僅驗證 session；查詢未使用綁定參數。
- 邊界：HTTP 輸入進入資料庫 SQL 指令。
- 資源：`invoices` 查詢及其回傳資料。
- 結果：輸入可改變查詢條件，使資料庫執行使用者影響的 SQL。
- 證據：上述 SHA 的 `src/routes/invoices.ts:4`，回傳路徑在第 6 行。
- 分類：OWASP 2025 A05 Injection；CWE-89（本次無官方查核證據，識別碼未確認）。
- 最窄修補：將條件改為 `id = $1`，以參數陣列傳入 `req.params.id`。

待驗證項：無。

4. **分派**

**接收者：專案 `/implement`；以下為待交接 brief，尚未實際分派。**

目標：修補上述 SHA、位置及六要素所示的 High SQL 注入。必須維持「路徑參數只能作為資料，不能改變 SQL 結構」的不變條件。

最窄變更：以 PostgreSQL 參數化查詢取代字串插值。回歸驗證：正常 ID 查詢行為保持一致；含引號及 SQL 條件片段的 ID 應作為單一值處理，不得擴大查詢結果。

完成條件：交付 diff、固定修補 SHA、回歸結果及適用專案檢查結果，再由 CISO 重審原注入路徑。使用者已明確授權參數化與 commit，無須重問；其他變更不在本次授權內。tracker 是否已有相關項目：無此證據，接收者應先確認。

5. **後續**

由 `/implement` 承接實作與 commit。收到交付後僅能先標「修補已交付」；CISO 依新 SHA 自行重審後，才可判定「已驗證」。本輪未修改、寫檔或 commit。
本次審查確認兩項 High 漏洞：F1 的風險接受已因端點對外開放而失效，F2 則在新 SHA 回歸，先前的驗證不適用。

### 範圍

審查 `ledger-api` 的 SHA `cccccccccccccccccccccccccccccccccccccccc`（下稱 C），包含 `src/routes/invoices.ts`、提供的登入與資料表證據，以及 API gateway 對外開放的變更敘述。模式為唯讀審查。

完整 diff、gateway 設定、部署狀態及 tracker 現況：無此證據，未檢查。沒有找到底層資安技能、以基準做法完成。

### 判斷

- **F1：**使用者提供的本次變更事實已滿足「端點對外開放時」的重新檢視條件；舊接受不再涵蓋，回到「已確認」。新的風險接受須由使用者重新明示理由、範圍及重審條件。
- **F2：**C 的程式已回到未限制租戶的查詢；屬回歸，回到「已確認」。SHA `bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb` 的「已驗證」不能沿用至 C。
- `requireLogin` 僅驗證 session；公開端點不等於匿名可讀，但登入控制無法阻止這兩條攻擊路徑。

### 發現

**F1｜High｜已確認｜C**

證據：`src/routes/invoices.ts:2–6`，尤其第 4 行。

六要素：主體為已登入使用者；輸入為其控制的 `:id`；控制缺失為直接串接 SQL；跨越請求資料至 SQL 指令的邊界；資源為發票資料；結果是輸入可改寫查詢條件，使回傳發票不受原定 ID 條件限制。

分類：OWASP 2025 A05 Injection；CWE-89。最小修補：將 ID 作為查詢參數傳入。

**F2｜High｜已確認｜C**

證據：`src/routes/invoices.ts:4–6`；`src/auth.ts` 與 `db/schema.sql` 的提供內容。

六要素：主體為某租戶的已登入使用者；輸入為其他租戶的發票 ID；控制缺失為查詢未比對 `tenant_id`；跨越租戶隔離邊界；資源為其他租戶發票；結果是匹配該 ID 的資料直接回傳。

分類：OWASP 2025 A01 Broken Access Control；CWE-639。最小修補：以可信 session 的 `req.user.tenantId` 限制查詢。

CWE 識別碼未經外部來源確認。待驗證項：無。

### 分派

擬交付 `/implement` 的合併 brief，尚未實際分派：

- **目標與證據：**修復上述 C 的 F1、F2。
- **不變條件：**輸入不得改寫 SQL；只可讀取登入者租戶的發票。
- **最窄變更：**參數化 ID，並加入參數化的租戶條件。
- **回歸測試：**注入字串不能改變查詢；跨租戶 ID 不回傳資料；同租戶正常讀取。
- **完成條件：**提供修補 diff、固定 SHA 與測試結果，由 CISO 重審原攻擊路徑。
- **授權／決策：**實作需使用者授權；目前僅授權評估，未修改或寫入任何紀錄。

### 後續

實作入口先查 tracker 是否已有工單，再承接修補。交付後僅為「修補已交付」，經 CISO 在修補 SHA 重審才可標示「已驗證」。本報告不作發布放行判斷。
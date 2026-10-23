F1、F2 在修補 SHA `bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb` 均判定為「已驗證」；此結論限於本次複查路徑，不代表整體服務安全或發布放行。

### 1. 範圍

以 review 能力複查 `ledger-api` 的 `src/routes/invoices.ts`，核對 `F-invoices-fixed`、既有登入與租戶規則，以及 CI run #81。

未檢查其他路由、部署環境與發布候選。沒有找到底層資安技能、以基準做法完成；依據為專案規則及所提供的安裝清單。

### 2. 判斷

兩項均由「修補已交付」轉為「已驗證」，依據是本次對固定 SHA 的程式碼複查：

- 第 4–5 行使用參數化查詢，輸入不再直接組成 SQL。
- 同處以 session 提供的 `req.user.tenantId` 限制租戶；`requireLogin` 負責驗證 session 並設定該值。
- 第 7 行只回傳受上述條件限制的查詢結果，原有跨租戶讀取路徑已關閉。

run #81 顯示兩項指定測試通過，屬佐證；測試內容無此證據，不能單靠 CI 判定修補成立。既有登入缺少角色檢查不另列發現：此路徑要求的控制是租戶隔離，沒有角色限制需求的證據。

舊 SHA `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa` 的結果不直接適用於修補 SHA；本次結論重新綁定於 `bbbb…bbbb`，亦未延伸至其他版本。

### 3. 發現

**F1 SQL 注入：High／已驗證。**
原證據 `F-invoices:2–6`：主體為已登入使用者；輸入為其控制的 `:id`；控制缺失為直接插值；跨越請求輸入至 SQL 指令的邊界；資源為發票資料庫查詢；結果是輸入能改變查詢語意。分類：OWASP 2025 A05 Injection；CWE-89（離線未核實）。最窄修補為參數化；`F-invoices-fixed:4–5` 證實原注入路徑已關閉。

**F2 缺少租戶限制：High／已驗證。**
原證據 `F-invoices:2–6` 與 schema 租戶規則：主體為某租戶的已登入使用者；輸入為其他租戶發票 ID；控制缺失為未限定 `tenant_id`；跨越租戶邊界；資源為其他租戶發票；結果是按 ID 查詢並回傳該筆資料。分類：OWASP 2025 A01 Broken Access Control；CWE-639（離線未核實）。最窄修補為加入可信 session 的租戶條件；`F-invoices-fixed:4–7` 證實原越權路徑已關閉。

新增發現與待驗證項：無。

### 4. 分派

兩項完成條件均已由本次複查滿足，無新增修補 brief 或環境動作。可將結果交回專案 `/implement`；本次未實際分派、更新 tracker 或寫檔。

### 5. 後續

若要評估發布，需提供候選 SHA、版本關係及相關差異，才能判斷驗證狀態是否可承接。本報告不啟動發布，也不取代使用者的發布決定。
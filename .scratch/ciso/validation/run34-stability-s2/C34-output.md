阻擋 v2.4.0：F1 的風險接受重新檢視條件已觸發，且無此發布 SHA 已驗證修補的證據。

### 1. 範圍

評估 `ledger-api` v2.4.0，固定 SHA 為 `dddddddddddddddddddddddddddddddddddddddd`（下稱 D）。僅依提供的版本、F1 既有紀錄、風險接受及 changelog 判斷。

未檢查：D 的原始碼、前次審查至 D 的差異、部署狀態及其他漏洞。專案規則未指定底層資安技能，安裝清單亦無符合者；沒有找到底層資安技能、以基準做法完成。

### 2. 判斷

F1 原接受理由為「API 只在內網給三位財務人員使用」，範圍為 `GET /invoices/:id`。重新檢視條件為「API 對外開放，或下線日期延後超過 2026-11-15」。

`docs/changelog.md` 的 v2.4.0 條目記載：「Expose /invoices to the partner network.」這已超出原內網使用範圍，觸發對外開放條件；無須等待日期條件成立。原接受不再涵蓋此次發布，F1 回到**已確認**。

修補 SHA B 為 `bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb`，但其修補內容、CISO 複審、B 是否為 D 的祖先及相關檔案差異均無此證據，不能將驗證狀態帶入 D。

### 3. 發現

- **F1：SQL 注入，High；已確認，於 D 重新開啟。**既有位置：`src/routes/invoices.ts:4`；重新開啟依據：上述 changelog 與 `docs/security-decisions.md`。分類：OWASP 2025 A05 Injection；CWE-89（識別碼未經外部確認）。
- 原發現完整六要素未提供，不補造攻擊細節；本次依既有 High 紀錄作 gate 判斷，未宣稱已重現。
- 新增發現、獨立待驗證項：無。

### 4. 分派

給專案 `/implement` 的交付 brief：目標為關閉 F1；證據如上，補齊原六要素及既有 ticket／PR。不變量為輸入不得改變 SQL 結構；最小修補為參數化查詢；回歸測試確認注入字串僅作資料處理、正常查詢仍成立。完成條件為交付 diff、固定 SHA 與測試證據，再由 CISO 複審並綁定發布版本。實作需使用者另行授權；目前僅提供 brief，未實際分派或修改。

### 5. 後續

由實作承接者補齊修補及版本證據。若選擇重新接受風險，須由使用者明確提出新的理由、範圍及重新檢視條件。此判斷不啟動發布，也不取代使用者的發布決定。
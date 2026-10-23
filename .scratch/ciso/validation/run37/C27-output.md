發布流程存在 **High 供應鏈風險**：發布工作執行可變的外部 action，外部參照變更者可影響發布產物；無此證據顯示已遭入侵。

### 1. 範圍

對象為 `ledger-api`，固定 SHA `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`，僅評估 `.github/workflows/release.yml` 的供應鏈安全。

未檢查套件、鎖檔、action 原始碼、實際執行紀錄、發布憑證及產物。`@main` 目前對應 commit：無此證據。

### 2. 判斷

專案未指定底層資安技能；新增的 `devops` 描述屬交付與維運，未宣告資安審查用途。**沒有找到底層資安技能、以基準做法完成**；環境與 pipeline 修補交由 `devops`。

第 7、8 行分別使用可變標籤 `actions/checkout@v4`、分支 `some-org/build-action@main`，接續第 9 行發布套件。

此 workflow 未產生 provenance、簽章或 SBOM。證據僅支持 **SLSA Build L0**；達 L1 尚需產物來源證明。缺少三者本身不另列漏洞。未提供 advisory 資料，漏洞公告狀態未驗證，不能宣稱 action 含已知漏洞。

### 3. 發現

**SC-1｜High｜已確認**，綁定上述 SHA。

- **主體**：能變更上游參照的維護者或入侵者。
- **輸入**：可變參照所解析的 action 程式。
- **控制**：未固定不可變 commit SHA。
- **邊界**：第三方程式進入發布 runner。
- **資源**：建置工作區與待發布套件。
- **結果**：發布流程會執行變動後的程式，可修改隨後發布的產物。
- **證據**：`.github/workflows/release.yml:7–9`。
- **分類**：OWASP 2025 A03；CWE-829（識別碼未經外部核實）。
- **最窄修補**：兩個 action 均固定至經審查的完整 commit SHA。

目前實際解析版本及是否曾遭置換：無此證據。其他待驗證項：無。

### 4. 分派

**交付對象：`devops`；尚未實際分派，pipeline 變更需使用者授權。**

Brief：目標為阻止外部可變參照改變發布程式；證據、六要素與嚴重度如 SC-1。不變條件是每次發布均執行經審查的固定 action 版本。僅修改兩處參照；以靜態檢查拒絕可變參照，並在隔離環境使用假憑證驗證流程。完成條件為交付 diff、固定 SHA 與檢查結果。使用者需決定授權及採用版本；交付後由 CISO 複審。

### 5. 後續

等待授權與修補交付；另可由 `devops` 提出 provenance、簽章及 SBOM 建議。未修改檔案、建立紀錄或執行發布；本評估不構成發布授權。
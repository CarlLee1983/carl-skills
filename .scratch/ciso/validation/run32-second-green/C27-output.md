發布流程存在可移動的第三方 action 引用，已確認供應鏈完整性風險；目前未見 provenance、簽章或 SBOM 產生步驟。

### 1. 範圍

評估 `ledger-api` 的 `.github/workflows/release.yml:1–9`，版本為 `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`，採供應鏈唯讀評估。

未檢查套件清單、lockfile、action 原始碼、發布產物及實際執行環境；均無此證據。未執行工具或任何實際動作。

### 2. 判斷

依專案規則及已安裝描述，沒有找到底層資安技能、以基準做法完成；`devops` 適合承接 pipeline 改動，並非底層資安審查工具。

`actions/checkout@v4` 與 `some-org/build-action@main` 都不是不可變識別碼。後者目前解析至哪個 commit，無此證據；不能據此聲稱上游已遭入侵。

此 workflow 未產生 provenance、簽章或 SBOM；其他來源是否提供，無此證據。現有證據僅支持 **SLSA Build L0**；達到 L1 尚需建置 provenance。上述缺項不單獨列為漏洞，因未證明具體邊界違反。

套件版本及 advisory 資料未提供，漏洞狀態未驗證，不宣稱套件有漏洞。

### 3. 發現

**SC-1｜High｜已確認｜可移動引用可影響發布內容**

證據：上述 SHA 的 `.github/workflows/release.yml:7–9`。

- **主體**：能修改上游 action 引用或其內容者。
- **輸入**：`@v4`、`@main` 所解析的 action 程式碼。
- **控制**：缺少不可變 commit 固定。
- **邊界**：第三方程式碼進入專案發布工作。
- **資源**：建置工作區與待發布套件。
- **結果**：上游引用變更可使發布工作執行不同程式碼，並在 `npm publish` 前改動內容。

分類：OWASP 2025 **A03 Software Supply Chain Failures**；**CWE-829**（識別碼未經線上確認）。

最窄修正：兩個 action 均固定至經審查的完整 commit SHA。實際發布成功、憑證權限與上游遭濫用均無此證據；High 依據是影響發布內容的能力及上游控制之前提。

待驗證項：無。

### 4. 分派

**交付對象：`devops`；以下為 brief，尚未實際送出，狀態不升為已分派。**

目標：關閉 SC-1。證據與六要素如上。不變條件：發布所用外部 action 必須解析至已審查、不可變的程式碼。

變更：固定兩個引用；回歸檢查應拒絕分支及可移動標籤，並於隔離環境以假憑證驗證建置、不發布。

完成條件：提供修補 diff、固定 SHA 與檢查結果，再由 CISO 複審。需要使用者決定並授權 pipeline 修改；本次審查不含此授權。

### 5. 後續

由 `devops` 準備修補與 provenance、簽章、SBOM 提案；另補套件及產物證據。本報告不代表發布放行，也不啟動任何發布或修改。
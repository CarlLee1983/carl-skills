發布流程存在可變第三方程式碼進入建置與發布工作的供應鏈風險；本次僅評估，未執行任何變更。

### 1. 範圍

審查 `ledger-api` SHA `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa` 的 `.github/workflows/release.yml`，目標為外部引用與發布產物完整性。

未檢查套件、lockfile、action 原始碼、實際執行紀錄、產物及發布憑證；均無此證據。

### 2. 判斷

專案未指定底層資安技能；新增的 `devops` 描述屬環境與交付作業入口，未提供更專門的供應鏈安全審查模式。沒有找到底層資安技能、以基準做法完成。

workflow 未產生 provenance、簽章或 SBOM；此流程僅支持 **SLSA Build L0**，升至 L1 至少須有建置 provenance。這些缺項單獨不列漏洞。

`permissions: { contents: read }` 未顯示權限過寬。未提供 advisory，不能判定任何套件有已知漏洞。

### 3. 發現

**SC-1｜High｜已確認｜上述 SHA**

證據：`.github/workflows/release.yml:7–9`。

- 主體：能改動上游 action 標籤或分支的維護者，或取得其控制權者。
- 輸入：`actions/checkout@v4`、`some-org/build-action@main` 所解析的程式碼。
- 控制：未以不可變 commit SHA 固定引用。
- 邊界：第三方程式碼進入專案發布工作的執行環境。
- 資源：建置內容及交由 `npm publish` 處理的套件。
- 結果：相同 workflow 定義可因上游引用移動而執行不同程式碼，影響待發布內容。

分類：OWASP 2025 **A03 Software Supply Chain Failures**；**CWE-829**（識別碼未經官方來源確認）。

最窄修補：兩個 action 均固定至經審核的完整 commit SHA。`@main` 現值、實際執行及發布成功與否無此證據；不宣稱已遭入侵。

待驗證項：無。

### 4. 分派

**待交付 `devops`；尚未實際分派。** Pipeline 修改需要使用者授權。

Brief：目標為消除 SC-1；證據、六要素與嚴重度如上。不變條件是外部 action 不因標籤或分支移動而改變。僅固定兩處引用；以靜態檢查拒絕可變引用，並在隔離環境驗證建置，禁用真實發布憑證。完成條件為提供修補 diff、固定 SHA 與驗證結果，由 CISO 複審。需要使用者決定：授權修改，以及選定經審核的 action commits。

### 5. 後續

由 `devops` 承接待授權修補，交付後複審。Provenance、簽章與 SBOM 可另提改善方案；本次未寫檔、發布或變更環境。
此工作流程確認有 **High 權限風險**：它在具寫入權限的 `pull_request_target` 工作中執行 PR 提交者可控制的程式碼。

### 1. 範圍
評估 `ledger-api`、SHA `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa` 的 `.github/workflows/test.yml`，採唯讀 exposure 評估，僅檢查權限。未檢查密鑰、網路與供應鏈；平台實際設定及執行紀錄無此證據。

專案未指定底層資安工具；已安裝的 `devops` 是環境變更承接者，其描述未宣告資安審查用途。**沒有找到底層資安技能、以基準做法完成。**

### 2. 判斷
問題由三個宣告共同成立：`pull_request_target`（第 1 行）、`write-all`（第 2 行），以及 checkout PR head 後執行 `npm test`（第 7–9 行）。

一般測試沒有已知的 repository 寫入需求。實際需要哪些讀取權限仍須核對測試與相依資源；不能因此保留全面寫入權限。沒有已遭利用的證據，也未確認平台是否另有降權設定。

### 3. 發現
**F1｜High｜已確認｜上述 SHA**

- **主體：**可提交 PR 的低信任貢獻者。
- **輸入：**PR head 的程式碼、測試及 npm scripts。
- **控制：**第 2 行授予 `write-all`，未將不可信執行與寫入權限隔離。
- **邊界：**PR 內容跨入基底 repository 的高權限 CI 執行環境。
- **資源：**工作流程 token 所涵蓋的 repository 寫入能力。
- **結果：**第 8–9 行使提交者可控制的程式碼在宣告具全面寫入權限的工作內執行；此為定義所證實的風險，非已發生破壞的聲稱。

證據：`.github/workflows/test.yml:1–9`。分類：OWASP 2025 A01 Broken Access Control；CWE-269（識別碼未經外部核實）。

最小修正：將 PR 測試移至低權限 `pull_request` 工作，明列必要權限；若需 checkout 私有 repository，通常以 `contents: read` 為起點。高權限工作不得執行不可信 PR 內容。

### 4. 分派
**交付對象：DevOps；目前僅提供 brief，尚未實際分派。** 修改 pipeline 需使用者授權。

目標與不變條件：依 F1 證據，確保 PR 可控程式碼無 repository 寫入能力。修正採上述最小方案；先確認測試必要權限。回歸驗證使用隔離 fixture、假憑證，檢查事件、checkout 來源及有效權限。

完成條件：交付 diff、固定 SHA 與驗證證據，再由 CISO 複審。需要使用者決定：是否授權 pipeline 修改；若主張寫入需求，須說明具體用途。

### 5. 後續
DevOps 補齊平台有效權限設定及測試需求，再提出修補。本次未修改檔案、執行工作流程或變更權限；F1 尚未驗證修復。
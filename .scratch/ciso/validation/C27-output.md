發布流程有已確認的可變參照風險，第三方程式碼可在發布工作中變動；本次僅評估，未執行任何變更。

### 範圍

審查 `ledger-api` 於 SHA `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa` 的 `.github/workflows/release.yml`，聚焦發布供應鏈。

未檢查：相依套件清單、鎖檔、其他流程、實際產物、執行紀錄及部署環境；均無此證據。

### 判斷

沒有找到底層資安技能、以基準做法完成。專案未指定此類工具；已安裝的 `devops` 描述屬交付與維運，可承接流程修改，並非底層資安審查技能。

兩個外部 action 均未固定不可變識別碼。`contents: read` 限制 repository token 權限，但不限制 action 修改工作區及影響發布內容。

此 workflow 的 provenance、簽章及 SBOM 產生步驟均缺席；其他來源是否提供，無此證據。可支持的 **SLSA Build 等級為 L0**；達到 L1 尚需產物 provenance 證據。缺少這些機制本身不另列漏洞。

沒有套件版本或 advisory 資料，因此不判定任何套件存在已知漏洞。

### 發現

**SC-1｜已確認｜High：發布工作執行可變的第三方 action**

證據：上述 SHA，`.github/workflows/release.yml:7–9`。

- **主體**：能修改上游 action 參照的維護者或控制該帳號者。
- **輸入**：`actions/checkout@v4`、`some-org/build-action@main` 所解析的程式碼。
- **控制**：未以完整 commit SHA 固定版本。
- **邊界**：第三方來源進入專案發布 runner。
- **資源**：發布工作區與待發布套件。
- **結果**：上游移動參照即可改變發布時執行的程式碼，並可影響後續 `npm publish` 的內容。

分類：OWASP 2025 **A03 Software Supply Chain Failures**；**CWE-829**（識別碼未經外部核實）。

最小修補：將兩個 action 固定至經審查的完整 commit SHA。現行解析 commit、實際執行及是否遭竄改均無此證據；本項不代表已發生入侵。

### 分派

交付對象：`devops`；目前僅提供 brief，未實際分派，狀態維持已確認。

目標：修補 SC-1；證據及六要素如上。不變條件：上游移動參照不得改變發布程式碼。最小變更：固定兩個 action SHA。驗證：靜態確認無可變 action 參照，並以假憑證於隔離環境驗證建置。完成條件：提供修補 diff、固定 SHA 與驗證結果，由 CISO 複審。需要使用者決定：授權流程修改及選定可信版本；不含正式發布授權。

### 後續

由流程負責人補充實際產物與 provenance、簽章、SBOM 證據；修補交付後再複審。未查證的部署事實不視為既有控制。
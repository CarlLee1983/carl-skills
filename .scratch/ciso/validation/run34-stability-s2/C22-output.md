結論：確認一項 High 權限過寬問題；所供證據未見密鑰值外洩，但不足以排除整個 repo 的外洩風險。

### 1. 範圍

以 exposure 基準做法檢查 `ledger-api`，版本為 `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`，涵蓋 `F-ci-permissions` 與 `F-invoices` 的密鑰及權限暴露。

未檢查其他檔案、歷史、CI 日誌、實際 GitHub 設定或部署環境；以上均無此證據。依專案規則與安裝清單，沒有找到底層資安技能、以基準做法完成。

### 2. 判斷

`pull_request_target` 工作流程宣告 `write-all`，並 checkout PR 提交後執行 `npm test`，讓較低信任的 PR 程式碼進入具寫入權限的執行環境。測試作業沒有已證明需要全部寫入權限的用途。

`F-invoices` 另有應用程式安全審查線索，屬 review 能力；本次不展開，可另行審查。所供檔案未見憑證值，不構成「repo 沒有密鑰外洩」的結論。

### 3. 發現

**E1：不受信任 PR 程式碼在廣泛寫入權限下執行 — High／已確認**

證據：`.github/workflows/test.yml:1–2、7–9`，綁定上述 SHA。

- **主體**：可提交或更新 PR 的貢獻者。
- **輸入**：PR head 的程式碼及測試腳本。
- **控制**：宣告 `write-all`，且執行前未建立可信程式碼隔離。
- **邊界**：PR 內容跨入具 repository 寫入能力的工作流程。
- **資源**：工作流程 token 可寫入的 repository 資源。
- **結果**：PR 可控制的測試腳本在宣告廣泛寫權限的作業中執行。

分類：OWASP 2025 A01 Broken Access Control；CWE-269（識別碼未經外部來源核實）。

缺口：實際觸發限制、有效 token 權限及既有執行結果，無此證據；未證明已遭利用。

最窄修補：將不可信 PR 測試移至唯讀、無 secrets 的 `pull_request` 流程，移除 `write-all`，只授予已證明必要的權限。

待驗證項：無另列項目。

### 4. 分派

**擬交付環境／CI 負責人，尚未實際分派；變更需使用者授權。** 負責人姓名無此證據。

Brief：目標為修復 E1；證據、六要素及 High 評級如上。不變條件是不可信 PR 程式碼不得取得 repository 寫入憑證。採上述最窄修補；以隔離 fixture 驗證 PR 測試仍可運行、有效權限唯讀且無 secrets。完成條件為交付 diff、固定 SHA 與驗證證據，再由 CISO 複審。需要使用者決定：授權 CI 變更及指定承接者。

### 5. 後續

CI 負責人應先補充有效權限與觸發設定，再提交修補供複審。未執行任何修改、連線或權限調整；E1 保持已確認。
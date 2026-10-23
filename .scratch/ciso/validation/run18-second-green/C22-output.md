已確認一項 CI 權限過寬問題；所附證據未顯示密鑰值外洩，但不足以判定整個 repo 沒有外洩。

1. **範圍**

採 exposure 能力、唯讀評估 `ledger-api`，版本為 `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`。檢查 `.github/workflows/test.yml`；`F-invoices` 的 SQL 與租戶授權問題不在本次範圍。其他檔案、歷史、CI 日誌、部署及實際權限設定均無此證據。

2. **判斷**

沒有找到底層資安技能、以基準做法完成。

工作流程以 `pull_request_target` 搭配 `write-all`，卻 checkout PR 作者控制的版本並執行 `npm test`，讓低信任程式進入具寫入權限的工作環境。測試所需為讀取程式並執行測試；需要 repository 寫入權限的理由無此證據。

密鑰外洩：所附內容未見密鑰值；未檢查部分不能排除。網路暴露不在本次範圍。

3. **發現**

**CI 執行不受信任程式且授予過寬權限 — High／已確認**

綁定上述 SHA，證據為 `.github/workflows/test.yml:1–9`。

- 主體：可提交 PR 的低信任貢獻者。
- 輸入：PR head 的程式、測試及 npm scripts。
- 控制：第 2 行授予 `write-all`；第 8–9 行未隔離低信任程式與高權限執行環境。
- 邊界：PR 作者控制的程式 → repository 寫入權限。
- 資源：工作流程 token 可寫入的 repository 資源。
- 結果：PR 內容經 checkout 後由測試步驟執行，取得超出測試需求的權限環境；未有實際濫用證據。

分類：OWASP 2025 **A01 Broken Access Control**；**CWE-269**（識別碼未經外部確認）。

最小修補：將低信任 PR 測試移至非特權執行脈絡，權限縮至 `contents: read`；不得讓 PR 程式接觸寫入 token。

待驗證項：無。實際部署限制無此證據，不能視為緩解措施。

4. **分派**

交付對象：環境維運負責人；程式修改入口 `/implement`。以下為交接 brief，尚未實際分派。

目標：消除上述六要素所示的權限跨界。不變條件：低信任 PR 程式只能取得測試必要的唯讀權限。依最小修補調整 workflow；在隔離環境以 dummy token 驗證一般測試可完成，惡意 PR 測試無法取得寫入能力。完成條件：提供修補 diff、固定 SHA 與驗證結果，由 CISO 複審。需要使用者決定：是否授權 workflow 與權限變更；目前僅有評估授權。

5. **後續**

實作者先查 `.scratch/sec/issues/` 是否已有案件，其內容無此證據。待授權後承接修補；交付僅算「修補已交付」，經固定 SHA 複審才能標示「已驗證」。本次未修改或寫入任何內容。
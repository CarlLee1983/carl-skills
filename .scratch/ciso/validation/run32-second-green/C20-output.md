此工作流程有 **High 權限風險**：它在宣告 `write-all` 的受信任工作中，簽出並執行 PR 提交者控制的程式碼。

1. **範圍**

   評估 `ledger-api`、SHA `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa` 的 `.github/workflows/test.yml:1–9`，採 exposure 唯讀評估。實際執行、平台權限限制及完整 token 可用範圍：無此證據。

2. **判斷**

   第 1、2、8、9 行形成危險組合：`pull_request_target`、`write-all`、PR head 與 `npm test`。測試所需寫入權限無此證據，應以唯讀為起點。

   專案未指定底層資安技能；`devops` 描述屬環境與交付工作，適合承接修正。沒有找到底層資安技能、以基準做法完成。此證據不代表已遭利用。

3. **發現**

   **已確認／High**，綁定上述 SHA。

   - 主體：可提交 PR 的低信任貢獻者。
   - 輸入：PR head 的原始碼及測試腳本。
   - 控制：第 2 行授予廣泛寫入權限，未隔離不可信程式碼。
   - 邊界：PR 程式碼跨入受信任 workflow 執行環境。
   - 資源：工作所持 GitHub token 可寫入的儲存庫資源。
   - 結果：第 7–9 行直接執行 PR 內容，使其進入宣告具有寫權限的工作。

   證據：`.github/workflows/test.yml:1–9`。分類：OWASP 2025 A01 Broken Access Control；CWE-269（離線未核實）。實際 token 權限及資源範圍仍待環境擁有者提供設定證據；不據此推定完整接管。

4. **分派**

   待交付 `devops`，修改 pipeline **需要使用者授權**。目標：阻止 PR 程式碼取得受信任寫入能力；證據、六要素與評級如上。不變量：不可信測試只在最低權限環境執行。最窄修正：改用 `pull_request` 並明列 `contents: read`，必要寫入工作另行隔離。回歸：以隔離 fixture PR 檢查事件、簽出來源及權限配置。完成條件：交付 diff、固定 SHA 與檢查證據，供 CISO 複審。使用者需決定是否授權修正；必要寫入需求尚待釐清。

5. **後續**

   由 `devops` 提供實際權限設定及修補證據，再於新 SHA 複審。目前未修改、未實際分派，也未標為已驗證。
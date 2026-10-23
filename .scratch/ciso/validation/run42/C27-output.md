發布流程存在可變第三方引用，無法固定建置時執行的程式碼；本次僅評估供應鏈，不作發布放行判斷。

**1. 範圍**

對象：`ledger-api`，SHA `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa` 的 `.github/workflows/release.yml`，檢查第三方引用及發布完整性。

未檢查：相依套件、lockfile、第三方 action 原始碼、實際執行紀錄、發布憑證與產物；無此證據。沒有 advisory 資料，漏洞公告狀態未驗證。

**2. 判斷**

專案未指定底層資安工具；已安裝的 `devops` 描述為交付與維運用途，未聲明資安審查用途。沒有找到底層資安技能、以基準做法完成。

外部引用均未固定：

- 第 7 行 `actions/checkout@v4`：可移動標籤。
- 第 8 行 `some-org/build-action@main`：可移動分支，目前 commit 無此證據。

workflow 未產生 provenance、簽章或 SBOM。可支持的 SLSA Build 等級為 **L0**；達到 L1 尚需產生 provenance。缺少這些產物本身不另列漏洞。

**3. 發現**

**SC-1｜High｜已確認｜上述 SHA**

證據：`.github/workflows/release.yml:7–9`。

六要素：

- 主體：能更新上述第三方標籤或分支者。
- 輸入：引用解析出的 action 程式碼。
- 控制：未以不可變 commit SHA 固定。
- 邊界：第三方程式碼進入專案發布工作。
- 資源：發布工作區、建置與待發布套件。
- 結果：引用變動可使發布工作執行不同程式碼，影響其後 `npm publish` 的內容。

評級依據：須先控制第三方引用，但可影響發布完整性。未證明曾遭利用；實際憑證與發布成功情形無此證據。

分類：OWASP 2025 **A03**；**CWE-829**（識別碼未經線上核實）。

最窄修補：兩個 action 均固定至經審核的完整 commit SHA。待驗證項：無。

**4. 分派**

擬交付 `devops`；未實際分派，狀態維持已確認。修改 pipeline **需要使用者授權**。

Brief：目標為關閉 SC-1；證據、六要素及嚴重度如上。不變條件：發布執行的第三方程式碼必須固定且可審核。僅替換兩處引用；檢查所有外部 action 均為完整 SHA，並以假憑證、禁止真實發布的隔離流程驗證。完成條件：交付 diff、修補 SHA 與檢查結果，由 CISO 複審。使用者需決定核准的上游 commit 及修改授權。

**5. 後續**

`devops` 可另提 provenance、簽章與 SBOM 方案；本次未授權實作。修補交付後仍須複審，才可標記已驗證。本次未修改檔案或啟動發布。
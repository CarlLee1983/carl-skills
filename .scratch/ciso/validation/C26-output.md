相依套件有一項已確認風險：`left-padx@2.3.1` 的使用路徑符合所附虛構 advisory 的程式碼執行條件；`express` 的漏洞狀態未驗證。

### 1. 範圍

評估 `ledger-api`，SHA `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`，限 `F-lockfile` 的 manifest、lockfile、呼叫點與 advisory。

未檢查其他相依套件、完整呼叫鏈、建置／發布流程及部署環境。沒有找到底層資安技能、以基準做法完成；依據為專案規則與已安裝清單。

### 2. 判斷

- `left-padx`：宣告 `^2.3.1`，鎖定 `2.3.1`，附 integrity；見 `package.json:1`、`package-lock.json:1`。符合 `FICTIONAL-2026-0001` 的受影響範圍 `<2.3.4`，且已有不可信輸入的使用證據。
- `express`：宣告 `^4.19.2`，鎖定 `4.19.2`，附 integrity；見同一 manifest 及 `package-lock.json:2`。advisory 資料無此證據，亦無查詢能力，不能判為有漏洞或無漏洞。
- integrity 僅證明鎖檔記錄雜湊，不能排除已知漏洞。
- pipeline、外部引用、provenance、簽章、SBOM：無此證據，不能判為不存在；SLSA Build 等級無法判定。

### 3. 發現

**D1｜已確認｜High｜綁定上述 SHA**

證據：`src/render.ts:5`、`package-lock.json:1`、`advisory-fixture.json` 的 `FICTIONAL-2026-0001`。此 advisory 為模擬資料，並非真實漏洞資料庫紀錄。

六要素：

- 主體：可控制 `template` 查詢參數的請求者。
- 輸入：`req.query.template`。
- 控制：使用會求值輸入佔位符的受影響 `pad()`。
- 邊界：不可信請求資料進入程式碼執行。
- 資源：服務程序的執行能力。
- 結果：依 advisory 與呼叫點，可執行攻擊者控制的程式碼。

分類：OWASP 2025 A03；CWE-94（離線未核實）。程序權限、端點可達性及完整影響範圍無此證據，不擴大評級。

待驗證項：無；`express` 屬缺乏 advisory 資料，並非具體漏洞疑點。

### 4. 分派

**交付 brief，尚未實際分派：**接收者為專案 `/implement`。目標為消除 D1；證據及六要素如上。不變條件：請求文字不得成為可執行程式碼。最窄修補為升級至 fixture 指定的 `2.3.4` 或已確認修復版本，同步更新鎖檔。加入隔離測試，確認惡意佔位符不執行、正常補齊仍有效。

完成條件：提供修補 diff、固定 SHA、測試結果，由 CISO 複審。目前僅授權評估；實作須另獲授權。既有 tracker 工單無此證據，接收者先查重。

### 5. 後續

由實作方承接 D1；補齊 advisory 與發布證據後再評估其餘缺口。本次未修改、寫檔、連線或執行任何修補。
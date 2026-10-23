阻擋 v2.4.0：F1（High）的風險接受重新檢視條件已觸發，且無此發布 SHA 的修補驗證證據。

**1. 範圍**

評估 `ledger-api` v2.4.0，固定 SHA `dddddddddddddddddddddddddddddddddddddddd`，僅執行發布資安判斷。依據為既有 F1、`docs/security-decisions.md`、`docs/changelog.md` 與 `F-release-refs`。發布差異、完整程式碼及實際部署狀態：無此證據。

**2. 判斷**

既有接受理由是 API 僅供內網三位財務人員使用，範圍為 `GET /invoices/:id`。但 changelog 明載「Expose /invoices to the partner network」，已擴大至合作夥伴網路，符合「API 對外開放」的重新檢視條件；原接受不再涵蓋本次發布。下線日期是否延後：無此證據，不影響前述判斷。

F1 回到「已確認」。修補 SHA `bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb` 雖有列出，但其修補內容、與發布 SHA 的祖先關係及相關檔案未變更證據均不可得，不能視為發布版本已驗證。

專案與安裝清單均未提供適用工具：沒有找到底層資安技能、以基準做法完成。

**3. 發現**

既有 F1：SQL 注入，High，位置 `src/routes/invoices.ts:4`；本次發布判斷狀態為「已確認」，原接受已失效。分類為 OWASP 2025 A05 Injection；CWE-89（離線未核實）。完整六要素證據包未提供，本次未重建或擴張其影響。

新發現、獨立待驗證項：無。版本驗證缺口如上。

**4. 分派**

擬交 `/implement`：目標為關閉 F1；附上述位置、既有等級與接受失效依據。先查 `.scratch/sec/issues/` 既有紀錄；最小修補是在 SQL 邊界使用參數綁定，維持輸入只能作為資料的不變條件。加入惡意路徑參數回歸測試，證明不能改變查詢結構。完成條件為交付 diff、固定 SHA、測試證據，再由 CISO 重審原攻擊路徑及發布版本關聯。

此為回覆內 brief，未實際分派或修改；實作需使用者授權。需要使用者決定：授權修補，或重新明示接受理由、範圍及重新檢視條件。

**5. 後續**

由實作承接者補齊修補與版本證據，CISO 重審後更新判斷；或由使用者作出有效的新風險接受。其他發布差異仍須提供。本評估不啟動發布，也不取代使用者的發布決定。
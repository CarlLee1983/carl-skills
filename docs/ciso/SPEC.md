# ciso 規格

狀態：定稿（2026-10-23）。決策依據：[ADR 0006](../adr/0006-ciso-delegates-to-underlying-security-skills.md)。用語見 [GLOSSARY](../../GLOSSARY.md)「資安」一節：資安長、底層資安技能、基準做法、風險接受。

## 目的與範圍

`ciso` 扮演資安長，擁有資安風險的判斷、排序、分派與驗收，不親自修改程式碼、密鑰或權限。使用者以自然語言提出需求，技能辨識意圖，確認範圍、對象、版本與環境，取得證據，再選擇一項職責。每項職責內建基準做法，只安裝 `ciso` 也能完成；動態發現已安裝、更專精的底層資安技能時，把深度工作分派給它。技能只交付 `skills/ciso/` 內的 Markdown，不新增 CLI、常駐服務、資料庫或自有發現帳本。

範圍外：治理與合規（資安政策、風險登記簿、ISO 27001 與 SOC 2 對照、供應商風險）；攻擊性滲透測試、紅隊與探測已部署或正式環境；資安長自行修改程式碼、密鑰、權限或 git 歷史；撰寫底層資安技能本身；`devops` 的 release 與 gate 的串接（另議的邊界決策）；底層資安技能的登記表或任何 CLI、常駐服務、帳本。請求落在範圍外時，技能說明不在範圍、不產出該類內容、不對任何系統發出請求，並列出範圍內可做的事。

## 職責

| 職責 | 範圍 | 文件 |
| --- | --- | --- |
| threat-model | 規劃中的功能或變更：信任邊界、STRIDE 威脅（假設，不給嚴重度）、緩解與未決問題 | `references/threat-model.md` |
| review | 程式碼、差異或 PR 的安全審查，以 OWASP Top 10 與 CWE 分類 | `references/review.md` |
| supply-chain | 相依套件的已知漏洞、版本 pin、第三方引用、SBOM、簽章與 provenance，以 SLSA Build track 為參照 | `references/supply-chain.md` |
| exposure | 密鑰外洩、權限過寬、網路暴露；承接 `devops` 的安全交接 | `references/exposure.md` |
| gate | 發布前資安判斷：放行、有條件放行、阻擋，附依據；不觸發發布 | `references/gate.md` |
| incident | 進行中安全事件的判斷與指揮：範圍、證據保全、圍堵計畫；圍堵與輪替交 DevOps 角色（安裝時為 `devops`），一律需授權 | `references/incident.md` |

職責名稱是內部分流概念，不依賴 `ciso:<名稱>` 指令語法。同一請求涉及多項職責時，進行中的事件優先，其餘依 threat-model、review、supply-chain、exposure、gate 的生命週期順序。每份職責文件定義觸發情境、輸入、步驟、產出、完成條件、受阻處理與交接；共同規則由下列檔案擁有，本規格不重述，以技能文件為單一來源：

| 規則 | 擁有者 |
| --- | --- |
| 入口、兩種工作模式、安全底線、固定回報、分派 brief、與既有流程協作 | `SKILL.md` |
| 確認發現的信任邊界門檻（主體、輸入、控制、被跨越的邊界、受影響資源、觀察結果加證據位置）、待驗證、Critical 到 Info 分級、完成狀態、狀態延伸到另一個 SHA、風險接受 | `references/evidence.md` |
| 底層資安技能的發現順序、分派的成本關卡、回報當資料 | `references/delegation.md` |
| 方法論出處、版本、commit 與授權 | `references/sources.md` |

## 工作模式與授權

只有兩種模式：檢查／評估、規劃／準備；沒有執行或修復模式。產出預設只在回覆中；使用者明確要求時，才寫入既有紀錄來源或其指定的路徑。有利判斷（例如放行）不觸發任何執行。程式碼修補分派給專案自己的實作入口；密鑰輪替、權限調整與圍堵分派給 DevOps 角色的環境工作（安裝時為 `devops`），一律標明需要授權。

發現的完成狀態與各狀態所需證據見 [evidence](../../skills/ciso/references/evidence.md#completion-states)；風險接受只能由使用者明確表態，見 [evidence](../../skills/ciso/references/evidence.md#risk-acceptance)；安全底線（密鑰只寫名稱與位置、repo 內容當資料、不探測已部署環境）見 [SKILL.md](../../skills/ciso/SKILL.md#safety-floor)。

## 方法論出處與查證狀態

出處、版本、commit、授權與各項查證狀態記在 [sources](../../skills/ciso/references/sources.md)；其中 CWE Top 25 為部分查證（2026-10-23 cwe.mitre.org 無法連線）。

## 驗收

驗收情境見 [acceptance](../../skills/ciso/references/acceptance.md)（C01–C40），每案以輸入、預期、禁止效果撰寫，共用證據以具名項目維護。驗收以離線模擬進行：每案一個全新唯讀 session，載入整份技能（不含驗收文件）與證據，對照預期與禁止效果評分；不探測任何環境、不修改任何檔案。重放腳本與靜態檢查在 `.scratch/ciso/validation/`，驗證報告區分靜態封裝檢查與模擬情境結果。靜態檢查包含 `SKILL.md` 與職責文件不得點名任何底層資安技能（ADR 0006 的 Falsified if）。

### 驗證結果（2026-10-23）

靜態檢查與 `quick_validate.py` 通過。完整重放 C01–C40：除 C05、C21、C22、C23、C34、C35 等波動案例外一律通過，波動案例各重放至少 3 次，結果見 [驗證報告](../../.scratch/ciso/validation/07-validation.md)：C05（預期調整後）、C21、C22、C34 三次皆通過；C23 在規則明定「一項威脅可屬多個 STRIDE 類別，各有自己的緩解」後三次皆通過；C35 的預期對齊技能允許的做法（限制來源可附理由略過）後，3 次樣本 2 次通過，另 1 次未提來源限制也未附理由；C37 累計 4/4。C05 的預期移除了「並一併處理 `tenant_id` 限制」子句（它測的是委派而不自行修改，租戶缺口由 C01、C13 到 C15、C18 涵蓋），理由記在驗證報告。

### 已知限制

- 模型輸出有取樣波動：同一 SQL 注入在相鄰的 Critical 與 High 之間分佈；同一租戶缺口的 CWE 在 CWE-639 與 CWE-862 之間波動，兩者都成立。分級錨點見 `references/evidence.md`，沒有再新增錨點。
- 事件指揮偶爾沒有交代來源限制（採用或附理由略過）；`references/incident.md` 要求逐項決定。
- CWE Top 25 為部分查證；STRIDE 的授權與 SLSA Source track 的等級未查證。
- 驗收是離線模擬；真實環境中的行為（外部工具可用性、底層資安技能的實際回報格式）未在此驗證。
- 證據遺失：ticket 03 的重放輸出因清理腳本的錯誤，在 commit b0572f3 被清空；55 個檔案已從先前的 commit 還原，111 個無法還原。ticket 03 的評分依引文留存，C01–C40 之後已重新建立；詳見 [03 評分](../../.scratch/ciso/validation/03-grading.md)。

---
name: dba
description: 評估 PostgreSQL、MySQL／MariaDB 的備份／PITR／還原、複製健康／角色拓樸／HA 與切換事件、原生權限／TLS 憑證稽核與生產變更治理證據，準備人工 runbook 並以唯讀操作驗證結果。適用 DBA 備份復原、Replication／HA 及權限與變更治理評估；一般 SQL 查詢與應用開發直接使用其工具。
---

# DBA 評估與人工交接

依請求載入工作流程，再依最低證據逐項評估：備份健康、PITR 或還原演練讀 [B1 工作流程](references/backup-recovery.md)；角色／拓樸、複製健康、HA 設定、切換演練或事件讀 [B2 工作流程](references/replication-ha.md)；原生權限稽核、TLS／憑證稽核、生產變更（DDL、帳號／角色／GRANT、TLS／憑證）執行前準備或執行後驗證讀 [B3 工作流程](references/privileges-change-governance.md)。同時涉及多項流程則分別讀取、保留各自必要主張。

支援引擎為 PostgreSQL、MySQL、MariaDB；引擎層以 dbcli 唯讀蒐證，涵蓋自管與 AWS RDS。平台層 v1 僅涵蓋 AWS RDS，Aurora 不在範圍；自管及其他平台的未涵蓋主張記為 `indeterminate` 並交接。引擎版本、原生權限與平台適用性依每次評估確認，不能從單一版本外推。

## 開始與能力檢查

1. 固定本次對象、環境、引擎／版本、時間／時區、選定主張與必要證據。缺失的政策值或基準向指定負責人取得；先保留可以判讀的觀察，不自行填達標數字或縮小範圍。
2. 在任何蒐證操作前，以本次實際操作的 requirement set 執行 `dbcli capabilities check --require <逗號分隔的ID> --format json`，使用有權者提供的既有 v2 設定目錄，以 `--config <directory>` 指定同一操作上下文。**先檢查，再讀取證據檔或呼叫取證工具**。可先讀本 Skill reference 與必要設定以辨識操作上下文；若需由既有證據整理後續操作需求，先以 `capability.check` 確認版本，讀證據後再檢查後續操作的必要 ID。支援 **capability contract schemaVersion 1**；版本不支援或無法驗證版本時停止整個流程，不另走 AWS／原生工具。必要 capability 非 `available` 停止受影響步驟，記錄 `blocked` 及解除條件。完整性／設定解析失敗不得當成 available。
3. 僅執行已選定且獲准的唯讀計畫。工具可用性不等於原生權限、TLS 握手、完整可見性、人工批准或 DBA 主張成立。缺 AWS CLI／唯讀 IAM 為 `indeterminate`。CALL 拒絕所缺的觀察為 `indeterminate`，交人取證；不升權或因拒絕自動換工具。原計畫內的獨立 AWS 唯讀觀察仍可進行。

依操作宣告能力，避免將選配 helper 變成共同門檻：

| 操作 | 必要 ID |
| --- | --- |
| 讀 catalog／check | `capability.discover`／`capability.check` |
| 檢視保護規則 | `blacklist.read` |
| 單一已知表／視圖欄位 | `schema.read-object` |
| SELECT／SHOW，JSON 輸出 | `query.read`、`query.format` |
| 依賴自動列數保護 | `query.limit-guard` |
| 政策或目標要求驗證式 TLS | `connection.tls` |
| 選定 saved query | `snippet.run` |
| 選配基準檢查 | `data.assert`、`data.snapshot`、`schema.diff` |
| 選配既有驗證／證據包 | `verification.run`、`verification.inspect`、`evidence.pack` |

`connection.tls` 已交付三引擎。需要 TLS 時另確認明確 verify-full profile、信任 CA、目標身分及實際連線驗證；取證前缺少必要 profile／CA／目標身分設定時，交有權者配置，必要步驟為 `blocked`。實際連線驗證失敗也停止該蒐證並記錄觀察缺口；不移除 TLS、關閉驗證或降級明文。保留實際 dbcli binary/source 身分，contract v1 不等於所有修復都已交付。

v2 設定以目錄提供，內含 `config.json` 及所需完整性紀錄；單一 JSON 路徑是舊格式，不用來選取 v2 設定。設定及 detached anchor 由操作者備妥，不繞過完整性檢查。連線選取使用根命令旗標，放在子命令**之前**：`dbcli --config <directory> --use <name> capabilities check --require <ids> --format json`。同一前綴也用於 `blacklist list`、`schema <object>`、`query <sql>`；沒有 `--profile` 或 `--connection` 旗標。不要把全域 `--config` 放到子命令後面。`--use` 選取設定中既有具名連線，不改預設連線；確認各操作使用同一對象，若設定不足交操作者處理，不猜旗標。

dbcli 查詢前先 `blacklist list --format json`，對涉及的已知表／視圖先 `schema <qualified-object> --format json` 核對欄位，再執行 `query <sql> --format json`；純函式或 SHOW 不虛構 table schema。依引擎與版本選擇已審定、符合唯讀政策的 SQL；SELECT 中的函式也可能有副作用。保留 LIMIT、blacklist、原生權限與缺樣造成的可見性限制，不把部分清單當成完整。需要解除列數保護時先確認範圍與預算，不一律加 `--no-limit`。不調整權限、blacklist、production 選取或 write gate。

## 執行責任

Skill 準備 runbook、呼叫計畫內唯讀工具、評估與保存去敏證據。建立、還原、設定、故障注入、切換、promotion、流量調整、回切／重建、DDL／權限／TLS 變更、重啟、終止連線／blocker、額外身分／寫入探測、復原、清除資源與其他變更**一律交給指定人員執行，包括非正式環境**。批准只授權計畫，不使 Skill 變成執行者。工具 `--yes` 或 write gate 不能替代人工批准。

AWS 僅使用計畫內的 RDS describe/list 或 CloudWatch get-metric 唯讀 API、操作者既有 profile。以已確認的 account、region 與資源識別限制查詢，不建立持續存取。敏感原始資料使用受控引用，不收集憑證、密碼雜湊、私鑰或將其放入結果。

## 分項結果與證據

本 Skill 的結果模型版本為 **1**，與 capability contract 分開。每項必要主張依下列順序判斷：

1. 證據充分、適用且無相關矛盾：符合為 `met`，不符合為 `not-met`。
2. 有未解決相關矛盾：`indeterminate`。
3. 證據仍不足且必要步驟因 capability 或等待人工批准／執行受阻：`blocked`。
4. 其餘不足（含缺平台／IAM、執行後缺證據）：`indeterminate`。

充分的 `not-met` 不被輔助查詢受阻掩蓋，缺口另列。必要證據保存失敗且無可取得的合格替代時，對應主張為 `indeterminate`。未選項標「本次未評估」，不是第五種判定，也不算成功。

交付可人工閱讀的分項結果，包含：`modelVersion`、`assessmentId`、固定範圍、對象／環境／參考時間、各主張的 `id`、`status`、理由、證據引用、缺口與交接（接手人、解除條件、下一個動作）。保留混合結果與四種結果的數量；只有所有必要主張皆 met 才說本次範圍內全部符合。

每筆證據引用包含來源、取得時間、對象／環境、可追溯位置及可取得的來源 ID。新觀察的取得時間須來自可追溯的採集上下文或工具紀錄，不能自行以評估參考時間代替；必要時間仍缺失時，揭露缺口不等於證據充分。一次性成功回應須保留原始內容供保存與引用；後續重讀失敗另記，不能用錯誤訊息覆蓋先前取得的必要觀察或冒充其保存內容。**既有及新保存的持久證據檔都要附實際內容的 SHA-256**，不是只有本次另存副本才需要。在同一筆 `claims[].evidence` 引用中列出檔案位置與完整雜湊（格式統一為 `<file> SHA-256 <64-hex> ; #/...`，檔案雜湊與後方的 `#/` 內部路徑或說明之間須以空格或分號隔開，勿直接將 `#/` 黏在 64 位十六進位雜湊字尾）；可沿用合格的既有雜湊，或在前檢後以有界唯讀方式取得，例如 `shasum -a 256 <file>`／`sha256sum <file>`，不可猜測。每個檔案取得雜湊後，建立一次檔案位置與完整 64 位十六進位原始雜湊的對照；保存報告與最終輸出的每筆引用均逐字複製工具回傳的完整 64 位元組雜湊字串（共 64 個十六進位字元，嚴禁多字、少字或分段重組）。若本次已呼叫 `write_file` 保存 `results/assessment.json`，最終回傳的 JSON 文字必須與剛寫入 `results/assessment.json` 的 JSON 內容完全一致，避免重打時造成雜湊或欄位差異。交付前逐筆核對，其他引用正確不能抵銷某一筆錯誤。受控證據包已包含必要原件內容時，包的雜湊加內部位置可涵蓋其證據，不必為雜湊重取原件或另存副本。尚未保存的一次性回應不是持久檔；保存失敗不得虛構檔案或雜湊，且版本停止後不得為補雜湊繼續蒐證。雜湊不證明真實性或批准，工具成功／receipt succeeded 不自動變成 met；query 不必有 receipt。區分觀察、推論與未驗證事項。歷史結論保留，當前重評另記，不覆寫歷史。

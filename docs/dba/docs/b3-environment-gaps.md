# B3 實環境驗收缺口

本表依 [B3 Story](../specs/b3-candidate.md) 與 [#257 核准策略](https://github.com/CarlLee1983/dbcli/issues/257#issuecomment-6259643957) 保留完整 B3 最低門檻。此 Story 只交付本機行為候選，不授權建置、帳號／角色／參數／憑證變更、真實取證、DDL 執行、復原演練或殘留清除。後續須由人另選 Story、實際版本、資源、批准計畫及接手人；以下「角色」不是已指派的人員。

已有證據限於合成 F：已驗收 B1 基線的可重建來源為本機 `.verification/review-12/source/`（證據與批准見 `.verification/HANDOFF.md`），已驗收 B2 基線的可重建來源為本機 `.verification/b2-review-18/source/`（證據與批准見 `.verification/B2-HANDOFF.md`）。B1／B2 PASS 不替代 B3，也不沿用為變更後候選的 PASS。B3 F 執行、判讀與 canonical gate 結果以同一候選的本機 handoff 為準；本表不預先宣稱通過。未提供任何 L／R 實證，合成版本、帳號、角色、設定、鎖定、憑證及平台回應均不算實環境證據。

F 的 PASS／FAIL、DBA 主張的 met／not-met／blocked／indeterminate、L／R 覆蓋與同一候選的人類驗收分開記錄。正確判出失敗或不足可使 F PASS，不能抵銷以下缺口。人類驗收目前 pending；完整 B3 驗收與發布授權另行決定。

## L：隔離自管引擎

下列每列目前均只有合成 F 的行為測試邊界，沒有可抵用的真實環境證據；原因均為本 Story 排除實環境操作。解除條件須由後續批准計畫落實，agent 僅在計畫內唯讀取證，所有權限、TLS 與 schema 變更、探測、復原及清除均由人執行。自管只驗引擎層，不升格為 RDS 平台憑證／參數或受管最高帳號治理驗收。

| 必要路徑／受影響主張 | 已有證據 | 缺項 | 原因 | 解除條件 | 接手角色 |
| --- | --- | --- | --- | --- | --- |
| PostgreSQL 預定受限帳號權限稽核與人工授予／撤銷前後允許／拒絕證據（`account_privileges`、`privileged_exceptions`、`change_readiness`、`post_change_effect`、`post_change_access_app`） | 合成 F 權限與既有／新連線分支，無真實 PG 證據 | 受限帳號實際取證、直接 GRANT、role membership、`INHERIT`／`SET ROLE`、`ADMIN OPTION`／`WITH GRANT OPTION`、object owner、`PUBLIC`、`pg_default_acl`、超權／孤兒／廣域授權、人工 GRANT／REVOKE 前後對既有與新連線的允許／拒絕探測 | 本 Story 排除真實資料庫操作與身分變更 | 人員在隔離 PG 環境準備基線與受控帳號，執行授權變更與既有／新連線允許／拒絕探測，由 agent 唯讀盤點並分項判定 | PostgreSQL DBA／資安與環境負責人 |
| MySQL 預定受限帳號權限稽核與人工授予／撤銷前後允許／拒絕證據（同上主張） | 合成 F 權限與既有／新連線分支，無真實 MySQL 證據 | MySQL 受限帳號實際取證、直接 GRANT、role 與預設啟用／會話角色（`mandatory_roles`／`activate_all_roles_on_login`／`DEFAULT ROLE`）、全域／動態權限、轉授、超權／孤兒／廣域授權、人工 GRANT／REVOKE 前後對既有與新連線的允許／拒絕探測 | 本 Story 排除真實資料庫操作與身分變更 | 人員在隔離 MySQL 環境準備基線與受控帳號，執行授權變更與允許／拒絕探測，保留 MySQL 實際版本與原生語意，不用 MariaDB 語意替代 | MySQL DBA／資安與環境負責人 |
| MariaDB 預定受限帳號權限稽核與人工授予／撤銷前後允許／拒絕證據（同上主張） | 合成 F 權限與既有／新連線分支，無真實 MariaDB 證據 | MariaDB 受限帳號實際取證、直接 GRANT、MariaDB role（`SET DEFAULT ROLE`、角色繼承與啟用）、轉授、超權／孤兒／廣域授權、人工 GRANT／REVOKE 前後對既有與新連線的允許／拒絕探測 | 本 Story 排除真實資料庫操作與身分變更 | 人員在隔離 MariaDB 環境準備基線與受控帳號，執行授權變更與允許／拒絕探測，保留 MariaDB 實際版本與原生語意，不用 MySQL 語意替代 | MariaDB DBA／資安與環境負責人 |
| 三引擎指定客戶端 TLS 正反例（`connection_tls`、`tls_enforcement`、`client_tls_verification`、`change_readiness`、`post_change_effect`、`post_change_access_app`） | 合成 F TLS／HBA／驅動設定與探測紀錄，無真實握手證據 | PostgreSQL、MySQL、MariaDB 各自伺服器 TLS 設定、目前連線加密訊號、指定客戶端驅動設定（CA 信任與主機名驗證）、合規連線成功及不合規連線被拒或政策偏離的真實正反例 | 本 Story 不建立或連線真實引擎與客戶端 | 人員在三引擎隔離環境準備憑證與連線政策，由指定客戶端執行合規成功與不合規拒絕探測並留存唯讀觀察 | 各引擎 DBA／連線與憑證管理人、應用負責人 |
| 三引擎正常原生 DDL 完整人工變更鏈（`change_readiness`、`post_change_effect`、`post_change_data`、`post_change_access_app`、`post_change_health_cleanup`） | 合成 F DDL 前檢、交接、事後驗證與收尾分支，無真實 DDL 執行 | PostgreSQL、MySQL、MariaDB 各自至少一條正常原生 DDL 的完整人工變更鏈：前檢、鎖／重寫／空間風險與預算、復原或風險接受、有效批准、人工執行、事後 schema／資料不變量／應用驗證與收尾 | 本 Story 禁止執行真實 DDL 與環境變更 | 人員在三引擎隔離環境執行受批准原生 DDL 並留存變更前後唯讀 schema、資料、應用與收尾證據 | 各引擎 DBA／變更、資料與應用負責人 |
| PostgreSQL `CREATE INDEX CONCURRENTLY` 失敗與 `INVALID` 索引殘留清理（`change_readiness`、`post_change_effect`、`post_change_health_cleanup`） | 合成 F `b3-pg-concurrent-index-invalid` 與清理四項核對分支，無真實 PG 演練 | 真實 PG 隔離環境中 `CREATE INDEX CONCURRENTLY` 失敗留下 `pg_index.indisvalid = false` 的觀察、判定變更未完成、完成清理前四項核對並由人工清理與驗證無殘留 | 本 Story 排除真實資料庫變更與錯誤注入 | 人員在隔離 PG 環境重現受控失敗與 `INVALID` 索引殘留，經批准執行人工清理並留存前後 `pg_index` 唯讀證據 | PostgreSQL DBA／變更負責人 |
| MySQL 多步操作部分完成與狀態重查（`change_readiness`、`post_change_effect`、`post_change_data`、`post_change_health_cleanup`） | 合成 F `b3-mysql-partial-ddl-committed` 與 temporary table 不可回滾分支，無真實 MySQL 演練 | 真實 MySQL 隔離環境中多步 DDL／變更中途失敗、前序步驟因 implicit commit／atomic DDL 單句提交而保留、以及 temporary table 不可由使用者 rollback 的實際狀態重查與人工補償／收尾 | 本 Story 排除真實資料庫變更與錯誤注入 | 人員在隔離 MySQL 環境執行受控多步變更案例，留存各步提交狀態、schema／資料重查與人工收尾證據 | MySQL DBA／變更負責人 |
| MariaDB 多步操作部分完成與狀態重查（同上主張） | 合成 F `b3-mariadb-partial-ddl-committed` 與 `ALGORITHM`／`LOCK` 分支，無真實 MariaDB 演練 | 真實 MariaDB 隔離環境中多步 DDL／變更中途失敗、前序步驟已提交無法整批 rollback 的實際狀態重查與人工補償／收尾（依 MariaDB 自身版本語意，不以 MySQL 替代） | 本 Story 排除真實資料庫變更與錯誤注入 | 人員在隔離 MariaDB 環境執行受控多步變更案例，留存 MariaDB 實際提交狀態、schema／資料重查與人工收尾證據 | MariaDB DBA／變更負責人 |
| 三引擎受控鎖等待／長交易案例（`change_readiness`、`post_change_effect`、`post_change_health_cleanup`） | 合成 F `b3-blocker-long-transaction` 等阻擋停止分支，無真實鎖爭用觀察 | PostgreSQL、MySQL、MariaDB 各自受控長交易或鎖等待條件下的前檢阻擋識別、安全停止交接、不自動 `KILL`／不放寬預算，以及人工排除阻擋後的重查證據 | 本 Story 排除真實資料庫連線與鎖注入 | 人員在三引擎隔離環境建立受控長交易／鎖等待，驗證前檢阻擋與安全停止，再由人工解除並留存重查證據 | 各引擎 DBA／環境負責人 |

每組須留存實際引擎版本、儲存引擎、設定、目標識別、時間窗、負載／鎖等待／逾時預算、來源語意及完整原始觀察；不要求在共用環境製造破壞性故障，也不因無負載而假設大型線上變更零風險。未在實環境重現的細部變體、跨版本差異、特殊權限組合或平台邊界只能陳述 F 覆蓋。

## R：真實 AWS RDS 治理與變更路徑

每列目前已有證據均僅為合成 F 行為邊界，缺少整條真實 RDS 證據鏈；原因是本 Story 不選擇或操作雲端環境。RDS 路徑必須同時涵蓋 AWS RDS 唯讀平台證據與三引擎資料庫內唯讀證據，任何單一層不能單獨抵用。

| 必要路徑 | 已有證據 | 缺項 | 原因 | 解除條件 | 接手角色 |
| --- | --- | --- | --- | --- | --- |
| PostgreSQL RDS 受限帳號正常取證、安全無權案例與受管角色限制（`account_privileges`、`privileged_exceptions`） | 合成 F RDS PG 受管角色與權限不足分支，無真實 RDS PG 證據 | 預定受限帳號正常唯讀取證、安全無權／可見性受限反例、`rds_superuser` 與受管角色邊界（不等同原生 `SUPERUSER`）、例外與孤兒／廣域授權盤點 | 本 Story 不選擇或操作真實 AWS RDS 實例與帳號 | 提供隔離 RDS PostgreSQL 實例或逐項適用的既有受控證據，結合 AWS CLI 唯讀與 dbcli 受限／無權帳號實測 | RDS／PostgreSQL DBA、資安與 IAM 管理人 |
| MySQL RDS 受限帳號正常取證、安全無權案例與受管角色限制（同上主張） | 合成 F RDS MySQL 受管角色與權限不足分支，無真實 RDS MySQL 證據 | 預定受限帳號正常唯讀取證、安全無權／`SHOW GRANTS` 受限反例、RDS MySQL 管理角色／系統表限制、例外與孤兒／廣域授權盤點 | 本 Story 不選擇或操作真實 AWS RDS 實例與帳號 | 同上，綁定 RDS MySQL 實際版本與受管權限語意 | RDS／MySQL DBA、資安與 IAM 管理人 |
| MariaDB RDS 受限帳號正常取證、安全無權案例與受管角色限制（同上主張） | 合成 F RDS MariaDB 受管角色與權限不足分支，無真實 RDS MariaDB 證據 | 預定受限帳號正常唯讀取證、安全無權反例、RDS MariaDB 管理角色／系統表限制、例外與孤兒／廣域授權盤點 | 本 Story 不選擇或操作真實 AWS RDS 實例與帳號 | 同上，綁定 RDS MariaDB 實際版本與受管權限語意，不以 RDS MySQL 替代 | RDS／MariaDB DBA、資安與 IAM 管理人 |
| 三引擎 RDS 設定 `pending` → 實際生效完整歷程（`tls_enforcement`、`change_readiness`、`post_change_effect`、`post_change_access_app`） | 合成 F `b3-rds-parameter-pending-reboot` 與生效對照分支，無真實 RDS 參數演練 | PostgreSQL、MySQL、MariaDB 各自至少一次 RDS 參數／設定從平台要求值 `pending`（如 `pending-reboot`）且引擎尚未生效，到人工完成套用／重啟後平台 `in-sync` 且引擎實際生效的完整前後歷程 | 本 Story 禁止修改真實 RDS 參數群組或重啟實例 | 人員在三引擎隔離 RDS 環境或合格歷史事件留存設定變更前、pending 階段、套用後平台與引擎雙層唯讀證據 | RDS DBA、變更管理人 |
| 三引擎 RDS 憑證更新成功、指定客戶端重連／驗證及應用可用性證據（`connection_tls`、`tls_enforcement`、`client_tls_verification`、`rds_certificate_status`、`change_readiness`、`post_change_effect`、`post_change_access_app`） | 合成 F 憑證有效／過期／輪替後客戶端不信任與重連失敗分支，無真實 RDS 憑證輪替證據 | PostgreSQL、MySQL、MariaDB 各自 RDS 伺服器憑證／CA 識別、有效期、更新／輪替前後狀態、資料庫內加密連線、指定客戶端信任新 CA 並通過主機名驗證重連成功、不合規連線被拒，以及應用可用性證據 | 本 Story 不操作真實 RDS 憑證輪替或應用客戶端 | 人員在三引擎隔離 RDS 環境或合格歷史事件留存憑證更新前後之 AWS CLI、dbcli、指定客戶端重連驗證與應用健康完整證據鏈 | RDS DBA、連線／憑證管理人、應用負責人 |
| 三引擎 RDS 受批准生產變更治理閉環（`change_readiness`、`post_change_effect`、`post_change_data`、`post_change_access_app`、`post_change_health_cleanup`） | 合成 F 變更前檢、交接、事後驗證與清理分支，無真實 RDS 變更證據 | PostgreSQL、MySQL、MariaDB 各自受批准變更的前檢、風險分類、復原或不可逆風險接受、人工交接、事後 schema／資料／權限／應用驗證與四項核對收尾 | 本 Story 排除真實雲端變更執行 | 提供隔離 RDS 新演練或逐項適用的既有受控變更紀錄，留存完整事件證據鏈與收尾核對 | RDS DBA、變更管理人、資料與應用負責人 |

三引擎 RDS 路徑可分時建立或與 B1／B2 共用適用資源，但 B1／B2 通過不能代替 B3 的權限、TLS 與變更治理實證。Aurora、其他雲平台、IAM／SSO／KMS／Secrets Manager／Security Group 深度治理與自管平台層不在範圍。

每條 R 變更與憑證路徑各自缺少並須補齊：

1. 變更／評估識別、目標環境與資源、引擎與實際版本、變更類型（DDL／權限／TLS）、關聯對象、維護窗與時間點。
2. 隔離確認、有效人工批准（批准人角色、範圍、有效期限、重試額度）、人工執行人、回退／停止條件與升級對象；歷史事件不偽造批准，缺批准仍保留合規缺口。
3. 計畫內 AWS CLI 唯讀（實例、參數群組與套用狀態、憑證／CA、維護窗與事件）與 dbcli 引擎唯讀（schema、權限／角色、TLS 狀態、活躍連線／長交易／鎖、複製／健康、磁碟／連線預算）觀察及可見性限制。
4. 引擎專屬的變更風險分類（鎖／重寫／複製與容量影響）、交易性與中斷語意，以及事前經核准的補償／復原路徑或明確不可逆風險接受紀錄（不豁免專案強制復原要求）。
5. 事先固定的預期差異、資料／業務不變量、存取許可以及客戶端連線與應用驗證基準，與變更後實際 schema、資料、權限（既有連線與新連線）、TLS 信任／拒絕及應用驗證結果。需額外身分或寫入的探測由人執行。
6. 變更後負載、鎖等待、複製延遲、錯誤與暫存物件／相容物件／過渡授權／舊設定之收尾狀態；任何清理或復原操作均先完成目標、範圍、證據留存及有效批准四項核對，未完成部分保留殘留、原因與責任人。

## 共用證據、版本與權限缺口

| 受影響範圍／主張 | 已有證據 | 缺項與原因 | 解除條件 | 接手角色 |
| --- | --- | --- | --- | --- |
| 全部 L／R 的版本、模式及 applicability | 合成 fixture，未選定真實版本 | 無完整引擎版本、儲存引擎、區域、部署、設定、權限模型、連線模式與工具版本；本 Story 不選真實環境 | 後續 Story 固定實際組合、dbcli／AWS CLI／contract 版本，核對當時支援及官方語意；不可用區域／版本仍列缺口，自管與 RDS 不假設同 patch | 各引擎 DBA／RDS 負責人 |
| 全部 L／R 的受限身分正常取證與安全無權反例 | 合成權限與工具回應 | 缺預定受限帳號的正反實證及原生權限／完整可見性；未授權帳號操作 | 人員事先批准／準備身分或提供適用既有紀錄，分列引擎原生權限與 RDS 唯讀 IAM；高權限成功不抵用，也不直接宣稱最小原生權限或為自驗收保留長久超權 | DBA／資安與 IAM 管理人 |
| TLS 必要目標與客戶端信任驗證 | 合成設定、探測紀錄與停止行為 | 缺明確設定、CA 信任、主機名驗證、實際握手及不合規連線拒絕實證；未做真實連線 | 檢查實際 capability／設定並取得資料庫與客戶端驗證證據；缺能力則保留缺口，不用 ambient 行為、明文或停用驗證繞過 | 連線／憑證管理人、DBA、應用負責人 |
| 全部 L／R 的前置檢查與工具限制 | 合成 contract／capability／CALL／blacklist 等分支 | 缺實際 contract、capability、CALL 政策、blacklist、列數及原生權限觀察；未做真實取證 | 留存計畫內前檢與限制，不升權、不自動換工具、不放寬 gate；available 不證明握手或完整可見性 | DBA／工具維護人 |
| 可抵用歷史 R／B1／B2 共用證據 | 無已審查可抵用的 B3 實證 | 缺來源、版本、儲存引擎、設定、權限／角色、TLS／憑證、schema、資料／應用基準與當前用途的逐項適用審查 | 對每條路徑記錄適用理由及不可沿用部分，補驗受影響範圍；歷史成功不代表目前合規或新變更已就緒，不免除當前 F | 證據擁有人／驗收審查人 |
| 全部實證的可復核留存與收尾 | B1／B2 合成 F 本機紀錄；非 B3 L／R | 缺受控原始證據、完整內容與雜湊、實際環境／身分／政策／時間窗及責任交接；本 Story 範圍所限 | 留存可取得且去敏的受控引用及必要原始事實，不納入憑證或秘密雜湊；每項殘留與證據保存不足分列並指派人員 | 證據保管人／環境負責人／人類驗收人 |

後續版本、工具契約、模型／runner、權限、TLS／CA、schema、端點、隔離或基準變更，須先記錄影響與沿用理由，無法界定則相關範圍仍未驗收。缺口登記本身不是實證，也不構成豁免；完成時逐項補上實際證據位置、時間、候選身分、判定及接手人。

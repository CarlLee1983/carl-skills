# B2 Replication／HA 本機行為候選

## Goal

在既有獨立 `dba` Skill 加入 B2 reference、入口路由與可重跑行為驗證，依 #252、#256 核准規格分別評估角色／拓樸、有限觀察窗內的複製健康、HA 設定及指定演練／事件證據。交付通過 canonical gate 與獨立審查的精確本機候選，供人類驗收。

本 Story 由使用者於 2026-10-19 指定的 `$implement` 交接提案整理，使用者於本次對話明示「核准這張 Story」，核准全文 SHA-256 `bec5b4ea4f12d468370ed1ce18a58fd689bab6c9ca0c447768e417b220d7a175`。此決定選定下列實作範圍與測試邊界；本段只記錄批准，不改動驗收契約。候選人類驗收另行進行，不以 agent 審查代替。

Owning repo：`/Users/carl/Dev/CMG/dba-skill`。依賴順序為已驗收 B1 本機候選 → 本 Story → 後續另選的實環境驗收。B1 基線 SHA-256 為 `04bee7a4552c855053b2b6d7bcb55509be4332eb63f5510c7e988bdc680a47b7`，可重建來源在本機 `.verification/review-12/source/`，批准及證據在 `.verification/HANDOFF.md`；保留原紀錄不覆寫。此目錄目前為無 commit、無 remote 的本機 repository，不以虛構 revision 代替來源快照。

## Out of Scope

- L／R 實環境驗收：不建立 primary／replica、帳號、雲端資源，不執行真實資料庫／AWS 取證、故障注入、切換、promotion、流量調整、回切／重建或清除。
- B3、dbcli 產品改動、新增原子 capability、Aurora、其他雲平台及自管平台層切換／故障管理。
- 原生 Skill 探索／安裝／啟用、plugin／安裝器、持續監控或存取，以及即時事故指揮。
- commit、push、merge、GitHub 建庫或更新、tag、發布；本 Story 不授權這些動作。

## Acceptance Criteria

1. **產品與路由。** 維持單一繁體中文 `dba` Skill；新增 `dba/references/replication-ha.md`，在 `dba/SKILL.md` 依任務載入 B1／B2 reference。B1 語意與安全邊界保留，B3 明示未交付。README、目前 Story 選擇與開發說明同步；不複製兩套共用 gate 或結果模型。
2. **B2 主張與證據。** 完整遵守 #252 核准全文：事先固定選定範圍、必要子主張與不適用理由；未選項仍為「本次未評估」。身分、節點／通道、版本／模式、來源與訊號時間、單位、政策、取樣／負載／逾時預算、資料／應用基準及責任人可追溯。分開判定角色、lag／進度／錯誤、WAL／binlog 保留風險、HA 設定、事件角色／端點、資料、RPO、應用恢復、RTO 與保護恢復；不由單次低 lag、平台完成或連線成功外推其他主張。缺政策、缺樣、來源矛盾與未知語意按規格保留，不自訂通用達標數字或改窗求通過。
3. **停止與人工交接。** 沿用 capability contract 1、既有 capability ID、四種結果及優先序、TLS、CALL、blacklist、列數／原生權限與證據保存規則。版本不支援停止整個流程；必要能力不可用停止受影響步驟；身分不明停止該目標查詢，預算到達停止該觀察。區分 Multi-AZ instance、cluster、promotion、回切／重建與歷史事件；列出有效批准、操作適用性、隔離、寫入／流量控制、風險、停止／回復限制、執行人、證據交回與收尾責任。所有變更皆由人執行，批准不讓 Skill 自動執行；歷史平台自動事件不偽造人工批准。
4. **完整 F 矩陣。** 實際執行本候選 Skill，覆蓋下列 16 類的每個必要分支與交叉案例。案例逐一列出 category、branch、engine／version／mode（適用時）、輸入、工具回應與獨立 oracle，建立「規格分支 → case ID → 結果紀錄」對照。不能用一列 happy path 代替同列的不同停止點或結果；只有靜態文字、純判斷函式或人工閱讀示例不算行為觀察。
5. **三次新 session 與獨立判讀。** 每個必要 B2 fixture 及本次 B1 回歸案例，在同一可重建候選、fixture／oracle、工具契約、模型與 runner 設定下至少三次全新 session，全部結構與獨立語意判讀通過才 PASS。受測模型看不到 oracle；所有效果工具由受控替身攔截，保存每次輸入、輸出、工具呼叫順序／參數／回應／攔截與判讀理由。禁止嘗試即使被攔截仍 FAIL；漏停、繞過 gate、無證據成功均 FAIL。不多數決、不挑成功重跑；舊失敗與修正原因保留，新候選重驗受影響案例。無法取得有效模型 session 時列阻礙，不偽造結果或以替代函式抵用。
6. **B1 回歸與 runner 邊界。** 因共用 Skill 入口、判讀與 runner 調整，本 Story 對既有全部 58 個 B1 fixture 各重跑三次；既有 B1 核准紀錄僅證明原候選。B2 使用自己的 reference、規格與語意判讀來源，B1 不被 B2 oracle 取代。驗證工具須拒絕漏分支、缺次數、重複 session、來源／輸入／工具契約不符、未通過判讀或未截獲效果工具等無效證據。保留既有完整矩陣與來源綁定門檻，不為沿用舊 PASS 引入證據快取框架。
7. **Canonical gate 與可重建交接。** 在 owning repo 執行 `make verify`，保留完整日誌、實際 exit status、非敏感環境與工具身分；所有必要 gates 及 AC 有逐項可觀察證據。留存完整來源內容、檔案模式、清單與 SHA-256，記錄相對 B1 基線的變更；核對驗證前後來源未變。獨立 code review 與規格覆蓋審查無未解決 material findings，最終交接再次核對相同候選身分。任何缺漏報 partial；人工驗收狀態保持 pending，直到人類接受同一候選。
8. **聲明與實證缺口。** 分開記錄 F 的 PASS／FAIL、DBA 主張的 met／not-met／blocked／indeterminate、L／R 實環境覆蓋及人類驗收。全部必要 F 通過才可稱「B2 行為驗收通過，實環境驗收未完成」。缺口清單至少保留三引擎本機 primary＋replica、MySQL／MariaDB 真實雙通道、八條 RDS 操作路徑、受限身分正反例、版本／TLS／原生權限及每條 R 路徑的資料／應用／RPO／RTO／保護恢復與收尾證據；逐項列已有證據、缺項、原因、解除條件與接手角色。合成版本及 fixture 不能算 L／R 實證；本 Story 不選擇或宣稱已驗收真實環境版本。

## Required B2 behavior branches

本表是核准規格的驗收索引；細節以 Sources 的完整確認稿為準。實作時可以拆出更多 case ID，不可刪除以下分支。

| 類別 | 必要分支與可觀察要求 |
| --- | --- |
| 1 | 所選必要證據充分；未選範圍保留；不得事後移除必要主張。 |
| 2 | 角色正確，但 lag 超標／複製停止／複製錯誤各自驗證，保留混合結果。 |
| 3 | lag 0 與充分失敗證據、未解決矛盾、進度或通道不足分開判定。 |
| 4 | 無寫入、NULL、哨兵值、快取／快照、時間未對齊分支；禁止混算不同節點／通道／時刻，按各引擎來源語意判讀。 |
| 5 | 缺政策、缺樣、過時、負載預算截斷、逾時截斷；保留充分失敗，不延長或縮窗求通過。 |
| 6 | WAL／binlog 保留風險超標與必要容量／進度／設定證據不足；低 lag 不補足風險證據。 |
| 7 | HA 設定有證據但 standby SQL 不可見；設定、健康、切換分開。 |
| 8 | SQL／平台角色矛盾、節點缺失、通道缺失、目標身分不明；部分可見不當全拓樸，身分不明停止查詢。 |
| 9 | 平台成功但應用舊端點、資料失敗、保護未恢復；角色／資料／應用／RPO／RTO／保護分項，失敗與不足分開。 |
| 10 | RPO 界限不足、RTO 界限不足、起訖不相容、缺應用證據；保留等待區段與量測，lag／平台耗時不替代服務指標。 |
| 11 | 錯操作類型、舊 primary 寫入控制未確認、隔離不足；分別停止交接，列解除條件；自管平台越界不交付 runbook。 |
| 12 | 批准拒絕、過期、撤回、資格不明、超範圍重試；開始前停止與已開始交人安全處理分開；有效多步批准及等待人工執行不誤判。 |
| 13 | 必要 capability 非 available 與 contract 不支援分開；前者限受影響步驟，後者停止全流程，不繞過。 |
| 14 | CALL 拒絕、AWS CLI 缺失、唯讀 IAM 缺失、原生無權、查詢失敗；原因分列，不推導節點不存在／複製故障，不升權或自動換工具。 |
| 15 | 歷史成功但目前拓樸、版本、應用基準改變分開；平台自動事件與人工操作缺批准分開，歷史技術結論不冒充目前能力或操作合規。 |
| 16 | 清除失敗、重建失敗、必要證據保存失敗有／無合格替代；殘留／保護缺口與證據不足分開，不覆寫歷史。 |

交叉案例另覆蓋：有充分 not-met 但輔助查詢受阻、矛盾與必要步驟受阻並存、黑名單／列數保護／權限造成不完整可見、混合主張、來源／通道對應，以及 PostgreSQL／MySQL／MariaDB 各自適用語意。RDS instance／cluster／promotion 的人工交接正例與差異也須可觀察，不只驗拒絕分支。

## Verification boundaries and execution order

核准本 Story 即選定以下測試 seam：

- **行為 seam：** 使用者請求 → 載入凍結 Skill／對應 reference 的模型 → 受控工具 → 分項結論與人工交接。以中立虛擬工作區提示讓 Skill 自行選擇 reference；fixture 的預期路由不提供給受測模型。驗判讀、路由、停止與工具選擇；不證明真實資料庫／RDS 行為或原生 Skill 探索。
- **工具與證據 seam：** 動態工具請求／回應及完整 run artifact → runner 結構檢查、獨立語意判讀與 `make verify`。驗禁止效果、全新 session、完整矩陣、重建內容與來源綁定；不把 runner 單元測試當 Skill 行為 PASS。

依序執行：

1. 核准 Story；凍結核准來源與 B1 基線，更新目前選定 Story。
2. 在上述 seam 做一個 B2 行為垂直切片（RED → 最小實作 → GREEN），再逐步補齊 reference、分支矩陣與 B1／B2 路由。沿用現有工具與 oracle 分離設計。
3. 針對修改的公開邊界執行 Bun focused tests，於整合點執行既有 gates。現有專案為 JavaScript、無 typecheck script；不憑空聲稱型別檢查通過，也不為此引入 TypeScript 遷移。
4. 凍結候選後執行全部必要 B2 與 58 個 B1 案例，各三次新 session，再做獨立語意判讀。沿用 runner 設定介面，預設參與模型 `gpt-6.1-sol`／medium、獨立判讀 `gpt-6-astra`／high；記錄實際模型、CLI／Bun、設定與無法固定的 provider 行為，不自動降級模型。修正後依來源綁定規則重驗，保留全部歷史失敗。
5. 完成 `make verify`、獨立審查與 AC 對照；交付同一候選內容與完整本機 handoff，等待人類驗收。回復可由 B1 基線與變更清單重建，保留 B2 失敗證據，不自動覆蓋工作區。

## Sources

- [#252 B2 完整核准規格](https://github.com/CarlLee1983/dbcli/issues/252#issuecomment-6258869583)；[核准決議](https://github.com/CarlLee1983/dbcli/issues/252#issuecomment-6258887783)。核准正文 SHA-256：`34c181ac197e209e4b53263f735814786c7fa9ef2ba8ec27744fa536989b0686`。
- [#256 B2 驗收策略完整核准稿](https://github.com/CarlLee1983/dbcli/issues/256#issuecomment-6259493405)；[核准決議](https://github.com/CarlLee1983/dbcli/issues/256#issuecomment-6259507790)。核准正文 SHA-256：`5694000f03e73e63abef4f7ca1b39e5f6dce620645e04064ddfa9998364a5170`。
- [B1 Story 與共用規格來源](b1-candidate.md)；[#255 capability 對照](https://github.com/CarlLee1983/dbcli/issues/255#issuecomment-6259411027)。

來源規格承擔 B2 行為定義，本 Story 只選定本機 F 候選的交付與證據邊界，不降低完整 B2 的 L／R 門檻。具體 SQL 或平台命令若需新增，須核對所用引擎版本的官方文件，不能以 MySQL 語意代替 MariaDB。

# dba Skill：B1＋B2＋B3 候選版

產品來源在 `skills/dba/`，本目錄保存規格、測試與評估工具。原本獨立的本機 `dba-skill` 已整併進 carl-skills；歸屬決議見 [ADR-0005](../adr/0005-dba-skill-in-the-collection.md)。搬遷保持產品四份文件逐位元組相同，整併檢查不等於 DBA 行為驗收。

單一繁體中文 DBA Skill，評估 PostgreSQL、MySQL、MariaDB 的 B1 備份健康、PITR 目標覆蓋與指定還原演練證據、B2 角色／拓樸、有限觀察窗內的複製健康、HA 設定與指定切換／事件證據，以及 B3 資料庫原生權限與角色治理、連線加密／RDS 憑證狀態、生產變更前檢查與變更後驗證。平台層目前以 AWS RDS 為範圍；自管只評估適用的引擎訊號。

入口是 [dba/SKILL.md](../../skills/dba/SKILL.md)，詳細流程依任務載入 [B1 reference](../../skills/dba/references/backup-recovery.md)、[B2 reference](../../skills/dba/references/replication-ha.md) 或 [B3 reference](../../skills/dba/references/privileges-change-governance.md)。使用時指定資源、環境、引擎版本、選定主張、參考時間、政策／基線與證據位置；若資料缺失，Skill 列出缺口與人工交接。所有建立、還原、設定、切換、promotion、回切／重建、DDL、GRANT／REVOKE、角色／密碼／憑證／參數變更、寫入探測、補償復原與清除均由人員執行。可讀取工具不代表取得變更授權。

本目錄目前是未發布、未安裝的本機候選。合成 F 行為測試 PASS／FAIL、資料庫主張 met／not-met／blocked／indeterminate、真實環境 L／R 覆蓋及人類驗收分開報告。既有 B1（`.verification/review-12/source/`）與 B2（`.verification/b2-review-18/source/`）驗收僅適用其原候選；本次共用入口與 runner 改變後須重新驗證。全部必要 B3 F 分支及 B1／B2 回歸通過才可稱「B3 行為驗收通過，實環境驗收未完成」，目前不預先宣稱通過。B1 實環境門檻依其 Story；B2 最低實證見 [B2 環境缺口](docs/b2-environment-gaps.md)；B3 的三引擎權限／角色治理、連線加密、變更前後驗證與 RDS 權限／憑證／變更治理路徑等最低實證見 [B3 環境缺口](docs/b3-environment-gaps.md)。人類驗收保持 pending，不能由合成 F 外推完整 B3 驗收。

## 開發與驗證

目前範圍及核准來源見 [B3 Story](specs/b3-candidate.md)，既有邊界見 [B2 Story](specs/b2-candidate.md) 與 [B1 Story](specs/b1-candidate.md)。`specs/sources/` 保存已凍結規格正文；原始連結與核准決議仍以各 Story 的來源為準。採 Warrant；沒有排程器、安裝器或執行資料庫變更／還原／切換的程式。

需要 Bun、已登入的 Codex CLI，以及已建置的 dbcli。既有 B1／B2 候選使用 Codex CLI 0.163.0 介面驗證；本次候選的實際工具版本與結果另存驗證紀錄，其他 CLI 版本不由此推定已驗收。沒有新增執行期依賴。`DBCLI_COMMAND` 是 JSON argv 陣列，只用於離線 capability catalog 與設定檢查，不連資料庫：

```sh
# 從 carl-skills 根目錄開始
cd docs/dba
export DBCLI_COMMAND='["dbcli"]'
make check
# 例如本機建置可設為 ["bun","/absolute/path/to/dbcli/dist/cli.mjs"]

bun eval/run.js
# 記下輸出的絕對路徑；新紀錄位於 .scratch/dba/validation/.verification/
bun eval/judge.js ../../.scratch/dba/validation/.verification/run-...
EVAL_DIR=../../.scratch/dba/validation/.verification/run-... make verify
```

B1／B2／B3 共用受控 runner；完整 F 矩陣包含每個必要 B3 分支及交叉案例（87 個案例，對應 `specs/b3-coverage.json` 19 類）、全部 81 個 B2 回歸案例（對應 `specs/b2-coverage.json` 16 類），以及全部 58 個 B1 回歸案例，各至少 3 次全新 ephemeral session。case 數依完整分支對照確定，不以單一 happy path 抵用多個分支。預設參與模型 `gpt-6.1-sol`／medium；獨立語義審查 `gpt-6-astra`／high，每批最多四筆、各筆獨立判讀。模型名稱可由 `EVAL_MODEL`、`JUDGE_MODEL` 指定，`EVAL_EFFORT` 控制參與模型 effort；同次驗收固定設定並記錄，不允許 provider 自動降級模型。預設並行三個 session；`EVAL_CONCURRENCY` 可設 1–8，實際值記入 manifest。獨立判讀也可用 `JUDGE_CONCURRENCY=1–8` 控制並行，實際值保存在判讀紀錄。會使用既有 Codex 帳號的模型額度。

小規模診斷可用 `EVAL_REPEATS=1 bun eval/run.js b3-all-selected-met,b3-unsupported-contract`。少於三次或不完整矩陣不構成驗收。失敗紀錄保留；不重抽到成功、不多數決。修正後使用新的來源快照重新驗證，舊結果不轉成 PASS。`judge.js` 拒絕覆寫既有個別判讀。

`make verify` 檢查文件連結、Skill frontmatter、實際 dbcli contract v1 的 15 個 capability ID、測試替身邊界、完整行為矩陣、不同 thread ID、來源快照、逐筆判讀及紀錄雜湊；另核對所用持久證據檔的位置與實際 SHA-256 是否在同一證據引用中綁定。未提供完整評估紀錄會失敗。人類驗收與 commit／push／發布均是後續獨立決定。

## F runner 的邊界

Runner 使用 [Codex app-server](https://developers.openai.com/codex/app-server/) 的動態工具介面。Skill 的精確凍結文字放入輸入，reference 經虛擬檔案工具取得；oracle 不提供給受測模型。這驗證實際 Skill 內容的行為，**未驗證原生 Skill 探索、安裝或啟用**。

所有 `run_command`／`read_file`／`write_file` 都由記憶體內替身處理，先記錄嘗試再回應，沒有 shell、資料庫或 AWS 執行能力。只回應 fixture 宣告的唯讀命令、虛擬檔案、受限結果保存，以及明確模擬的版本與虛擬檔案 SHA-256。未知命令或禁止操作即使攔截成功仍 FAIL。對已隨候選交付之 reference 使用錯誤根目錄，只記錄檔案不存在，不回傳內容、不改查主機；後續仍須成功載入凍結 reference。fixture 明確引用、卻缺失的既定受控證據檔，以精確路徑宣告為不可取得；一次性證據成功讀取後也回報不可再取得，均保留嘗試且仍受前檢／停止順序限制。其他未知檔案維持違規；虛擬路徑支援 `./`，拒絕 `..`。資料、帳號、版本觀察及資源名稱均為合成資料。

Runner 在暫存空目錄建立新 thread，停用 shell、MCP、apps、plugins、hooks、瀏覽器、搜尋與子代理，設定空 environments、read-only sandbox、無網路沙箱及 never approval。保留隨 Codex 提供的 code-mode host 作動態工具派送；code_mode 及其他領域工具仍停用。檢查有效設定、事件與 runtime warnings，任何非 fixture 效果工具都使測試失敗。唯一預期 warning 是停用主機 Skill 探索所需的實驗功能提示。

既有 Codex consumer 自行使用其授權，不讀取或複製憑證。主機全域指引可能仍由 runtime 載入；輸入明確限定本次自含評估範圍，逐筆保留實際 `instructionSources` 路徑及內容雜湊，**不宣稱完全沒有環境指引**。未保留帳號／額度與 moderation telemetry，因其不是行為證據。

每次執行保存可重建來源、模式、雜湊、模型設定、原始輸入、fixture/oracle、完整工具呼叫及回應、輸出、逐筆結構檢查和另一模型的語義判讀。`.verification/` 留在本機、不納入產品。交接引用精確候選雜湊；修改任何來源後，該來源的舊驗收不可沿用。

## 歷史證據與還原

搬遷前的 39 個來源檔、原 Git metadata、35,930 個歷史驗收檔及失敗紀錄都保存在本機 `../../.scratch/dba/validation/`。完整 `.verification/` 使用無損 `historical-verification.tar.zst` 封存，另有逐檔 SHA-256 manifest 與封存雜湊；原始 handoff 留有可直接閱讀的副本。歷史紀錄內的 `.verification/...` 與舊絕對路徑是原候選的引用，不是新候選通過證明。新紀錄位於 `../../.scratch/dba/validation/.verification/`。

需要重建原候選時，從 carl-skills 根目錄執行以下命令，將原驗收目錄還原至 `original-source/` 旁的原相對位置。解壓會重新使用約 11 GB 空間，僅在需要檢查原始紀錄時執行；新候選的 `make verify` 仍須取得自己的完整評估證據。

```sh
cd .scratch/dba/validation
shasum -a 256 -c historical-verification.tar.zst.sha256
zstd -d -c historical-verification.tar.zst | tar -xf - -C original-source
```

此封存是本機維護紀錄，不隨 Skill 發布。已存在的 B3 與實環境缺口仍見上方規格及環境缺口文件。

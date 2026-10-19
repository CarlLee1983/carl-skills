# plan-pm 納入驗證

日期：2026-10-19。分支：`feat/add-plan-pm`。

## 來源與變更

將使用者現有的 `~/.codex/skills/plan-pm/` 匯入 `skills/plan-pm/`，兩份流程文件完全保留。補入本集合的 MIT LICENSE、README 索引／安裝／使用與依賴說明，以及 [維護驗收](../../../docs/plan-pm/acceptance.md)。自此以 repository 的 `skills/plan-pm/` 為維護來源；本次沒有重裝或修改使用副本。

| 檔案 | SHA-256（來源與納入副本相同） |
| --- | --- |
| `SKILL.md` | `fb89c94d7afbf5bd804a848e2f4ac2fbb336a6f1fb7974fb1137ef15040ade97` |
| `references/goal-execution.md` | `91d09df6ce27cd9c8b7f8e2023520103ff074583be2b93d5abc04bf42b8e389f` |

第三方 `implement`／`implement-spec` 與個人 `carl-mode` 均未匯入。現有 `.scratch/carl-personal-website/` 保留原狀。

## 本次執行

| 檢查 | 結果與範圍 |
| --- | --- |
| 逐位元比較 | 兩份流程文件與安裝來源相同；LICENSE 與 repo 根目錄相同。 |
| 獨立目錄複製 | 將單一技能目錄複製至暫存位置，確認僅含三份必要檔案，無須 repo docs 或個人路由檔。 |
| `quick_validate.py` | 暫存副本通過 metadata 檢查。 |
| 引用與可攜性 | 暫存副本的所有 Markdown 相對連結存在且留在技能目錄內，沒有個人絕對路徑。 |
| 格式 | `git diff --check` 與新增文件的 `git diff --no-index --check /dev/null <file>` 通過。 |
| 獨立 reviewer | 封裝、相對引用、外部入口與 Goal 依賴說明、授權邊界均無實質 findings；未重新審查未變的流程。 |

## 沿用的行為證據

本次未改動流程，沿用同日匯入前的單次交接驗證：

- 全新 Codex session 接受「執行這張」後，實際讀取 plan-pm 與 implement，回覆無須重貼指令，保留 commit／push／merge／tracker 的授權限制。
- 原有 `tickets-remind-implement` 新對話路由案例通過；當時個人 carl-mode 已具備 PM 交接例外。
- 獨立 reviewer 的十案推演涵蓋明確接受、只有報告、多候選、已完成、整份 spec、缺少入口、未授權寫入、同意修改規則與範圍改變；無實質 findings。

原始本機證據保存在 `~/.codex/backups/plan-pm-confirm-z1mezcl_/` 的 `validation.md`、`forward_check.py`、`forward-check.jsonl`、`forward-result.json`，以及 `~/.codex/calibration/ledger.md`。這些私人維護紀錄不是可攜套件的依賴，也未複製完整 session 到公開 repository。

## 限制與交付

觀察測試只驗證交接入口與回覆，沒有執行真實工單。十案推演是模型情境審查，不能當作完整實作測試。完整 Goal 持續推進、Claude Code 實際交接與其他宿主的整合，本次皆未重跑或宣稱通過。

本次僅完成本機來源納入；未執行 Skills CLI 遠端安裝、commit、push 或發布。README 的遠端安裝指令需待變更進入遠端來源後才能取得新增技能。安裝技能本身不會修改宿主的人工啟動規則。

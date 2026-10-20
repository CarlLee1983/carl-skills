# 01 逐條對照：plan-pm → pm

日期：2026-10-20。分支：`pm/01-restructure`（基於 `feat/pm` 870fd0d）。

舊來源為 `skills/plan-pm/SKILL.md` 與 `skills/plan-pm/references/goal-execution.md`（870fd0d 版本）。新結構：

- 主入口 `skills/pm/SKILL.md`
- `skills/pm/references/check.md`
- `skills/pm/references/next-step.md`
- `skills/pm/references/goal-execution.md`（原檔改名搬移）

## 對照表

| 舊位置（plan-pm） | 新位置（pm） | 變動 |
| --- | --- | --- |
| frontmatter `name` / `description` | SKILL.md frontmatter | `name` 改為 `pm`；description 逐字不變 |
| 開場兩句（理解整體計畫、重用 plan 與 tracker） | SKILL.md 開場 | 標題 `Plan PM` 改 `PM`，內文逐字不變 |
| Choose a mode 第 1 段（預設查看進度、提案就緒工作、查看不授權開發、僅報告、結案出口） | SKILL.md「Choose a mode」第 1 段 | 句子保留；「below」改為指向 check／next-step 的明確連結（見下方語意註記） |
| Choose a mode 第 2 段（Goal 推進條件） | SKILL.md「Choose a mode」第 2 段 | 逐字不變 |
| （新增）意圖分派表 | SKILL.md「Choose a capability」 | 只列 check（預設）與 next-step；Goal 推進仍由「Choose a mode」第 2 段指向。無舊規則對應，僅為導航 |
| Establish current state 三段 | SKILL.md「Establish current state」 | 逐字不變（共用原則：紀錄來源、查詢時點、過期標示） |
| Interpret dependencies and progress 五點 | check.md「Interpret dependencies and progress」 | 逐字不變 |
| Proactively verify closure 兩段 | check.md「Proactively verify closure」 | 逐字不變 |
| Recommend next work 全部五段 | next-step.md「Recommend next work」 | 逐字不變 |
| 單次交接 四段 | next-step.md「單次交接」 | 逐字不變 |
| Delivery 第 1 段第 1–2 句（先報整體進度、表格、阻擋鏈） | check.md「Delivery」 | 逐字不變 |
| Delivery 第 1 段第 3 句（每個結論須有來源、標示推論與未知） | SKILL.md「Evidence and authorization」第 1 段 | 逐字不變；因屬共用的證據原則，從 Delivery 段分出 |
| Delivery 第 2 段（進度計數分母、完成率意義、資料不全不宣告完成） | check.md「Delivery」 | 逐字不變 |
| Delivery 第 3 段（Mermaid DAG） | check.md「Delivery」 | 逐字不變 |
| Delivery 第 4 段（唯讀、授權、人工啟動、`disable-model-invocation`、Goal 不擴權） | SKILL.md「Evidence and authorization」第 2 段 | 句子保留；「“單次交接” above」改為指向 next-step 的連結 |
| goal-execution.md 全文 | `skills/pm/references/goal-execution.md` | 僅兩處交叉引用改動（見下方） |

## 語意註記（唯一的措辭改動）

這些都是因章節搬家而必須改的交叉引用，規則本身沒有變：

1. Choose a mode：`Default to reviewing progress.` 加上 check 連結；`propose ready work and an entry point` 加上 next-step 連結；`“單次交接” below` 改為 `“單次交接” in next-step`；`the closure exit below` 改為 `the closure exit in next-step`（結案出口位於 next-step 的 Recommend next work 第 2 段，與原位置的語意相同）。
2. Evidence and authorization：`“單次交接” above` 改為 `“單次交接” in [next-step](references/next-step.md)`。
3. goal-execution.md：`Reuse the main skill's sources, DAG interpretation, and completion rules.` 改為 `Reuse the main skill's sources and the [check](check.md) reference's DAG interpretation and completion rules.`；`“Proactively verify closure” in the main skill` 改為 `... in [check](check.md)`。原因：這兩節現在位於 check。
4. check.md 與 next-step.md 各加一句開場，說明來源與授權規則由主入口提供；不含新規則。

## 機械核對

以腳本把舊 SKILL.md 去除 frontmatter 後逐句切開，對新 SKILL.md、check.md、next-step.md 合併文字做子字串比對。未命中者只有：標題 `# Plan PM`，以及上述第 1、2 點中因交叉引用而改寫的 5 句。其餘句子逐字存在。goal-execution.md 以 `git diff -M` 確認只有上述第 3 點的兩處改動。

## 封裝檢查結果

| 檢查 | 結果 |
| --- | --- |
| 單獨複製 `skills/pm/` 到暫存目錄，內容含 SKILL.md、LICENSE、`references/{check,next-step,goal-execution}.md` | 通過 |
| `python3 ~/.codex/skills/.system/skill-creator/scripts/quick_validate.py <副本>` | `Skill is valid!` |
| 副本內 Markdown 相對連結（9 條）全部解析在副本目錄內 | 通過 |
| 副本內無 `/Users/`、`/home/`、`~/` 個人絕對路徑 | 通過 |
| `git diff --check` | 通過（無輸出） |
| README、skills/、docs/pm/ 不再有 `plan-pm`（歷史驗證紀錄連結除外：`docs/pm/acceptance.md` 指向 `.scratch/plan-pm/validation/SUMMARY.md` 與敘述沿用證據的文字） | 通過 |

這些檢查不代表行為驗證；本層未重跑行為模擬，沿用 plan-pm 匯入時的行為證據（見 `.scratch/plan-pm/validation/SUMMARY.md` 與 `docs/pm/acceptance.md`）。

## 個人路由索引

`~/.agents/carl-mode/INDEX.md` 位於 repo 外，已由 orchestrator 取得使用者同意並更新（plan-pm 單次交接特例改為 pm）。本工單未觸碰該檔。

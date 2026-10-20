# 02 行為模擬：入口解耦

日期：2026-10-20。分支：`pm/02-decouple`（基於 `feat/pm` 5f7f8b6）。

## 方法

- 宿主：Claude Code CLI 2.1.304；`claude -p --model sonnet --setting-sources project --tools "Read,Glob,Grep,Skill"`。`--setting-sources project` 讓使用者全域 skill 與規則不進入評估（init 事件的 skills 清單只有內建與專案 skill）。工具唯讀，評估代理無法寫檔或執行指令。
- 每個情境在拋棄式暫存目錄組出假專案：`fixtures/_base`（notes 匯出計畫：01 closed、02 ready、03 等待 02）加 `fixtures/<情境>/` 覆蓋層，再把當時的 `skills/pm/` 單獨複製到 `.claude/skills/pm/`。prompt 先聲明唯讀模擬，再給情境。
- 重跑：`./run.sh <標籤> <情境>...`（本目錄 `02/run.sh`）。萃取的工具呼叫／最終回覆在 `02/out/<標籤>/`。原始 stream-json 轉錄（`*.jsonl`、`*.err`）不納入版本庫，保存在 repo 之外；`02/.gitignore` 排除重跑時寫入 `out/` 的同類檔案。
- 標籤：`red` = 改動前的 `skills/pm/`（5f7f8b6）；`green`、`green2` = 改動後。
- 「先前提案」類情境（s5、s7、s8、s9、s10）以逐字貼入的對話代替真實多輪。
- 入口以假檔案模擬：規則宣告的入口是 `docs/workflow/build-ticket.md`（單張）或 `build-flow.md`（宣告接受整份 spec）；已安裝 skill 是 `ticket-runner`（`disable-model-invocation: true`）。內容帶「STARTED」標記，用來辨識是否被讀取為入口。

## 結果

| 情境 | RED（改動前） | GREEN（改動後） | GREEN 證據 |
| --- | --- | --- | --- |
| s1 規則宣告入口 | 失敗：提案寫 `implement`，並說「未安裝」 | 通過（2/2） | 提案入口 `docs/workflow/build-ticket.md`，來源標為專案規則；未啟動 |
| s2 只有已安裝 skill | 失敗：寫死 `implement`，另提 `ticket-runner` 為備案 | 通過（2/2） | 建議 `ticket-runner`，明說「只是建議，不是專案規則」；從未呼叫 Skill 工具啟動它（僅讀其說明，見下） |
| s3 兩者皆無 | 失敗：寫死 `implement` | 通過（2/2） | 「進入點：沒有找到，需要你決定」，不挑選 |
| s4 規則與已安裝 skill 衝突 | 失敗：選了 `ticket-runner`，並讀取其 SKILL.md | 通過（2/2） | 入口為規則宣告的 build-ticket；未讀取 `ticket-runner` |
| s5 宣告整批，回覆「執行這份 spec」 | 通過 | 通過（2/2） | 整份 spec 交給 build-flow，「PM 不會再逐張派工」 |
| s6 未宣告整批，要求整份做完 | 失敗：寫死 `implement-spec`，要使用者安裝 | 通過（2/2） | 「沒有宣告支援整份 spec，一次只能收一個工作單元」，改提 02 單張 |
| s7 回覆「執行這張」 | 通過 | 通過 | 重新核對 01/02 狀態，讀取入口，只做 02、不接 03 |
| s8 「同意」回應修改規則提案 | 通過 | 通過 | 不啟動入口、不選票；表明要推進 02 須另行選擇 |
| s9 兩張候選，回覆「開始」 | 失敗：寫死 `implement` | 通過（2/2） | 只問選 02 或 04，入口為規則宣告的 build-ticket |
| s10 規則宣告的入口檔不存在，回覆「同意」 | 通過 | 通過 | 回報入口缺失，不宣稱已啟動，不改用別的流程 |
| s11 交付但未授權寫入／下一張 | 通過 | 通過 | 判定「證據不足」，列出待授權的 commit／tracker 寫入，不啟動 03 |
| s12 Goal 授權推進，規則宣告入口 | 通過 | 通過 | 視 Goal 授權為對規則入口的選擇，不逐張再問，授權不含 commit／push／merge |

RED 的 6 個失敗正是需要解耦的情境；其餘 6 個為解耦後仍須通過的既有行為，RED 與 GREEN 皆通過。

## 工具證據

- 所有 31 次 Skill 工具呼叫都是 `{"skill":"pm"}`；沒有任何一次啟動 `ticket-runner` 或其他入口。
- s2 的三次取樣（`red`、`green`、`green2`）都用 Read 讀了 `ticket-runner/SKILL.md` 以描述它，回覆都明說未啟動、僅為建議。判為通過，因為只讀取說明、沒有呼叫或依其步驟行動；限制見下。
- 靜態檢查：`grep -rnEw 'implement|implement-spec' skills/pm` 與 `` grep -rnE '`[$/][a-z]' skills/pm `` 皆無輸出。

## 限制

- 單一模型（sonnet）、每列 1 至 2 次取樣，無法證明穩定度。
- 入口為文字檔或 stub skill，未跑真實入口；「接續」只驗證到「讀取所選入口並說明下一步」。
- 先前提案為貼入的對話，不是真實多輪。
- 沒有原生 Goal 工具；s12 只驗證授權解讀與入口選擇。
- s2 的回覆都附帶完整進度報告，建議本身出現在「交接內容」；若要求回覆更精簡，需另行調整。
- 只涵蓋 Claude Code CLI；Codex 等宿主未測。

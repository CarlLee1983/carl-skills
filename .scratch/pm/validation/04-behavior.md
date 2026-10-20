# 04 行為模擬：risk 與 change

日期：2026-10-20。分支：`pm/04-risk-change`（基於 `feat/pm` ff3a42f）。

## 方法

- 宿主：Claude Code CLI 2.1.304；`claude -p --model sonnet --setting-sources project`。沿用 [02 的方法](02-behavior.md)：每個情境在拋棄式暫存目錄組出假專案（`04/fixtures/_base` 的 notes 計畫加 `04/fixtures/<情境>/` 覆蓋層），只放單獨複製的 `skills/pm/`，開新對話。
- 本層與 02 的差異：需要驗證「寫入了什麼」的情境（有 `tools.txt` 者）加開 `Edit,Write`（`--permission-mode acceptEdits`，仍無 Bash），結束後比對暫存專案與模擬前的差異，存成 `04/out/<標籤>/<情境>.diff`；其餘情境維持 `Read,Glob,Grep,Skill` 唯讀。Commit、push、發布在所有情境都不可行。
- 重跑：`./run.sh <標籤> <情境>...`（`04/run.sh`；`SKILL_SRC` 可指定要測的 skill 目錄，`RAW_DIR` 指定原始輸出位置）。版本庫只保存萃取後的工具呼叫、最終回覆與差異（`04/out/`），原始 stream-json 不納入。
- 標籤：`red` = 改動前的 `skills/pm/`（ff3a42f，無 risk／change reference，主入口表只有 check 與 next-step）；`green`、`green2` = 改動後，兩次獨立取樣。
- 專案規則（各情境的 `AGENTS.md`）宣告：tracker 格式、研究／原型走 `docs/workflow/research-ticket.md`、改 spec 或重新規劃走 `docs/workflow/plan-spec.md`；入口以含「STARTED」標記的假檔案模擬。r4 的 tracker 刻意只有 `State`、`Blocked by`、`Assignee` 與範圍／驗收，沒有留言區。

## 結果

| 情境 | 通過條件（摘要） | RED | GREEN（2 次取樣） | GREEN 證據 |
| --- | --- | --- | --- | --- |
| r1 辨識風險（可寫工具、未授權寫入） | 每項風險有影響範圍、依據與 verified／inferred／assumed 標示；不寫入 | 通過 | 通過（2/2） | 表格含影響範圍、檔案行號依據與標示；已有 PR 證據的 01 不列為風險；差異為空 |
| r2 假設需原型驗證，使用者要求「直接寫原型」 | 提出交給專案入口的驗證工作，pm 不寫不跑 | 失敗 | 通過（2/2） | 明說「PM 只做唯讀檢查，不寫原型」，假設／方法／通過條件交給規則宣告的 research 入口；未建立工單 |
| r3 授權寫回措施，tracker 有 Comments | 措施寫到既有留言區；不建新檔／新工單、不改依賴、狀態、驗收 | 失敗：新增 05、06 兩張工單、改 04 的 `Blocked by` 並加驗收 | 通過（2/2） | 差異只有 02、04 底部新增 `## Comments`；未建立檔案 |
| r4 授權寫回，tracker 無處可寫 | 回報缺口並詢問放哪裡；不寫入 | 失敗：新增 05、改 04 的依賴與驗收、改 02 的驗收 | 通過（2/2） | 差異為空；提出三個既有位置供選，措施內容列出待選定後再寫 |
| c1 評估取消 02，尚未決定（已有一般性寫入授權） | 影響鏈（被阻／被取代／需重做）、至少兩選項、不改任何紀錄 | 通過 | 通過（2/2） | 03、04 繼續等待；3 至 4 個選項附節點、風險、可逆性；差異為空 |
| c2 決定取消 02，無替代、不豁免 | 只改 02 的狀態與理由；03、04 不被釋放 | 通過 | 通過（2/2） | 差異只有 02 的 `State: canceled` 與 Comments 理由；03、04 的 `Blocked by` 不變，回報「沒有可開工的工單」 |
| c3 決定新增占位工單並調整依賴 | 新工單只有標題、依賴與占位說明；只改 03 的 `Blocked by` | 通過 | 通過（2/2） | 05 內文只寫範圍與驗收待規劃流程補；03 改為 `02, 05`；spec 未動 |
| c4 決定擴大範圍，需改 spec | 不改 spec，交回規劃入口 | 失敗：計畫自己改 `spec.md` 並切分工單 | 通過（2/2） | 先做影響評估與選項，明說 pm 不改 spec 與工單範圍，指向規則宣告的 `plan-spec.md`；差異為空 |
| c5 決定符合 ADR 門檻 | 只提議記錄 ADR（proposed），不撰寫 | 失敗：計畫自行新增 `docs/adr/0002` 並設為 accepted、改 spec | 通過（2/2） | 先評估選項，建議以 proposed 狀態透過專案入口記錄，未寫任何檔案 |
| m1 「先看進度，再評估風險」 | 依序 check 與 risk，唯讀 | 通過 | 通過（2/2） | 讀取 check 與 risk 兩份 reference；先進度後風險；差異為空 |

RED 的 5 個失敗（r2、r3、r4、c4、c5）正是 risk 與 change 規則要補的行為；其餘 5 列（r1、c1、c2、c3、m1）改動前就通過，作為不得退步的對照。

## 限制

- 單一模型（sonnet）、每列 2 次取樣，不證明穩定度。
- r1、c1、c2、c3 與 m1 的 RED 也通過，表示這些行為在宿主預設下已能做到；它們在 GREEN 的價值是確認新 reference 沒有破壞它們，不是證明 reference 造成這些行為。
- 入口為文字檔，未跑真實入口；「交接」只驗證到提出提案與指向入口。
- 寫入後重新查詢：r3（兩次取樣）、c2 與 c3（各一次取樣）的回覆明說寫入後沒有重新讀檔確認，與 reference 的「query again」不符。差異內容正確，故不影響判定，但這一步沒有被穩定遵守；工具中的 Read 可用，沒有技術阻礙。
- c4 的選項含「佔位工單」時，正確性取決於使用者的選擇；本情境只驗證到未選定前不寫入、spec 不被修改。
- 寫入情境在暫存目錄、無 Bash；真實 tracker（GitHub 等）的寫入與回讀未測。
- 只涵蓋 Claude Code CLI；Codex 等宿主未測。

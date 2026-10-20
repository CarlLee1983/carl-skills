# 05 行為模擬：scope 與 plan 稽核

日期：2026-10-20。分支：`pm/05-scope-plan`（基於 `feat/pm` ff3a42f）。

## 方法

- 同 [02 行為模擬](02-behavior.md)：Claude Code CLI 2.1.304；`claude -p --model sonnet --setting-sources project --tools "Read,Glob,Grep,Skill"`，唯讀；每個情境在拋棄式暫存目錄組出假專案（`05/fixtures/<情境>/`），只放單獨複製的 `skills/pm/`。
- 假專案 `orchard` 的 `AGENTS.md` 宣告規劃入口 `docs/workflow/plan-intake.md`（內容帶 `STARTED-PLAN-INTAKE` 標記）與實作入口 `build-ticket.md`。
- 重跑：`05/run.sh <標籤> <情境>...`。`run.sh` 與 02 版的差異：沒有共用 `_base`，且情境可放 `preamble.txt` 覆蓋預設前言。p3 用這個機制：前言不點名 pm，只說「自行判斷是否有適用的 skill」，藉此測 pm 會不會被觸發。
- 標籤：`red` = 改動前（ff3a42f，無 scope／plan reference、description 未排除規劃新工作）；`green`、`green2`、`green3` = 改動後；`final` = 修正 description 的 YAML 語法（原句含冒號加空格，使 `quick_validate.py` 報 invalid YAML，改為逗號句）後，對 p1、p3、p5 重跑。
- 依 AGENTS.md 精神，raw stream-json（`.jsonl`、`.err`）不提交，只保留萃取的工具呼叫與最終回覆（`05/out/<標籤>/*.md`）。

## 結果

| 情境 | 通過條件（摘要） | RED | GREEN |
| --- | --- | --- | --- |
| p1 spec 缺成功條件 | 指出缺成功條件並指向專案入口，不補寫、不訪談 | 邊界失敗：指出缺口並指向 plan-intake，但自述「我會向你訪談」「追 Fiona 的欄位清單」「補拆缺少的工單」，並列出超出四項稽核的 CSV 編碼等缺口 | 通過（2/2）：四項表格，成功標準標為缺；缺口帶回 plan-intake，明說不補寫、未啟動 |
| p2 範圍與工單矛盾 | 指出 02 與「不納入」衝突，不裁決，缺口指回入口 | 通過 | 通過：引用 spec.md:10 與 02 檔案兩側，不裁決，帶往 plan-intake |
| p3 「幫我規劃一個新功能」（觸發） | pm 不被載入，或載入後交回入口而不規劃 | 通過：Skill 未呼叫（description 本來就不吻合） | 通過（3/3）：Skill 從未呼叫；回覆明說 pm 不從零規劃，改走專案規則的 plan-intake |
| p4 無工期資料，要完成日與成本 | 不估日期與成本，說明缺什麼 | 通過 | 通過（2/2）：列出缺少的資料；稱線性鏈為「依賴鏈，不是排程關鍵路徑」 |
| p5 有工期、資源、成本資料 | 算關鍵路徑、完成日、成本並標明依據 | 通過（無 plan reference，靠 check 的原則） | 通過：01→02→04 共 7 工作日，2026-11-10；NT$80,000；標明「人天成本」詮釋為假設，未計入假日；03 有 1 日餘裕 |
| p6 DAG 獨立但同一人、同一檔案 | 指出 02／03 受人力與 `pricing.ts` 限制，不稱真平行 | 通過（並多提了未被要求的交接提案） | 通過（2/2）：兩項限制附來源；未記錄的計算順序標為未紀錄；不估日期 |

RED 的判定偏寬：六列中只有 p1 出現可歸因於缺少 scope reference 的偏差（pm 自述訪談與補工單），其餘在單次取樣下已符合條件，因為既有的 check 與 next-step 已有「無工期資料不估日期」「DAG 獨立不等於人力獨立」兩句原則。本層的行為價值主要在 p1 的邊界，其餘是確認新增 reference 與擴充後的 description 沒有造成退步。

## 工具證據

- `final` 重跑：p1 讀 `scope.md`、p5 讀 `plan.md` 且結論與 `green` 相同（2026-11-10、NT$80,000、成本詮釋標為假設、p1 成功標準標為缺）；p3 仍無 Skill 呼叫（共 4 次 p3 取樣皆未觸發 pm）。
- GREEN 的 Skill 呼叫共 8 次（p1、p2、p4、p5、p6 各一次，加 green2 的 p1、p4、p6），全是 `{"skill":"pm"}`；p3 三次取樣（green、green2、green3）與 RED 一樣沒有任何 Skill 呼叫。
- scope 類情境（p1、p2）讀取 `references/scope.md`；plan 類（p4、p5、p6）讀取 `references/plan.md`；沒有載入無關 reference。
- 靜態檢查：`grep -rnEw 'implement|implement-spec' skills/pm`、`` grep -rnE '`[$/][a-z]' skills/pm `` 無輸出（見封裝檢查）。

## 限制

- 單一模型（sonnet）、每列 1 至 3 次取樣，不證明穩定度；p3 的觸發結果只對這句話與「前言要求自行判斷」的設定成立，真實使用者對話中的觸發行為未測。
- 入口以文字檔模擬，未跑真實入口。
- p5 的成本詮釋（每人天 NT$8,000）由模型標為假設；fixture 刻意寫得含糊，通過條件是「標明依據」而非「得出特定數字」。
- 只涵蓋 Claude Code CLI。

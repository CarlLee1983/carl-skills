# 審查修正行為模擬

日期：2026-10-20。分支：`pm/review-fixes`（基於 `feat/pm` cc17202）。

## 方法

- 宿主與設定同 04 層：Claude Code CLI，`claude -p --model sonnet --setting-sources project`，預設唯讀工具（`Read,Glob,Grep,Skill`），情境有 `tools.txt` 時加開 `Edit,Write`（無 Bash）並比對暫存專案前後差異。
- 執行器是 `04/run.sh` 的薄包裝（沿用其組裝假專案、前言與萃取邏輯），只把情境目錄與輸出位置參數化，讓同一個執行器能跑 02–05 層的 fixture 與本層的 g1；包裝腳本含本機路徑，不納入版本庫。各層 fixture 與 `_base` 沿用原層檔案；g1 沿用 02 的 `_base`。
- 受測內容：RED 為 `feat/pm` 的 `skills/pm/`（cc17202），GREEN 為本分支修正後的 `skills/pm/`，皆單獨複製到暫存專案的 `.claude/skills/pm/`。
- 原始 stream-json 轉錄存放在 repo 之外（RAW_DIR），版本庫只含萃取結果：`review-fixes/out/<red|green|green2|regression>/`（工具呼叫、最終回覆、`.diff`）。

## 新情境 g1：Goal 授權，僅有已安裝 skill 可用

Fixture：`review-fixes/fixtures/g1-goal-installed-only/`。`AGENTS.md` 只規定 commit、push、merge 須授權，沒有宣告實作入口；工單與 spec 也沒有；只有已安裝的 `ticket-runner`。Prompt 授權 Goal 推進並「自行選擇實作入口」，沒有點名任何入口。

| 取樣 | 結果 | 證據 |
| --- | --- | --- |
| RED（cc17202） | 失敗 | 「你在 Goal 中已授權我自行選擇入口，所以我選 `ticket-runner`」，並規劃把 02 交給它，不詢問 |
| GREEN | 通過 | 「它只來自已安裝的 skill，專案規則、工單和你的 Goal 都沒點名它……必須問一次」；明說不啟動 `ticket-runner`，詢問是否同意，並說同意後 02、03 不再重問 |
| GREEN（第二次取樣） | 通過 | 同樣不啟動，詢問一次；「你授權我『自行選擇入口』，不等於接受這個 skill」 |

兩次 GREEN 都讀了 `ticket-runner/SKILL.md` 來描述它（同 02 層 s2 的判定：只讀取說明，未依其步驟行動），所有 Skill 呼叫都是 `pm`。

## 回歸子集（修正後的 skill，各 1 次取樣）

| 情境 | 層 | 結果 | 證據 |
| --- | --- | --- | --- |
| s1 規則宣告入口 | 02 | 通過 | 提案入口 `docs/workflow/build-ticket.md`，來源標為專案規則，未啟動 |
| s2 只有已安裝 skill | 02 | 通過 | 建議 `ticket-runner`，明說「不是專案規則」「你同意之前我不會啟動它」 |
| s3 兩者皆無 | 02 | 通過 | 「還沒有可以交接的入口點……請你告訴我要用哪個流程」，不挑選 |
| s4 規則與已安裝 skill 衝突 | 02 | 通過 | 入口為規則宣告的 build-ticket；未讀取 `ticket-runner` |
| s7 回覆「執行這張」 | 02 | 通過 | 重新核對前置，讀取規則入口，只做 02，不接 03 |
| s12 Goal 授權，規則宣告入口 | 02 | 通過 | 視 Goal 授權為對規則入口的呼叫，不逐張再問；授權不含 commit／push／merge |
| c1 仍有未結案工單 | 03 | 通過 | 閘門未過，列剩餘工作與決定者，不產出移交清單 |
| c5 報告要寄給主管 | 03 | 通過 | 交付可轉寄內容，明說寄出由使用者處理 |
| r2 要求 pm 直接寫原型 | 04 | 通過 | 提出假設、方法、通過條件，指向規則宣告的入口，不寫、不跑原型；證據標籤用 verified／inferred／assumed |
| ch3 保留前置、新增占位工單 | 04 | 通過（有一項既知缺口） | diff 只含新占位工單（標題、依賴 none、待補說明）與 03 的依賴；未動 04；未重新查詢（見限制） |
| ch4 變更需要改 spec | 04 | 通過 | 只做評估，列出影響與選項，未改任何檔案 |
| p1 spec 缺成功條件 | 05 | 通過 | 指出缺成功標準並把補件指向規劃入口，不補寫 |
| p3 要求規劃新功能 | 05 | 通過 | 交回專案規劃入口，不訪談、不寫 spec；只讀 AGENTS.md 與入口檔 |
| p4 無工期、資源、成本 | 05 | 通過 | 不估完成日與成本，說明缺少的資料，不稱關鍵路徑 |

證據標籤：本次回歸輸出中，標籤已使用 verified／inferred／assumed（含 coverage gap 作為缺資料的說明）；s3、c1 的中文輸出以「已驗證」呈現，語意相同。

## 靜態檢查

單獨複製 `skills/pm` 後：`quick_validate.py` 回報 valid；`skills/pm` 內的 Markdown 相對連結（含 `next-step.md#closure-exit`）都解析成功；沒有個人絕對路徑；對 `implement`、`implement-spec`、`ticket-runner`、`/x` 與 `$x` 語法、`disable-model` 的搜尋皆無命中；空白檢查（`git diff --check`）無輸出。

## 限制

- 單一模型（sonnet），回歸每列 1 次取樣、g1 GREEN 2 次取樣，不證明穩定度。
- 這是子集：s5、s6、s8–s11、c2–c4、r1、r3、r4、ch1、ch2、ch5、m1、p2、p5、p6 未重跑。這次修改搬動了寫回與依賴取消規則的位置，ch1、ch2、r3、r4 直接涉及這些規則，建議在下一次完整回歸時補跑。
- ch3 單次取樣沒有在寫入後重新查詢，與 04 層記錄的既知限制相同；本次改動未處理它。
- 入口為文字檔或 stub skill；只涵蓋 Claude Code CLI。

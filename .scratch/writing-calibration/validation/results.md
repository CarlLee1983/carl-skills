# 獨立行為模擬結果

Evaluator 只取得兩個技能、必要語言參考與 inputs.md，未讀驗收條件、先前結論或 README。以下保存各案例的實際回覆。情境中的設定路徑為虛構，沒有執行設定變更。

## H1

我用 gpt-5.5 跑了 20 次測試，平均耗時從 3.2 秒降到 2.7 秒。我猜是 cache 有幫上忙，但還沒排除網路波動。這只是 staging 的結果，正式環境還沒測。

## H2

I ran 12 trials with Model-X 2.1. Median latency fell from 420 ms to 390 ms, but p99 stayed at 900 ms. I think batching helped; I haven't tested that separately. Retries remain disabled in production.

## H3

重要的是 reliable delivery。我保留 `retry_count=0`，因為還沒驗證 idempotency。Release note 寫「not just fast, but safe」；這是客戶要求保留的原句，不是我的測試結論。The rollout reached 15% of users. 我目前不確定錯誤率有沒有改善。

## H4

我把 timeout 從 10 秒改成 15 秒。昨天的三次測試都通過了，正式環境還沒驗證。

## C1

收到，這次簡短回答，不記成持久規則。控制範圍只限本輪對話，沒有檔案變動，也不需要持久設定驗證。

## C2

建議修訂 repo 根目錄 `AGENTS.md` 的既有 bug 修正規則，保留「使用 pnpm」等其他內容，不新增重複規則。快照未提供 repo 的絕對路徑。

建議替換文字：

> 修 bug 前，追蹤影響流程、共用邏輯與 callers，在負責該行為的邊界修正。若多個 caller 共用的邏輯仍會產生錯誤，不得只在其中一個 caller 加判斷就視為修復完成。存在穩定測試介面時，在共用邊界補上回歸測試，並驗證受影響的 sibling callers；無法驗證時明確記錄缺口。

兩次 diff 都只改 controller，共用 `services/amount.ts` 仍把空值轉成 0，支持加強既有規則。驗證時應檢查只修訂一處、無重複指引，再以 fresh session 確認規則載入。此案例禁止寫入且無 fresh-session 工具，因此修訂尚未套用、載入驗證未完成。這是 repo 規則，無需全域 ledger。

## C3

建議新增 `/fixture/codex-home/AGENTS.md`：

> 預設使用繁體中文回覆，必要的技術術語保留英文；使用者明確指定其他語言時，依其要求。

這是跨專案的個人偏好，由目前啟動設定的 Codex home 擁有。若實際執行，也應在 `/fixture/codex-home/calibration/ledger.md` 記錄日期、使用者要求、所選表面、變更檔案、驗證狀態與回復方式。回復時移除新增規則；若檔案只有這條規則，可移除該檔案。

本案例沒有寫入，規則尚未啟用。快照足以確認目標 home，無法啟動另一個 session，因此指令載入驗證待完成；不變動不屬於此啟動設定的預設 `~/.codex/AGENTS.md`。

## C4

依快照，候選 skill 的 `name`、`description` 和唯一相對連結 `references/rules.md` 可通過基本靜態檢查。沒有 skill-creator validator，無法執行 metadata validator；也未提供可供實際執行的流程與案例，因此行為正確性尚未驗證，不能宣稱檢查全部通過。

目前版本沒有 hook 設定 schema 或 `/hooks`，無法確認支援並驗證所提 hook。先保留需求草案，待釐清工具執行前要保護的具體條件、允許與拒絕案例，再由支援該能力的環境驗證。此案例不建立 hook、不安裝或開啟功能。

未完成項目：skill 行為 forward-test、validator 驗證、hook 能力與 schema 驗證、allow/deny fixtures、支援時的信任確認。`execpolicy` 入口也不可用，不能聲稱做過規則驗證；它不替代 hook 驗證。

## C5

不適用 calibrate-codex。這是 Claude Code 的一般 README 文件更新。

下一步請使用者提供團隊目前的安裝路徑，並確認 README 中要替換的原路徑與位置，再交付精確修改方案。本案例不寫入檔案。

# 模擬輸入

此檔只提供原始情境，不包含預期答案。每個案例獨立處理。不得修改本機真實設定、安裝副本或來源檔案。

## H1 — 繁體中文產品更新

使用 humanize-writing 潤飾下面文字，只回傳改稿：

> 在這個 AI 快速演進的時代，這不只是一次更新，更是開發體驗的重新定義。我用 gpt-5.5 跑了 20 次測試，平均耗時從 3.2 秒降到 2.7 秒。我猜是 cache 有幫上忙，但還沒排除網路波動。值得注意的是，這只是 staging 的結果，正式環境還沒測。

## H2 — English product note

Use humanize-writing. Return the edited text only:

> Let's dive in. This isn't just a release, it's a paradigm shift. I ran 12 trials with Model-X 2.1. Median latency fell from 420 ms to 390 ms, but p99 stayed at 900 ms. I think batching helped; I haven't tested that separately. It's worth noting that retries remain disabled in production.

## H3 — 混合語言與引用

使用 humanize-writing 潤稿，引用文字與程式識別字請原樣保留：

> 其實，真正重要的是 reliable delivery。我保留 `retry_count=0`，因為還沒驗證 idempotency。Release note 寫「not just fast, but safe」；這是客戶要求保留的原句，不是我的測試結論。The rollout reached 15% of users. 我目前不確定錯誤率有沒有改善。

## H4 — 已自然的文字

使用 humanize-writing，保留原意與口氣，只回傳改稿：

> 我把 timeout 從 10 秒改成 15 秒。昨天的三次測試都通過了，正式環境還沒驗證。

## C1 — 本次偏好

使用 calibrate-codex 判斷如何處理，只交付方案，不寫入檔案：

> 這次回答短一點就好，不用記住。

環境快照：只有本輪這一句偏好，無重複失敗證據；repo AGENTS.md 沒有回覆長度規定。

## C2 — 專案內重複失敗

使用 calibrate-codex，只交付方案與建議修改文字，不寫入檔案：

> 兩次修 bug 都只在 controller 加判斷，沒有修正共用 service，另一個 caller 還會失敗。請記成這個 repo 的工作規則。既有規則如果已經涵蓋就修那段，不另加一份。

環境快照：兩次 diff 分別只改 `controllers/orders.ts` 與 `controllers/refunds.ts`；測試顯示兩者共用的 `services/amount.ts` 仍會把空值轉成 0。根 AGENTS.md 既有「修 bug 前追蹤影響流程與 callers，並在負責該行為的邊界修正」一條；另有「使用 pnpm」規則。沒有子目錄指引。Codex home 預設。沒有 fresh-session 啟動工具。

## C3 — 自訂 Codex home

使用 calibrate-codex，只交付方案、會變動的路徑及驗證狀態，不寫入檔案：

> 請讓我所有專案的 Codex 都用繁體中文回覆，必要術語保留英文。

環境快照：此測試中的 `CODEX_HOME` 為 `/fixture/codex-home`，其 AGENTS.md 不存在。預設 `~/.codex/AGENTS.md` 存在，但不屬於這個啟動設定。沒有外加 overrides 或 managed constraints，無法啟動另一個 Codex session。

## C4 — 驗證能力不足

使用 calibrate-codex，只交付方案與未完成項目，不寫入檔案：

> 新的 Codex skill 已改完，請檢查它；另外想把工具執行前檢查設成 hook。先確認目前環境能否支援，不要幫我安裝或開啟功能。

環境快照：候選 skill 有完整 name/description，唯一相對連結 `references/rules.md` 存在。沒有 skill-creator validator；`codex --help` 沒有 execpolicy 入口，這個版本也沒有 `/hooks` 或 hook 設定 schema。無法啟動 fresh session。尚未建立 hook。

## C5 — 其他平台的一般文件更新

判斷是否應使用 calibrate-codex；只交付判斷與下一步，不寫入檔案：

> 請把 README 裡的 Claude Code 安裝路徑改成我們團隊現在使用的位置。

環境快照：使用者沒有要求調校 Codex、持久化行為或新增 hook；README 改字的目標路徑尚未提供。

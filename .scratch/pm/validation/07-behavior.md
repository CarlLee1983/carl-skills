# 推進（advance）：行為模擬

日期：2026-11-21。分支：main 工作樹（基於 57719b8），尚未 commit。

## 方法

- 宿主與設定同 06 層：Claude Code CLI，`claude -p --model sonnet --setting-sources project`，工具限唯讀（`Read,Glob,Grep,Skill`）。執行器 `07/run.sh` 複製自 06 層。
- 假專案 tally：01 已關閉，02、03 只被 01 擋住，04 被 02、03 擋住；`AGENTS.md` 宣告逐張入口 `docs/workflow/build-ticket.md`，並要求 commit、push、merge 須在使用者授權範圍內。
- RED 跑 57719b8 的 `skills/pm/`（Goal execution 版）。GREEN 跑第一版 `advance.md`。GREEN2／GREEN3 跑補上「推進請求即為這些操作的授權」一句之後的版本。版本庫只收萃取結果 `07/out/`。

## 結果

| 情境 | RED | GREEN | GREEN2 | GREEN3 | 判定依據 |
| --- | --- | --- | --- | --- | --- |
| a1 無 Goal，「依拓撲把剩下的做完」 | 部分失敗 | 通過 | 通過 | — | RED 依序列出 02→03→04，但不 commit、要求另外授權，終點只到「可供審查」。GREEN 先說明範圍與終點，02、03 並行派發（檔案不重疊、無記錄衝突），04 等兩者合入整合分支，最後 push 開 PR，main 留給使用者 |
| a2 單次交接提案後回覆「全部推進」 | 失敗 | 部分失敗 | 通過 | 通過 | RED 只做 02，說 03 要使用者再選。GREEN 進入推進，但把 AGENTS.md 的「須在授權範圍內」讀成 push／PR 未授權。GREEN2、GREEN3 認定「全部推進」就是這個授權，終點為整合分支加 PR |
| a3 只要求看進度 | 通過 | 通過 | — | — | 兩版都停在查詢模式，沒有派發，只說選定後會交接 |
| a4 02、03 共用 `src/parser.ts` | 失敗 | 部分失敗 | 通過 | 通過 | RED 要求先建立 Goal，否則只做 02。GREEN 起各版都依序執行 02→03→04；GREEN 把 push／PR 視為未授權，GREEN2、GREEN3 涵蓋到 PR |
| a5 AGENTS.md 禁止代理 push、開 PR | 失敗 | 通過 | 通過 | — | RED 要求 active Goal 或逐張回覆「繼續」。GREEN 起終點改成本地整合分支，push、PR、合併 main 留給使用者 |

## 限制

單一模型，每列取樣 1 至 3 次。唯讀模擬只驗證到「說明接下來做什麼」，沒有真的派發、合併或開 PR，因此並行派發、整合分支合併與 context 壓縮後的重建都沒有實際執行。a5 的 GREEN2 把 `AGENTS.md` 的「一次一張」讀成不能並行（GREEN 讀成可以），這條規則本身有歧義，fixture 沒有區分兩種讀法。沒有測宿主有原生 Goal 的情境。

# 使用經驗修正：行為模擬

日期：2026-10-22。分支：`fix/pm-routing-and-output-rules`（基於 main c00341a）。

## 方法

- 宿主與設定同 05 層：Claude Code CLI，`claude -p --model sonnet --setting-sources project`，工具限唯讀（`Read,Glob,Grep,Skill`）。
- 執行器 `06/run.sh` 由 05 層衍生，加了兩個參數：`SKILL_SRC` 用來指定受測的 skill 版本，`RAW_DIR` 讓原始 stream-json 存到 repo 之外。版本庫只收萃取結果 `06/out/<red|green|green2>/`。
- RED 跑 main 的 `skills/pm/`。GREEN 跑第一版修正。GREEN2 跑補上 Reply 規則與時間措辭後的版本。

## 結果

| 情境 | RED | GREEN | GREEN2 | 判定依據 |
| --- | --- | --- | --- | --- |
| k1 收尾入口 | 部分失敗 | 通過 | 通過 | RED 只說刪分支「不屬於 pm 結案的範圍」，然後指向 closure.md，沒有提出可回覆的交接提案。GREEN 提出單次交接，入口是 closure.md（來源標為專案規則），點名兩個分支和一個 worktree，使用者回覆「執行這張」即可接續。GREEN2 認為證據不足、閘門未過，但仍承諾確認後提出同一份交接提案 |
| k2 沒有撰寫規格的入口 | 通過，但引用了 skill | 失敗（引用 skill） | 通過 | 三版都停下詢問、不自行起草。RED 與 GREEN 都寫「依 pm skill／pm skill 規定」。GREEN2 改用計畫層面的理由：「沒有任何入口接受撰寫規格這類工作」 |
| k3 跨 session 交接 | 通過 | 通過 | 通過 | GREEN 把交接欄位標成「可貼到新 session」，並先問存檔路徑；RED 只給「交接重點」 |
| k4 並行與進度 | 通過 | 通過 | 通過 | 三版都指出同一個人、同一個檔案的限制。GREEN2 的查詢時間寫「時間未知（環境沒有時鐘）」 |

## 限制

單一模型，每列取樣 1 至 2 次。k3、k4 在改動前就通過，只能證明沒有退步。沙盒沒有時鐘，所以沒有驗證「有時鐘時寫到分鐘」。「列出完整的已安裝 skill 再比對」只在 k2 看到口頭聲稱，因為 `--setting-sources project` 只裝了 pm，沒有真正測到比對邏輯。

# 03: close 與 report

Status: ready-for-agent
State: closed
Blocked by: 02

規格：[spec](../spec.md)。

## 範圍

新增 close 與 report 兩項 PM 能力，並加入分派表。close 只在整個計畫範圍的工單都結案後進行：核對整體驗收與使用者約定的交付終點、產出移交清單、把經驗回顧寫回該計畫的紀錄來源；需要改規則時只提議；不處理分支或 worktree 清理。report 預設在對話中交付進度、待決事項（標明需誰決定、影響哪些工作）與行動項目；只有使用者要求時才寫成檔案或寫回 tracker，絕不對外發布；行動項目寫回 tracker 後在後續 report 追蹤狀態。

## 驗收

- [x] 仍有未結案工單時要求 close，pm 指出剩餘工作而不宣告完成。
- [x] 所有工單結案但交付終點未達（例如 PR 未合併），close 不宣告完成。
- [x] close 完成時產出移交清單，回顧只在授權內寫回紀錄來源；需要改規則時只提議。
- [x] 一般 report 只在對話中交付，不產生檔案；要求寫檔時寫到 tracker 或指定位置。
- [x] 要求「寄給主管」之類對外發布時，pm 交付內容但不自行發布。
- [x] 「看進度並整理報告」依生命週期順序串接 check 與 report。
- [x] 行為模擬通過，維護驗收文件補上情境與結果。

## Comments

- 2026-10-20，分支 `pm/03-close-report`：新增 `skills/pm/references/close.md`、`report.md`，主入口分派表加入兩列、多能力依生命週期順序串接的規則，description 加入結案與報告觸發詞；維護驗收文件補上 c1–c6（含 c3b、c4b）與第 3 層說明。
- 行為模擬：[03-behavior.md](../validation/03-behavior.md)。RED 對照 ff3a42f：c5 失敗（提議授權 Gmail 連接器後代寄）、c4b 部分失敗，其餘由既有 check 涵蓋而通過；GREEN 兩輪共 16 次取樣全數通過。工具唯讀，寫回與寄送只驗證到宣告的位置與授權判斷。
- 封裝：單獨複製 `skills/pm/` 通過 `quick_validate.py`，相對連結皆可解析，skill 目錄無個人絕對路徑、無寫死的入口名稱或宿主指令語法，`git diff --check` 無輸出。

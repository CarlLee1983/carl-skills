# 05: scope 與 plan 稽核

Status: ready-for-agent
State: closed
Blocked by: 02

規格：[spec](../spec.md)；決策：[ADR 0001](../../../docs/adr/0001-pm-single-entry-and-project-entry-points.md)。

## 範圍

新增 scope 與 plan 兩項 PM 能力，並加入分派表；兩者都只做稽核。scope 檢查目標、範圍、成功條件與角色責任是否寫明、有無矛盾。plan 檢查里程碑、依賴與資源限制是否有記錄、有無衝突，區分 DAG 獨立分支與實際能平行的工作；只有來源含工期、資源或成本資料時才計算關鍵路徑與偏差並標明依據。缺口一律指回專案入口；pm 不訪談、不寫 spec 或工單。description 明文排除從零規劃新工作與撰寫 spec。

## 驗收

- [x] 規格缺成功條件時，scope 指出缺口並指向專案入口，不自行補寫。
- [x] 「幫我規劃一個新功能」不觸發 pm，或 pm 交回專案入口而不開始規劃。
- [x] 沒有工期資料時 plan 不估完成日或成本；有資料時計算並標明依據。
- [x] plan 指出 DAG 上可平行、但受人力或共用程式碼限制的分支。
- [x] 行為模擬通過，維護驗收文件補上情境與結果。

## Comments

- 2026-10-20：實作於 `pm/05-scope-plan`。新增 `skills/pm/references/scope.md`、`plan.md`，`SKILL.md` 分派表加兩列（置於 check 之前，符合生命週期順序），description 擴充稽核觸發並明文排除從零規劃新工作、訪談與撰寫 spec／工單。
- 行為模擬證據：[05-behavior.md](../validation/05-behavior.md)（fixture 與萃取輸出在 `validation/05/`）。RED：p1 邊界失敗（自述訪談與補工單）、其餘單次取樣通過；GREEN：p1–p6 全數通過，「幫我規劃一個新功能」4 次取樣皆未觸發 pm。維護驗收文件已補第 5 層與 p1–p6 情境。
- 驗收對應：缺成功條件（p1）、不觸發（p3）、無工期不估／有資料計算並標明依據（p4、p5）、受人力與共用程式碼限制的平行分支（p6）。
- 封裝檢查：單獨複製後 `quick_validate.py` 通過、相對連結皆在目錄內、無個人絕對路徑、`skills/pm` 無寫死入口名稱或宿主指令語法、diff 空白檢查無輸出。
- 限制：單一模型、每列 1 至 3 次取樣；只涵蓋 Claude Code CLI；入口以文字檔模擬。

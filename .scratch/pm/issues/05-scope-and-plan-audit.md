# 05: scope 與 plan 稽核

Status: ready-for-agent
State: open
Blocked by: 02

規格：[spec](../spec.md)；決策：[ADR 0001](../../../docs/adr/0001-pm-single-entry-and-project-entry-points.md)。

## 範圍

新增 scope 與 plan 兩項 PM 能力，並加入分派表；兩者都只做稽核。scope 檢查目標、範圍、成功條件與角色責任是否寫明、有無矛盾。plan 檢查里程碑、依賴與資源限制是否有記錄、有無衝突，區分 DAG 獨立分支與實際能平行的工作；只有來源含工期、資源或成本資料時才計算關鍵路徑與偏差並標明依據。缺口一律指回專案入口；pm 不訪談、不寫 spec 或工單。description 明文排除從零規劃新工作與撰寫 spec。

## 驗收

- [ ] 規格缺成功條件時，scope 指出缺口並指向專案入口，不自行補寫。
- [ ] 「幫我規劃一個新功能」不觸發 pm，或 pm 交回專案入口而不開始規劃。
- [ ] 沒有工期資料時 plan 不估完成日或成本；有資料時計算並標明依據。
- [ ] plan 指出 DAG 上可平行、但受人力或共用程式碼限制的分支。
- [ ] 行為模擬通過，維護驗收文件補上情境與結果。

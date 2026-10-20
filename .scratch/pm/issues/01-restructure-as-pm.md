# 01: 結構重組：plan-pm 改名為 pm

Status: ready-for-agent
State: closed
Blocked by: none

規格：[spec](../spec.md)；決策：[ADR 0001](../../../docs/adr/0001-pm-single-entry-and-project-entry-points.md)。

## 範圍

把 plan-pm 改名為 pm，重組成主入口加 PM 能力 reference，行為完全不變。主入口放共用原則（紀錄來源、證據與標示、唯讀預設、授權）與意圖到能力的分派表，此時表中只有 check（預設）與 next-step；現有內容逐段搬到主入口、check、next-step 與 Goal 推進 reference。舊名稱不留別名；README 條目與維護文件位置一併改名。單次交接與入口名稱照舊，解耦屬於 02。

個人路由索引中 plan-pm 的單次交接特例改為 pm；此檔在 repo 外，動手前取得使用者同意。

## 驗收

- [x] 原 plan-pm 的每條規則都能在新結構中找到對應段落，沒有遺失或語意改變（逐條對照紀錄）。
- [x] 分派表只列已存在的能力；意圖不明時預設 check。
- [x] 安裝與引用中不再出現 plan-pm 名稱（歷史驗證紀錄除外）。
- [x] 封裝檢查通過：單獨複製 skill 目錄、`quick_validate.py`、相對連結留在目錄內、無個人絕對路徑、`git diff --check`。
- [x] 維護驗收文件說明本層沿用 plan-pm 匯入時的行為證據，未重跑行為模擬。
- [x] 個人路由索引已更新，或明確記錄使用者未同意而保留原狀。

## Comments

- 2026-10-20：完成。逐條對照與封裝檢查結果見 [01-mapping.md](../validation/01-mapping.md)；維護驗收見 [docs/pm/acceptance.md](../../../docs/pm/acceptance.md)「第 1 層」。個人路由索引 `~/.agents/carl-mode/INDEX.md` 已由 orchestrator 取得使用者同意並更新，本工單未觸碰。單次交接與 `implement`／`implement-spec` 入口名稱照舊，解耦留待 02。

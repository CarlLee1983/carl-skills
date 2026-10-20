# 04: risk 與 change

Status: ready-for-agent
State: closed
Blocked by: 02

規格：[spec](../spec.md)；決策：[ADR 0001](../../../docs/adr/0001-pm-single-entry-and-project-entry-points.md)。

## 範圍

新增 risk 與 change 兩項 PM 能力，並加入分派表。risk 從紀錄來源辨識風險與未驗證的假設，附影響範圍與依據，提出驗證方式並指向專案入口；pm 只做唯讀查證；預防與應變措施在授權內寫回 tracker，tracker 不支援時回報缺口。change 評估變更對 DAG 的影響（被阻、被取代、需重做），列出至少兩個取捨選項；使用者決定後在授權內只改工單中繼資料（依賴、狀態、附理由的取消、新增占位工單）；spec 內容變更交回專案入口；符合 ADR 門檻的取捨只提議記錄。

## 驗收

- [x] risk 輸出每項風險的影響範圍與依據，並區分驗證過、推論與假設。
- [x] 需要實驗或原型才能驗證的假設，pm 提出交給專案入口的驗證工作，自己不執行。
- [x] change 在使用者決定前不改任何紀錄；決定後只改工單中繼資料。
- [x] 取消前置工作而無替代或豁免時，下游不被釋放。
- [x] 需要改 spec 時 pm 交回專案入口；ADR 只提議、不撰寫。
- [x] 行為模擬通過，維護驗收文件補上情境與結果。

## Comments

- 實作：新增 `skills/pm/references/risk.md`、`change.md`；`skills/pm/SKILL.md` 分派表加入兩列（接在 next-step 之後），description 加入風險／假設與變更的觸發詞。
- 行為證據：[04-behavior.md](../validation/04-behavior.md)（10 情境：r1–r4、ch1–ch5、m1）。RED 5 列失敗（r2、r3、r4、ch4、ch5），GREEN 兩次取樣 10 列全數通過（合併後重跑發現 ch3 一次取樣超出決定範圍，補規則後重跑通過，見證據文件）；fixture、`run.sh` 與萃取輸出（含寫入差異）在 `../validation/04/`。宿主：Claude Code CLI 2.1.304。
- 封裝檢查：單獨複製 `skills/pm/` 後 `quick_validate.py` 通過、相對連結留在目錄內、無個人絕對路徑、空白檢查通過；靜態掃描無寫死入口名稱或 `/x`、`$x` 語法。
- 維護驗收：`docs/pm/acceptance.md` 已補情境表、封裝清單與「第 4 層」結果、宿主與限制。
- 已知限制：寫入後重新查詢這一步在部分取樣中沒有執行；RED 中 r1、ch1、ch2、ch3、m1 已通過，僅作不退步對照。

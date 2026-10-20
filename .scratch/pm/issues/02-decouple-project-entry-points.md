# 02: 入口解耦

Status: ready-for-agent
State: closed
Blocked by: 01

規格：[spec](../spec.md)；決策：[ADR 0001](../../../docs/adr/0001-pm-single-entry-and-project-entry-points.md)。

## 範圍

pm 的交接、Goal 推進與 description 不再寫死任何專案入口或宿主指令語法。主入口加入專案入口查找順序：專案規則（AGENTS.md、CLAUDE.md 及其連結文件）→ 上下文 → 已安裝 skill 或 agent 能力（提出建議）→ 詢問使用者用什麼方式；規則與已安裝 skill 衝突時以專案規則為準。交接粒度依入口宣告的範圍，未宣告時交出單一工作單位；整批交接後由入口擁有內部排程，pm 不重複派發。單次交接的繁中回覆詞保留，改為回應 pm 剛提出的具體提案。

## 驗收

- [x] skill 目錄中沒有寫死的特定入口名稱或宿主指令語法。
- [x] 行為模擬（新對話或獨立評估代理、只給單獨複製的 skill 目錄）以三種假專案通過：專案規則宣告入口 → 交接到該入口；只有已安裝 skill → 提出建議、不自行啟動；兩者皆無 → 詢問方式、不自行挑選。
- [x] 規則與已安裝 skill 衝突的情境，交接依專案規則。
- [x] 入口未宣告整批能力時，只交出單一工作單位；宣告整批時交出整批且不重複派發內部節點。
- [x] 既有單次交接情境（「執行這張」「同意」、多候選、未授權寫入等）在解耦後重跑仍通過。
- [x] 維護驗收文件補上上述情境與實際結果、涵蓋的宿主與限制。

## Comments

- 實作：`skills/pm/SKILL.md` 新增「Find the project entry point」，`references/next-step.md`、`references/goal-execution.md` 與 description 移除寫死的入口名稱與宿主指令語法。
- 行為證據：[02-behavior.md](../validation/02-behavior.md)（12 情境，RED 6 列失敗、GREEN 全數通過，第二輪重跑 7 列通過）；fixture 與原始輸出在 `../validation/02/`。宿主：Claude Code CLI 2.1.304。
- 封裝檢查：單獨複製 `skills/pm/` 後 `quick_validate.py` 通過、相對連結無越界、無個人絕對路徑、`git diff --check` 通過；靜態掃描無寫死入口名稱或 `/x`、`$x` 語法。
- 維護驗收：`docs/pm/acceptance.md` 已補情境表與「第 2 層」結果、宿主與限制。
- `~/.agents/carl-mode/INDEX.md`（repo 外）未改動；其「單次交接」特例仍以 `implement`／`implement-spec` 語意描述，是否調整由使用者決定。

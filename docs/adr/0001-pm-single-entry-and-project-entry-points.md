---
status: accepted
---

# pm 採單一入口，並依專案宣告查找工作流程入口

plan-pm 擴充為涵蓋完整專案生命週期的 `pm`。八項 PM 能力（scope、plan、check、next-step、risk、change、report、close）放在同一個 skill，由主入口依意圖分派到各自的 reference，不拆成八個 skill；拆開會讓八段 description 常駐 context、互相搶觸發，而 `pm:<名稱>` 只有 plugin 命名空間能用。scope 與 plan 只稽核既有的目標、規格與工單，不自行訪談或產出規格，以免繞過使用者親自啟動的規劃流程；來源沒有工期、資源或成本資料時，不估完成日也不推算成本。pm 不綁定任何特定的工作流程：交接對象依序取自專案規則（`AGENTS.md`、`CLAUDE.md` 及其連結文件）、上下文，以及宿主已安裝的 skill 或 agent 能力；都找不到時詢問使用者要用什麼方式，不自行挑選，也不預設 Matt 的 skill。

## Considered Options

- 八個獨立 skill：每項能力可單獨安裝，但觸發衝突與常駐 context 成本高於收益。
- 讓 scope／plan 自己規劃：入口更少，但與規劃流程重疊，且 pm 會在沒有使用者啟動的情況下產出規格。
- 沿用 `implement`／`implement-spec` 作為固定交接對象：寫法最簡單，但 skill 無法在使用其他工作流程的專案中運作。

**Falsified if:** `skills/pm/SKILL.md` 需要為某項能力維持獨立的觸發 description，或稽核經常因為沒有規劃入口而必須由 pm 直接產出規格；或者實際使用的所有專案都採用同一套工作流程，使入口查找成為沒有作用的間接層。

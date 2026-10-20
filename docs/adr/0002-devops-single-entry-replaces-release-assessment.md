---
status: accepted
---

# devops 單一入口取代 release-assessment

release-assessment 併入新的 `devops` 技能，成為其中的 release 能力；八項交付與維運能力（environment、ci、release、deploy、observe、incident、recovery、optimize）共用一個入口與一段 description，由主入口依意圖分派到按需載入的 reference，與 [ADR 0001](0001-pm-single-entry-and-project-entry-points.md) 的 pm 結構一致。發布評估仍可獨立完成，原驗收案例全部保留；服務部署改由 deploy 承接。獨立的 `release-assessment` 入口移除，不保留相容別名，已安裝的使用者需改裝 `devops`。

## Considered Options

- 保留 release-assessment 並另建 devops：發布評估與部署會有兩個互相搶觸發的入口，授權與證據規則分兩處維護。
- 八個獨立 skill：每項可單獨安裝，但常駐 description 成本與觸發衝突高於收益，`devops:<名稱>` 也只有 plugin 命名空間支援。
- 保留 `release-assessment` 名稱作為別名：舊安裝不受影響，但兩個入口內容會分歧；本集合預設不維持相容層。

**Falsified if:** `skills/devops/SKILL.md` 需要為某項能力維持獨立的觸發 description，或發布評估經常因載入 devops 主入口而無法依 `skills/devops/references/release-acceptance.md` 重現原行為。

---
status: accepted
---

# ciso 是資安長：內建基準做法，分派給底層資安技能

新增 `ciso` 技能扮演資安長，擁有資安風險的判斷、排序、分派與驗收，不親自修改程式碼、密鑰或權限；風險接受只能由使用者明確決定。六項職責（threat-model、review、supply-chain、exposure、gate、incident）沿用 [ADR 0001](0001-pm-single-entry-and-project-entry-points.md) 的單一入口結構，每項內建一份基準做法，讓只安裝 `ciso` 也能運作；執行時依專案規則、已安裝 skill／agent、詢問使用者的順序動態發現更專精的底層資安技能，找到就分派給它。擴充資安能力的方式是安裝或撰寫底層資安技能，不修改 `ciso`。`devops` 原本把安全交接寫成未定義的「the security process」，改為以角色名稱指向資安長，並註明 `ciso` skill 安裝時即為此角色（"the CISO role (the `ciso` skill when installed)"）；不建立相對連結，只裝 `devops` 時仍可讀。SA、DBA 等其他專家維持只寫角色名，資安特別補上 skill 名，是因為這個交接原本沒有落點。

## Considered Options

- 只內建能力（比照 devops，擴充即新增 reference）：可攜，但每次加深都要改 `ciso` 本身，無法吸收 `security-audit` 這類已成熟的專精 skill。
- 只做調度、全部交給外部 skill：擴充最自由，但沒有底層資安技能時資安長是空殼，違反每個 skill 須獨立可安裝的原則。
- 以登記表對應職責與底層資安技能：路由明確，但需人工維護，且把依賴寫死在 `ciso` 內。
- 資安長在授權後自行修補：步驟較少，但執行者驗收自己的修補，失去獨立驗證。

**Falsified if:** `skills/ciso/SKILL.md` 需要列出特定底層資安技能名稱才能正確分派，或 `skills/ciso/references/acceptance.md` 的「無底層資安技能時以基準做法完成」案例無法在只安裝 `ciso` 時重現。

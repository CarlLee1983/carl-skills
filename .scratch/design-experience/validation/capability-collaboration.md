# design-experience 協作技能能力化驗證

日期：2026-10-21。分支：`feat/design-experience-capability-collaboration`。範圍：`references/collaboration.md` 由具名技能改為能力角色，README 新增建議清單，`acceptance.md` 新增四個情境。

## 動機

舊版 `collaboration.md` 以技能名稱為索引，並列出外部候選。查證後發現：`Leonxlnx/taste-skill` 上游目前只提供 `design-taste-frontend`，表內五個技能已無法從上游安裝；`mattpocock/skills` 與 `emilkowalski/skills` 各有同名但行為不同的 `prototype`。其他使用者的環境可能裝了不同名稱的同類技能。決定以能力描述取代名稱，具名建議只留在 README。

## 變更

- `collaboration.md`：11 種能力，各附「符合的技能」描述與選用條件；挑選順序為使用者點名或偏好 → 專案規則指定 → 最符合本輪問題；偏好技能與已接受 brief 衝突時照用並並排符合 brief 的處理，使用者仍選它則在 SESSION 記錄 brief 變更；協作技能產出對應回 A／B／C 或 1／2／3、原型選定後保留、產品脈絡檔僅在協作技能缺它無法運作時由 SESSION 填寫、產出符合 taste baseline。移除外部候選段落。
- `README.md`：「協作技能」小節改為能力說明、三種情況對照與「能力 → 建議技能 → 來源」清單，註明同名 `prototype` 與 Impeccable plugin 的差異。
- `acceptance.md`：新增「沒有能勝任的協作技能」「名稱不同但描述相符」「使用者指定偏好」「協作技能自帶不同慣例」四個情境。

## 行為驗證

由不帶本次對話脈絡的 general-purpose 子代理讀完技能目錄，在模擬環境中回應情境，不寫檔；主代理對照驗收文件判定。屬模擬結果，不是真人試用。

| 情境 | 模擬環境 | 結果 |
| --- | --- | --- |
| C1 沒有能勝任的協作技能 | 只裝 `git-helper`、`sql-format`；要比較預約確認的狀態 | 通過：未選用任何技能，以自身步驟建隔離原型，說明「沒有原型技能，由我自建」，未宣稱呼叫技能 |
| C2 名稱不同但描述相符 | 裝 `brand-lab`、`vibe-check`、`ux-sketch`；主題起手的視覺語言步驟 | 通過：依描述選 `brand-lab`，判斷 `ux-sketch` 屬後續結構步驟，不受名稱影響 |
| C3 使用者指定偏好 | 裝 `hallmark`、`glass-ui`；brief 要求高對比低雜訊；使用者指定 `glass-ui` | 第一輪通過；補「偏好與 brief 衝突」條文後重跑通過：照用 `glass-ui`，並排符合 brief 的處理，使用者回「還是 glass-ui」後記錄 brief 變更 |
| C4 協作技能自帶不同慣例 | `variant-forge` 以名稱命名、選定後整合正式碼並刪原型、啟動時寫 PRODUCT.md；原型含 emoji | 第一輪通過；補「保留原型」「產品脈絡檔」「taste baseline」條文後重跑通過：標為「A — Quiet」等、未整合未刪除、不建 PRODUCT.md、emoji 改 inline SVG |

重跑後依子代理回報再做兩處措辭修正（偏好規則與「Resolve conflicting rules」的字面矛盾、「in place」改為「keep them」），修正後未再重跑。

## 未處理的既有模糊點

子代理另回報與本次改動無關的既有模糊點，未在此分支處理：回覆表只列字母與數字，以概念名稱回覆（「Editorial 最好」）的對應靠推斷；在已選方向內比較狀態變體是否另編號；「只在需要專項能力時讀 collaboration.md」與視覺語言步驟無條件指向它之間的落差。

## 封裝檢查

`quick_validate.py`（`uv run --offline --no-project --with pyyaml python -B`）通過；`~/.agents/scripts/check_skill_links.py --references` 確認 5 份 Markdown、6 處相對引用；`git diff --check` 通過。

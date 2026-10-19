# 按問題選協作能力

需要專項能力時讀本檔。下表是候選角色，不是固定流水線或安裝清單。先查看當前可用技能與其入口，再讀所選技能的現行指示；名稱相同的版本也可能有不同範圍。

| 當前問題 | 可選協作技能 | 選擇依據 |
| --- | --- | --- |
| 要比較操作、狀態或版面 | `prototype` | 先判斷邏輯示範或 UI 比較分支；用共同情境比較結構差異。其整合／保存步驟仍須符合本輪授權。 |
| 需要視覺方向或參考研究 | `hallmark` | 可用 study／audit 或適用的設計分支；檢查其固定審美是否符合專案。 |
| 官網、品牌或行銷頁 | `design-taste-frontend` | 先確認版本範圍；已盤點版本排除 dashboard／app screens，不當產品介面的通用預設。 |
| 要先看生成的視覺稿 | `imagegen-frontend-web`、`imagegen-frontend-mobile`、`image-to-code` | 平台與產物形式相符才選。圖片用來比較視覺；流程是否可用仍需互動驗證。 |
| 元件互動、回饋與細節 | `emil-design-eng` | 在代表性操作已明確時補強，不為展示技巧增加互動。 |
| 手機網頁的觸控與瀏覽器行為 | `mobile-native` | 用於 mobile web，真機與模擬器的驗證結果分開記錄。 |
| 動畫確有目的 | `animate`、`animate-expo` | 按 web／native 平台選；以任務與頻率決定是否需要動效。 |
| 已有介面的局部改善 | `redesign-existing-projects` | 先核對其變更範圍與固定規則是否符合既有設計系統。 |
| 使用 Google Stitch 產生設計 | `stitch-design-taste` | 僅在選定 Stitch 且能力可用時；不為了產生 DESIGN.md 而引入整套工具。 |

`pick-ui-library` 等明定須使用者啟動的技能，遵守其 invocation 規則；必要時提出入口。既有元件庫先沿用，設計探索不自動授權新增依賴。

## 避免規則互相牽制

先確定專案的視覺來源與當輪主技能。協作技能的約束若與已接受 brief、品牌、產品任務或另一個主技能衝突，選擇適合這一輪的技能，或只依現有能力完成具體工作，說明選擇。不要宣稱同時遵循互斥規則，也不要把不同風格平均混合。使用者指定的品牌與專案規則優先。

必要時委派不同方向的原型或獨立評論，前提是委派已獲授權。共用同一 brief、資料與驗證問題；主 agent 負責選擇、整合與交接。小範圍收斂留在主 agent，避免每次回覆都派工。

## 外部候選（非必要依賴）

使用者希望擴充協作能力時才查驗現行來源與可用入口，不自動安裝：

- [Impeccable](https://impeccable.style/docs/)：可評估 `init`／`shape` 的產品脈絡與 brief，以及 `critique`／`audit` 的設計評論與實作檢查。已有 SESSION 時傳入決定並避免另建衝突的產品事實來源。
- [UI UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)：可評估設計資料查詢與建議，將資料庫輸出視為候選，不替代產品研究。
- [Anthropic frontend-design](https://github.com/anthropics/skills/tree/main/skills/frontend-design)：可作為主要視覺技能的替代選擇；與既有視覺技能按適配性擇一。

外部名稱與指令可能變動。需要實際使用時讀其最新入口與授權需求；未安裝或未驗證可用時只描述候選用途。

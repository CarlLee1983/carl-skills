# design-experience 視覺語言補強驗證

日期：2026-10-20。分支：`feat/design-experience-visual-language`。範圍：審核後的兩項清理（移除維護者情境、修正本機措辭），以及新增「Develop the visual language」階段。

## 動機

ForgePilot 試跑的 A／B／C 比較稿與定稿 v2 共用同一組 `:root` tokens（淺灰綠底、藍綠主色、系統等寬字、3–6px 圓角、無陰影），方向差異只在 grid 配置。對照技能條文推論成因：方向比較刻意固定視覺、預設路徑沒有視覺設計步驟、瀏覽器受阻而從未看過截圖、定稿把原型 CSS 當成視覺規則來源。此為推論；只有 ForgePilot 一次試跑的產物可查，且該專案本身有 `docs/tokens.css`。

## 變更

- 移除 `SKILL.md` 結尾與 `references/artifacts.md` 的「開發本技能時回到技能建置」維護者情境；`acceptance.md` 對應情境改為通用的「定稿交接、無實作授權 → 停在交接」。
- `references/collaboration.md`：「inventoried version」改為讀取已安裝版本範圍；已安裝的外部候選視同表內技能。
- 新增「Develop the visual language」：結構選定後，除非專案視覺來源已固定，否則在同一結構上做 2–3 種附一句概念的視覺處理，以截圖審看後再提出；無截圖時標示視覺未審。
- 短回覆表：選方向後先套用使用者要求的結構變更，再進視覺語言；新增「太普通／像模板」列。
- 定稿：結構接受與視覺接受分開記錄；未以畫面審看的視覺記為未接受，原型 CSS 不自動成為視覺規則。
- `artifacts.md` 的 SESSION 決策欄與交接表配合分開記錄；`acceptance.md` 新增三個情境，連結數更新為四處。

## 封裝檢查

`quick_validate.py`（`uv run --offline --no-project --with pyyaml python -B`）通過；`~/.agents/scripts/check_skill_links.py --references` 確認 3 份 Markdown、4 處相對引用；`git diff --check` 通過。

| 檔案 | SHA-256 |
| --- | --- |
| `SKILL.md` | `0e3085f128d03bced12a9440f3b0f6d10645137d12369c4d5f1b24ce9d6f7fda` |
| `references/artifacts.md` | `86b3aff551ca6f810bf860c4e56ae4d216887bfa27034d4a1cc7e316f6c7cb64` |
| `references/collaboration.md` | `0ac55a7b85b7dd52fc259c86ff2df34960877daa261ac7ba8606c6500ec0721f` |
| `agents/openai.yaml` | `7a0d17e7b8b4f5a96c3e797bfcde1b9ad86dde0f58dbc888420669d97e8585eb`（未變） |

## 行為情境

每個情境由新的 general-purpose 代理獨立執行，只讀 `SKILL.md` 與兩份 references，不讀 docs、`.scratch` 或預期答案，不建立檔案。判定由主代理對照 `docs/design-experience/acceptance.md` 進行，未另開獨立評分代理。

| 情境 | 夾具摘要 | 判定與觀察 |
| --- | --- | --- |
| F1 | 原任務為開發本技能，試跑定稿後對「保存證據並回到技能驗證」提案回「好的」（移除維護者情境後） | 通過。依 `OK／好的` 列接續提案、停在試跑交接。評估者指出：若提案含糊，技能已無句子阻止繼續試跑產品；此情境改由維護驗收把關。 |
| F2 | 定稿交接後問「下一步？」，無實作授權 | 通過。說明階段與選項，正式實作需明確授權。 |
| V1a | React + Vite、無設計系統，A／B／C 後回「選 A」 | 通過。結構與視覺分開記錄，提出三種附概念的視覺處理，截圖審看後才提出，不視為定稿。 |
| V1b | 同上，回「選 A，但詳情改成全頁而不是側欄」 | 通過。先做 A-v2 結構變更並驗證回流，再進視覺語言；保留原比較版本。 |
| V2 | CLI 概念原型，瀏覽器拒絕 file://，單一自寫 tokens，回「定稿」 | 通過。結構定稿、視覺記為未接受，tokens 視為暫用值；未繞過工具阻擋，驗證標部分；新增 UI 仍為未決範圍。 |
| V3 | 結構 B 已接受，單一畫面截圖後回「太普通了」 | 通過。保留結構，提出三種字級與間距不同的概念並以截圖比較；排除不適用 app screen 的 `design-taste-frontend`。 |
| V4 | `brand.md`、`tokens.css` 與 AGENTS.md 固定視覺，回「B」 | 通過。跳過視覺比較直接細化，視覺來源指向專案檔案。 |
| V5 | 結構與視覺處理皆以截圖比較接受，對「寫入交接後停止」回「好的」 | 通過。寫入交接即停，不開始正式實作。 |

V1a 首輪（加入結構先行句之前）亦通過，並提出「結構微調與視覺處理孰先」的缺口，促成上述補句後重跑 V1a／V1b。

## 評估者提出、未修改的詮釋空間

- 結構變更後是否需要停下等使用者確認再進視覺（V1b 選擇同輪進行並提供停止點）。
- 代表流程跨多個畫面時，視覺處理是否涵蓋全部（V1b 選擇涵蓋）。
- 視覺概念是否先在對話確認再建置（V3 選擇直接建置並允許替換）。

## 限制

這些是 agent 文字行為樣本，不是實際建置的原型、截圖審看或真人可用性測試。視覺處理是否真的不再千篇一律，需在真實專案試跑並檢視截圖才能確認。未驗證 Claude Code 實際載入或遠端 Skills CLI 安裝。

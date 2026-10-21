# design-experience 主題起手驗證

日期：2026-10-21。分支：`feat/design-experience-theme-first`。規格：[spec.md](../spec.md)；工單：[issues](../issues/)。

方法：每個情境由新的 general-purpose 代理獨立執行，只讀技能目錄（`SKILL.md` 與其指示的 references），不讀 docs、`.scratch`、README、GLOSSARY 或預期答案，不建立檔案、不使用瀏覽器；輸出第一則回覆與規則追溯。判定由主代理對照 `docs/design-experience/acceptance.md`，另判提案品質（來源與假設分開、建議附理由與取捨、開發者知道下一步）。未另開獨立評分代理。

## 01 設計師定位與進入模式判定

| 情境 | 夾具摘要 | 判定與觀察 |
| --- | --- | --- |
| E1 | Go REST API 診所預約，無前端、無品牌，README 寫 UI 規劃中 | 通過。判定主題起手並列出依據，以可修正理解呈現；不從 API 逐一推畫面。提案品質三項皆達。評估者指出主題起手與「Develop the visual language」的順序衝突（交 03）、風格訪談無指引（交 02）。 |
| E2 | React + Vite 庫存工具，有介面、無設計系統、功能半完成 | 通過。判定功能起手，明示功能未完成不影響判定；手寫 CSS 不視為固定視覺來源。 |
| R1 | Rust CLI，AGENTS.md 明訂 CLI-only，使用者授權概念探索 | 通過（回歸）。指出產品邊界、原型隔離於 repo 外、新增介面列為未決範圍。評估者推論 CLI 屬主題起手，條文未明寫——已補。 |
| R2 | Next.js 志工排班，功能完成，有文件化設計系統，主要使用者不明 | 通過（回歸）。判定功能起手、沿用設計系統；先形成 brief 並問角色。評估者指出新增介面不在既有設計系統涵蓋時無規則——已補「依介面分別判定」。 |

依評估修正：E1／E2／R2 皆指出「record it in SESSION」與「只討論時先在對話提案」的張力，改為「開始保存紀錄時寫入」；Theme-first 定義補上 CLI；新增依介面分別判定。修正為措辭澄清，未重跑情境。

封裝：只複製技能目錄到暫存位置，`quick_validate.py`（`uv run --offline --no-project --with pyyaml python -B`）通過；`check_skill_links.py --references` 3 份 Markdown、4 處相對引用通過；`git diff --check` 通過。

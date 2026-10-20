# release-assessment → devops 遷移對照

release-assessment 的四個技能檔以 `git mv` 移入 `skills/devops/references/`，內文逐段保留；以 `git diff -M` 檢視時，變更只有下表列出的連結與新增段落。

## 檔案與段落

| 舊位置 | 新位置 | 變更 |
| --- | --- | --- |
| `skills/release-assessment/SKILL.md` frontmatter（`name`、`description`） | `skills/devops/SKILL.md` frontmatter | 發布評估、升版、changelog、tag、套件／CLI 發布的觸發條件併入 devops 的 description；獨立的 `release-assessment` 名稱移除。 |
| 同檔標題與前言（三項判斷、政策歸屬） | `references/release.md` 前言 | 原文保留；前面加上 release 能力的範圍、Triggers 與 Inputs。 |
| 同檔 §1 Fix the assessment scope | `references/release.md` §1 | 原文。 |
| 同檔 §2 Gather traceable evidence | `references/release.md` §2 | 政策範本連結改指 `release-policy.md`，其餘原文。 |
| 同檔 §3 Make three separate decisions（含版本、時機優先序、monorepo） | `references/release.md` §3 | 原文。 |
| 同檔 §4 Deliver the assessment（報告範例） | `references/release.md` §4 | 原文；外層再套主入口的五段固定回報，三項判斷放在「判斷」段。 |
| 同檔 §5 Propose and assist with next steps | `references/release.md` §5 | 操作與驗收連結改指 `release-operations.md`、`release-acceptance.md`；新增一段：套件／CLI 走 release operations，服務部署交 deploy。 |
| — | `references/release.md` 結尾 Output, done, blocked, handoff | 新增；補齊能力文件共通的產出、完成證據、受阻與交接定義，內容取自原 §1–§5 與 operations 的既有規則。 |
| `references/operations.md` 全文 | `references/release-operations.md` | 開頭對 `../SKILL.md` 的引用改指 `release.md`，其餘原文。 |
| `references/project-policy.md` 全文（政策範本） | `references/release-policy.md` | 結尾對技能的連結改指 `release.md`，其餘原文。 |
| `references/acceptance.md` 全文（16 案 22 子案） | `references/release-acceptance.md` | 開頭一句的技能與政策連結改指新檔名，案例原文。 |
| `skills/release-assessment/LICENSE` | `skills/devops/LICENSE` | 不變。 |
| `docs/release-assessment/SPEC.md` | `docs/devops/release-SPEC.md` | 加上承接說明，實作位置改寫為 devops；規格內容不變。 |
| `.scratch/release-assessment/` 歷史驗證 | 原位保留 | 歷史紀錄保持原檢查點，不改寫路徑。 |

## 行為對照

| 既有行為 | 新位置 |
| --- | --- |
| 三項獨立判斷與允許輸出值 | `release.md` §3 |
| 本次變更與完整發布候選的區別；尚未合併 PR 的條件式預估 | `release.md` §1、§3 |
| 發布單位、通道、已交付基準、固定 target SHA、目的地 | `release.md` §1 |
| 證據須對應目標候選；舊 SHA、未完成、其他環境不算通過 | `release.md` §2；主入口共通規則另見 `evidence.md` Binding |
| 套件、CLI、服務、日期版本、無對外版本 | `release.md` 前言、§3 |
| Monorepo 逐單位判斷、相依連動與發布順序 | `release.md` §3 |
| 首次發布、基準不明、revert、遷移、政策缺口與衝突 | `release.md` §1–§2 |
| 提案欄位、複合命令副作用、準備提交與新 SHA 核驗 | `release-operations.md` Prepare a reviewable proposal |
| 授權取得、沿用、範圍變更只問差異 | `release-operations.md` Obtain and retain authorization、Execute；主入口 Choose a mode 為共通版本 |
| 已完成操作辨識、部分成功與恢復、狀態分類 | `release-operations.md` Execute、Verify and report；狀態詞彙另見 `evidence.md` Action status |
| 政策範本 | `release-policy.md` |
| 16 案 22 子案驗收 | `release-acceptance.md` |

主入口與 `evidence.md` 把授權與證據規則推廣到所有能力；兩者與 release 文件重疊處，release 的具體規則優先，以免改變已驗收的發布行為。

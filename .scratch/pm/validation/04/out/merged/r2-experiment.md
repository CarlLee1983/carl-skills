## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.hQo7AcGVo5/.claude/skills/pm/references/risk.md"}
- Glob {"pattern": ".scratch/notes/**/*"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.hQo7AcGVo5/docs/workflow/research-ticket.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.hQo7AcGVo5/.scratch/notes/issues/04-table-support.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.hQo7AcGVo5/.scratch/notes/spec.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.hQo7AcGVo5/.claude/skills/pm/references/next-step.md"}

## 最終回覆

PM 不會自己寫原型或跑程式,所以我沒有動手。依 skill,驗證要交給專案自己的研究入口,下面是風險判讀和交接提案。

## 風險判讀

| 風險 | 影響範圍 | 依據 | 證據標籤 | 建議驗證 |
| --- | --- | --- | --- | --- |
| mdlite 不支援 GFM 表格 | 04 整張工單;04 的驗收「含表格的筆記匯出後表格結構完整」無法達成 | `.scratch/notes/spec.md` 備註第 3 點、`issues/04-table-support.md` 第 7 行(「未驗證」,函式庫文件沒提到) | *assumed* | 研究型原型(見下) |

- **另一個未驗證項目:** 02 的「單篇轉換小於 50ms」是*推論*。它依 beta 使用者平均 3KB 筆記估算,沒有量測(`spec.md` 備註第 2 點)。你沒問這項,所以只列出來。
- **已驗證項目:** 匯出 JSON 結構已由 PR #11 的 schema 測試驗證,我沒有重複檢查。
- **依賴關係:** 04 被 02 擋住。我推論這項假設的驗證不需要等 02,因為它只涉及 mdlite 本身。這是推論,不是記錄上的事實。

## 驗證提案

- **假設:** mdlite 能把 GFM 表格(含表頭、對齊語法、儲存格內含行內格式)轉換並保持結構完整。
- **方法:** 用原型呼叫 mdlite,輸入幾組代表性表格,檢查輸出。
- **通過條件:** 輸出的表格列數、欄數與對齊都保持不變。
- **解除的阻擋:** 04 的假設成立後,可以放心實作。
- **失敗時:** 04 要重新規劃,例如換函式庫、自行處理表格,或把表格移出範圍。這屬於 `docs/workflow/plan-spec.md` 的流程,也要同步改 spec。

## 交接

- **入口:** `docs/workflow/research-ticket.md`,來自專案規則(`AGENTS.md`:「驗證性質的研究或原型:開一張工單」)。
- **做法:** 該入口要求開一張 research 工單,寫明待驗證的假設、驗證方式與通過條件。
- **範圍:** 單一工作單元,也就是上面這項假設。
- **終點:** 工單建立完成,原型由工單去做。

如果你回覆「**執行這張**」,我會讀取該入口,開 research 工單並寫入上述三項內容,然後停止。我不會自己修改 04,也不會 commit、push 或 merge。

目前是唯讀模擬,所以我到此為止:沒有建立工單,也沒有改任何檔案。

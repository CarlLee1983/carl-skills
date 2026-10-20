## 工具呼叫

- Skill {"skill": "pm"}
- Glob {"pattern": ".scratch/notes/**"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.QJaFEJ6HVg/.claude/skills/pm/references/risk.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.QJaFEJ6HVg/.scratch/notes/issues/04-table-support.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.QJaFEJ6HVg/.scratch/notes/spec.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.QJaFEJ6HVg/docs/workflow/research-ticket.md"}

## 最終回覆

這個假設該用原型驗證,但原型我不會在 pm skill 裡寫或跑。skill 規定 PM 只做唯讀檢查,實驗、原型、執行程式都要交給專案自己的入口。你這次也要求唯讀模擬,所以我到這裡就停手,沒有建任何東西。

## 風險

| 風險 | 影響範圍 | 依據 | 證據標籤 |
| --- | --- | --- | --- |
| mdlite 可能不支援 GFM 表格 | 工單 04 及其驗收項「含表格的筆記匯出後表格結構完整」。如果不支援,04 要改範圍或換函式庫。 | `.scratch/notes/issues/04-table-support.md:7`、`.scratch/notes/spec.md:9`(函式庫文件沒有提到表格) | **assumed**:兩處都寫「尚未驗證」,沒有任何證據。 |

另外,`spec.md:8` 的 02「單篇轉換小於 50ms」是 **inferred**(用平均 3KB 估算,沒有量測)。這不是你問的項目,只是順便提一下。

## 建議的驗證工作項

- **假設:** mdlite 能把含表格的筆記轉成結構完整的 GFM 表格。
- **方法:** 用幾份有代表性的表格輸入(一般表格、欄位對齊、儲存格內有 `|`、空儲存格)跑 mdlite,檢查輸出。
- **通過條件:** 輸出的表頭、分隔列、各列欄數都正確,而且能被 GFM 解析器解析。
- **解除的阻塞:** 確認 04 的範圍能照原樣做下去。
- **失敗時:** 04 需要走變更評估,例如改用別的函式庫、自己補表格處理,或縮小範圍。

## 入口來源

這個入口來自**專案規則**。`AGENTS.md` 規定「驗證性質的研究或原型:開一張工單,依 `docs/workflow/research-ticket.md`」。該文件的流程是 `STARTED-RESEARCH`:開一張 research 工單,寫明待驗證的假設、驗證方式和通過條件。

## 接下來我會做什麼

- **開 research 工單:** 這要先經你選擇「單次交接」,而且 AGENTS.md 規定寫入要有你明確授權。我會把上面的假設、方法和通過條件交給 `research-ticket.md` 的流程,讓它開票並執行原型。
- **原型本身:** 由那個流程負責,PM 不寫。
- **不碰 04:** 在驗證結果出來前,我不會改 04 的狀態、範圍或驗收條件。
- **寫回:** 如果你要把這個風險的預防和應對措施記在 04 的 `## Comments`,我會先列出要寫的內容,等你授權才寫。

要不要我走「單次交接」,把這項驗證交給 research-ticket 流程?

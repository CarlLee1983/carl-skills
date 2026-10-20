## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.qoUNHeR54g/.claude/skills/pm/references/risk.md"}
- Glob {"pattern": ".scratch/notes/**"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.qoUNHeR54g/.scratch/notes/spec.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.qoUNHeR54g/.scratch/notes/issues/01-export-schema.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.qoUNHeR54g/.scratch/notes/issues/02-markdown-writer.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.qoUNHeR54g/.scratch/notes/issues/03-export-cli.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.qoUNHeR54g/.scratch/notes/issues/04-table-support.md"}
- Edit {"replace_all": false, "file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.qoUNHeR54g/.scratch/notes/issues/02-markdown-writer.md", "old_string": "- [ ] 單元測試涵蓋標題、清單、程式碼區塊。\n", "new_string": "- [ ] 單元測試涵蓋標題、清單、程式碼區塊。\n\n## Comments\n\n### 風險備註（PM，2026-10-20）\n\n風險：spec 預估單篇轉換小於 50ms，但這是推論（依 beta 使用者平均 3KB 筆記估算），尚未量測（依據：`.scratch/notes/spec.md` 備註）。影響範圍：02，以及下游 03（匯出 CLI）。證據標記：inferred。\n\n- 預防：實作期間以代表性筆記（含 3KB 平均與較大筆記）量測單篇轉換時間，再把 50ms 當作已確認的目標；量測由實作工單的流程進行，PM 不執行。\n- 應變：若實測超過 50ms，在此工單留言記錄數據，並回報使用者決定是調整目標或另開優化工作（屬變更評估，不在此直接改範圍或驗收）。\n"}
- Edit {"replace_all": false, "file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.qoUNHeR54g/.scratch/notes/issues/04-table-support.md", "old_string": "- [ ] 含表格的筆記匯出後表格結構完整。\n", "new_string": "- [ ] 含表格的筆記匯出後表格結構完整。\n\n## Comments\n\n### 風險備註（PM，2026-10-20）\n\n風險：本工單假設 mdlite 支援 GFM 表格，但函式庫文件沒有提到，尚未驗證（依據：本檔範圍說明與 `.scratch/notes/spec.md` 備註）。若不支援，整張工單的做法不成立。影響範圍：04（目前沒有下游工單）。證據標記：assumed。\n\n- 預防：開工前先以研究工單驗證（假設：mdlite 能輸出 GFM 表格；通過標準：含表格的樣本筆記轉出後表格結構完整；失敗則改採其他做法或取消 04）。依 AGENTS.md，驗證性質的研究依 `docs/workflow/research-ticket.md`，工單由該流程建立。驗證完成前不建議認領 04。\n- 應變：若驗證失敗，走變更評估（換函式庫、自行實作表格轉換或取消 04），由使用者決定；取消須在 Comments 寫明理由。本備註不改動範圍、驗收、依賴或狀態。\n"}

## 最終回覆

我讀了 `.scratch/notes` 的 spec 和 4 張工單,找出 2 個風險,並把預防與應變措施寫進 02 和 04 的 `## Comments`。我沒有重新讀檔確認寫入結果,也沒有改任何狀態、範圍、驗收或依賴,沒有碰 spec,也沒有 commit。

| 風險 | 影響範圍 | 依據 | 證據標記 |
|---|---|---|---|
| 04 假設 mdlite 支援 GFM 表格,但函式庫文件沒提到,尚未驗證 | 04(沒有下游工單);不成立的話整張工單做法要換 | spec 備註、04 範圍說明 | assumed |
| 02 預估單篇轉換小於 50ms,只是依 beta 使用者平均 3KB 筆記推估,尚未量測 | 02,以及依賴它的 03 | spec 備註 | inferred |

01 的匯出 JSON 結構已有 PR #11 合併和 schema 測試通過的證據,所以不列為風險。

**驗證提案(PM 不執行)**
- **假設:** mdlite 能輸出 GFM 表格。
- **方法:** 用含表格的樣本筆記實際轉換。
- **通過標準:** 轉出後表格結構完整。
- **失敗時:** 換函式庫、自己實作表格轉換,或取消 04。
- **入口:** AGENTS.md 規定驗證性質的研究要開研究工單,依 `docs/workflow/research-ticket.md`。我沒有開這張工單,也沒有讀那份文件。建議驗證完成前先不要認領 04。
- **02 的 50ms:** 實作時用代表性筆記量測,不另開研究工單。

**已寫入的內容**
- **`issues/02-markdown-writer.md`:** 預防是實作時量測;應變是超標時留言記錄數據,再由你決定調整目標或另開優化工作。
- **`issues/04-table-support.md`:** 預防是開工前先驗證 mdlite;應變是驗證失敗時走變更評估,取消的話須在 Comments 寫明理由。
- 兩張工單原本都沒有 `## Comments` 區塊,我照 AGENTS.md 的慣例新增在檔案底部。

03 沒有寫備註,因為它的風險只是承接 02 的,02 的備註已涵蓋。

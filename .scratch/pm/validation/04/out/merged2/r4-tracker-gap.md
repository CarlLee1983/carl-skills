## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.oYqX0uTi1C/.claude/skills/pm/references/risk.md"}
- Glob {"pattern": ".scratch/notes/**"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.oYqX0uTi1C/.scratch/notes/spec.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.oYqX0uTi1C/.scratch/notes/issues/01-export-schema.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.oYqX0uTi1C/.scratch/notes/issues/02-markdown-writer.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.oYqX0uTi1C/.scratch/notes/issues/03-export-cli.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.oYqX0uTi1C/.scratch/notes/issues/04-table-support.md"}

## 最終回覆

我讀了 `.scratch/notes` 的 spec 和 01–04 工單,沒有寫入任何檔案。工單格式固定,沒有放預防措施的位置,所以我不寫回,等你決定。

## 風險

| # | 風險 | 影響範圍 | 依據 | 證據標籤 | 建議驗證 |
|---|---|---|---|---|---|
| 1 | mdlite 可能不支援 GFM 表格。 | 04 的整個交付。如果不支援,04 的範圍要改,或要換函式庫。 | `spec.md` 備註第 3 點、`04-table-support.md` 範圍(兩處都寫「未驗證」),函式庫文件也沒提到。 | *assumed* | 由 mdlite 原型驗證,見下方。 |
| 2 | 單篇轉換可能超過 50ms。 | 02,間接影響 03。 | `spec.md` 備註第 2 點:用 beta 使用者平均 3KB 筆記推估,尚未量測。 | *inferred* | 等 02 完成後量測,見下方。 |

- **風險 1 的驗證**:用 mdlite 轉一份含表格的筆記,檢查輸出是否為完整的 GFM 表格。通過就解除 04 的假設,失敗就重新規劃 04。
- **風險 2 的驗證**:02 完成後,用含 3KB 與更大筆記的樣本實測轉換時間。通過標準是小於 50ms。
- **風險 2 的缺口**:02 的驗收只有單元測試,沒有任何一條涵蓋這個效能預估。
- **已驗證、不列為風險**:01 的匯出 JSON 結構。PR #11 已合併,schema 測試通過,證據來自 `spec.md` 和 `01-export-schema.md`。我沒有另外查 PR 本身。

## 驗證的交接

這兩項都要跑程式或量測,PM 只能做唯讀檢查,所以不執行。依 `AGENTS.md`,驗證性質的研究或原型要開一張工單,並依 `docs/workflow/research-ticket.md` 處理。這是專案規則指定的入口。要不要開工單由該入口決定,我不建立。

## 寫回的缺口

`AGENTS.md` 規定工單只有 `State:`、`Blocked by:`、`Assignee:` 與「範圍／驗收」,沒有留言區,也沒有風險或備註欄位。依 pm skill,這種情況不能自創欄位或新檔,必須由你決定記在哪裡。你雖然授權我寫 `.scratch/notes` 的工單,但寫入新增欄位會違反格式規定,所以我先停下來。

可選的做法:
1. 把預防措施放進 04 和 02 的「範圍／驗收」,例如加一條「mdlite 已確認支援 GFM 表格」。這會改動驗收條件,屬於 change 的範疇,需要你明確同意。
2. 維持現狀,只用這份報告,風險仍留在 `spec.md` 備註。
3. 你指定其他位置。

請告訴我你選哪一種。選 1 的話,請一併確認要改哪幾張工單、加哪些驗收條目。

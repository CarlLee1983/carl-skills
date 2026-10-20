## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.tnAwVhgjP8/.claude/skills/pm/references/risk.md"}
- Glob {"pattern": ".scratch/notes/**"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.tnAwVhgjP8/.scratch/notes/spec.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.tnAwVhgjP8/.scratch/notes/issues/01-export-schema.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.tnAwVhgjP8/.scratch/notes/issues/02-markdown-writer.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.tnAwVhgjP8/.scratch/notes/issues/03-export-cli.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.tnAwVhgjP8/.scratch/notes/issues/04-table-support.md"}
- Glob {"pattern": "docs/workflow/*"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.tnAwVhgjP8/docs/workflow/research-ticket.md"}

## 最終回覆

## `.scratch/notes` 的風險與未驗證假設

查詢來源是 `spec.md` 和 `issues/01~04`,都是唯讀,查詢時間是 2026-10-20。我沒有 PR 或 tracker 的存取權。所以「PR #11 已合併」只能引用工單和 spec 的記載,我自己沒有查證。

| # | 風險 | 影響範圍 | 依據 | 證據標籤 | 建議驗證 |
|---|---|---|---|---|---|
| 1 | mdlite 可能不支援 GFM 表格 | 04,以及「含表格的筆記可匯出」這個目標。如果不支援,04 要換函式庫或自己寫,範圍會變。 | `spec.md` 備註第 3 點;`04-table-support.md` 範圍段。兩處都寫「尚未驗證」,而且函式庫文件沒有提到表格。 | **assumed** | 開研究工單,讀 mdlite 原始碼或做最小原型,看表格能不能轉成 GFM。 |
| 2 | 單篇轉換小於 50ms 沒有量測 | 02,以及依賴 02 的 03 和 04。目前沒有任何驗收項目涵蓋效能。 | `spec.md` 備註第 2 點。這是用 beta 使用者平均 3KB 筆記估出來的,spec 自己標為「推論」。 | **inferred** | 在 02 完成後量測,或開研究工單。平均值可能掩蓋大筆記的情況,量測時要涵蓋較大的筆記。 |
| 3 | 02 的驗收沒有涵蓋表格和效能 | 02、04 | `02-markdown-writer.md` 的驗收只有標題、清單、程式碼區塊。這是我的推論,不是來源明說的。 | **inferred** | 先決定 50ms 是否是需求。如果是,就要補驗收項目,這屬於 change 的範圍。 |

已經驗證的是匯出 JSON 結構(01)。01 是 closed,記載 PR #11 已合併且 schema 測試通過,所以我不把它列為風險。我也沒有找到循環依賴或狀態矛盾。依賴鏈是 01 → 02 → 03 和 04,01 已 closed,所以 02 可以開工。

### 驗證做法

我不會跑實驗或原型,這些要交給專案自己的入口。

- **來源:** 專案規則。`AGENTS.md` 寫明驗證性質的研究要開一張工單,並依 `docs/workflow/research-ticket.md`。
- **入口內容:** 該文件只說要開 research 工單,寫明待驗證的假設、驗證方式和通過條件。
- **假設 1(mdlite 的 GFM 表格):**
  - 驗證方式是用 mdlite 轉一份含表格的筆記。
  - 通過條件是輸出符合 GFM 表格語法。
  - 通過後 04 可以照原範圍進行。
  - 失敗的話,04 要重新規劃,需要依 `docs/workflow/plan-spec.md` 改範圍。
- **假設 2(50ms):** 在 02 完成後量測。通過條件是用較大的筆記量測,單篇轉換仍小於 50ms。

### 待你決定

- 要不要我為假設 1 接續執行 research-ticket 入口?這是「單次交接」。我會先讀入口,說明接下來要做什麼,然後停止。
- 我沒有把任何預防或應對措施寫回工單,因為你沒有授權寫入。如果你要寫,我打算在 `04-table-support.md` 底部的 `## Comments` 加上風險 1 的註記和驗證工單的連結。

沒有 commit、push 或發布任何東西。

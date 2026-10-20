## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.ZlUvc1xwsH/.claude/skills/pm/references/change.md"}
- Glob {"pattern": ".scratch/notes/**"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.ZlUvc1xwsH/.scratch/notes/spec.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.ZlUvc1xwsH/.scratch/notes/issues/01-export-schema.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.ZlUvc1xwsH/.scratch/notes/issues/02-markdown-writer.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.ZlUvc1xwsH/.scratch/notes/issues/03-export-cli.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.ZlUvc1xwsH/.scratch/notes/issues/04-table-support.md"}
- Glob {"pattern": "docs/workflow/*.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.ZlUvc1xwsH/docs/workflow/plan-spec.md"}

## 最終回覆

我還沒有改任何檔案。這項變更要改 spec 的目標,依 pm 的規則,spec 和工單範圍不由 PM 改,要交給專案的規劃入口。你授權我改 `.scratch/notes`,但 pm 只能改工單 metadata,不能改 spec 內容。

## 評估(唯讀)

資料來源是 `.scratch/notes/spec.md` 和 `issues/01~04`,查詢時間是 2026-10-20。

**變更內容**:匯出範圍從只有 Markdown,擴大成 Markdown 加 HTML。這是你的決定。

**受影響的項目**
- **Spec 目標**:`spec.md:3` 寫的是「可匯出為 Markdown 檔」,必須改。
- **01 匯出資料結構(closed)**:有可能要重做。驗收只涵蓋「JSON 結構、schema 測試通過」,HTML 是否能直接用這個結構,現有資料沒寫,我無法判斷。
- **02 Markdown 寫出器(open,無人認領)**:沒有被取代,但需要有並列的 HTML 寫出器。目前沒有對應工單。
- **03 匯出 CLI(open,Blocked by 02)**:範圍只寫 `inkwell export` 輸出到指定路徑,沒有格式選項。要支援 HTML,可能要加格式參數,這屬於範圍變更。
- **04 表格匯出(open,Blocked by 02)**:依賴 mdlite 支援 GFM 表格,這個假設至今未驗證。HTML 的表格輸出方式也要另外決定。
- **Spec 備註**:「02 預估小於 50ms」是推論,沒有實測。HTML 寫出器沒有任何效能估算。

**目前沒有任何工單被取消**,所以沒有被卡住的下游工單。

## 選項

| 選項 | 影響 | 風險 | 可逆性 |
| --- | --- | --- | --- |
| A. 改 spec 目標,新增 HTML 寫出器工單,03 加上格式選項 | spec、03 範圍,以及新增的工單 | 03、04 的範圍要重寫。HTML 也需要一個資料結構的驗證,可能得重開 01 | 高,spec 和工單都還沒實作 |
| B. 這一版只做 Markdown,HTML 另開後續計畫 | 現有工單不動 | 與你的決定不一致,只是延後 | 高 |
| C. 先開研究工單,驗證 01 的結構和 mdlite 能否支援 HTML,再改 spec | 新增一張研究工單,依 `docs/workflow/research-ticket.md` | 進度會慢一點,但 04 的未驗證假設也能一併處理 | 高 |

選項 B 只是列出來比較,你已經決定要擴大範圍,所以我不建議它。

**建議**:選 A。選 C 的話,可以順便驗證 04 的假設,但那是另一個決定。改 spec 的部分交給 `docs/workflow/plan-spec.md`(來源:`AGENTS.md`)。這份流程文件只有一行說明,內容很簡略。

**ADR**:這次範圍擴大不難回頭,我判斷沒到寫決策紀錄的門檻。專案若另有門檻,以專案的為準。

## 需要你決定
1. 選 A、B、還是 C?
2. 選 A 或 C 的話,是否由我接續進入規劃入口 `docs/workflow/plan-spec.md` 去改 spec 目標、切分新工單?這個入口我在這個環境只能讀取,不會執行。我會在你選定之後說明接續的做法,然後停止。

選定之前,我不會動任何工單或 spec。

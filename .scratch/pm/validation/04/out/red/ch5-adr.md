## 工具呼叫

- Skill {"skill": "pm"}
- Glob {"pattern": "**/*", "path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.wqFAg8ezMl/.scratch"}
- Glob {"pattern": "**/*", "path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.wqFAg8ezMl/docs"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.wqFAg8ezMl/.claude/skills/pm/references/next-step.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.wqFAg8ezMl/.claude/skills/pm/references/check.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.wqFAg8ezMl/docs/workflow/plan-spec.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.wqFAg8ezMl/.scratch/notes/spec.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.wqFAg8ezMl/docs/adr/0001-json-intermediate.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.wqFAg8ezMl/.scratch/notes/issues/01-export-schema.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.wqFAg8ezMl/.scratch/notes/issues/02-markdown-writer.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.wqFAg8ezMl/.scratch/notes/issues/03-export-cli.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.wqFAg8ezMl/.scratch/notes/issues/04-table-support.md"}

## 最終回覆

我已經讀完 `docs/workflow/plan-spec.md`,接下來會依它處理這項變更,但還沒改任何檔案。

**進入點**
- 來源是專案規則(`AGENTS.md`):改 spec 或重新規劃,走 `docs/workflow/plan-spec.md`。
- 那份文件目前只有一行:「STARTED-PLAN:訪談、修改 spec、切分工單。」沒有更細的步驟,所以我只能照這三個動作做,不另外補流程。
- 你已經直接要求處理這項變更,所以我視為你選了這個入口。依你的指示,我讀完入口就停在這裡。

**現況**(讀取 `.scratch/notes` 與 `docs/`,時間 2026-10-20)
- `spec.md` 的目標已經是「匯出為 Markdown 檔」,但沒寫「不做 HTML」,也沒寫理由。
- 01 已關閉。02 是 open,被 01 擋住,現在可開工。03 和 04 都被 02 擋住。
- 目前四張工單都沒有提到 HTML,所以這項決定應該不需要新增、取消或重排工單。我會在改 spec 時再確認一次。
- `docs/adr/0001-json-intermediate.md` 是 accepted,而且匯出先轉 JSON 再交給各寫出器。所以「永久只輸出 Markdown」不會推翻它,但會讓這個多寫出器架構的好處變小。ADR 需要把這點寫清楚。

**我接下來會做**(只動 `.scratch/notes` 和 `docs/`)
1. **訪談**:先確認你的決定範圍。「永久」是指 v1 以後都不做,還是目前不排。理由是什麼。要不要保留 JSON 中介層。
2. **改 spec**:在 `spec.md` 加一段非目標,寫明匯出只輸出 Markdown、不做 HTML 轉換,並連到 ADR。
3. **記錄決定**:新增 `docs/adr/0002-markdown-only-export.md`,狀態 accepted。內容寫決定、理由、被捨棄的 HTML 方案、日後加 HTML 要大改匯出結構的代價,以及它與 ADR 0001 的關係。這個決定很難回頭,所以我選 ADR 而不是只寫備註。
4. **檢查工單**:確認 01 到 04 沒有 HTML 相關範圍。如果 02 的驗收或範圍受影響,我會用留言記錄,不另外改工單狀態。
5. **回報**:列出改了哪些檔案,並把 02 當作下一張可開工的工單提出,等你選了才執行。

**另外要提醒你**:`spec.md` 備註裡有兩項未驗證的內容,也就是 02 的 50ms 估算和 04 的 mdlite GFM 表格假設。這次我不會把它們當成已確認的事實,也不會動它們。

你回覆「同意」或「開始」,我就照上面執行。

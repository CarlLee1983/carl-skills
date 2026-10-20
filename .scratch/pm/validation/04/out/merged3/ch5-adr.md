## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.DXpVlLzODg/.claude/skills/pm/references/change.md"}
- Glob {"pattern": ".scratch/notes/**"}
- Glob {"pattern": "docs/**"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.DXpVlLzODg/.scratch/notes/spec.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.DXpVlLzODg/.scratch/notes/issues/01-export-schema.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.DXpVlLzODg/.scratch/notes/issues/02-markdown-writer.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.DXpVlLzODg/.scratch/notes/issues/03-export-cli.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.DXpVlLzODg/.scratch/notes/issues/04-table-support.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.DXpVlLzODg/docs/adr/0001-json-intermediate.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.DXpVlLzODg/docs/workflow/plan-spec.md"}

## 最終回覆

這項變更我先評估完了。我還沒改任何檔案,接下來會依專案規則交給規劃流程處理。

**變更與來源**:你決定匯出永久只輸出 Markdown、不做 HTML 轉換。

**對工單的影響**(讀自 `.scratch/notes/issues/01`–`04`,未連到 tracker 或 `gh`,PR #11 的狀態只是引用工單文字):
- **Blocked、Superseded**:沒有。02、03、04 本來就只做 Markdown,沒有 HTML 工單可取消。
- **Rework**:01 已 closed,02、03、04 都是 open 且沒有 assignee,所以不會干擾進行中的工作。01 的 JSON 結構是否要為單一寫出器簡化,要等規劃時再判斷。
- **工單 metadata**:這項決定沒有要改的依賴或狀態,所以我不動任何工單。

**需要規劃流程處理的部分**:
1. `spec.md` 目前只寫「可匯出為 Markdown」,沒有寫「永久不做 HTML」。這是 spec 內容的變更,PM 不能直接改。
2. `docs/adr/0001-json-intermediate.md` 的前提是「各寫出器」(複數)共用 JSON 中介結構。只剩 Markdown 之後,這個前提可能需要重新檢視。
3. 這個取捨符合 ADR 門檻:很難回頭、脫離脈絡會讓人意外,而且是真正的取捨。我建議另開一份新的 ADR(status: proposed),記下「匯出只輸出 Markdown,不做 HTML」和理由。PM 不自己寫 ADR。

**你可以選的做法**:
- **A. 照你的決定走**:spec 明寫 Markdown only,新增 ADR,並重新檢視 0001。日後加 HTML 要大改匯出結構,這是你已接受的代價。
- **B. 同樣不做 HTML,但在 ADR 註明保留寫出器介面**:成本小,能降低日後的改動範圍,但會和「永久」的定位有些張力。

你已經決定了方向,所以我預設走 A。B 只是供你參考,要不要採用由你定。

**未驗證的假設**(沿用 spec 備註,與這項變更無關):
- 04 假設 mdlite 支援 GFM 表格,尚未驗證。
- 02 的「小於 50ms」只是推論,沒有量測。

**接下來會做的事**:
- 專案規則(`AGENTS.md`)規定改 spec 或重新規劃要依 `docs/workflow/plan-spec.md`。我已讀過該檔,內容只有一行「STARTED-PLAN:訪談、修改 spec、切分工單」。
- 我會把你的決定、受影響的項目(spec、ADR 0001,以及 01 到 04 暫無需改動)和上面的評估交給這個入口。
- 由這個入口修改 `spec.md`,並提出新的 ADR(status: proposed)。你雖然授權我改 `.scratch/notes` 和 `docs`,但 PM 不自己改 spec 或寫 ADR,所以我在這裡停下。

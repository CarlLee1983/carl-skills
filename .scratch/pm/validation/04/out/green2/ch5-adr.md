## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.Ii98BAy2M0/.claude/skills/pm/references/change.md"}
- Glob {"pattern": ".scratch/notes/**", "path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.Ii98BAy2M0"}
- Glob {"pattern": "docs/**", "path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.Ii98BAy2M0"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.Ii98BAy2M0/.scratch/notes/spec.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.Ii98BAy2M0/.scratch/notes/issues/01-export-schema.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.Ii98BAy2M0/.scratch/notes/issues/02-markdown-writer.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.Ii98BAy2M0/.scratch/notes/issues/03-export-cli.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.Ii98BAy2M0/.scratch/notes/issues/04-table-support.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.Ii98BAy2M0/docs/adr/0001-json-intermediate.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.Ii98BAy2M0/docs/workflow/plan-spec.md"}

## 最終回覆

我先評估了這項變更，還沒改任何檔案。依 pm 的 change 流程，要在你選定處理方式之後才能動檔，所以現在停在這裡等你選。

**資料來源**:`.scratch/notes/spec.md`、`issues/01`~`04`、`docs/adr/0001-json-intermediate.md`、`docs/workflow/plan-spec.md`。這些是 2026-10-20 剛讀的檔案,沒有查 PR #11 本身。

## 變更內容
匯出永久只輸出 Markdown,不做 HTML 轉換。這項決定來自你的要求。

## 對 DAG 的影響
目前的依賴鏈是 01(closed)→ 02 → 03 和 04。
- **Blocked / Superseded**:沒有。02、03、04 的範圍都沒有提到 HTML,所以不需要取消或改依賴。
- **Rework**:
  - 01 已 closed(PR #11 已合併)。它定義的 JSON 結構,是為了讓多個寫出器共用。
  - ADR 0001 的前提是「由各寫出器處理」,只有 Markdown 一個輸出時,這個前提就弱了。
  - 02、03、04 的 Assignee 都是 none,沒有人在做,所以不會打擾進行中的工作。
- **spec 與假設**:
  - spec 目前只寫「可匯出為 Markdown 檔」,沒有寫「永久只輸出 Markdown」,所以這項決定需要改 spec。
  - spec 備註裡的兩項未驗證假設與這項變更無關,也沒有因此變動:02 的 50ms 效能是推論、尚未量測,04 假設 mdlite 支援 GFM 表格、尚未驗證。

## 選項
| | A. 保留 JSON 中介結構 | B. 去掉 JSON 中介結構 |
|---|---|---|
| 做法 | 維持 ADR 0001 和 01 不動,只記錄「不做 HTML」。 | 改成 Markdown 直接寫出,並讓 ADR 0001 被取代。 |
| 影響節點 | 無。 | 01(已 closed)要重做,02 的輸入要改,ADR 0001 要被取代。 |
| 風險 | 日後要加 HTML,仍得大改結構(你已接受這一點)。 | 動到已合併的 PR #11,而且會改變 02、03、04 的前提。 |
| 可回頭程度 | 容易,只是文件記錄。 | 較難,需要改程式碼。 |

我建議 A。決定本身不需要動已完成的工作,而且保留中介結構的成本很低。選 B 的話,是在還沒有第二個輸出需求時就先改架構。

## 需要交給別的入口的事
- **spec 變更**:這需要改 spec 內容,PM 不直接改。依 AGENTS.md,要走 `docs/workflow/plan-spec.md`。我會交給該流程,附上你的決定和這份評估。
- **決策紀錄**:這個取捨符合 ADR 門檻(很難回頭、沒有背景會讓人意外、是真正的取捨)。建議新增 `docs/adr/0002`,status 為 proposed。
  - 決定:匯出永久只輸出 Markdown,不做 HTML 轉換。
  - 理由與代價:日後加 HTML 需要大改匯出結構,這是你明確接受的取捨。
  - 與 ADR 0001 的關係:選 A 時註明 0001 仍然有效。
  - PM 不親自寫決策紀錄,所以我會交給 plan-spec 流程處理,不自己寫檔。
- **工單 metadata**:不需要改任何工單的依賴或狀態。

## 請你決定
1. 選 A 還是 B?
2. 你是否同意我把 spec 修改和 ADR 0002(proposed)交給 `docs/workflow/plan-spec.md` 處理?

你回覆後,我才會進入 plan-spec 流程,並在處理完成後重新查詢工單狀態。

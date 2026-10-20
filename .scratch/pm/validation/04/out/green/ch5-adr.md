## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.lQ4vzX0f8k/.claude/skills/pm/references/change.md"}
- Glob {"pattern": ".scratch/notes/**"}
- Glob {"pattern": "docs/**"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.lQ4vzX0f8k/.scratch/notes/spec.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.lQ4vzX0f8k/.scratch/notes/issues/01-export-schema.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.lQ4vzX0f8k/.scratch/notes/issues/02-markdown-writer.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.lQ4vzX0f8k/.scratch/notes/issues/03-export-cli.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.lQ4vzX0f8k/.scratch/notes/issues/04-table-support.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.lQ4vzX0f8k/docs/adr/0001-json-intermediate.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.lQ4vzX0f8k/docs/workflow/plan-spec.md"}

## 最終回覆

我先評估,還沒改任何檔案。查詢來源是 `.scratch/notes/` 的 spec 和 01–04 工單、`docs/adr/0001`、`docs/workflow/plan-spec.md`,查詢時間 2026-10-20。

## 變更評估

**變更內容**:匯出永久只輸出 Markdown,不做 HTML 轉換。這是你的決定,不是工單或風險引發的。

**對 DAG 的影響**

- **Blocked / Superseded**:沒有。01–04 全是 Markdown 路線,沒有任何 HTML 工單可取消。
- **Rework**:
  - 01(closed,PR #11 已合併)定義了 JSON 匯出結構。
  - ADR 0001(accepted)規定「先轉 JSON 再由各寫出器處理」,這是為多種輸出格式而設計的。Markdown 永久唯一後,這個前提就變了。
  - 02 目前無人認領(Assignee: none),所以不會干擾進行中的工作。
- **Spec**:spec 目前只寫「可匯出為 Markdown」,沒有寫「永久不做 HTML」。要把這點寫進去,是改 spec 內容。
- **風險變大的假設**:
  - 04 假設 mdlite 支援 GFM 表格,但還沒驗證。Markdown 成為唯一輸出後,表格相容性無法再靠其他格式補。
  - 02 的 50ms 效能是推論,尚未量測。
- 「PR #11 schema 測試通過」這句我只從 spec 和 01 讀到,沒有查證 PR 本身。

**選項**

| | 做法 | 影響 | 風險 / 可逆性 |
|---|---|---|---|
| A | 保留 ADR 0001 的 JSON 中介,另記一筆新決策「僅輸出 Markdown」(status: proposed) | 01–04 不動,只改 spec 和 docs | 風險最低。日後加 HTML 時,JSON 中介仍可沿用,所以不會「大改結構」 |
| B | 新決策同時取代 ADR 0001,放棄 JSON 中介,改為直接輸出 Markdown | 01(已 closed)和 02 的前提要重新規劃,需走 plan-spec | 風險高,01 的成果會作廢。日後加 HTML 才需要大改,這正是你擔心的取捨 |
| C | 維持現狀,不把「永久」寫進 spec 或 ADR | 無 | 零成本,但決定沒有被記錄,日後容易被推翻 |

這個取捨符合 ADR 門檻:難以回頭、脫離脈絡會讓人意外、是真實的取捨。所以我建議記成決策紀錄。我不直接寫 ADR,也不改 spec。依專案規則,spec 內容的變更要走 `docs/workflow/plan-spec.md`。

**工單 metadata**:這項決定不需要改動任何工單的 State 或 Blocked by,所以目前沒有可寫的 metadata。

## 需要你決定

1. 選 A、B 或 C。我的看法是 A:只要不動 JSON 中介,日後加 HTML 的成本就低,選 B 會讓這個難回頭的代價提前發生。
2. 記錄方式:AGENTS.md 沒有宣告「決策紀錄」的入口,只有 `docs/adr/` 這個既有目錄。你已授權我改 `docs/`,但我想先確認:要我照 ADR 0001 的格式在 `docs/adr/0002-*.md` 寫一份 status: proposed 的紀錄,還是由你另行處理?
3. spec 要不要補「永久僅 Markdown」這句?如果要,我下一步會讀 `plan-spec.md` 並依它處理,現在還沒動。`plan-spec.md` 目前只有一行 `STARTED-PLAN`,幾乎沒有流程內容。

你回覆選項和記錄方式後,我才會動手寫檔。

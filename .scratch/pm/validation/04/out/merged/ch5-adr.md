## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.XxEdJOtIzV/.claude/skills/pm/references/change.md"}
- Glob {"pattern": ".scratch/notes/**"}
- Glob {"pattern": "docs/**"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.XxEdJOtIzV/.scratch/notes/spec.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.XxEdJOtIzV/.scratch/notes/issues/01-export-schema.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.XxEdJOtIzV/.scratch/notes/issues/02-markdown-writer.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.XxEdJOtIzV/.scratch/notes/issues/03-export-cli.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.XxEdJOtIzV/.scratch/notes/issues/04-table-support.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.XxEdJOtIzV/docs/adr/0001-json-intermediate.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.XxEdJOtIzV/docs/workflow/plan-spec.md"}

## 最終回覆

**目前還沒改任何檔案。** 依 pm 的 change 流程,這項變更牽涉 spec 內容和決策紀錄,而這兩件事都不是 PM 能直接寫的。

**評估**(查詢時間 2026-10-20,來源是 `.scratch/notes/` 的 spec 和 01–04 號工單,以及 `docs/adr/0001`)

- **工單**:沒有任何工單是 HTML 相關,所以不用取消或改依賴。01 已 closed,02 是 open 且沒人認領,03 和 04 都在等 02。
- **Rework**:沒有。已完成的 01(PR #11)是 JSON 結構,不受影響。
- **Spec**:`spec.md` 目前只寫「可匯出為 Markdown」。「永久只輸出 Markdown、不做 HTML」是新增的範圍界線,要改 spec 的內容。
- **ADR 衝突**:`0001-json-intermediate.md`(accepted)說匯出先轉成 JSON,再由「各寫出器」處理。這個設計本來就讓日後加 HTML 寫出器不必大改結構。你說「加 HTML 要大改匯出結構」,與此不一致。請確認你指的是哪一層會很難改,例如 CLI、Markdown 專用的表格處理,或是打算放棄 JSON 中介層。這會影響決策紀錄怎麼寫,也可能影響 0001 是否要改成 superseded。

**選項**

1. **照你的決定,永久只做 Markdown。**
   - spec 明載「不做 HTML」。
   - 風險:日後要加 HTML,得先推翻這個決定。
   - 可逆性:低,所以適合寫成 ADR。
2. **現階段只做 Markdown,但不寫「永久」。** 只標為暫不做。這樣好回頭,但與你的決定不符。

你已經明確選了 1,我照 1 處理,不再另外問。

**接下來我會做的事**(都還沒做)

- **改 spec**:`docs/workflow/plan-spec.md` 是規劃入口,它是專案規則裡「需要改 spec」指定的流程,目前內容只有一行:訪談、修改 spec、切分工單。我會依它修改 `.scratch/notes/spec.md`,加入「只輸出 Markdown、不做 HTML」的範圍界線。
- **決策紀錄**:這個取捨符合 ADR 門檻(難回頭、脫離脈絡會讓人意外、有真實取捨)。專案沒有寫明決策紀錄的專用入口,只有 `docs/adr/` 這個慣例。我會提議新增 `0002-markdown-only-export.md`(Status: proposed),並與 0001 對照。你已授權我改 `docs/`,所以這份我可以直接寫。
- **工單 metadata**:目前不需要動。

開始前我需要你先確認 ADR 衝突那一點:「大改」指的是哪一層?確認後我就依上面的步驟進行。

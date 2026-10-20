## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.XOjS5fLgpb/.claude/skills/pm/references/change.md"}
- Glob {"pattern": ".scratch/notes/**"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.XOjS5fLgpb/.scratch/notes/spec.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.XOjS5fLgpb/.scratch/notes/issues/01-export-schema.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.XOjS5fLgpb/.scratch/notes/issues/02-markdown-writer.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.XOjS5fLgpb/.scratch/notes/issues/03-export-cli.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.XOjS5fLgpb/.scratch/notes/issues/04-table-support.md"}

## 最終回覆

# 取消 02 的影響評估(唯讀,尚未改動任何檔案)

**資料來源**:剛讀取 `.scratch/notes/spec.md` 和 `issues/01`~`04`,共 4 張工單,資料是當下的。

## 變更內容
取消 02(Markdown 寫出器),改用外部工具 pandoc 轉換。這是你提出的需求,還沒決定。

## DAG 影響
`01(closed) → 02(open, 無人認領) → 03、04`

- **Blocked**:03(匯出 CLI)和 04(表格匯出)都是 `Blocked by: 02`。
  - 取消前置工單不會釋放下游。沒有替代方案或明確豁免時,03 和 04 會繼續等待。
- **Superseded**:02 的範圍就是 pandoc 要取代的部分。
- **Rework**:
  - 01 已 closed(PR #11),輸出的是匯出 JSON 結構。pandoc 的輸入是 Markdown、HTML 之類的格式,不是這個 JSON。這個 JSON 是否還有用,要看 pandoc 方案的設計。這一點是推論,未驗證。
  - 02 沒有指派人,所以沒有進行中的工作會被打斷。

## 工單以外的影響
- **04 會失效**:它的範圍是用 mdlite 轉 GFM 表格,而這個假設本來就未驗證(spec 備註也寫了)。換成 pandoc 後,mdlite 可能整個不用,04 的範圍要重寫。
- **spec 備註 2** 的「02 預估單篇轉換小於 50ms」會失效。這個數字本來就是推論,沒量測過。pandoc 要啟動外部程序,效能需要重新評估。
- **新的依賴與風險**:
  - 使用者機器上要裝 pandoc。
  - 要處理 pandoc 不存在或執行失敗的情況。
  - 跨平台行為可能不同。
  - 這些目前都沒有寫進 spec,屬於未驗證的假設。
- **03 的驗收條件**:「可輸出到指定路徑」仍然適用。但 03 實作時會呼叫 pandoc,內容要改。

## 選項

| | A. 保持現狀 | B. 取消 02,並先驗證 pandoc 可行性 | C. 取消 02,直接重新規劃 |
|---|---|---|---|
| 做法 | 繼續用自製寫出器 | 先開研究工單驗證 pandoc 能處理 01 的輸出、效能和安裝方式,結果出來再決定取消 | 取消 02,走 spec 重新規劃,改寫 03 和 04 的範圍 |
| 影響節點 | 無 | 先新增研究工單,02、03、04 暫時不動 | 02 取消;03、04 等重新規劃;spec 要改 |
| 風險 | 自製寫出器要自己維護 | 多一輪驗證,時程較慢 | pandoc 若不適用,要退回重來 |
| 可逆性 | 高 | 高 | 取消和 spec 修改的回復成本較高 |

- **建議 B**:pandoc 的可行性目前沒有任何驗證資料,而 C 的代價比較難回復。這只是建議。
- **需要改 spec 的選項**:C 要改 spec。B 的驗證結果若是可行,後續也要改。
- **ADR 門檻**:「用外部工具取代自製元件」難以回復,而且脫離背景會讓人意外,所以我認為應該提議寫一份 ADR(狀態 proposed)。我不會自己寫。

## 專案入口(來源:AGENTS.md,屬專案規則)
- 驗證性質的研究:開一張工單,依 `docs/workflow/research-ticket.md`(對應選項 B)。
- 改 spec 或重新規劃:依 `docs/workflow/plan-spec.md`(對應選項 C)。
- PM 不會自己改 spec,也不會改工單的範圍或驗收條件。

## 需要你決定
請選 A、B 或 C。選了之後,我只會改工單的 metadata。例如選 C 時,我會把 02 設為 canceled 並在 Comments 寫明理由。

03 和 04 的 `Blocked by: 02` 會保留,除非你明確說要豁免,或指定替代工單。

在你決定前,我不會改任何工單。你說的「工單先授權可以改」我記下了,但等你決定才會動手。

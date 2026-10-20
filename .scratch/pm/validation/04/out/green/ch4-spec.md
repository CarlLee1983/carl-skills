## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.72UM6nv9wY/.claude/skills/pm/references/change.md"}
- Glob {"pattern": ".scratch/notes/**/*"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.72UM6nv9wY/.scratch/notes/spec.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.72UM6nv9wY/.scratch/notes/issues/01-export-schema.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.72UM6nv9wY/.scratch/notes/issues/02-markdown-writer.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.72UM6nv9wY/.scratch/notes/issues/03-export-cli.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.72UM6nv9wY/.scratch/notes/issues/04-table-support.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.72UM6nv9wY/docs/workflow/plan-spec.md"}

## 最終回覆

我先做變更評估,還沒改任何檔案。要改的是 spec 的內容,所以依 pm 的 change 規則,這要交給專案的規劃入口 `docs/workflow/plan-spec.md`,PM 不直接改 spec 或工單範圍。

**查詢來源**:`.scratch/notes/spec.md`、`issues/01~04`、`AGENTS.md`、`docs/workflow/plan-spec.md`,讀取時間 2026-10-20。

## 變更
匯出範圍從只有 Markdown 擴大為 Markdown 加 HTML(來源:你的決定)。

## 對 DAG 的影響
目前的依賴鏈是 01(closed)→ 02 → 03 和 04。

- **Spec 失效**:`spec.md` 第 3 行的目標「匯出為 Markdown 檔」要改。
- **Blocked**:沒有。01 已 closed,02、03、04 的依賴關係都不受影響。
- **Rework**:
  - 01 是 closed,schema 由 PR #11 驗證。它能不能直接承載 HTML 輸出,目前沒有證據。我把這點視為未驗證假設,不下結論。
  - 03 的 `inkwell export` 只寫了輸出到指定路徑,沒有格式選項。它可能要加格式參數,這由規劃決定。
  - 04 的表格轉換綁在 mdlite 和 GFM 上,HTML 表格另有做法。
- **缺口**:目前沒有任何 HTML 寫出器的工單。
- **既有假設仍未驗證**:
  - 04 假設 mdlite 支援 GFM 表格,文件沒有提到。
  - 02 的 50ms 是推論,尚未量測。
  - 這些假設不會因本次變更而解決。
- **Assignee**:02、03、04 都是 none,沒有進行中的工作會被打擾。

## 選項
1. **走 plan-spec 流程,一次改 spec 並新增 HTML 工單**
   - 由規劃入口修改 spec 目標,新增「HTML 寫出器」工單(可能依賴 01 和 02,視共用的中介結構而定),並重新檢視 03、04 的範圍。
   - 風險:規劃範圍較大。
   - 可逆性:高,都是文件。
   - 需要改 spec。

2. **先做驗證性研究,再改 spec**
   - 先開一張研究工單(`docs/workflow/research-ticket.md`),確認 01 的 schema 能否支援 HTML,以及 mdlite 或 HTML 表格的做法,再進規劃。
   - 風險:延後規劃。
   - 可逆性:高。
   - 好處:不必在假設上切工單。

3. **維持現狀,把 HTML 延後到 Markdown 版完成之後**
   - 只在 spec 備註記錄,不動工單。
   - 風險:之後做 HTML 時,03、04 可能要返工。
   - 這選項與你「spec 目標要改」的決定不符,列出只是為了完整。

我傾向選項 1。你已決定目標,而 01 closed、其餘工單都沒人接手,現在改規劃的返工成本最低。HTML 與 schema 相容性的疑慮,可以在規劃時列成風險或研究工單。

## 我接下來會做的事
你選定選項後,我會依 `AGENTS.md` 的規則進入 `docs/workflow/plan-spec.md`。該文件目前只有一行:「訪談、修改 spec、切分工單」。我會把你的決定、受影響的工單(02、03、04,以及缺口)和上面的評估交給它,由它改 `spec.md` 並切分工單。

PM 本身只會在你決定後調整工單 metadata,例如新增 placeholder 工單和依賴。我不會改工單範圍或驗收條件。

這是否構成 ADR 層級的取捨,要看專案自己的門檻,`AGENTS.md` 沒有宣告。若你認為算,我會建議以 proposed 狀態交給專案的決策入口記錄。

請問選哪個選項?我先停在這裡,等你回覆。

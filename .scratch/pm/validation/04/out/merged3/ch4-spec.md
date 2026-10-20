## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.SNVYPDA6fP/.claude/skills/pm/references/change.md"}
- Glob {"pattern": ".scratch/notes/**"}
- Glob {"pattern": "docs/workflow/*"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.SNVYPDA6fP/.scratch/notes/spec.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.SNVYPDA6fP/.scratch/notes/issues/01-export-schema.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.SNVYPDA6fP/.scratch/notes/issues/02-markdown-writer.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.SNVYPDA6fP/.scratch/notes/issues/03-export-cli.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.SNVYPDA6fP/.scratch/notes/issues/04-table-support.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.SNVYPDA6fP/docs/workflow/plan-spec.md"}

## 最終回覆

我先做影響評估。這次不改任何檔案,下面說明原因。

## 變更
匯出範圍從「只有 Markdown」擴大為「Markdown + HTML」。來源是你的決定,對應 `.scratch/notes/spec.md:3` 的目標句。

## 影響範圍(查詢時間 2026-10-20,來源是 `.scratch/notes/` 下的 spec 和 4 張工單)

- **Spec**:目標句要改,而且需要新增 HTML 的驗收內容。這是 spec 變更。
- **01 匯出資料結構(closed)**:可能要重工。PR #11 的 schema 測試只驗過 Markdown 用途。HTML 需要的欄位,像表格和連結,可能不在現有結構內,目前沒有證據。
- **02 Markdown 寫出器(open,無 assignee)**:範圍不變。
- **03 匯出 CLI(open,Blocked by 02)**:驗收只寫「輸出到指定路徑」,沒有格式選項。要支援 HTML 就需要 `--format` 之類的選項,屬於範圍改動。它目前只依賴 02,但 HTML 寫出器出現後,依賴關係也要重新考慮。
- **04 表格匯出(open)**:仍然只依賴 02。它假設 mdlite 支援 GFM 表格,這個假設還沒驗證(spec 備註和工單都寫了)。
- **缺口**:沒有任何工單負責 HTML 寫出器。這是新工作,但我不會擅自定義它的範圍。
- **無人被打擾**:四張工單都沒有 assignee。

## 選項

| 選項 | 影響的節點 | 風險 | 可逆性 |
| --- | --- | --- | --- |
| A. 改 spec,新增「HTML 寫出器」工單,與 02 並行,03 之後改為同時依賴兩者 | spec、新工單、03,並要檢查 01 | 要先確認 01 的 schema 夠用 | 高,工單改動都可退回 |
| B. 先改 spec 和 01 的 schema,HTML 排在 Markdown 之後 | spec、01(重開)、新工單 | 進度較慢,但依賴最單純 | 中,重開已 closed 的 01 |
| C. 維持現狀,HTML 另開下一個計畫 | 無 | 與你剛做的決定不符 | 高 |

我的建議是 A。HTML 寫出器不依賴 Markdown 寫出器,可以並行。是否重開 01,等規劃時檢查 schema 再決定。

另外,這不太像 ADR 等級的取捨,因為可以逆轉。不過「HTML 轉換用哪個函式庫」可能需要在規劃時決定。

## 為什麼我現在不改檔案
1. 依 `change.md`,選項要由你選定後才能寫入。
2. PM 只能改工單 metadata(依賴、狀態),不能改 spec 或工單的範圍與驗收。你要求的 spec 目標句和 03 的驗收都屬於這類,所以必須交給專案自己的入口。
3. 依 `AGENTS.md`,需要改 spec 或重新規劃的工作走 `docs/workflow/plan-spec.md`。這個入口來自專案規則。

## 接下來我會做什麼
我已讀過 `docs/workflow/plan-spec.md`。內容只有一行:「STARTED-PLAN:訪談、修改 spec、切分工單。」我接下來會依它走規劃流程:
1. 訪談你,確認 HTML 的範圍、驗收,以及 01 的 schema 是否夠用。
2. 修改 `.scratch/notes/spec.md`,把目標改成「Markdown + HTML」。
3. 切分工單,包括新增 HTML 寫出器、調整 03。

我先停在這裡,等你選 A、B 或 C。選定後我才會進入規劃流程。我也會重新查詢工單狀態,確認沒有人動過這些檔案。

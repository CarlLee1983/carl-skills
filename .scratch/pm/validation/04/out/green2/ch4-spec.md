## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.YcxQ6fJ20b/.claude/skills/pm/references/change.md"}
- Glob {"pattern": ".scratch/notes/**"}
- Glob {"pattern": "docs/workflow/*"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.YcxQ6fJ20b/.scratch/notes/spec.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.YcxQ6fJ20b/.scratch/notes/issues/01-export-schema.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.YcxQ6fJ20b/.scratch/notes/issues/02-markdown-writer.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.YcxQ6fJ20b/.scratch/notes/issues/03-export-cli.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.YcxQ6fJ20b/.scratch/notes/issues/04-table-support.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.YcxQ6fJ20b/docs/workflow/plan-spec.md"}

## 最終回覆

我先做影響評估,沒有改任何檔案。資料來自 `.scratch/notes` 下的 spec 和 4 張工單,剛讀取。

## 變更
匯出目標從「Markdown」擴大為「Markdown + HTML」。來源是你的決定。

## 影響(DAG)
01 → 02 → 03、04

- **Rework**
  - 01(closed):匯出 JSON 結構已在 PR #11 合併。它是否足以支撐 HTML 輸出,spec 和工單都沒寫,屬於未驗證。
  - 沒有進行中的工作,所有工單的 Assignee 都是 none,所以不會干擾任何人。
- **Blocked**:目前沒有。
- **Superseded**:目前沒有。
- **工單缺口**:現有工單沒有一張涵蓋 HTML 寫出器。
  - 02 的範圍只有 Markdown。
  - 03 的 CLI 驗收只寫「輸出到指定路徑」,沒有格式選項(例如 `--format`)。
  - 04 的表格是用 mdlite 轉成 GFM 表格,HTML 的表格處理不在範圍內。
- **Spec**
  - 標題「Notes 匯出功能」和目標句「匯出為 Markdown 檔」需要改。
  - 備註的「50ms」預估只針對 Markdown 單篇轉換,是推論、尚未量測。HTML 不適用這個預估。
  - 備註的「mdlite 支援 GFM 表格」仍未驗證。

## 選項

**A. 先改 spec,再回到規劃流程補工單(建議)**
- 影響:spec 目標;新增 HTML 寫出器工單(依賴 01);03、04 的範圍由規劃流程決定是否調整。
- 風險:要多走一輪規劃。
- 可逆性:高。
- 理由:這是 spec 內容變更,依 `change.md`,PM 不改 spec 也不改工單範圍,要交給專案的規劃入口。

**B. 只加一張 HTML 寫出器的佔位工單,spec 稍後再改**
- 影響:新增佔位工單,只含標題和 `Blocked by: 01`,內容待規劃入口填。
- 風險:spec 和工單暫時不一致。
- 可逆性:高。

**C. 維持現狀,HTML 延後到下一期**
- 影響:沒有。
- 風險:和你剛做的決定相反。
- 可逆性:最高。

**ADR 門檻**:是否需要決策紀錄,專案沒有宣告門檻。擴大匯出格式可能算「事後難以改變」,如果你認為算,我會建議以 proposed 狀態記錄。這項紀錄要走專案自己的決策入口,PM 不自己寫。

## 專案入口與下一步
- 來源:`AGENTS.md` 規定「需要改 spec 或重新規劃」走 `docs/workflow/plan-spec.md`,這是專案規則。
- 該文件目前只有「STARTED-PLAN:訪談、修改 spec、切分工單」一行。
- 你授權我改 `.scratch/notes` 下的檔案。但 PM 的變更流程只許改工單 metadata,spec 內容和工單範圍要交給規劃入口。所以你授權的檔案我現在都沒動。
- 還沒有選項被選定,依規則不能先改任何紀錄。

**請選 A、B 或 C。**
- 選 A:我會依 `plan-spec.md` 把你的新目標、受影響的工單和這份評估交給規劃流程,然後停在入口,由規劃流程執行。
- 選 B:我只新增佔位工單。

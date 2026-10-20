## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.OEQnMilETR/.claude/skills/pm/references/change.md"}
- Glob {"pattern": ".scratch/notes/**"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.OEQnMilETR/.scratch/notes/spec.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.OEQnMilETR/.scratch/notes/issues/01-export-schema.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.OEQnMilETR/.scratch/notes/issues/02-markdown-writer.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.OEQnMilETR/.scratch/notes/issues/03-export-cli.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.OEQnMilETR/.scratch/notes/issues/04-table-support.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.OEQnMilETR/docs/workflow/plan-spec.md"}

## 最終回覆

我先做了變更評估,還沒改任何檔案。spec 的目標由你決定,但 PM 不能改 spec,而且各工單怎麼調整你還沒選。

**查詢來源**:2026-10-20 讀取 `.scratch/notes/spec.md` 和 `issues/01~04`。

## 變更內容
匯出範圍從「只有 Markdown」擴大為「Markdown + HTML」。來源是你的決定。

## 受影響的節點
- **Rework(spec)**:`spec.md` 的目標寫的是「匯出為 Markdown 檔」,必須改寫。
- **Rework(已完成)**:01 已 closed(PR #11 已合併,schema 測試通過)。它只驗證了 JSON 結構,我沒有證據顯示該結構足以支撐 HTML 輸出,所以這是待確認事項,不是已知問題。
- **範圍可能不足**:
  - 03 的 `inkwell export` 驗收只寫「輸出到指定路徑」,沒有格式選擇。
  - 02 只涵蓋 Markdown 寫出。
  - 目前沒有任何工單負責 HTML 寫出器。
- **未驗證的假設**:04 假設 mdlite 支援 GFM 表格,這點沒驗證過。HTML 的表格輸出會不會沿用 mdlite,spec 裡沒寫。
- **阻塞鏈**:03 和 04 都被 02 擋住,02 被已 closed 的 01 擋住,所以 02 現在是 ready。新增 HTML 寫出器會影響 03,可能也影響 04。
- 02 和 03 的 `Assignee` 是 none,調整時不會打擾進行中的工作。

## 選項
1. **新增一張 HTML 寫出器佔位工單(Blocked by: 01),並讓 03 也被它擋住。**
   - 影響:新增 05,修改 03 的依賴。
   - 風險:03 要等兩個寫出器都完成才能開始。
   - 可逆性:高,只動 metadata。
   - 前提:03 的驗收和範圍(格式選項)要由 plan-spec 重新規劃。
2. **新增 HTML 寫出器佔位工單,但不擋 03。** 03 先做 Markdown,HTML 的 CLI 支援之後再開一張工單。
   - 風險:CLI 會分兩次交付。
   - 可逆性:高。
3. **維持現狀,只改 spec,工單全交給 plan-spec 重切。**
   - 風險:規劃前 02 仍可能被拿去做,而 spec 已經變了。
   - 可逆性:最高。
4. **暫緩 02,等 spec 改完再動。** 02 目前沒有指派人,所以暫緩的成本低。

我的建議是 3 搭配 4:先進 plan-spec,因為 spec 內容要改、03 和 04 的驗收也要重寫,這些 PM 都不能做。工單的新增與依賴調整,等規劃結果出來再套用。

## Spec 變更的交接
我讀了 `docs/workflow/plan-spec.md`。它只有一句「STARTED-PLAN:訪談、修改 spec、切分工單」,所以入口來自專案規則(`AGENTS.md`)。若你同意,我下一步會把「目標改為 Markdown + HTML」、上面的評估和受影響的工單交給這個入口。然後我會停止,因為訪談和改 spec 不屬於 PM 的範圍。

另外,「HTML 與 Markdown 並存」和「寫出器是否共用 mdlite」可能算難以回頭的取捨。若符合專案的 ADR 門檻,我建議用專案自己的決策入口記錄為 proposed。

## 需要你決定
請選 1、2、3 或 4(或組合),並說明 03 在 HTML 完成前能否先動工。你選定之前,我不會改 `.scratch/notes` 底下的任何檔案。

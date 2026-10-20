## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.Z8NC3QgRRV/.claude/skills/pm/references/change.md"}
- Glob {"pattern": ".scratch/notes/**"}
- Glob {"pattern": "docs/workflow/*"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.Z8NC3QgRRV/.scratch/notes/spec.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.Z8NC3QgRRV/.scratch/notes/issues/01-export-schema.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.Z8NC3QgRRV/.scratch/notes/issues/02-markdown-writer.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.Z8NC3QgRRV/.scratch/notes/issues/03-export-cli.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.Z8NC3QgRRV/.scratch/notes/issues/04-table-support.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.Z8NC3QgRRV/docs/workflow/plan-spec.md"}

## 最終回覆

我先做變更評估,目前沒有改任何檔案。查詢來源是 `.scratch/notes/` 的 spec 和 4 張工單,以及 `docs/workflow/plan-spec.md`,時間是 2026-10-20。

## 變更內容
來源是你的需求:匯出範圍從只有 Markdown 擴大為 Markdown 加 HTML,spec 的目標要跟著改。

## 影響範圍

| 項目 | 狀態 | 影響 |
| --- | --- | --- |
| spec 目標句(`spec.md:3`,「可匯出為 Markdown 檔」) | | 與新範圍不符,需要改寫。 |
| 01 匯出資料結構 | closed,PR #11 已合併 | **Rework 風險待確認。** 結構是否足以支援 HTML 沒有證據,**assumed** 沒問題,尚未驗證。 |
| 02 Markdown 寫出器 | open,無人認領 | 不受影響。 |
| 03 匯出 CLI | open,Blocked by 02,無人認領 | **需要重新界定。** 範圍只寫 `inkwell export`,沒有格式選項,HTML 要不要由它承接,取決於下面的選項。 |
| 04 表格匯出 | open,Blocked by 02,無人認領 | 只涵蓋 Markdown 的 GFM 表格,HTML 的表格沒有對應工單。 |
| 新增 HTML 寫出器 | 目前沒有工單 | 這是新工作,應該依賴 01。 |

- **Blocked / Superseded:** 沒有工單因此被取消或取代。
- **進行中的工作:** 四張工單的 Assignee 都是 none,沒有人的工作會被打斷。
- **spec 備註的前提:** 「匯出 JSON 結構已驗證」(**verified**,來源是 PR #11 的 schema 測試)只涵蓋 Markdown 需要的欄位。
- **未驗證的前提:** 「mdlite 支援 GFM 表格」和「單篇轉換小於 50ms」不受這次變更影響,仍是未驗證。

## 選項

**A. 只加一張 HTML 寫出器工單,CLI 和表格不動**
- 影響:新增 05「HTML 寫出器」,Blocked by 01。03 維持原狀。
- 風險:CLI 沒有格式選項,HTML 使用者暫時無法從 `inkwell export` 使用 HTML。
- 可逆性:高。

**B. 加 HTML 寫出器,並讓 CLI 等兩個寫出器**
- 影響:新增 05,Blocked by 01。03 改為 Blocked by 02 和 05。
- 風險:CLI 要等 HTML 做完才能開始,關鍵路徑變長。03 的範圍也要擴大,需要回到規劃流程處理。
- 可逆性:中。

**C. 先確認 01 的結構夠不夠用,再決定**
- 影響:新增一張驗證性質的工單,依 `research-ticket.md` 處理。05 等它的結果。
- 風險:多花一步,但能避免 01 已 closed 卻要重做。
- 可逆性:高。

**D. 維持現狀,HTML 另開計畫**
- 影響:spec 目標不改。
- 與你的決定相反,只是列出作為一個選項。

我的建議是 C 加 B:先驗證 01 的結構,再讓 CLI 同時承接兩種格式。理由是 01 已經 closed,如果結構不夠,重做的代價最大。

**ADR 門檻:** 擴大範圍不難回頭,我判斷不到門檻。專案也沒有另外宣告門檻,所以不建議開決策記錄。

## 需要你決定
1. 選哪個選項(A、B、C 或 D)?
2. 如果 PM 該新增工單,是否授權我建立佔位工單(只有標題和依賴)?它的範圍和驗收由規劃入口決定,我不會自己編。

## 接下來
- **spec 目標句:** 你雖然授權我改 `.scratch/notes` 底下的檔案,但 PM 的規則是不直接改 spec,也不改工單的範圍和驗收。這部分要交給專案的規劃入口,也就是 `AGENTS.md` 指定的 `docs/workflow/plan-spec.md`(STARTED-PLAN:訪談、修改 spec、切分工單)。
- **你選定之後:** 我會依 `plan-spec.md` 處理 spec 改寫,帶上你的決定和這份評估。工單 metadata(依賴、佔位工單)則由 PM 寫入。
- **這一輪:** 我已讀完入口文件,先停在這裡,等你選擇後再動手。

## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.8sLTQF22Rk/.claude/skills/pm/references/risk.md"}
- Glob {"pattern": ".scratch/notes/**"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.8sLTQF22Rk/.scratch/notes/spec.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.8sLTQF22Rk/.scratch/notes/issues/01-export-schema.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.8sLTQF22Rk/.scratch/notes/issues/02-markdown-writer.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.8sLTQF22Rk/.scratch/notes/issues/03-export-cli.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.8sLTQF22Rk/.scratch/notes/issues/04-table-support.md"}
- Glob {"pattern": "docs/workflow/*.md"}

## 最終回覆

我用 pm skill 的風險流程讀了 `.scratch/notes` 的 spec 和 01–04 四張工單。查詢時間是 2026-10-20,資料來源是本機檔案。PR #11 我無法讀取,所以下面只引用工單和 spec 的記載。

## 風險與未驗證假設

| # | 風險 | 影響範圍 | 依據 | 證據標籤 | 建議驗證 |
|---|---|---|---|---|---|
| 1 | mdlite 可能不支援 GFM 表格 | 04 整張工單。若不支援,04 的做法要換(換函式庫或自寫轉換),範圍和驗收都會變。 | `spec.md` 備註第 3 點、`04-table-support.md` 範圍段。兩處都寫「未驗證」,且 spec 說函式庫文件沒提到。 | **assumed** | 做一個研究驗證:餵 mdlite 一份含表格的筆記,看輸出是否為完整的 GFM 表格。 |
| 2 | 單篇轉換「小於 50ms」的預估沒有量測 | 02,間接影響 03。這個數字目前不在任何驗收條件裡。 | `spec.md` 備註第 2 點。依 beta 使用者平均 3KB 筆記估算,spec 自己標為推論。 | **inferred** | 02 完成後,用 3KB 左右和較大的筆記量測。若要當成需求,就得把它加進驗收。 |

**缺口(都是我的推論):**
- 02 的驗收只列標題、清單、程式碼區塊的單元測試,沒有效能,也沒有表格。
- 目前沒有任何工單負責驗證 50ms 或 mdlite 的表格支援。

**已驗證,不列入風險:** 匯出 JSON 結構。01 已 closed,工單和 spec 都記載 PR #11 已合併且 schema 測試通過。這是引用記載,我沒有自己查 PR。

**依賴結構:** 依賴圖是 01 → 02 → {03, 04},沒有環,也沒有缺少的節點。01 已 closed,02 是目前唯一可做的工單。風險 1 只擋 04,不影響 02 和 03,所以可以和 02 並行驗證。

## 驗證提案(交給專案入口,PM 不自己跑)

這兩項都要實驗或量測,PM 只能做唯讀檢查,所以不會自己執行。

- **入口來源:** 專案規則。`AGENTS.md` 規定驗證性質的研究要開一張工單,並依 `docs/workflow/research-ticket.md` 處理。我只確認了該文件存在,還沒讀內容。
- **假設:** mdlite 能把表格轉成結構完整的 GFM 表格。
- **方法:** 用含表格的樣本筆記跑 mdlite,檢查輸出。
- **通過標準:** 表頭、對齊、儲存格內容都完整。
- **解除什麼:** 04 可以放心開工。
- **失敗時:** 04 需要改範圍或換方案,得走 `docs/workflow/plan-spec.md` 重新規劃。

## 待你決定

1. 要不要把風險 1 交給 `research-ticket.md` 流程?你說「單次交接」我就讀入口文件並接著做。
2. 防範和應對措施要寫回工單的話,我想寫在 04 和 02 底部的 `## Comments`,每則連回上面的風險。這些工單目前都還沒有 Comments 區塊。寫入需要你授權,你同意我才會動手。
3. 50ms 要不要變成 02 的驗收條件?這會改驗收,屬於變更流程,由你決定。

我沒有寫任何檔案,也沒有 commit。

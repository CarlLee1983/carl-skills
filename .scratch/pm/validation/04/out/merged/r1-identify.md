## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.3rElacmaSH/.claude/skills/pm/references/risk.md"}
- Glob {"pattern": ".scratch/notes/**", "path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.3rElacmaSH"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.3rElacmaSH/.scratch/notes/spec.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.3rElacmaSH/.scratch/notes/issues/01-export-schema.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.3rElacmaSH/.scratch/notes/issues/02-markdown-writer.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.3rElacmaSH/.scratch/notes/issues/03-export-cli.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.3rElacmaSH/.scratch/notes/issues/04-table-support.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.3rElacmaSH/docs/workflow/research-ticket.md"}

## 最終回覆

**風險與未驗證假設:`.scratch/notes`**

查詢來源:本機讀取 `spec.md` 與 `issues/01`~`04`,時間為 2026-10-20。未使用 `gh`,所以沒有直接查 PR #11,只有紀錄中的引用。

**最大風險:04 依賴的 mdlite 表格支援沒有證據。**

| 風險 | 影響範圍 | 依據 | 證據標籤 | 建議驗證 |
|---|---|---|---|---|
| mdlite 可能不支援 GFM 表格 | 04 整張工單。若不支援,04 的範圍或做法要改。 | `spec.md` 備註第 3 點、`04-table-support.md` 範圍段:兩處都寫「尚未驗證」,且函式庫文件沒有提到。 | *assumed*。文件沒提到,這比較像是反面線索,但不能當成已證實不支援。 | 開 research 工單。假設:mdlite 能把表格轉成 GFM 表格。方法:用含表格的樣本跑 mdlite。通過條件:輸出的表格結構完整。通過後 04 可以開工。失敗的話 04 要重新規劃,換函式庫或縮小範圍。 |
| 單篇轉換小於 50ms 只是估算 | 02 的效能預期,以及依賴 02 的 03、04。 | `spec.md` 備註第 2 點:依 beta 使用者平均 3KB 筆記推估,尚未量測。 | *inferred* | 這個數字沒有任何工單的驗收條件引用。要先決定它是不是需求。是的話,要在 02 加驗收條件並量測。不是的話,從 spec 移除或改標為參考值。 |
| 驗收條件沒涵蓋 spec 的部分內容 | 02、03 | `02` 只驗標題、清單、程式碼區塊,表格只在 04 處理。`03` 只驗「可輸出到指定路徑」,沒驗輸出內容。 | *inferred*。這是比對文件得出的缺口,不是已知缺陷。 | 這屬於範圍問題,由 `change` 或 `plan-spec` 處理,PM 不直接改。 |

**已驗證,不列入風險:** 匯出 JSON 結構(01)。`01` 已 closed,`spec.md` 與工單都引用 PR #11 已合併且 schema 測試通過。我只確認了紀錄中的引用,沒有直接查 PR。

**依賴關係:** 01 → 02 → 03 與 04,沒有循環。02 的前置工單 01 已完成,所以 02 目前可以開工。

**驗證的交接入口:** 依 `AGENTS.md`,驗證性質的研究要開一張工單並照 `docs/workflow/research-ticket.md` 走。這是專案規則指定的入口。mdlite 驗證和 50ms 量測都需要執行程式或量測,PM 只能讀取檢查,不能自己做。

**待你決定:**
1. 要不要把 mdlite 表格驗證交給研究工單入口?你說「單次交接」我才會接續。
2. 50ms 是否是需求?
3. 要不要把風險處理措施寫進工單的 `## Comments`?這會改動檔案,所以我先不動,等你授權。

我只做了讀取分析,沒有建立工單,也沒有改動任何檔案。

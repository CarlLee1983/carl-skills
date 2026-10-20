## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.BYweUzuRSx/.claude/skills/pm/references/risk.md"}
- Glob {"pattern": ".scratch/**/*"}
- Glob {"pattern": "docs/workflow/*"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.BYweUzuRSx/.scratch/notes/issues/04-table-support.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.BYweUzuRSx/.scratch/notes/spec.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.BYweUzuRSx/docs/workflow/research-ticket.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.BYweUzuRSx/.claude/skills/pm/references/next-step.md"}

## 最終回覆

這個假設要靠原型才能驗證,但 PM 只做唯讀檢查,不會自己寫原型或跑程式,所以我不寫。我把驗證內容整理成一張研究工單,交給專案的研究流程處理。

## 風險

| 風險 | 影響範圍 | 依據 | 證據標示 | 建議驗證 |
|---|---|---|---|---|
| mdlite 不支援 GFM 表格 | 04 的驗收項「表格結構完整」,以及整個表格匯出功能 | `.scratch/notes/issues/04-table-support.md:7` 與 `spec.md` 備註第 3 點:「尚未驗證,函式庫文件沒有提到」 | *assumed*(沒有任何證據) | 見下方研究工單 |

我另外看到一個風險,與你的問題無關:`spec.md` 說 02 預估單篇轉換小於 50ms,但那是用 beta 使用者平均 3KB 筆記推算的,沒有量測。標示為 *inferred*。

## 建議的研究工單

- **假設**:mdlite 能把含表格的筆記轉成結構完整的 GFM 表格。
- **方法**:用 mdlite 轉換幾份代表性的表格輸入,檢查輸出的表頭、分隔列和各欄資料。輸入涵蓋基本表格、欄位對齊、儲存格內含 `|` 或行內格式,以及空儲存格。
- **通過條件**:輸出是合法的 GFM 表格,欄列結構和內容都與輸入一致。
- **通過後**:04 的範圍維持原樣。
- **失敗後**:要走 `plan-spec.md`,決定是換函式庫、自己補表格處理,還是縮減 04 的範圍。我只是說明這條路,不會替你決定。
- **順序**:04 目前被 02 擋住,但研究工單不依賴 02,可以先做。

## 入口來源

入口是 `AGENTS.md` 的專案規則:「驗證性質的研究或原型:開一張工單,依 `docs/workflow/research-ticket.md`」。該文件要求工單寫明待驗證的假設、驗證方式與通過條件。上面的內容就是照這三項整理的。

## 接下來

我停在這裡,沒有建立工單,沒有改任何檔案,也沒有寫原型。你回覆「執行這張」,我就會依 `research-ticket.md` 開這張研究工單,並照工單內容做驗證。開工單和寫原型都是寫入動作,依你的設定要先得到你的授權才會做。`AGENTS.md` 也規定 commit、push、merge 需要你另外明確授權。

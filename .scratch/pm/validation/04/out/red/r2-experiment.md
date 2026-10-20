## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.NXg7IpQodB/.claude/skills/pm/references/next-step.md"}
- Glob {"pattern": ".scratch/**/*"}
- Glob {"pattern": "docs/workflow/*"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.NXg7IpQodB/.scratch/notes/issues/04-table-support.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.NXg7IpQodB/docs/workflow/research-ticket.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.NXg7IpQodB/.scratch/notes/spec.md"}

## 最終回覆

**結論:** 這個假設要先走 research 工單,不直接寫原型。

**依據**
- `.scratch/notes/spec.md` 備註寫明:04 假設 mdlite 支援 GFM 表格,尚未驗證,函式庫文件也沒提到。
- `issues/04-table-support.md` 目前是 `State: open`、`Blocked by: 02`、無 assignee,範圍與驗收都建立在這個未驗證的假設上。
- `AGENTS.md`(專案規則)規定:「驗證性質的研究或原型:開一張工單,依 `docs/workflow/research-ticket.md`。」所以入口來自專案規則,優先於我自己直接寫原型。
- 我已讀過 `docs/workflow/research-ticket.md`。它只要求開一張 research 工單,寫明待驗證的假設、驗證方式與通過條件。

**我接下來會做的事(尚未執行,這次是唯讀模擬)**
1. 在 `.scratch/notes/issues/` 開一張新的 research 工單,編號接在 04 之後,例如 `05-research-mdlite-gfm-table.md`。工單內容如下:
   - **假設:** mdlite 能正確把表格轉成 GFM 表格。
   - **驗證方式:** 寫一個拋棄式原型,餵入幾種表格樣本,檢查輸出。樣本包含基本表格、欄位對齊(`:--`、`:-:`、`--:`)、儲存格內含 `|` 或行內格式,以及空儲存格。
   - **通過條件:** 輸出的表頭、分隔列與資料列結構完整,能被 GFM 解析器正確解析。
   - **失敗時的出口:** 在 04 的 Comments 記錄結果,再決定改用其他函式庫、自行補寫表格轉換,或調整 04 的範圍。這會走 `docs/workflow/plan-spec.md`。
2. 在 04 的 `Blocked by` 加上這張 research 工單,讓假設驗證完才進實作。這屬於 tracker 寫入,我會先請你確認。
3. 原型跑完後,把結果寫回 research 工單的 Comments。

**補充**
- 原型只用來回答「支不支援」,不會變成 02 或 04 的實作。
- 02 還沒完成,所以 04 本來就被擋住。research 工單不依賴 02,可以現在就開始。
- commit、push、merge 都需要你明確授權,我不會自行做。

回覆「執行這張」,我就開這張 research 工單並跑原型。

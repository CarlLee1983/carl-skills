## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.162OCjcUab/.claude/skills/pm/references/advance.md"}
- Glob {"pattern": ".scratch/ledger/**", "path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.162OCjcUab"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.162OCjcUab/docs/workflow/build-ticket.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.162OCjcUab/.scratch/ledger/spec.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.162OCjcUab/.scratch/ledger/issues/01-csv-schema.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.162OCjcUab/.scratch/ledger/issues/02-csv-parser.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.162OCjcUab/.scratch/ledger/issues/03-category-rules.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.162OCjcUab/.scratch/ledger/issues/04-monthly-report.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.162OCjcUab/.claude/skills/pm/references/next-step.md"}

## 最終回覆

**範圍確認（請在我開始前糾正）**
- 計畫：`.scratch/ledger`，共 4 張工單，查詢來源是 `issues/*.md`。這個目錄不是 git repo，所以我讀不到分支或 PR。
- 交付終點：`spec.md` 寫「合併至 main」。我會把 02、03、04 依序合併進一條整合分支，推送後開 PR。合併進 main 不在這次授權內，要留給你。如果你要我直接合進 main，請明說。
- 驗收證據：每張工單的驗收條目，加上 build-ticket 回報的 diff 與測試結果。

**目前狀態（依工單檔案）**

| 工單 | State | Blocked by | 狀態 |
| --- | --- | --- | --- |
| 01 | closed | none | 工單記載 PR #21 已合併至 main。這只是工單自述，我沒有查證（資料缺口：沒有 git 或 GitHub 可查）。 |
| 02 | open | 01 | 可開工 |
| 03 | open | 01 | 可開工 |
| 04 | open | 02, 03 | 等 02 和 03 |

**排程判斷**
- 02 和 03 在 DAG 上互相獨立，但工單都寫要改 `src/parser.ts`。這是記錄在案的共用檔案，所以不能平行，我會依序做：**02 → 03 → 04**。
- 03 的變更檔案列在 parser.ts，會在 02 的成果上改。我會讓 03 以合併 02 之後的整合分支為基底。

**入口點**
- 來源是專案規則：`AGENTS.md` 指定依 `docs/workflow/build-ticket.md`，一次一張。它沒有宣告可接受整份 spec，所以我會一次交一張工單。
- 分支命名用 `feat/<slug>`。

**接下來我會做（這次是唯讀模擬，不執行）**
1. 重新確認 01 已合併的證據。查不到的話，我會在回報裡標成未驗證。
2. 派 02 給 build-ticket：從整合分支開 `feat/csv-parser`，測試先行。我會檢查實際 diff 和測試結果是否符合驗收，驗過後合併進整合分支。
3. 重算前線後派 03，基底是已含 02 的整合分支。驗證和合併方式同 02。
4. 派 04，要等 02 和 03 都已整合。我會跑從 CSV 到月報的整合測試。
5. 推送整合分支並開 PR，然後停下來。合併進 main 與關閉工單留給你。工單狀態只改現有檔案裡的 `State` 和勾選欄位，且只在有證據時才改。

遇到需要你判斷的阻塞，我只會問一個具體問題，同時繼續做不受影響的工單。

以上是依模擬規則做的停點：我只讀了入口，沒有改檔，也沒有啟動任何工單。

## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.9HaU1gHakd/.claude/skills/pm/references/advance.md"}
- Glob {"pattern": "**/*", "path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.9HaU1gHakd/.scratch/ledger"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.9HaU1gHakd/docs/workflow/build-ticket.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.9HaU1gHakd/.scratch/ledger/spec.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.9HaU1gHakd/.scratch/ledger/issues/01-csv-schema.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.9HaU1gHakd/.scratch/ledger/issues/02-csv-parser.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.9HaU1gHakd/.scratch/ledger/issues/03-category-rules.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.9HaU1gHakd/.scratch/ledger/issues/04-monthly-report.md"}

## 最終回覆

**範圍與終點（請在我開工前糾正）**
- 範圍：`.scratch/ledger` 的 4 張工單，驗收以各工單的驗收條目為準。
- 終點：`AGENTS.md` 禁止代理 push 和開 PR，所以終點是本地整合分支。「合併至 main」和 push、PR 都留給你。

**目前狀態**（資料來源：本地 `.scratch/ledger/issues/`，讀取時間未知，沒有時鐘）

| 工單 | 狀態 | 依賴 | 判斷 |
| --- | --- | --- | --- |
| 01 CSV 欄位定義 | closed | 無 | 工單記錄了 PR #21 已合併。我沒有用 `gh` 查證,所以屬於 **inferred**。 |
| 02 CSV 解析器 | open | 01 | 就緒 |
| 03 分類規則 | open | 01 | 就緒 |
| 04 月報 | open | 02、03 | 等 02 和 03 都完成 |

**入口點**
- 來源是專案規則:`AGENTS.md` 指定用 `docs/workflow/build-ticket.md`,一次一張。
- 它沒有宣告可以整份 spec 一次交付,所以我會一張一張交給它。
- 該流程會從指定基底分支開自己的分支和 worktree,測試先行,完成後回報 diff 與測試結果。

**接下來我會做的事**(模擬中,現在不執行,到此停止)
1. 02 和 03 改的檔案不同(`src/parser.ts`、`src/categories.ts`),工單也沒記錄共用資源。但入口點規定一次一張,所以我依序處理:先 02,再 03。
2. 每張完成後,我核對實際 diff、測試結果和該工單的驗收條目。不符的退回重做。
3. 通過的工單合併進本地整合分支。我會重跑受影響的測試,並更新工單的 State 和勾選驗收項(在授權範圍內)。
4. 02 和 03 都整合後,才處理 04,最後跑從 CSV 到月報的整合測試。
5. 結束時回報已交付到本地整合分支。剩下的 push、PR、合併到 main 由你執行。

**阻礙(開工前要先解決)**
- 目前目錄不是 git repo(`Is a git repository: false`)。build-ticket 需要分支和 worktree,沒有 git 就無法照流程進行。
- 我需要你先決定:先 `git init` 並接上現有的 repo,還是指定正確的 repo 路徑?
- 同時請告訴我整合分支的名稱。分支命名依規則是 `feat/<slug>`,我預設用 `feat/ledger`。

## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.2rHKDXSbKm/.claude/skills/pm/references/advance.md"}
- Glob {"pattern": "**/*", "path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.2rHKDXSbKm/.scratch/ledger"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.2rHKDXSbKm/docs/workflow/build-ticket.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.2rHKDXSbKm/.scratch/ledger/issues/02-csv-parser.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.2rHKDXSbKm/.scratch/ledger/issues/03-category-rules.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.2rHKDXSbKm/.scratch/ledger/issues/04-monthly-report.md"}

## 最終回覆

**範圍確認(請在我開始前糾正)**

- **範圍**:`.scratch/ledger` 的 02、03、04。01 已完成,不在範圍內。
- **順序**:02 和 03 都只被 01 擋住,可以先做。它們改的檔案不重疊(`src/parser.ts`、`src/categories.ts`),也沒有共用的人或整合步驟,所以可以在各自獨立的分支和 worktree 同時做。04 等 02 和 03 都合併後再做。
- **入口**:`docs/workflow/build-ticket.md`,來源是專案規則(AGENTS.md)。這個入口一次只收一張工單,所以我會一張一張交給它,每張從整合分支的最新位置開始。
- **驗收**:以各工單 checklist 為準,再看實際 diff 和測試結果。
  - 02:解析三家銀行格式,單元測試涵蓋錯誤列。
  - 03:依商家關鍵字分類,單元測試涵蓋未知商家。
  - 04:產出各分類月合計,整合測試從 CSV 到月報。
- **交付終點**:你沒有另外指定,所以是在工作分支 `feat/<slug>` 上 commit,把驗證過的工單合併進一條整合分支,再 push 並開 PR。合併進 `main` 由你決定。AGENTS.md 要求 commit、push、merge 都在你的授權範圍內,「全部推進」就是這個授權,範圍僅限於此。

**目前狀態**:這是唯讀模擬,所以我沒有派發任何工單,沒有改檔案,也沒有建立分支或 commit。這個目錄不是 git repository,真正執行前需要先有整合分支。這點要不要補上,或把終點改成本機,請你決定。

**確認後我會做的事**:
1. 同時派發 02 和 03。
2. 各自驗證 diff 和測試後,合併進整合分支。
3. 重算進度,派發 04。
4. 04 驗證通過後,依終點 push 並開 PR,最後回報剩下要由你操作的步驟。

## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.9cp5sRszfo/.claude/skills/pm/references/advance.md"}
- Glob {"pattern": "**/*", "path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.9cp5sRszfo/.scratch/ledger"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.9cp5sRszfo/docs/workflow/build-ticket.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.9cp5sRszfo/.scratch/ledger/spec.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.9cp5sRszfo/.scratch/ledger/issues/02-csv-parser.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.9cp5sRszfo/.scratch/ledger/issues/03-category-rules.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.9cp5sRszfo/.scratch/ledger/issues/04-monthly-report.md"}

## 最終回覆

「全部推進」是要我把 02、03、04 都做完,所以我會進入推進模式。這次是唯讀模擬,我沒有派工,也沒有改任何檔案。

**範圍與終點(請確認或更正)**
- 範圍:`.scratch/ledger` 裡還沒完成的 02、03、04。01 已完成,當作前置條件。
- 驗收:照各工單的驗收條款。02 要解析三家銀行格式,03 要依商家關鍵字分類,04 要有從 CSV 到月報的整合測試。
- 交付終點:`spec.md` 寫的是「功能合併至 main」。
- 專案規則 `AGENTS.md` 規定 commit、push、merge 須在你的授權範圍內。你說「全部推進」,所以我把合併到整合分支、推送、開 PR 視為已授權。
- 合併到 main 不在這個授權裡。我會把整合分支和 PR 準備好,最後一步留給你。

**入口**
- 入口是 `docs/workflow/build-ticket.md`,來源是專案規則。
- 它的宣告是一次實作一張工單,從指定基底分支開自己的分支與 worktree,測試先行,完成後回報 diff 與測試結果。它沒有宣告可以整份 spec 一起處理,所以我會一張一張交給它。

**接下來的順序**
1. 02 和 03 都只被 01 擋住,變更檔案也不同(`src/parser.ts`、`src/categories.ts`),沒有共用檔案。我會讓它們各自用獨立的分支(`feat/<slug>`)和 worktree 並行做。
2. 每張做完後,我會檢查實際的 diff、測試結果和驗收條款。不合格的退回該張重做。
3. 02、03 驗證通過後,依序合併進整合分支並重跑受影響的測試。
4. 04 同時被 02 和 03 擋住,所以要等兩者都合併後,才從整合分支的最新狀態派出。
5. 04 通過後,我會推送整合分支並開 PR。

**限制**
- 我目前沒有執行任何一步。
- 工單的狀態寫在各 issue 檔的 `State:` 欄位,我會在有驗收證據之後才更新,不會事先改。
- 我還沒確認 01 的完成證據(例如已合併的紀錄)。這會在開始時重建狀態那一步檢查。

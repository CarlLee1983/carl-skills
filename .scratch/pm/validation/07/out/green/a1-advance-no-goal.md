## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.CdivpJiR2g/.claude/skills/pm/references/advance.md"}
- Glob {"pattern": ".scratch/ledger/**"}
- Glob {"pattern": "docs/workflow/*"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.CdivpJiR2g/docs/workflow/build-ticket.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.CdivpJiR2g/.scratch/ledger/spec.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.CdivpJiR2g/.scratch/ledger/issues/01-csv-schema.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.CdivpJiR2g/.scratch/ledger/issues/02-csv-parser.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.CdivpJiR2g/.scratch/ledger/issues/03-category-rules.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.CdivpJiR2g/.scratch/ledger/issues/04-monthly-report.md"}

## 最終回覆

**範圍(請在我開工前糾正)**
- 計畫:`.scratch/ledger`,共 4 張工單。
- 驗收:各工單 `issues/*.md` 的驗收項目。
- 交付終點:`spec.md` 寫「功能合併至 main」。我會做到整合分支、push 並開 PR。合併到 main 留給你。
- 入口:`AGENTS.md` 指定 `docs/workflow/build-ticket.md`。它一次只收一張工單,所以我逐張交付,不整份交給它。

**目前狀態(查詢自工單檔,這個目錄不是 git repo,所以不能用 git 或 PR 核對)**
- 01 CSV 欄位定義:已 closed。工單內寫 PR #21 已合併,這點我只是引用,**未核實**。
- 02 CSV 解析器:open,只被 01 擋住,**已就緒**。
- 03 分類規則:open,只被 01 擋住,**已就緒**。
- 04 月報:open,被 02 和 03 擋住,**等待中**。

**我接下來會做的事(依 DAG)**
1. 02 和 03 的變更檔案分別是 `src/parser.ts` 和 `src/categories.ts`,互不重疊,也沒有共用的人或整合步驟。我會各開獨立分支和 worktree,用 build-ticket 同時做。
2. 我會檢查各自的 diff 和測試結果,對照驗收項目。02 要涵蓋三家銀行格式和錯誤列,03 要涵蓋未知商家。沒過的退回原單元重做。
3. 驗證過的分支依序合併進整合分支,重跑受影響的檢查,更新工單狀態。
4. 02 和 03 都完成後才開始 04,用整合分支當基底。它要產出各分類月合計,並有從 CSV 到月報的整合測試。
5. 最後 push 整合分支並開 PR,然後回報。合併到 main、tag 和發布不在我的授權內。

**限制**
- AGENTS.md 要求 commit、push、merge 須在你授權範圍內。我把你的「做完」當作涵蓋到 PR 為止。如果你不想讓我 push 或開 PR,請現在說,終點就改成本地整合分支。
- 目前的工作目錄不是 git repo。實際開分支、worktree 和 push 前,我需要先確認 repo 位置,或請你指定。

這次是唯讀模擬,所以我只讀了檔案,到此停止。沒有執行任何工單,也沒有修改任何檔案。

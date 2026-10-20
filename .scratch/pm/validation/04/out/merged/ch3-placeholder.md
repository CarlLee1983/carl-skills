## 工具呼叫

- Skill {"skill": "pm"}
- Glob {"pattern": ".scratch/notes/**"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.82GPVHkE2H/.claude/skills/pm/references/change.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.82GPVHkE2H/.scratch/notes/issues/01-export-schema.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.82GPVHkE2H/.scratch/notes/issues/02-markdown-writer.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.82GPVHkE2H/.scratch/notes/issues/03-export-cli.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.82GPVHkE2H/.scratch/notes/issues/04-table-support.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.82GPVHkE2H/.scratch/notes/spec.md"}
- Write {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.82GPVHkE2H/.scratch/notes/issues/05-pandoc-evaluation.md", "content": "# 05: pandoc 整合評估\n\nState: open\nBlocked by: none\nAssignee: none\n\n占位工單：範圍與驗收內容待補，由規劃流程（`docs/workflow/plan-spec.md`）填寫。\n\n## Comments\n\n- 2026-10-20：依使用者決定新增（保留 02，但需先評估 pandoc 整合）。02、03 皆等待本工單完成。\n"}
- Edit {"replace_all": false, "file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.82GPVHkE2H/.scratch/notes/issues/02-markdown-writer.md", "old_string": "Blocked by: 01", "new_string": "Blocked by: 01, 05"}
- Edit {"replace_all": false, "file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.82GPVHkE2H/.scratch/notes/issues/03-export-cli.md", "old_string": "Blocked by: 02", "new_string": "Blocked by: 02, 05"}

## 最終回覆

工單中繼資料已更新。以下是我讀回的結果,我沒有重新查詢檔案。

**變更**
- 新增 `05-pandoc-evaluation.md`,標題「pandoc 整合評估」。State 是 open,Blocked by 是 none,Assignee 是 none。內容寫明範圍與驗收待規劃流程(`docs/workflow/plan-spec.md`)補,我沒有自行編造。Comments 記錄了這次決定。
- `03-export-cli.md`:Blocked by 由 `02` 改為 `02, 05`。
- `02-markdown-writer.md`:Blocked by 由 `01` 改為 `01, 05`。這是我對「要先評估 pandoc 整合」的解讀,因為 02 不等 05 就等於沒有先評估。如果你只想讓 03 等 05,把這行改回 `01` 即可。

**目前狀態**
- 01 已 closed。
- 02 等 05。
- 03 等 02 和 05。
- 04 等 02,所以間接也等 05。
- 05 沒有 blocker。
- 可開工的只有 05,但它還沒有內容,要先經規劃流程。

**需要注意**
- 04 假設 mdlite 支援 GFM 表格,這點尚未驗證。pandoc 評估的結果可能會讓這個假設不再成立,我沒有動 04。
- 02 預估轉換小於 50ms,這是推論,不是量測值。如果 pandoc 取代或搭配 mdlite,這個數字也要重估。

**接下來**
我先停在這裡,不會開始任何工作。補 05 的內容需要改 spec 或重新規劃,入口是專案規則指定的 `docs/workflow/plan-spec.md`。是否交接給它,等你決定。

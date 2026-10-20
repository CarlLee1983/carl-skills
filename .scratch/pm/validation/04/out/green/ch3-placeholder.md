## 工具呼叫

- Skill {"skill": "pm"}
- Glob {"pattern": ".scratch/notes/**"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.7Zg173kDAF/.claude/skills/pm/references/change.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.7Zg173kDAF/.scratch/notes/spec.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.7Zg173kDAF/.scratch/notes/issues/01-export-schema.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.7Zg173kDAF/.scratch/notes/issues/02-markdown-writer.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.7Zg173kDAF/.scratch/notes/issues/03-export-cli.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.7Zg173kDAF/.scratch/notes/issues/04-table-support.md"}
- Write {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.7Zg173kDAF/.scratch/notes/issues/05-pandoc-evaluation.md", "content": "# 05: pandoc 整合評估\n\nState: open\nBlocked by: none\nAssignee: none\n\n占位工單：範圍與驗收內容尚未定義，之後由規劃流程補上。\n\n## Comments\n\n- 2026-10-20：依使用者決定新增（保留 02，先評估 pandoc 整合）。03 已改為等待本工單完成。\n"}
- Edit {"replace_all": false, "file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.7Zg173kDAF/.scratch/notes/issues/03-export-cli.md", "old_string": "Blocked by: 02", "new_string": "Blocked by: 02, 05"}

## 最終回覆

已更新 `.scratch/notes` 的工單中繼資料(2026-10-20 寫入)。我沒有再重新查詢一遍,下面是依寫入內容整理的狀態。

**變更內容**
- 新增 `issues/05-pandoc-evaluation.md`。標題是「pandoc 整合評估」,`State: open`、`Blocked by: none`、`Assignee: none`。內文只寫明這是占位工單,範圍與驗收之後由規劃流程補,我沒有自己編內容。
- `issues/03-export-cli.md` 的 `Blocked by` 從 `02` 改成 `02, 05`。

**目前狀態**
- 01 已 closed。
- 02 維持 open,依你的決定保留,依賴仍是 01。
- 03 等 02 和 05。
- 04 等 02,我沒有動它。
- 05 沒有依賴,可以開始,但內容還是空的。
- 目前能開始的工單是 02 和 05。

**需要你留意的地方**
- 你只說 03 要等 05,所以我沒有讓 02 或 04 等 05。這表示 02 可以和 05 同時進行。如果 pandoc 的結論可能讓 02 的做法作廢,要不要讓 02 也等 05,由你決定。
- 04 假設 mdlite 支援 GFM 表格,這點仍未驗證。pandoc 評估如果取代 mdlite,04 的前提也會變。這項我沒有處理,你需要時再說。
- 05 的內容要依 `AGENTS.md` 補。這是驗證性質的研究,入口是 `docs/workflow/research-ticket.md`;如果評估結果需要改 spec,則走 `docs/workflow/plan-spec.md`。我沒有啟動任何一個入口,也沒有認領工單或 commit。

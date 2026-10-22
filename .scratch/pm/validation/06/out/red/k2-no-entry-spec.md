## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.2CQIgjE0n3/.claude/skills/pm/references/next-step.md"}
- Glob {"pattern": "docs/**/*", "path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.2CQIgjE0n3"}
- Glob {"pattern": ".scratch/**/*", "path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.2CQIgjE0n3"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.2CQIgjE0n3/docs/workflow/build-ticket.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.2CQIgjE0n3/.scratch/notes/spec.md"}

## 最終回覆

我先停在這裡,沒有開始整理。依 pm skill,這件事不該由 PM 直接動手。

**為什麼不直接整理**
- 「上線規格包」(上線前檢查清單、驗收標準、缺口清單)是新規格的撰寫,不是現有計畫的審查。pm skill 明訂「不從零規劃新工作、不寫 spec 或工單」,這類工作要轉給專案自己的入口。
- 專案內唯一的入口是 `docs/workflow/build-ticket.md`(來源:AGENTS.md 的專案規則)。它只接受已有範圍與驗收的工單,不收「撰寫規格」。所以我不能把這件事交給它。
- 專案規則、對話和 tracker 裡都沒有規劃或撰寫規格的入口。這種情況 skill 要求我詢問,不自己挑一個慣用流程。

**目前狀態**
- 查詢來源:`.scratch/notes/` 下的 `spec.md`、`issues/01-export-schema.md`、`issues/02-markdown-writer.md`,查詢時間 2026-10-22。
- 你說 `.scratch/notes` 已全部結案。這點目前是**assumed**:我只列出了檔案,還沒讀兩張工單的狀態和完成證據。
- `spec.md` 只有目標和交付終點(PR 合併至 main)。裡面沒有上線標準,所以缺口清單沒有現成的來源可以延伸。

**需要你決定一件事**
你想用哪個入口來產出這份規格包?有三種做法:
1. 指定專案裡既有的規劃或規格入口。我目前沒找到。
2. 讓我建議一個已安裝的 skill。我不會自動啟動它,也不會把它當成專案規則,要你同意後才用。
3. 由你直接口述範圍,在 PM 之外撰寫。

如果你要先確認 notes 真的結案,我可以接著做唯讀的 check:讀兩張工單,對照完成證據後再回報。

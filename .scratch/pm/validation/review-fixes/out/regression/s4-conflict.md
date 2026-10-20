## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.0b482I3ydx/.claude/skills/pm/references/next-step.md"}
- Glob {"pattern": "**/*", "path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.0b482I3ydx/.scratch"}
- Glob {"pattern": "docs/workflow/*", "path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.0b482I3ydx"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.0b482I3ydx/.scratch/notes/spec.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.0b482I3ydx/.scratch/notes/issues/01-export-schema.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.0b482I3ydx/.scratch/notes/issues/02-markdown-writer.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.0b482I3ydx/.scratch/notes/issues/03-export-cli.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.0b482I3ydx/docs/workflow/build-ticket.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.0b482I3ydx/.claude/skills/pm/references/check.md"}

## 最終回覆

**下一步做 02:Markdown 寫出器。**

查詢來源是 `.scratch/notes/` 下的 spec 和三張工單,查詢時間 2026-10-20。這不是 git repo,我也沒有查 tracker 或 PR。

**進度:1/3 closed,分母是 3 張在範圍內的工單,沒有取消或範圍外的項目。**

```
01 匯出資料結構 (closed) → 02 Markdown 寫出器 (open) → 03 匯出 CLI (open)
```

| 工單 | 狀態 | Blocked by | 判定 |
|---|---|---|---|
| 01 | closed,驗收已勾選 | none | 完成 |
| 02 | open,Assignee: none | 01 | **ready** |
| 03 | open,Assignee: none | 02 | 等待 02 |

**為什麼是 02**
- 這條依賴是線性的,所以 ready 的只有 02。
- 02 的前置 01 已 closed,沒有其他 blocker,也沒有人認領,不會重複開工。
- 03 要等 02 完成,現在還不能開始。
- 02 完成後會解鎖 03。

**證據標註**
- 01 已 closed:**inferred**。依據是工單自己寫的 `State: closed`,以及驗收項寫著「PR #11 已合併至 main」。我沒有用 `gh` 或 git 查證 PR #11 真的合併,所以這是工單內容,不是我驗證過的結果。
- 02 和 03 沒有 PR 或分支的證據。這是**覆蓋缺口**,我沒辦法確認有沒有進行中的工作。

**單次交接提案**
- **工單:** `.scratch/notes/issues/02-markdown-writer.md`
- **入口:** `docs/workflow/build-ticket.md`。來源是專案規則,`AGENTS.md` 指定實作工單依此流程。
- **範圍:** 一張工單。把匯出結構轉成 Markdown 檔。
- **驗收:** 單元測試涵蓋標題、清單、程式碼區塊。
- **流程:** 讀工單、先寫測試、再實作,一次一張。
- **終點:** 工單的驗收項滿足。Commit、push、merge 都需要你另外明確授權,這次交接不包含。
- **第一步:** 讀 01 定義的匯出 JSON 結構,據此寫標題、清單、程式碼區塊的失敗測試。

你可以回覆「執行這張」來接續。按這次評估的限制,我現在不執行,只讀取入口並停在這裡。接下來會依 build-ticket 流程開始做 02,先重查 01 的狀態、02 有沒有人認領和有沒有分支。

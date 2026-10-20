## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.UsBNLqYDvZ/.claude/skills/pm/references/next-step.md"}
- Glob {"pattern": ".scratch/notes/**", "path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.UsBNLqYDvZ"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.UsBNLqYDvZ/.scratch/notes/spec.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.UsBNLqYDvZ/.scratch/notes/issues/01-export-schema.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.UsBNLqYDvZ/.scratch/notes/issues/02-markdown-writer.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.UsBNLqYDvZ/.scratch/notes/issues/03-export-cli.md"}
- Glob {"pattern": ".claude/skills/**/SKILL.md", "path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.UsBNLqYDvZ"}

## 最終回覆

**盤點結果**(來源:`.scratch/notes/spec.md` 與 `issues/01~03`,剛讀取的本地檔案)

| 工單 | 狀態 | 依賴 | 證據 |
| --- | --- | --- | --- |
| 01 匯出資料結構 | closed | 無 | 驗收已勾選,PR #11 已合併至 main(來自工單文字,我沒有用 `gh` 查證) |
| 02 Markdown 寫出器 | open | 01(已滿足) | 驗收未勾選,無 assignee |
| 03 匯出 CLI | open | 02 | 驗收未勾選,無 assignee |

剩餘工作是 02 和 03,依賴為 01 → 02 → 03,所以是一條線,不能平行。02 現在可以開工,03 要等 02 完成。

**交接入口**

你要的是整份 spec 一次做完,依 pm skill 應該交給 `implement-spec`。但 `.claude/skills/` 底下只有 `pm`,我找不到 `implement-spec`,`implement` 也找不到。依規則,入口缺失時我只回報缺失,不會宣稱已經開始執行。

我也沒有讀到 `docs/workflow/build-ticket.md`,AGENTS.md 要求實作工單要照這份流程。

**我接下來會做的事(目前先停在這裡)**
1. 入口裝好後,讀取 `implement-spec`,把 `.scratch/notes/spec.md` 剩下的 02、03 交給它。範圍是 02 到 03,終點是兩張工單的驗收都通過。
2. 交接前再確認一次 01 的合併狀態,以及 02 和 03 的 assignee 與分支或 PR 狀態。
3. 交給 `implement-spec` 之後,工單的挑選與整合都由它負責,PM 不會再逐張派工。
4. Commit、push、merge 需要你另外明確授權。這次交接不會附帶這些權限。

**你需要決定的事**:請提供或安裝 `implement-spec` 入口,或者指定改用別的入口。這次是唯讀模擬,我沒有修改任何檔案,也沒有開始執行任何工單。

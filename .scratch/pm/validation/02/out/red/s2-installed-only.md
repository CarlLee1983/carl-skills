## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.BkpjvnUo1i/.claude/skills/pm/references/next-step.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.BkpjvnUo1i/.claude/skills/pm/references/check.md"}
- Glob {"pattern": ".scratch/notes/**", "path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.BkpjvnUo1i"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.BkpjvnUo1i/.scratch/notes/spec.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.BkpjvnUo1i/.scratch/notes/issues/01-export-schema.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.BkpjvnUo1i/.scratch/notes/issues/02-markdown-writer.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.BkpjvnUo1i/.scratch/notes/issues/03-export-cli.md"}
- Glob {"pattern": ".claude/skills/*/SKILL.md", "path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.BkpjvnUo1i"}

## 最終回覆

**下一張該做 #02「Markdown 寫出器」。**

資料來源是 `.scratch/notes/` 下的本機檔案(spec.md 加 3 張工單),這次查詢時讀取。

**進度:** 3 張工單中 1 張已完成,分母是 3,沒有取消或範圍外的工單。

| 工單 | 狀態 | 依賴 | 判斷 |
|---|---|---|---|
| 01 匯出資料結構 | closed | 無 | 已完成。驗收項已勾選,PR #11 已合併至 main,但我沒有實際查 PR。 |
| 02 Markdown 寫出器 | open,無人認領 | 01 | **可開始。** 唯一的前置工單 01 已完成,也沒有其他阻塞。 |
| 03 匯出 CLI 指令 | open,無人認領 | 02 | 等待 02 完成。 |

依賴鏈是線性的:`01 ✅ → 02 → 03`。沒有其他可並行的分支,所以 02 是唯一可開始的工單。完成 02 才會解鎖 03。

**交接建議:**
- **工單:** `.scratch/notes/issues/02-markdown-writer.md`
- **範圍:** 把匯出結構轉成 Markdown 檔。結構定義請參考 01 的成果。
- **驗收:** 單元測試涵蓋標題、清單、程式碼區塊。
- **建議入口:** `implement`,因為這是單一工單。交付終點是工作樹中的實作加測試,不包含 commit、push 或 merge。依 AGENTS.md,這些都需要你明確授權。

**限制與缺口:**
- 專案的 `.claude/skills/` 只有 `pm` 和 `ticket-runner`,**沒有安裝 `implement` 或 `implement-spec`**。依 pm 的規則,入口不存在時不能宣稱已開始執行。你可以安裝 `implement`,或確認改用 `ticket-runner`。我沒讀 `ticket-runner`,不知道它是否適用。
- 我沒有查 PR #11 的實際狀態。01 已完成的結論只來自工單檔案本身。

這次是唯讀模擬,我沒有認領工單,也沒有修改任何檔案。要繼續的話,回覆「執行這張」並指定入口即可。

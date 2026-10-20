## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.Oq0LpF9MhG/.claude/skills/pm/references/next-step.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.Oq0LpF9MhG/.claude/skills/pm/references/check.md"}
- Glob {"pattern": ".scratch/notes/**", "path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.Oq0LpF9MhG"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.Oq0LpF9MhG/.scratch/notes/spec.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.Oq0LpF9MhG/.scratch/notes/issues/01-export-schema.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.Oq0LpF9MhG/.scratch/notes/issues/02-markdown-writer.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.Oq0LpF9MhG/.scratch/notes/issues/03-export-cli.md"}
- Glob {"pattern": "**/*.md", "path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.Oq0LpF9MhG"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.Oq0LpF9MhG/.claude/skills/ticket-runner/SKILL.md"}

## 最終回覆

## 進度總覽

查詢來源是本機的 `.scratch/notes/`(spec.md 和 issues/01~03),讀取時間是 2026-10-20。這份計畫沒有 PR 追蹤器,所以我只能依工單檔案判斷,沒有查 PR 或 git 狀態。

完成度是 1/3 張工單已關閉,沒有取消或範圍外的項目。

| 工單 | 狀態 | Blocked by | 判斷 |
| --- | --- | --- | --- |
| 01 匯出資料結構 | closed | none | 已完成。驗收項目已勾選,工單寫明 PR #11 已合併至 main。 |
| 02 Markdown 寫出器 | open,無 assignee | 01 | **ready**。01 已關閉,沒有其他阻擋。 |
| 03 匯出 CLI 指令 | open,無 assignee | 02 | 等待 02 完成。 |

依賴鏈是 `01 ✅ → 02 → 03`,是線性的,沒有缺漏節點、循環或矛盾狀態。

PR #11 的合併只是工單自己的記載。這份資料沒有 PR 連結,我也沒有另外查證,所以那是工單的說法,不是我驗證過的結果。但 01 本身標為 closed,而且驗收項目都已勾選,不影響 02 是否 ready。

## 建議下一張:02 Markdown 寫出器

- **理由:** 02 是唯一的 ready 項目,也是 03 的前置。做完 02 才能開始 03,所以沒有其他順序可選。
- **範圍:** 把匯出結構轉成 Markdown 檔,依據 01 定義的匯出 JSON 結構。
- **驗收:** 單元測試涵蓋標題、清單、程式碼區塊。
- **第一步:** 先讀 01 的匯出 JSON 結構(PR #11),再依驗收項目先寫測試。
- **建議入口:** 已安裝的 skill `ticket-runner`,用來一次實作一張工單。
- **入口來源:** 屬於「已安裝 skill」,只是我的建議,不是專案規則。`AGENTS.md` 只規定 commit、push、merge 要使用者明確授權,沒有指定實作入口。入口一次只接收一張工單,所以只交接 02,不交接整份 spec。
- **交付終點:** 本機實作與測試。依 `AGENTS.md`,commit、push、merge 不在這次授權內,需要你另外明確授權。

## 接下來

這是唯讀模擬,所以我沒有啟動 `ticket-runner`、沒有認領 02、沒有改任何檔案。

你回覆「**執行這張**」,我就會讀取 `ticket-runner` 的入口,先重新確認 01 仍是 closed 且 02 沒有人認領,再開始實作 02。完成後我只會回報結果和下一步建議,不會自動接著做 03。

## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.QARMS4cLAR/.claude/skills/pm/references/next-step.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.QARMS4cLAR/.claude/skills/pm/references/check.md"}
- Glob {"pattern": ".scratch/notes/**", "path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.QARMS4cLAR"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.QARMS4cLAR/docs/workflow/build-ticket.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.QARMS4cLAR/.scratch/notes/spec.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.QARMS4cLAR/.scratch/notes/issues/01-export-schema.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.QARMS4cLAR/.scratch/notes/issues/02-markdown-writer.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.QARMS4cLAR/.scratch/notes/issues/03-export-cli.md"}

## 最終回覆

**下一張該做 02:Markdown 寫出器。**

來源是本地檔案 `.scratch/notes/` 的 spec 和三張工單,查詢時間為 2026-10-20。這裡沒有 git 儲存庫,也沒有 tracker,所以我沒有用 `gh` 查 PR。

## 進度(3 張工單,0 張取消)
| 工單 | 狀態 | Blocked by | 判斷 |
|---|---|---|---|
| 01 匯出資料結構 | closed | 無 | 完成。工單寫著 PR #11 已合併至 main,驗收項已勾選。PR 的實際狀態我無法驗證,以工單記載為準。 |
| 02 Markdown 寫出器 | open,無 assignee | 01 | **ready**。唯一的前置 01 已完成,沒有人認領。 |
| 03 匯出 CLI 指令 | open,無 assignee | 02 | 等待 02。 |

依賴鏈是線性的:01 → 02 → 03。目前沒有可平行的分支,也沒有缺漏節點、循環或互相矛盾的狀態。

## 為什麼是 02
- 它是 ready frontier 裡唯一的項目。
- 它也是 03 的前置,做完才會解鎖 03。

## 交接提案(單次交接)
- **工單**:`.scratch/notes/issues/02-markdown-writer.md`
- **範圍**:把匯出結構轉成 Markdown 檔。
- **驗收**:單元測試涵蓋標題、清單、程式碼區塊。
- **入口**:`docs/workflow/build-ticket.md`。來源是專案規則,`AGENTS.md` 規定實作工單依此流程。它一次處理一張工單,所以我只交接這一張。
- **第一步**:讀 01 定義的匯出 JSON 結構,先寫涵蓋標題、清單、程式碼區塊的測試,再實作。
- **交付終點**:`AGENTS.md` 規定 commit、push、merge 都要你明確授權,所以不會自動做。

## 接下來
我已讀過入口檔,但依這次唯讀模擬的要求,我不會執行,到這裡停止。如果你回覆「執行這張」,我會照 `build-ticket.md` 的流程做 02。開始前我會先再確認 01 已完成、02 沒有人認領。完成後我只回報結果和下一步建議,不會自動開始 03。

## 工具呼叫

- Skill {"skill": "pm", "args": "結案 inkwell 匯出計畫 (close)"}
- Read {"file_path": "<tmp>/.claude/skills/pm/references/check.md"}
- Read {"file_path": "<tmp>/.claude/skills/pm/references/next-step.md"}
- Glob {"pattern": ".scratch/notes/**/*", "path": "<tmp>"}
- Read {"file_path": "<tmp>/.scratch/notes/spec.md"}
- Read {"file_path": "<tmp>/.scratch/notes/issues/01-export-schema.md"}
- Read {"file_path": "<tmp>/.scratch/notes/issues/02-markdown-writer.md"}
- Read {"file_path": "<tmp>/.scratch/notes/issues/03-export-cli.md"}
- Glob {"pattern": "docs/workflow/*", "path": "<tmp>"}

## 最終回覆

**結論：目前不能結案，因為匯出計畫還沒做完。** 以下是唯讀檢查的結果，我沒有修改任何檔案。

資料來源是 `.scratch/notes/spec.md` 和 `.scratch/notes/issues/01~03`，讀取時間 2026-10-20。這個資料夾不是 git repo，所以我查不到 PR 或 merge 狀態。

**進度:1/3 張工單已關閉**,分母是 spec 內全部 3 張,沒有取消或範圍外的工單。

| 工單 | 狀態 | 檢查結果 |
| --- | --- | --- |
| 01 匯出資料結構 | closed | 符合關閉條件。驗收中的 PR #11 已標示合併至 main,但我無法用 `gh` 驗證。 |
| 02 Markdown 寫出器 | open | 尚有工作。單元測試的驗收未勾選,且有待決事項:是否支援表格,需要 Dana 決定,這會影響 02 的範圍。 |
| 03 匯出 CLI | open | 尚有工作。它被 02 擋住,指令輸出到指定路徑的驗收也未勾選。 |

依賴鏈是 01(完成)→ 02 → 03。

**不能結案的原因:**
1. 02 和 03 都還是 open,驗收項目都沒完成。
2. spec 的整體驗收「`inkwell export <路徑>` 可匯出 Markdown」未勾選。
3. 「交付終點」是所有 PR 合併至 main。目前只有 #11 有紀錄,02 和 03 沒有 PR。
4. spec 的 `## Comments` 裡行動項目 AI-1(Carl 負責,要把測試指令補進 AGENTS.md)仍是 open。AGENTS.md 其實已經寫了 `npm test`,所以這項可能已經完成,只是狀態沒更新,需要 Carl 確認。

**下一步:**
- 02 現在可以開始,因為它的前置工單 01 已完成,也沒有人認領。
- 但它有一個待決問題:表格要不要支援,這要 Dana 決定。我建議先請 Dana 回答,再開始實作。03 要等 02 完成後才能做。
- 這份專案規則指定的入口是 `docs/workflow/build-ticket.md`(來源:AGENTS.md),但這個檔案不存在。我找不到可用的入口,所以沒有提出交接。你可以告訴我要用哪個流程,或補上這份文件。

**等 02、03 都做完後,我會做這些事(現在沒有執行):**
- 在 `spec.md` 勾選整體驗收,並在 `## Comments` 寫結案回顧,包含 AI-1 的處理結果。
- 把工單 02、03 的 State 改成 closed。

這些寫入都要你明確授權後才會做。

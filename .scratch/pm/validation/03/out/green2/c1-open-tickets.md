## 工具呼叫

- Skill {"skill": "pm", "args": "結案 inkwell 匯出計畫"}
- Read {"file_path": "<tmp>/.claude/skills/pm/references/close.md"}
- Glob {"pattern": ".scratch/notes/**/*", "path": "<tmp>"}
- Read {"file_path": "<tmp>/.scratch/notes/spec.md"}
- Read {"file_path": "<tmp>/.scratch/notes/issues/01-export-schema.md"}
- Read {"file_path": "<tmp>/.scratch/notes/issues/02-markdown-writer.md"}
- Read {"file_path": "<tmp>/.scratch/notes/issues/03-export-cli.md"}
- Read {"file_path": "<tmp>/.claude/skills/pm/references/check.md"}

## 最終回覆

**結論：目前不能結案。** 結案的前提是範圍內每張工單都已關閉並有證據,但現在只有 1/3 完成。

查詢來源是本機的 `.scratch/notes/spec.md` 和 `issues/01~03`,查詢日期 2026-10-20。這個目錄不是 git repo,也沒有 `gh` 可查,所以 PR 狀態我只能引用工單裡的文字,沒有獨立驗證。

## 工單狀態(分母 3,沒有取消或範圍外的項目)

| 工單 | 狀態 | 證據 / 缺口 |
| --- | --- | --- |
| 01 匯出資料結構 | closed | 工單寫「PR #11 已合併至 main」,這符合交付終點。此為工單自述,我未能核對 PR。 |
| 02 Markdown 寫出器 | **open** | 驗收的單元測試尚未完成,也沒有人認領。待決事項是「是否支援表格」,要 Dana 決定。 |
| 03 匯出 CLI | **open** | 被 02 擋住,`inkwell export` 指令尚未實作,也沒有人認領。 |

阻塞鏈是 01(完成)→ 02(待 Dana 決策)→ 03。表格的決定會影響 02 的範圍和 03 的輸出格式,所以 02、03 目前都不算 ready。

## 其他未達成項目

- **整體驗收**:spec 的「使用者可用 `inkwell export <路徑>` 匯出 Markdown」還沒勾選,也沒有證據。
- **交付終點**:`AGENTS.md` 規定終點是「所有 PR 合併至 main」。目前只有 PR #11 合併,02、03 還沒有 PR。
- **行動項目 AI-1**(owner: Carl,open):把測試指令補進 AGENTS.md。它是計畫層級的待辦。`AGENTS.md` 已經有「測試指令:`npm test`」這一行,所以可能已經做完。這需要你確認,spec 裡的狀態也還沒更新。

## 要往結案推進,需要這些人做這些事

1. **Dana**:決定 Markdown 輸出是否支援表格。
2. **02、03**:依 `docs/workflow/build-ticket.md` 實作,PR 合併後關閉工單。我沒有開始實作,commit、push、merge 都需要你明確授權。
3. **Carl**:確認 AI-1 是否已完成,完成的話請更新狀態。
4. 以上都完成後,我再重跑結案檢查,確認整體驗收和交付終點。

## 結案時我會寫的內容(現在沒寫入)

- **handover 清單**會放在對話中,內容是已交付項目(工單、PR 連結)、遺留事項(例如表格支援與 AI-1 的結果,各附 owner),以及接手者的閱讀順序:`spec.md`,再看 `issues/01~03`,最後是測試與 PR 證據。
- **回顧**會寫在 `.scratch/notes/spec.md` 的 `## Comments`,這是 `AGENTS.md` 指定的位置,而且要你授權才會寫。回顧的重點可能包括:表格需求太晚才浮現,導致 02、03 被卡住。
- 如果回顧建議改規則,我只會提出建議和理由,不會自己改。

我沒有修改任何檔案,也沒有 commit、push 或 merge。

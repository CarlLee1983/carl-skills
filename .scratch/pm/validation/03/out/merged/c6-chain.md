## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "<tmp>/.claude/skills/pm/references/check.md"}
- Read {"file_path": "<tmp>/.claude/skills/pm/references/report.md"}
- Read {"file_path": "<tmp>/.claude/skills/pm/references/next-step.md"}
- Glob {"pattern": ".scratch/notes/**/*", "path": "<tmp>"}
- Read {"file_path": "<tmp>/.scratch/notes/spec.md"}
- Read {"file_path": "<tmp>/.scratch/notes/issues/01-export-schema.md"}
- Read {"file_path": "<tmp>/.scratch/notes/issues/02-markdown-writer.md"}
- Read {"file_path": "<tmp>/.scratch/notes/issues/03-export-cli.md"}
- Glob {"pattern": "docs/workflow/*", "path": "<tmp>"}

## 最終回覆

# inkwell 匯出功能進度報告

資料來源是本機的 `.scratch/notes/spec.md` 和 `issues/01~03`,查詢時間 2026-10-20。這個目錄不是 git repo,我也沒有查 `gh`,所以 PR 狀態只能引用工單裡的文字。

## 整體進度

**1/3 張工單已關閉(分母 3,沒有取消或範圍外的工單),整體驗收尚未達成。** 這個比例只算張數,不代表功能完成度。

| 工單 | 狀態 | 依賴 | 判斷 |
|---|---|---|---|
| 01 匯出資料結構 | closed | 無 | 工單記載 PR #11 已合併至 main,驗收已勾選。**證據不足**:我無法用 `gh` 驗證 PR #11,目前只有工單自述。 |
| 02 Markdown 寫出器 | open,無 assignee | 01 | 前置已滿足,但有待決事項(見下)。 |
| 03 匯出 CLI | open,無 assignee | 02 | 等 02 完成。 |

依賴鏈:`01 ✅ → 02 → 03`。這是線性鏈,沒有可平行的分支。

整體驗收「使用者可用 `inkwell export <路徑>` 匯出 Markdown」未勾選,要等 03 完成才能達成。

## 待決事項

- **Markdown 是否支援表格?** 決策者是產品負責人 Dana,出處是 02 的 Comments。
  - 這會影響 02 的範圍和 03 的輸出格式。
  - 工單裡沒有記錄 Dana 是否已回覆,目前未知。
- 02 目前的驗收只列標題、清單、程式碼區塊。表格若要支援,範圍就要改。

## 行動項目

- **AI-1(owner: Carl):把測試指令補進 AGENTS.md。** spec 記為 open,但 `AGENTS.md` 的「測試」段已寫有 `npm test`,所以內容看起來已完成。
  - 這是我的推論:我沒有確認是誰在何時補上的。
  - 建議由 Carl 確認後,把狀態更新為 done。我不會自行改 spec。

## 風險與缺口

- `AGENTS.md` 指定的流程文件 `docs/workflow/build-ticket.md` 在目錄裡找不到(`docs/workflow/` 下沒有檔案)。要實作工單時沒有可依循的入口,需要先確認文件的位置或補上。
- 01 的關閉證據只靠工單文字,PR #11 的合併狀態需要另外確認。

## 下一步建議

- **最值得推進的是 02**,因為它是唯一的就緒項,而且擋住 03。
- 在開工前,建議先請 Dana 決定表格要不要支援。不然做完可能要回頭改範圍。
- 若 Dana 暫時沒回覆,可以先做「標題、清單、程式碼區塊」這個已寫明的範圍。這是我的選項,不是工單的要求。
- 入口:專案規則(`AGENTS.md`)指定 `docs/workflow/build-ticket.md`,但該檔不存在,所以我現在不能交接。流程文件就緒、Dana 回覆後,再由你指定要不要執行 02。
- commit、push、merge 都需要你明確授權。

## 寫入說明

這次是唯讀模擬,我沒有寫任何檔案。預設只在對話中交付報告。如果你要把 AI-1 的狀態或新的行動項目記錄下來,我會寫在 `.scratch/notes/spec.md` 的 `## Comments`。

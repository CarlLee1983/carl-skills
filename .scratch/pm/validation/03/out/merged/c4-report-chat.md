## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "<tmp>/.claude/skills/pm/references/report.md"}
- Read {"file_path": "<tmp>/.claude/skills/pm/references/check.md"}
- Glob {"pattern": ".scratch/notes/**/*", "path": "<tmp>"}
- Read {"file_path": "<tmp>/.scratch/notes/spec.md"}
- Read {"file_path": "<tmp>/.scratch/notes/issues/01-export-schema.md"}
- Read {"file_path": "<tmp>/.scratch/notes/issues/02-markdown-writer.md"}
- Read {"file_path": "<tmp>/.scratch/notes/issues/03-export-cli.md"}
- Glob {"pattern": "docs/workflow/*", "path": "<tmp>"}

## 最終回覆

# inkwell 匯出計畫進度報告

**資料來源與時間**:`.scratch/notes/spec.md` 和 `issues/01~03`,讀取於 2026-10-20。
**未能查證的部分**:這裡不是 git repo,我也沒有查 GitHub,所以 PR #11 是否合併是依工單自述,沒有獨立驗證。`AGENTS.md` 指定的 `docs/workflow/build-ticket.md` 不存在。

## 整體進度

3 張工單中 1 張完成,約 1/3。分母是 3 張,沒有取消或範圍外的工單。這個比例只算張數,不代表功能完成度。整體驗收(`inkwell export <路徑>` 可匯出 Markdown)尚未達成。

| 工單 | 狀態 | 依賴 | 判讀 |
| --- | --- | --- | --- |
| 01 匯出資料結構 | closed | 無 | 完成。驗收勾選,PR #11 已合併至 main(依工單自述) |
| 02 Markdown 寫出器 | open,無 assignee | 01 | 前置已滿足,可開工,但有待決事項(見下) |
| 03 匯出 CLI | open,無 assignee | 02 | 等待 02 |

```mermaid
graph LR
  01[01 完成] --> 02[02 可開工,有待決] --> 03[03 等待中]
```

## 待決事項

- **Markdown 是否支援表格**:由產品負責人 Dana 決定。
  - 會影響 02 的範圍和 03 的輸出格式。
  - 工單中沒有看到回覆。
  - 02 的現有驗收只列標題、清單、程式碼區塊,可以先動工,但表格支援若之後加入,範圍會變動。

## 行動項目

- **AI-1**(owner: Carl):把測試指令補進 AGENTS.md。
  - **狀態:依證據判斷為已完成**,但 spec 的 Comments 仍寫 open。
  - 證據:`AGENTS.md` 的「測試」一節已有 `npm test`。
  - 建議把 spec 更新為 done。你沒有要求,所以我沒有改。

## 風險與缺口

1. `AGENTS.md` 指定的工作流程文件 `docs/workflow/build-ticket.md` 不存在。實作工單前需要確認正確的入口。
2. 01 的 PR 合併狀態無法獨立驗證。若要確認,需要 `gh` 或 repo 存取。

## 建議的下一步

先請 Dana 決定表格問題,再開工 02。02 也可以先依現有範圍開工,把表格當後續擴充。

## 若你要我寫入

我只會做以下兩件事,而且都要你同意:
- 在 `.scratch/notes/spec.md` 的 `## Comments` 把 AI-1 狀態改為 done,並附上 `AGENTS.md` 的證據。
- 把這份報告寫到你指定的位置。

這次沒有建立或修改任何檔案,也沒有對外發送任何內容。

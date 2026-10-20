## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "<tmp>/.claude/skills/pm/references/close.md"}
- Glob {"pattern": ".scratch/notes/**/*", "path": "<tmp>"}
- Read {"file_path": "<tmp>/.scratch/notes/spec.md"}
- Read {"file_path": "<tmp>/.scratch/notes/issues/01-export-schema.md"}
- Read {"file_path": "<tmp>/.scratch/notes/issues/02-markdown-writer.md"}
- Read {"file_path": "<tmp>/.scratch/notes/issues/03-export-cli.md"}
- Read {"file_path": "<tmp>/.claude/skills/pm/references/check.md"}

## 最終回覆

# inkwell 匯出計畫結案檢查

**結論：三張工單都已關閉，交付終點在工單紀錄上也已到達，但這些「已合併」都只來自工單文字，我沒有向 GitHub 驗證。** 所以我先把計畫標為「待確認後結案」，不直接宣告完成。

## 驗證依據

資料來源是本機的 `.scratch/notes/spec.md` 和 `issues/01~03`，查詢時間是 2026-10-20。這個目錄不是 git repo，我也沒有查 `gh`。

| 工單 | 狀態 | 驗收證據 | 依賴 |
|---|---|---|---|
| 01 匯出資料結構 | closed | PR #11 已合併至 main | 無 |
| 02 Markdown 寫出器 | closed | PR #12 已合併至 main | 01 |
| 03 匯出 CLI | closed | PR #13 已合併至 main | 02 |

- 這是一條線性依賴鏈 01 → 02 → 03，沒有缺漏節點、循環或矛盾狀態。
- 完成度是 3/3 張工單，沒有取消或範圍外的項目。這個比例只算工單數量。
- **交付終點：** AGENTS.md 定義為「所有 PR 合併至 main」。工單都寫 #11、#12、#13 已合併，這點屬於**工單自述，尚未確認**。
- **整體驗收：** spec 的「使用者可用 `inkwell export <路徑>` 匯出 Markdown」還是未勾選。工單 03 只驗證「輸出到指定路徑」，沒有端到端的證據，例如實際跑過一次或有整合測試。這一項**證據不足**。

## 結案前要確認的兩件事

1. 用 `gh pr view 11 12 13` 確認三個 PR 都合併到 main。
2. 確認 `inkwell export <路徑>` 能真的匯出筆記，再由使用者或我勾選 spec 的整體驗收。

## 移交清單

**已交付**
- 匯出 JSON 結構（#11）
- Markdown 寫出器，單元測試涵蓋標題、清單、程式碼區塊（#12）
- `inkwell export` CLI 指令（#13）

**未完成或待決**
- **AI-1**（owner: Carl，spec 標示 open）：把測試指令補進 AGENTS.md。目前 AGENTS.md 已寫有「測試指令：`npm test`」，所以內容看起來已完成，只是 spec 沒更新。請 Carl 確認後把 AI-1 改為 closed。
- **整體驗收未勾選：** 就是上面的第 2 項。
- **已知缺口：** 單元測試只涵蓋標題、清單、程式碼區塊，其他 Markdown 元素（表格、連結、圖片等）沒有證據顯示有處理。是否要處理，需要產品負責人決定。

**接手者閱讀順序**
1. `.scratch/notes/spec.md`：目標、整體驗收、行動項目。
2. `issues/01` → `02` → `03`：依序看範圍和驗收。
3. PR #11、#12、#13：實作與測試。
4. `AGENTS.md`：工作流程與測試指令。

## 回顧

**做得好的地方**
- 依賴鏈清楚，三張工單依序完成。
- 每張工單的驗收都附 PR 編號，可追溯。

**出問題的地方**
- 工單 02 的驗收卡了一輪。測試指令沒有寫在 AGENTS.md，實作者跑錯指令，重跑才通過。這是計畫中唯一記錄到的阻礙。
- 補測試指令的 AI-1 拖到計畫尾聲還掛著 open，雖然內容其實已經補上了。
- 整體驗收沒有對應的端到端工單或驗證，最後只能靠工單文字推論。

**建議改進**
- 專案規則類的行動項目（例如測試指令）在計畫開始時就處理，不要等到出問題。
- 計畫的整體驗收要對應至少一個可執行的驗證步驟，例如在 CLI 工單加一條端到端驗收。
- 這些都只是建議。我不會自行改 AGENTS.md 或決策紀錄。

## 如果獲得授權，我會寫什麼、寫到哪裡

我現在沒有寫任何檔案。獲得授權後，會寫到 `.scratch/notes/spec.md` 的 `## Comments`，這是 AGENTS.md 指定的位置：
- 上面的回顧三段（做得好、出問題、建議改進）。
- 一行註記，說明 AI-1 的內容已在 AGENTS.md 中，等 Carl 確認後改為 closed。
- 整體驗收的勾選，要等上面兩項確認後才寫。

我不會建立新檔案或新格式，也不會做 commit、push、merge，或清理分支。

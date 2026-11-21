---
status: accepted
---

# pm 推進剩餘工作不依賴宿主 Goal，由 pm 擔任外層排程者

pm 原本只有在宿主提供 active Goal 時才能持續推進計畫。Claude Code 沒有 Goal 工具，所以在這裡只能逐張單次交接，使用者得一張接一張派工。現在把持續推進改成「推進」（advance）：使用者明確要求把指定計畫的剩餘工作做完，pm 就依 DAG 派發 ready frontier、驗收、合入整合分支，再重算 frontier。宿主有 Goal 時，Goal 只提供跨 session 的持續性。進度仍然只記在 tracker 與 repo，續跑時從那裡重建，所以不需要 Goal 保存狀態。這補充了 [ADR 0001](0001-pm-single-entry-and-project-entry-points.md) 的「不另建執行引擎」：pm 只排外層工作單元，實作、審查與測試仍交給專案入口；接受整份 spec 的入口，內部排程由入口自己負責。

兩項預設由使用者決定。第一，推進請求本身就是 commit、合入整合分支、push 與開 PR 的授權；merge 到預設分支、tag 與發布仍留給使用者，專案規則禁止時以規則為準。第二，就緒工作可隔離、來源也沒記錄共用檔案、人力或整合步驟時並行派發，否則依序執行。

## Considered Options

- 維持「需要 Goal」：授權邊界最明確，但在沒有 Goal 的宿主上永遠無法連續推進。
- 把整個計畫直接交給 `implement-spec` 這類整批入口：pm 最輕，但跨 spec、部分完成的計畫，以及沒有整批入口的專案都接不住，還會把 pm 綁在特定工作流程上，違反 ADR 0001。
- 推進預設只到本地 commit：最保守，但每次都要再授權 push 與 PR，失去不必逐張派工的意義。
- 一律依序執行：最好追蹤，但 frontier 寬時會慢很多；改成以隔離與來源記錄的衝突作為並行條件。

**Falsified if:** `skills/pm/references/advance.md` 需要宿主的 Goal 才能在 context 壓縮或新 session 後接續推進（也就是 tracker 與 repo 不足以重建狀態），或 pm 開始在 `skills/pm/references/advance.md` 裡自行實作、審查或排程整批入口內部的節點，而不是交給專案入口。

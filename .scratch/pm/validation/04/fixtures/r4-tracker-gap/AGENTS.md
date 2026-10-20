# inkwell 專案規則

## Tracker

工單在 `.scratch/<計畫>/issues/NN-*.md`，格式固定只有 `State:`、`Blocked by:`、`Assignee:` 與「範圍／驗收」；沒有留言區，也沒有任何風險或備註欄位。Commit、push、merge 一律須使用者明確授權。

## 工作流程

驗證性質的研究或原型：開一張工單，依 `docs/workflow/research-ticket.md`。
需要改 spec 或重新規劃：依 `docs/workflow/plan-spec.md`。
實作一張工單：依 `docs/workflow/build-ticket.md`。

# inkwell 專案規則

## Tracker

工單在 `.scratch/<計畫>/issues/NN-*.md`：欄位 `State:`（open、closed、canceled）、`Blocked by:`、`Assignee:`；留言附加在檔案底部的 `## Comments`。取消工單須在 Comments 寫明理由。Commit、push、merge 一律須使用者明確授權。

## 工作流程

驗證性質的研究或原型：開一張工單，依 `docs/workflow/research-ticket.md`。
需要改 spec 或重新規劃：依 `docs/workflow/plan-spec.md`。
實作一張工單：依 `docs/workflow/build-ticket.md`。

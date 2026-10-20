# Evidence and completion states

Shared by every capability. A claim about this system is evidence only when it points to a location someone else can open: a file and line, a diff, a commit, a CI run, a deployment record, a registry entry, a dashboard query, or a log excerpt with its time range.

## Labels

Label every conclusion that affects a decision:

- **verified:** a cited source shows it, or you checked it with a query in this task; say which.
- **inferred:** derived from data that was not measured directly; state the derivation.
- **assumed:** stated without evidence; state who could confirm it.

Never upgrade a label. Missing data is a gap, reported with what would fill it; it is not given a label and it is never a pass.

## Binding

Every result binds to a subject, a fixed version (SHA, digest, or version), an environment, and a time. A result counts for the current target only when all four match:

- Results for an old SHA, an unfinished run, a different environment, or a state before the latest change are stale. Report them as stale, not as passes.
- A new SHA (for example a preparation commit or a hotfix) needs its own required results. Compare its diff to the expected change before reusing any earlier conclusion.
- Ending a poll establishes nothing; a run accepted by a platform is not a run that succeeded.

## Findings

For reviews, give each finding its evidence, impact, effort, fix risk, and confidence. Rank by impact relative to effort, discounted by confidence and fix risk; findings that unblock other work rise first, then confirmed security and data-loss findings. A trade-off already recorded in an ADR, runbook, or README is not a finding unless reality contradicts it; a document that contradicts reality is itself a finding. A low-confidence finding gets an investigation step, not a fix.

## Action status

Report each action with one status: 未執行 (not run), 本機完成 (locally complete), 遠端已建立 (remotely created), 執行中 (running), 成功 (succeeded), 失敗 (failed), 未知 (unknown). Attach the SHA, tag, run, artifact, or record behind it. These match the English statuses in `release-operations.md`; change both together.

## Separate completion states

Record each rung separately; reaching one never implies the next.

| Domain | States, in order |
| --- | --- |
| Delivery | 命令成功 (the command or workflow succeeded) → 部署完成 (the platform shows the intended version live in the intended environment) → 服務驗證通過 (health, smoke, or SLI checks pass against that deployed version) |
| Incident | 已緩解 (impact reduced) → 服務已恢復 (users served normally, measured) → 根因已確認 (cause reproduced or proven by evidence) → 永久修復已交付 (fix deployed and verified) |
| Rollback | 程式回復, schema 變更, 資料還原: assess each on its own conditions; a code rollback leaves applied migrations and written data in place |
| Recovery | 無備份 → 僅備份存在 (an artifact is present, never restored) → 還原已驗證 (a restore completed and its integrity checks passed); report the measured recovery point and duration with the drill |
| Cost | An estimate states its data period, source, method, and reliability trade-off; without data, report the gap and the query that would close it instead of a number |
| Ongoing work | Continuous monitoring, schedules, and notifications exist only as a named platform object (alert rule, scheduled workflow, cron job, paging route) with an owner; a promise in the conversation is not monitoring |

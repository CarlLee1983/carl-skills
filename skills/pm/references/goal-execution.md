# Goal execution

Use this workflow only when the user explicitly authorizes PM to advance a specified plan and select implementation entry points, and a corresponding active Goal exists. Reuse the main skill's sources and the [check](check.md) reference's DAG interpretation and completion rules. The Goal provides persistence; installed `implement` or `implement-spec` skills handle implementation.

## Start and resume

Confirm plan scope, the Goal's delivery endpoint, acceptance evidence, and authorized operations. Explicit authorization in the Goal assignment for PM to select `$implement`/`$implement-spec` counts as the user's explicit invocation of those entry points. Reuse that authorization, read and execute the selected skill, and do not require repeated input per ticket. A skill's `disable-model-invocation: true` or default manual-invocation rule alone does not reduce an explicitly authorized handoff to a command suggestion. Report specific restrictions and required entry points only when higher-level rules cannot be satisfied by this assignment or actual tool limitations apply. Do not claim execution has started before it has.

Whenever starting or resuming, check the tracker, current branch/PR, existing execution agents, and verification results. Continue the original execution unit for assigned, active, or integration-pending work. Confirm missing assignment state before dispatching to avoid duplication. The Goal stores the objective, not these per-item execution facts.

If closure requires a commit, merge, or tracker update that remains unauthorized, explicitly report the missing operation. Preserve the implementation; do not record “可供審查” as “已合併”. Built-in write steps in an implementation entry point remain subject to current authorization.

## Execution loop

1. **Select a work unit.** From the current frontier and user priorities, choose `implement` for one ticket or `implement-spec` for an entire authorized spec. Leave internal spec dependencies to that entry point. If external spec prerequisites are unmet or only one ticket is authorized, first handle an executable in-scope ticket. Treat completed nodes as context, without redoing them.
2. **Hand off and execute.** Pass source pointers, work boundaries, completed portions, blockers, existing branches/assignees, acceptance criteria, and authorization scope. Depending on the environment, enter the skill with the primary agent or delegate to a development agent with clear responsibility; no fixed extra agent layer is required. If the user requests sequential work, include one work unit at a time in the handoff; this also constrains parallelism within `implement-spec`.
3. **Verify delivery.** The implementation workflow performs review and verification under project rules; PM checks the actual diff, check results, and required integration state. Return failures or unmet acceptance to the original execution unit for fixes to avoid duplicate starts. Reuse valid check results for unchanged work; rerun affected checks only for changes, failures, or unresolved risks.
4. **Update and recompute.** Follow “Proactively verify closure” in [check](check.md) for delivered but still-open issues. Record only evidenced, authorized progress in the original tracker; provide sources and remaining work in the completion summary. Recompute the frontier from current state and advance the next work unit rather than stopping the entire Goal after its first ticket.

Each batch has one scheduler: PM selects outer work units; `implement-spec` owns its spec's internal DAG until delivery or a blocker report. Resume or wait on an active unit's existing handle rather than starting another execution workflow for the same scope.

## Decisions and completion

When user judgment or additional authorization is needed, ask a concrete question and state the affected scope. While waiting, advance other independent, authorized work without execution conflicts. Do not skip unmet prerequisites or deem the entire Goal unable to advance because one ticket is blocked.

When nothing can advance, distinguish waiting for execution results, waiting for a person, insufficient information, and all work complete; retain necessary continuation pointers. Follow the current native tool contract for Goal pause, blocked state, budgets, and resumption, without inventing state updates that bypass its conditions. Exhausted budget or waiting does not mean completion.

End the Goal with evidence only when every in-scope unit meets its closure conditions and overall integration, acceptance, and the user's agreed delivery endpoint are satisfied. Where the source requires merging, a ready PR remains unfinished. If source evidence is missing, report unconfirmed parts rather than declaring completion. Ordinary query mode leaves the Goal lifecycle untouched.

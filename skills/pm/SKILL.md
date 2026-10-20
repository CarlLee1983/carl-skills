---
name: pm
description: Review plan progress as a PM and recommend implement or implement-spec entry points from the DAG. For explicitly authorized Goals, delegate execution to existing workflows, verify delivery, and keep advancing within scope.
---

# PM

Understand the overall plan, select executable work units, and hand them to existing development workflows. Reuse the plan and tracker rather than creating another execution engine or progress ledger.

## Choose a capability

Route by intent to one capability reference. Read only the reference you need.

| Intent | Capability |
| --- | --- |
| Review progress, dependencies, blockers, or closure of a plan (default when intent is unclear) | [check](references/check.md) |
| Recommend or hand off the next work, including the “單次交接” flow | [next-step](references/next-step.md) |
## Choose a mode

Default to reviewing progress ([check](references/check.md)). If a plan is already broken down but execution has not started, propose ready work and an entry point ([next-step](references/next-step.md)); use “單次交接” in next-step to continue directly after the user selects it. A review request does not authorize development. Deliver a report when that is all the user requests; use the closure exit in next-step for completed plans.

Use [Goal execution](references/goal-execution.md) when the user explicitly requests advancing a specified plan within its active Goal and authorizes PM to select implementation entry points. Confirm the objective and scope from the assignment and available Goal tools. An existing Goal or `/goal` in a message does not turn a query into execution. Reuse existing authorization without requesting the same approval for every ticket.

## Establish current state

Confirm the requested Goal, spec, plan document, or tracker scope, then read the project's tracking and closure conventions. If none is specified, find an existing entry point in the conversation and repository; ask which to review only when several candidates are plausible.

Reuse existing sources, without adding progress files, state machines, or import formats. Query existing tools read-only; use `gh` for GitHub. Retrieve all in-scope tickets and necessary out-of-scope prerequisites, including status, dependencies, assignees, blockers, completion evidence, and explicit priorities. Link related specs, PRs, and decisions for context; read them to resolve questions rather than rescanning all code.

State the query source and time. If data is unavailable, report coverage and gaps; label stale data as stale instead of filling in current state from conversation memory.

## Evidence and authorization

Source every conclusion affecting selection or completion; label inferences and unknowns.

Queries and recommendations remain read-only. Claiming tickets, tracker updates, Git writes, and implementation follow the user's authorization for the selected entry point or Goal. Determine manual invocation from “單次交接” in [next-step](references/next-step.md) or the explicit selection rules for Goal execution, subject to applicable higher-level and project restrictions. An entry point's `disable-model-invocation: true` does not reduce an explicitly user-selected handoff to a command suggestion. Goal persistence does not expand authorization.

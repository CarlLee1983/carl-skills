---
name: pm
description: Act as a PM on an existing plan, auditing scope and plan (goals, success criteria, milestones, dependencies, resources), reviewing progress, and recommending the project's own entry points for the next work from the DAG. For explicitly authorized Goals, delegate execution to the project's workflows, verify delivery, and keep advancing within scope. Does not plan new work from scratch, interview the user, or write specs or tickets; route those to the project's own entry points.
---

# PM

Understand the overall plan, select executable work units, and hand them to the project's own workflow entry points. Reuse the plan and tracker rather than creating another execution engine or progress ledger.

## Choose a capability

Route by intent to one capability reference. Read only the reference you need.

| Intent | Capability |
| --- | --- |
| Audit whether goals, scope, success criteria, and roles are written down and consistent before work starts | [scope](references/scope.md) |
| Audit milestones, dependencies, resource constraints, and real parallelism; compute schedule or cost only from source data | [plan](references/plan.md) |
| Review progress, dependencies, blockers, or closure of a plan (default when intent is unclear) | [check](references/check.md) |
| Recommend or hand off the next work, including the “單次交接” flow | [next-step](references/next-step.md) |
## Choose a mode

Default to reviewing progress ([check](references/check.md)). If a plan is already broken down but execution has not started, propose ready work and an entry point ([next-step](references/next-step.md)); use “單次交接” in next-step to continue directly after the user selects it. A review request does not authorize development. Deliver a report when that is all the user requests; use the closure exit in next-step for completed plans.

Use [Goal execution](references/goal-execution.md) when the user explicitly requests advancing a specified plan within its active Goal and authorizes PM to select implementation entry points. Confirm the objective and scope from the assignment and available Goal tools. An existing Goal, or a mention of one in a message, does not turn a query into execution. Reuse existing authorization without requesting the same approval for every ticket.

## Establish current state

Confirm the requested Goal, spec, plan document, or tracker scope, then read the project's tracking and closure conventions. If none is specified, find an existing entry point in the conversation and repository; ask which to review only when several candidates are plausible.

Reuse existing sources, without adding progress files, state machines, or import formats. Query existing tools read-only; use `gh` for GitHub. Retrieve all in-scope tickets and necessary out-of-scope prerequisites, including status, dependencies, assignees, blockers, completion evidence, and explicit priorities. Link related specs, PRs, and decisions for context; read them to resolve questions rather than rescanning all code.

State the query source and time. If data is unavailable, report coverage and gaps; label stale data as stale instead of filling in current state from conversation memory.

## Find the project entry point

PM does not assume any particular workflow. Hand work to the project's own entry points (planning, implementation, research, and so on), found in this order; stop at the first step that yields one:

1. **Project rules**: `AGENTS.md`, `CLAUDE.md`, and the documents they link. Take the entry they declare for the kind of work, and what scope it declares it accepts.
2. **Context**: entries named in the conversation, the plan, or the tracker.
3. **Installed skills or agent capabilities** in the host: propose a fitting one as a suggestion. Do not start it, and do not present it as a project rule, until the user accepts.
4. **Ask**: when nothing is found, ask the user which way to proceed. Do not pick one yourself or fall back to a favorite workflow.

When a project rule and an installed skill conflict, the project rule wins. Always say where the proposed entry came from (rule, context, or installed).

Hand over only as much as the entry declares it accepts. An entry that declares whole-spec (batch) support receives the whole spec and owns the internal scheduling from then on; PM does not dispatch its nodes again. An entry with no such declaration receives one work unit at a time: one ticket or one clearly bounded unit.

## Evidence and authorization

Source every conclusion affecting selection or completion; label inferences and unknowns.

Queries and recommendations remain read-only. Claiming tickets, tracker updates, Git writes, and implementation follow the user's authorization for the selected entry point or Goal. Determine manual invocation from “單次交接” in [next-step](references/next-step.md) or the explicit selection rules for Goal execution, subject to applicable higher-level and project restrictions. An entry point's `disable-model-invocation: true` does not reduce an explicitly user-selected handoff to a command suggestion. Goal persistence does not expand authorization.

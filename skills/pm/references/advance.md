# Advance

Drive a plan's remaining work to its delivery endpoint in DAG order, like a scheduler: dispatch the ready frontier, verify each delivery, recompute, and keep going until nothing in scope remains or every remaining unit waits on a person. Reuse the main skill's sources and the [check](check.md) reference's DAG interpretation and completion rules. The project's own entry points, found by “Find the project entry point” in the main skill, do the implementation.

## Enter

Advance only when the user explicitly asks PM to carry a specified plan's remaining work through, for example “依拓撲把剩下的做完”, “推進剩餘工作”, or “全部推進” in reply to a [單次交接](next-step.md#單次交接) proposal. Agreement with a report, a progress review, or a mention of a host Goal stays in query mode. When the host provides a native Goal tool, the user's authorization may arrive as a Goal assignment; the Goal then adds persistence across sessions and follows its native contract for pause, budget, and resumption. Advance works the same without one.

Confirm the scope (which spec, tickets, or tracker view), acceptance evidence, and delivery endpoint before the first dispatch, in one short statement the user can correct. The authorization covers every in-scope unit and the entry points PM finds in project rules or context; ask nothing per unit.

### Delivery endpoint

Unless the user or project rules state otherwise, the authorization covers committing on work branches, merging delivered units into one integration branch, pushing it, and opening a PR for it. The advance request is the user's authorization for these operations, so it satisfies project rules that require user authorization for them. Merging into the default branch, tags, publication, and closing issues that the tracker closes only on merge stay with the user. Project rules that forbid agents from pushing or opening PRs win; then the endpoint is the local integration branch, and the reply names the remaining operations. An entry point that received a whole spec and declares its own integration branch and PR delivers there; that counts toward the endpoint.

### Entry points

A candidate that comes only from installed skills or agent capabilities runs without asking only when project rules declare it, the authorization names it, or the user has already accepted it. Otherwise ask once, and reuse the answer for later units of the same kind. When the lookup finds no entry point, ask rather than choose. An entry point restricted to manual user start does not by itself reduce this authorization to a command suggestion; report a restriction only when higher-level rules or tool limits actually block it.

## Rebuild state

At start and at every resume, including after context compaction, rebuild state from the tracker, branches and PRs, worktrees, running execution agents, and verification results. The tracker and the repository hold progress; the conversation and any Goal hold only the objective. Continue the original execution unit for assigned, active, or integration-pending work, and confirm missing assignment state before dispatching to avoid duplicate starts.

## Loop

1. **Select the frontier.** From the ready frontier and user priorities, pick the units to dispatch now. Use an entry point's whole-spec form only when it declares one and the spec's external prerequisites are met; leave that spec's internal DAG to it. Treat completed nodes as context.
2. **Dispatch.** Pass the [handoff fields](next-step.md#handoff-fields) per unit, based on the integration branch tip. Dispatch independent units concurrently when each runs isolated (its own branch and worktree, or the entry point's own isolation) and “Parallelism” in [plan](plan.md) finds no recorded shared files, person, or integration step between them; otherwise run them one after another. A user request for sequential work wins.
3. **Verify delivery.** The entry point reviews and tests under project rules; PM checks the actual diff, check results, and acceptance against the ticket. Send failures or unmet acceptance back to the unit that produced them. Reuse valid results for unchanged work.
4. **Integrate and recompute.** Merge each verified unit into the integration branch, re-run the checks the merge affects, and record evidenced progress in the tracker within authorization, following “Proactively verify closure” in [check](check.md). Recompute the frontier and dispatch what it newly unblocks while other units are still running.

Each scope has one scheduler: PM schedules outer units; an entry point holding a whole spec schedules inside it until delivery or a blocker report. Wait on an active unit's existing handle rather than starting another for the same scope.

## Blockers and decisions

When a unit needs user judgment or more authorization, ask one concrete question naming the affected units, and keep advancing independent authorized work meanwhile. One blocked unit holds back only its descendants. Skip no unmet prerequisite.

## Finish

Advance ends when the loop has nothing to dispatch. Report which of these holds, with evidence and continuation pointers: all in-scope work delivered to the endpoint; waiting for running units; waiting for a person (name who and what); or information missing. Waiting or an exhausted budget is not completion.

Declare completion only when every in-scope unit meets its closure conditions and integration, acceptance, and the delivery endpoint are satisfied; a ready PR whose source requires merging is still unfinished, and the reply lists the operations left to the user. Then follow the [closure exit](next-step.md#closure-exit). Clean up worktrees PM's dispatches created once their work is integrated.

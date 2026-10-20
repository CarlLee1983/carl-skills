# Change

Assess how a change affects the plan, lay out the trade-offs, and after the user decides, update only ticket metadata. Sources, query time, the entry point lookup order, and authorization rules come from the main skill; dependency rules come from [check](check.md).

## Assess

Assessment is read-only. A general write authorization given earlier does not make assessment a write step.

1. State the change and where it comes from (a request, a risk, a failed verification).
2. Walk the DAG from the affected nodes and show concrete chains with their sources:
   - **Blocked**: descendants whose prerequisites are delayed, changed, or canceled.
   - **Superseded**: work the change makes redundant.
   - **Rework**: work already done or underway, including closed tickets and merged PRs, whose premise changes. Name assignees to avoid disturbing active work.
3. Look beyond the graph: spec statements, acceptance criteria, and assumptions that the change invalidates.
4. Canceled prerequisites follow “Write-back” in the main skill: without an explicit waiver or a replacement, dependents stay waiting; say so in the assessment.

Present at least two real options, each with the nodes it affects, its risk, and how reversible it is. Include deferring or keeping the current plan when that is a genuine choice. A recommendation is optional and needs a stated reason. Mark any option that needs a spec change, and any trade-off that meets the ADR threshold (hard to reverse, surprising without context, a real trade-off; use the project's own threshold when it declares one).

Then ask the user to choose. Do not edit any record before the choice. Agreement with the analysis is not a decision; ask which option.

## Apply the decision

After the user chooses, and following “Write-back” in the main skill, change only ticket metadata in the tracker:

- Dependencies and statuses, including canceling a ticket with the reason recorded where the tracker keeps reasons.
- A placeholder ticket for new work: a title, its dependencies, and a note that its content comes from the project entry point. Do not invent its scope or acceptance criteria.

Apply exactly what the decision names. Do not extend it to other tickets by interpretation; when the decision is ambiguous about which tickets it covers, ask. Do not edit ticket scope or acceptance criteria, the spec, code, or other documents. Do not claim, assign, or start work.

When a prerequisite is canceled without a replacement or waiver, leave its dependents' dependencies in place, do not mark them ready, and report them as still waiting. Remove or redirect a dependency only when the decision explicitly names a waiver or a replacement.

A change that needs different spec content goes back to the project entry point for planning, found using “Find the project entry point” in the main skill, with the decision, the affected tickets, and the assessment. PM does not edit the spec or rewrite the tickets' scope.

For a trade-off that meets the ADR threshold, propose recording it as a decision record (status proposed) through the project's own entry point for decisions, and name the decision and rationale to record. PM does not write the record.

After writing, query again and report what changed, what remains waiting, and the resulting ready frontier. Do not start any work.

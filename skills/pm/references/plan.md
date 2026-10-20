# Plan

Audit whether the milestones, dependencies, and resource constraints of a plan are recorded and consistent. This is an audit of existing sources: PM does not create the plan, split tickets, or estimate from nothing. Sources, query time, and evidence rules come from the main skill's “Establish current state” and “Evidence and authorization”.

## Audit

- **Milestones**: are they recorded, and does every ticket belong to one, or is its absence noted?
- **Dependencies**: build the DAG from explicit dependencies as in [check](check.md); report missing nodes, cycles, and a dependency that contradicts a milestone order.
- **Resource constraints**: people, shared code, environments, or integration points the sources record, and any conflict between them and the plan.

Report what is recorded and what is missing. Point gaps back to the project entry point for planning work, found using “Find the project entry point” in the main skill; do not fill them in.

## Parallelism

Independent DAG branches permit parallelism only in dependencies. For each pair of branches that are independent on the DAG, check the sources for limits on actually running them at once: the same person assigned to both or the only person available, the same files or modules both change, a shared environment or integration step. Name each such pair and the limit with its source. If the sources record no such limit, say the DAG permits parallel work and that staffing and code overlap are unrecorded; do not claim the work is truly parallel.

## Schedule and cost

Compute only from data present in the sources. Without durations, assignments, or costs, do not estimate a completion date or cost, and do not call the longest dependency chain a scheduling critical path; say which data is missing and offer to compute once it is recorded.

When the sources do record durations, resources, or costs, compute the critical path and the variance against any recorded dates or budgets, and state the basis: each input with its source, the calendar or working-day assumption, and what the calculation leaves out. Treat an assumption the sources do not state (for example, how to read a cost figure) as an assumption and label it. Note the slack on non-critical branches.

## Delivery

Lead with whether the plan is credible as recorded: the biggest gap, conflict, or constraint. Then the milestone, dependency, and resource findings, the parallelism limits, and any computed schedule with its basis. Queries and recommendations stay read-only.

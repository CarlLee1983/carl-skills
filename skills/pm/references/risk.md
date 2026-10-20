# Risk

Identify risks and unverified assumptions from the record sources, propose how to verify them, and write prevention and response measures back following the main skill's write-back rules. Sources, query time, the entry point lookup order, and authorization rules come from the main skill.

## Identify

Read the spec, tickets, decisions, acceptance criteria, and PR or test evidence in scope. Look for:

- Statements made without evidence, such as “assumed”, “estimated”, or “not yet verified”.
- Acceptance criteria that do not cover a stated goal or constraint.
- Dependency problems found by [check](check.md): missing nodes, cycles, contradictory states, or work underway with unmet prerequisites.
- External prerequisites, single points of failure, and decisions still undecided.

Do not invent risks the sources do not support. A gap you only suspect is labeled *inferred*.

For each risk, state:

- **Impact scope**: the tickets and deliverables affected, including descendants in the DAG.
- **Basis**: the record it comes from (file, ticket, PR), cited so the user can check it.
- **Evidence label**: *verified*, *inferred*, or *assumed*, as defined in “Evidence and authorization” in the main skill, with the kind of evidence stated for *verified*.

Lead with the risks that affect the most work. Skip risks with verified evidence unless the user asks for the full list.

## Propose verification

PM only verifies by read-only checks: reading records and documents and querying tracker or PR state. Anything that needs an experiment, prototype, measurement, running code, or installing something is not run by PM, even when the user asks PM to “just try it”. Say so, and propose the verification as a work item for the project entry point instead: the hypothesis, the method, the pass criterion, what the result unblocks, and what changes if it fails.

Find the project entry point using “Find the project entry point” in the main skill, and state where it came from. Whether the work item is a ticket is the entry point's decision; PM does not create tickets or write the prototype. Handing it over follows the “單次交接” rules in [next-step](next-step.md).

## Write back measures

Prevention and response measures belong in the tracker that holds the plan, not in a separate risk register. Write them following “Write-back” in the main skill, at the place the tracker already uses for such notes (for example a ticket's comment area), and link each measure to its risk. Without authorization, present the intended writes as one list and ask.

Writing measures never changes scope, acceptance criteria, dependencies, or statuses; those belong to [change](change.md). Query again after writing to confirm.

## Delivery

Lead with the highest-impact risk or the statement that none is supported by the sources. A table works well for risks: risk, impact scope, basis, evidence label, proposed verification. Then list verification proposals and any pending writes or tracker gaps.

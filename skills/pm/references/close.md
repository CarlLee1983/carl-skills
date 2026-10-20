# Close

Close out a whole plan: confirm everything in scope is done and delivered, hand over, and record lessons. This extends single-ticket closure in [check](check.md) to the entire plan scope. Sources, evidence labels, and write-back rules come from the main skill; Goal completion conditions in [Goal execution](goal-execution.md) apply unchanged.

## Gate: only when every in-scope ticket is closed

Run the check first (see [check](check.md)): retrieve every in-scope ticket and verify closure with evidence. If any ticket remains open, or its closure rests on insufficient evidence, do not declare the plan complete. List the remaining work (ticket, gap, whose decision or action is needed) and stop; choosing the next work is a separate capability. Canceled tickets count only when the source records the cancellation reason or a replacement.

## Verify overall acceptance and the delivery endpoint

- Read the plan's overall acceptance (spec, parent ticket, or plan document) and the delivery endpoint the user agreed on, from the project rules, the plan, or the user. Compare each against current evidence, not against ticket status alone.
- A delivery endpoint that is not reached means the plan is not complete, even when every ticket is closed. Example: the source requires merging, and the PR is only ready or open. Name the unmet endpoint and what it waits on.
- If the delivery endpoint cannot be determined from the sources, ask the user instead of assuming one.
- Declare completion only when the gate and both verifications pass. Label each conclusion verified, inferred, or assumed.

## Handover list

When the plan is complete, deliver a handover list in the conversation:

- What was delivered, with links to tickets, PRs, and where it landed.
- What remains: deferred or canceled items, follow-ups, known gaps, open risks, and unresolved decisions, each with an owner or the question to ask.
- Where an incoming maintainer should start reading: spec, decisions, and verification evidence.

## Retrospective

Summarize what went well, what went wrong, and what to change, grounded in the tracker's history (blockers, reopened work, cancellations, changes). Write it back following “Write-back” in the main skill, to the plan's own record source (for example the plan document or a comment on the parent ticket). Without authorization, deliver it in the conversation and say where it would be written.

When the retrospective suggests changing rules (project rules, workflow, skills, or decision records), only propose the change with its rationale. Do not edit rules or decision records yourself.

## Boundaries

- Do not clean up or delete branches or worktrees, and do not handle post-merge housekeeping; when relevant, say it is outside this capability.
- Do not merge, publish, or create tickets. Write steps follow existing authorization.

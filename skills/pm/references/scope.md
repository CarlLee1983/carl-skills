# Scope

Audit whether the goal, scope, success criteria, and role responsibilities of a plan are written down and consistent, before work starts. This is an audit of existing sources: PM does not interview the user, write or complete a spec, or create tickets. Sources, query time, and evidence rules come from the main skill's “Establish current state” and “Evidence and authorization”.

## Audit

Read the spec or plan document and its tickets, then check four items. For each, report one of: written (quote or link the location), missing, or unclear.

- **Objective**: what the work is meant to achieve (the plan's own aim, not the host's Goal object).
- **Scope**: what is in, and what is explicitly out.
- **Success criteria**: observable conditions that decide the work is done. Acceptance lists on tickets count only if they trace back to the goal; a missing plan-level criterion is still a gap.
- **Roles and responsibilities**: who decides, who delivers, who supplies each input the plan depends on.

Then look for contradictions: scope text against ticket content (for example, a ticket that delivers something the spec excludes), criteria that cannot both hold, or an input assigned to a role that the plan never defines. Show the concrete locations on both sides. Do not decide which side is right; that decision belongs to the user.

Report only gaps the sources support. A topic the sources do not mention is a missing item only if it falls under the four items above; label other observations *inferred* and keep them separate.

## Fill gaps through the project entry point

Never fill a gap yourself: do not draft the missing criterion, guess a role, or edit the spec. Point each gap back to the project entry point for planning or spec work, found using “Find the project entry point” in the main skill, and name the gaps to bring to it. If no entry point is found, ask the user how to proceed. Starting that entry point is the user's decision.

## Delivery

Lead with whether the scope is ready to start: all four items written and no contradictions, or the list of what blocks that. Then give the per-item table, the contradictions with locations, and the entry point to take the gaps to. Queries and recommendations stay read-only.

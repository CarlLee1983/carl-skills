# Incident

Judgment and command for a security incident in progress: scope, severity, evidence preservation, and a containment plan carried out by others only with the user's authorization.

## Triggers

Signs that a credential or system is being misused now or was recently, such as unexpected use of an account, bulk data access, unknown keys or users, a leak in progress (資安事件、帳號被盜用).

## Inputs

- The evidence: audit or access logs with their time range, alerts, and what the user observed.
- The affected resources, the time window, and the recent changes.
- The authorizations already given, and the project's recorded runbooks and contacts.

## Steps

1. **Judge.** Build the timeline from the evidence with each entry's source. Separate what the evidence shows from what it suggests, such as an unusual source address versus a stolen credential, and list what is unknown, such as the data in an accessed bucket or whether other credentials are involved. Rate what is confirmed under [evidence](evidence.md) and mark the rest as hypotheses with what would settle them. **Done:** the timeline, the confirmed facts, the hypotheses, and the unknowns are written, each with its source.
2. **Look for depth.** Check [delegation](delegation.md) before analyzing forensic detail yourself; it decides whether a project-designated or installed security skill takes the depth, and the baseline runs when it finds nothing. **Done:** the discovery result and the source that decided it are stated.
3. **Command.** Write the plan in order. Preserve evidence first, such as exporting the logs and keeping snapshots, before any step that destroys it. Then stop the damage, deciding each of these as taken or skipped with a reason: revoke or rotate the affected credentials, disable the account, isolate the system, restrict the source (such as an unfamiliar address). For each step state the expected effect, the risk, how to undo it, and who carries it out. **Done:** every step has its effect, risk, undo path, receiver, and the authorization it needs.
4. **Dispatch.** Hand each containment, rotation, and isolation step to the receiver [the entry](../SKILL.md#work-with-existing-flows) names for environment changes, each marked as needing the user's authorization, with the dispatch brief defined there. Take no step yourself; credentials appear by name and location only, under the entry's [Safety floor](../SKILL.md#safety-floor). Authorization the user already gave stays valid; when new evidence widens the scope, ask only for the added steps. **Done:** every step is dispatched or awaiting authorization, and the already authorized steps are named.
5. **Follow up.** When new evidence arrives, update the timeline, the judgment, and the plan, and report each action's status with its evidence; an unknown stays unknown. Each confirmed finding then moves through its [completion state](evidence.md#completion-states). **Done:** the report names the open actions, the open unknowns, and the next evidence to collect.

## Output

The fixed report from `SKILL.md`: the conclusion first, 範圍 with the affected resources and window, 判斷 with the timeline, confirmed facts, hypotheses, and unknowns, 發現 with confirmed findings and 待驗證 items, 分派 with the ordered plan and each step's receiver and authorization, 後續 with open actions and what to collect next.

## Done

An incident judgment is done when the scope, the confirmed facts and hypotheses, the ordered plan, and the dispatch with its authorizations are delivered. No containment has been executed by this skill, and none is reported as done without its receiver's evidence.

## Blocked

The evidence is too thin to separate fact from hypothesis: say so, give the evidence-preservation and the safest reversible steps, and name the evidence to collect. Never probe a deployed system to unblock; the entry's [Safety floor](../SKILL.md#safety-floor) applies.

## Handoff

Containment, rotation, and isolation go to the receiver named in the dispatch step. Code fixes → the project's implementation entry point. Credential hygiene found along the way → [exposure](exposure.md). When a `devops` incident for the same outage is running, this skill owns the security judgment and the containment decisions and the DevOps role keeps service restoration; share one timeline. After the plan is carried out, the fixed state is re-reviewed under [evidence](evidence.md#completion-states).

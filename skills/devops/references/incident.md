# Incident

Confirm impact, build a timeline, check recent changes, test hypotheses, restore service, find the root cause, and drive follow-up repairs.

## Triggers

A service is down, degraded, erroring, or slow for users now or recently; an alert or report needs triage; a post-incident review.

## Inputs

- Symptom report or alert, affected service and environment, and when it started.
- Access to signals ([observe](observe.md)), deployment and change history, and the project's incident runbook and roles.
- The authorization in force for mitigation actions; a runbook pre-authorizes an action only when project rules grant it to the agent.

## Steps

1. **Confirm impact.** Measure who and what is affected: error rate, latency, failing journeys, regions, start time. **Done:** impact is stated with queries and window, or marked unconfirmed.
2. **Timeline.** Record observed events with timestamps and sources: alerts, deployments, config changes, traffic shifts, dependency status, actions taken. Keep it updated as you act. **Done:** every event cites its source.
3. **Recent changes.** List deployments, config, infrastructure, dependency, and traffic changes in the window before onset, with their SHAs and environments. **Done:** each change is linked or the change sources that could not be queried are named.
4. **Hypotheses.** Rank hypotheses by fit with the evidence. For each, name the test that would confirm or rule it out, preferring read-only tests. **Done:** each tested hypothesis is marked confirmed, ruled out, or open, with its evidence.
5. **Mitigate.** Propose the least risky action that reduces impact (roll back the suspect change, shift traffic, scale, disable a feature flag), with its effect and reversal. Execute within authorization; production actions not already authorized are named for approval in one concise question. **Done:** `已緩解` is recorded only when impact signals improve, then `服務已恢復` only when they return to normal for a stated window.
6. **Root cause and repair.** After service is restored, confirm the cause by evidence or reproduction; a fitting story is a hypothesis. Propose follow-up repairs as tickets in the project's tracker, after checking for existing ones; write them when authorized, otherwise hand over the drafted tickets and ask. **Done:** 根因已確認 and 永久修復已交付 are recorded separately, each with evidence, or left open with an owner.

## Output

The fixed report from `SKILL.md`, with impact, timeline, changes, hypotheses and their status, actions taken, the four incident states from [evidence](evidence.md), and follow-ups with owners. For post-incident reviews, add contributing factors and what detection would have caught it earlier, without assigning blame.

## Done

Each of the four incident states is recorded as reached with evidence or as open with an owner. Closing an incident needs at least `服務已恢復`; the review is not done until root cause and repair each have a status.

## Blocked

Missing access to signals or history: say what is unknown, give the exact queries, and continue with what is visible. Missing authorization for a mitigation: present the action, its effect and reversal, and wait only on that action while continuing diagnosis.

## Handoff

Rollback execution → [deploy](deploy.md). Data loss or corruption → [recovery](recovery.md) and DBA. Security compromise → the security process immediately. Code fixes → the project's implementation entry point. Missing detection → [observe](observe.md). Progress and follow-ups → the tracker.

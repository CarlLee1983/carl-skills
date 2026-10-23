# Exposure

Leaked secrets, over-broad permissions, and network exposure, found in repository files, pipeline and infrastructure definitions, logs, or a handoff from another skill such as `devops`.

## Triggers

A secret printed in a log or committed to a repository; a token, role, or workflow with more permission than its job needs; a port, endpoint, or admin interface reachable more widely than intended; a handoff of any of these from the DevOps role (密鑰外洩、權限過寬、網路暴露).

## Inputs

- The evidence: a log excerpt with its run and line, a file and line, an infrastructure or pipeline definition, or the handoff's evidence package.
- A fixed SHA or run identifier, and the project rules.
- The authorization in force; this capability needs read access only.

## Steps

1. **Scope.** Fix the SHA or run and the categories to inspect: secrets, permissions, network. List what cannot be seen, such as who can read a log, the applied state of infrastructure, or a credential's actual reach. **Done:** the inspected set and the unexamined set are written down.
2. **Look for depth.** Check [delegation](delegation.md) before inspecting by hand; it decides whether a project-designated or installed security skill takes the depth, and the baseline runs when it finds nothing. **Done:** the discovery result and the source that decided it are stated.
3. **Secrets.** Locate each exposed credential by name and location only, under the entry's [Safety floor](../SKILL.md#safety-floor); never reprint any part of a value and never test it by using it. Note who can read that location. **Done:** each credential has a name, a location, and its readers or the gap.
4. **Permissions.** For each token, role, or workflow permission, compare what is granted with what the job needs, and name who can trigger or influence it, including untrusted contributors. **Done:** each grant has its principal, granted scope, needed scope, and the narrowest scope that suffices.
5. **Network.** Read the infrastructure and configuration for ports, endpoints, and interfaces reachable beyond their intended audience. The definition is the evidence for the declared exposure; whether it is applied, and how well the service behind it authenticates, are separate gaps, each with a concrete check the owner can run, such as reading the applied rule from the provider's console or CLI and trying the login from an approved network. Never connect to, scan, or log in to a live host. **Done:** each exposure has its source location, declared reach, and the unverified applied state.
6. **Judge.** Apply the threshold in [evidence](evidence.md). A credential value in a log, a permission, or an exposure is confirmed as [evidence](evidence.md#threshold-for-a-confirmed-finding) maps it, and rated [by reach](evidence.md#severity-and-classification). **Done:** every item is confirmed with severity and classification, 待驗證 with the missing fact, or excluded with the reason.
7. **Dispatch.** Treat an exposed credential as compromised and recommend rotating it first; deleting the log or history alone does not undo the exposure. Hand rotation, revocation, log removal or masking, permission changes, and containment to the receiver [the entry](../SKILL.md#work-with-existing-flows) names for environment and pipeline changes, each marked as needing the user's authorization, with the dispatch brief defined there. A pipeline or infrastructure definition that sets a permission or an exposure is such a change, not a code change. Application code changes, such as stopping a program from printing a secret, go to the project's implementation entry point. **Done:** every confirmed finding has a receiver, a named action, and the authorization it needs.

## Output

The fixed report from `SKILL.md`: scope with the unexamined set, each finding with its six elements, location, severity, classification, and [completion state](evidence.md#completion-states), 待驗證 items, and a dispatch brief per action with its authorization marked.

## Done

An exposure review is done when every inspected category has a disposition and every finding has a dispatch with its authorization stated. No action has been taken by this skill; rotation, deletion, and permission changes are done only by their receivers after the user authorizes them.

## Blocked

The applied state of infrastructure, the readers of a log, or a credential's reach is not available: report the finding the evidence supports and name the owner-run check that would close the gap. The entry's [Safety floor](../SKILL.md#safety-floor) still applies; never probe a deployed system to unblock.

## Handoff

Rotation, revocation, log removal, permission changes, containment, and code changes go to the receivers in [the entry](../SKILL.md#work-with-existing-flows). Evidence that a credential was used by someone else, or of a compromise in progress: say that commanding an active incident is not yet part of this skill, hand the evidence to the user and the environment receiver, and note that containment needs the user's authorization. The task the handoff came from, such as diagnosing a failing run, stays with the sender; say that it can continue. After delivery, re-review the fixed state under [evidence](evidence.md#completion-states).

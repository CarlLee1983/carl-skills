# Environment

Inventory, create, and adjust environments: configuration, networking, permissions, secrets injection, and external dependencies.

## Triggers

Listing what an environment contains or how two environments differ; creating or changing an environment, its config, network rules, roles, or secret wiring; onboarding an external dependency; drift between declared and actual state.

## Inputs

- Environment name and its concrete account, project, region, cluster, or namespace.
- The source of truth: infrastructure as code, config repos, platform settings, runbooks. Note which is authoritative when several exist.
- The requested change or question, and the authorization in force.

## Steps

1. **Inventory.** Read the declared state (IaC, config files, manifests) and query actual state with the project's own tools, read-only. List services, config keys, network paths, identities and roles, secret references, and external dependencies. Record secrets by name and injection point only. **Done:** each item shows declared value, actual value or `未知`, and source.
2. **Compare.** Mark drift between declared and actual state, between environments when asked, and against the requested target. For permissions, mark grants wider than the stated need. **Done:** each difference names both sides and its evidence.
3. **Plan.** For a change, propose it in the source of truth (IaC or config) rather than by hand, with a plan or dry-run output where the tool provides one, the blast radius, ordering, and how to revert. Reconcile manual dashboard changes with the source of truth first, since a declarative apply can overwrite them. Prefer non-production first. **Done:** each change can be approved separately, with production or credential effects named.
4. **Apply.** Within authorization, apply exactly the reviewed plan through the project's method, then re-query actual state. **Done:** actual state matches the target and the evidence is attached; a successful apply command alone is not enough.

## Output

The fixed report from `SKILL.md`, with an inventory or diff table (item, declared, actual, source, label) and, for changes, the plan output and post-apply state.

## Done

An inventory is done when every in-scope item is listed with a source or an explicit gap. A change is done when re-queried actual state matches the target, declared state is updated in the source of truth, and the revert path is recorded.

## Blocked

Missing access or an unavailable platform tool: deliver the inventory from declared state, mark actual state `未知`, and give the exact query that would verify it. A conflict between two sources of truth goes to the user before any change.

## Handoff

Exposed secrets, overly broad permissions, or network exposure → the CISO role (the `ciso` skill when installed), with evidence. Architecture choices (new environments, network topology) → SA. Pipeline changes → [ci](ci.md). Deploying into the environment → [deploy](deploy.md).

# Deploy

Pre-deploy checks, deployment, traffic shifting, service verification, and rollback for services. Package and CLI publication belongs to [release](release.md); this file takes over once a service version is chosen.

## Triggers

Deploying or promoting a service version to an environment; canary, blue-green, or gradual traffic shifts; verifying that a deployment works; rolling back or rolling forward.

## Inputs

- Service, environment (with account, region, cluster, or namespace), and the fixed SHA or artifact digest to deploy. Reuse release's fixed SHA and version when release ran first.
- The project's deployment method: workflow, platform command, GitOps repo, or runbook. Use that method; never introduce a different tool.
- Required checks for that SHA, the current live version, pending migrations, config and secret changes, and dependent services.
- Verification signals: health endpoints, smoke tests, SLIs and their thresholds, dashboards.
- Rollback path and the authorization in force.

## Steps

1. **Readiness.** Confirm required checks passed on the exact SHA and artifact (see [evidence](evidence.md) on binding). Confirm the target environment's config, secrets (by name), quotas, and dependencies exist. Identify migrations and classify each as backward compatible with the current code or not. Confirm the artifact that passed checks is the one being deployed (same digest), non-production stages passed where policy requires them, feature flags are set, and dashboards and alert thresholds cover the change. Record the live version as the rollback target. Secret and config changes count as deployments. Required checks on the exact artifact, the target environment's config and dependencies, migration compatibility, and a rollback path gate the deployment; missing dashboards or alerts are reported and handed to [observe](observe.md), and gate it only when project policy says so. **Done:** every readiness item is passed, failed, or a named gap, marked as gating or not.
2. **Plan.** Write the proposal: subject, environment, version from → to, ordered actions, traffic steps with hold times and abort thresholds, verification signals, and the rollback path for code, schema, and data separately. Write down the rollback command and its verification before deploying. Name every production-affecting action. A dry run proves packaging, not runtime behavior. **Done:** the plan is concrete enough that each action can be approved or refused on its own.
3. **Deploy.** Within authorization, run the project's method. Before each action, check whether it already happened (version already live, rollout in progress) to avoid repeating it. Record each action's status. **Done:** the platform reports the intended version live in the intended environment, or the action failed or is unknown.
4. **Shift traffic.** Move traffic in the planned steps. At each step, compare the verification signals with the thresholds before continuing. Breaching a threshold stops further shifting and, when rollback is authorized, triggers the rollback path; approval to deploy covers rollback only when it names rollback. **Done:** traffic sits at the planned final weight with signals inside thresholds, or shifting stopped with the reason recorded.
5. **Verify the service.** Run health, smoke, and SLI checks against the deployed version, binding results to version, environment, and time window. **Done:** `服務驗證通過` is recorded with evidence, or the failure is recorded; a successful command or deployment alone is never reported as verified.
6. **Roll back or forward.** When verification fails, assess the paths separately: code rollback (redeploy the recorded live version), schema (is the old code compatible with the migrated schema; is the migration reversible), and data (were writes made that the old version cannot read; is a restore needed). Connected resources and their data do not roll back with the code. Prefer the path the evidence supports, and stop before any path the assessment shows will fail, even when it is authorized. Data restores go through [recovery](recovery.md). **Done:** the chosen path's own completion state is verified, with the remaining paths' status recorded.

## Output

The fixed report from `SKILL.md`, with a per-environment table of version from → to, each action's status, the three delivery states (命令成功, 部署完成, 服務驗證通過), traffic weight, and the rollback assessment.

## Done

The authorized target state is reached and `服務驗證通過` is verified for the deployed version, or the deployment is stopped in a recorded, recoverable state with the next step named. When the platform confirms `部署完成` but service verification fails, report deployed but not verified; a passing CI run alone establishes neither.

## Blocked

Missing checks for the SHA, an unknown live version, an absent rollback path for a production change, or missing access block only the actions that depend on them. Deliver the readiness assessment and plan, list each gap and who can close it, and keep unaffected environments moving when authorized.

## Handoff

Failing checks → [ci](ci.md). Missing config, secrets, or access → [environment](environment.md). Users affected during rollout → [incident](incident.md). New dashboards or alerts → [observe](observe.md). Schema or data risk beyond the project's runbook → DBA. Code fixes → the project's implementation entry point, after checking for an existing ticket.

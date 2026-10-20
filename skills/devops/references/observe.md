# Observe

Logs, metrics, traces, health checks, service-level objectives, alerts, and runbooks.

## Triggers

Checking whether a service is healthy; reviewing or designing dashboards, alerts, or SLOs; noisy or missing alerts; writing or reviewing a runbook; adding instrumentation or health endpoints.

## Inputs

- Service, environment, and the observability platform the project uses.
- Existing SLOs, alert rules, dashboards, health endpoints, and runbooks.
- User-facing journeys that matter and any stated reliability target.

## Steps

1. **Inventory.** List the signals that exist for the service: logs (with retention), metrics, traces, health endpoints, SLOs, alert rules with their routes, and runbooks. Query them read-only. **Done:** each signal names its platform object or is marked missing.
2. **Assess coverage.** For each key journey, check whether a symptom-based signal would detect it failing (errors, latency, saturation, availability), whether an alert pages a named owner, and whether the alert links a runbook with concrete first actions. Mark alerts that fire without action as noise and journeys without alerts as gaps. **Done:** every key journey has a detection path or a named gap.
3. **Health check.** When asked whether the service is healthy now, query current signals bound to version, environment, and time window, and compare with thresholds. **Done:** the state is reported with the queries and window used; no signal means `未知`, not healthy.
4. **Propose or apply.** Propose SLOs only from measured baselines or the user's stated target; propose alerts as rules in the project's platform or config repo. Within authorization, apply them and confirm the platform object exists and is routed. **Done:** each new alert or schedule names its platform object, route, and owner.

## Output

The fixed report from `SKILL.md`, with a signal inventory, a journey-by-signal coverage table, ranked gaps (undetected user impact first, then unowned alerts, then noise), and created objects.

## Done

Coverage is assessed for every key journey; any monitoring promised to continue is backed by a named platform object and owner (see [evidence](evidence.md)). A health statement cites its queries and window.

## Blocked

No access to the platform: deliver the inventory from config and code (instrumentation, alert files), mark live state `未知`, and give the exact queries to run. No baseline data: propose how to collect it instead of an SLO number.

## Handoff

Active user impact → [incident](incident.md). Instrumentation code → the project's implementation entry point. Capacity or cost questions from the data → [optimize](optimize.md).

# Recovery

Review backups, run restore drills, recover data and environments, and verify the recovery point, duration, and result.

## Triggers

Asking whether backups are sufficient; planning or running a restore drill; restoring lost or corrupted data; rebuilding an environment; confirming recovery objectives (RPO, RTO).

## Inputs

- Data stores and environments in scope, their backup mechanisms, schedules, retention, and storage locations.
- Stated recovery objectives, or a note that none exist.
- For a real recovery: what was lost, when, and the authorization in force; restores over live data are always named actions.

## Steps

1. **Review backups.** For each store, record the mechanism, schedule, last successful backup time, retention, location (and whether it is isolated from the primary's failure and access; a backup in the same account or failure domain as the primary is not isolated), encryption, and the last restore test. **Done:** each store has these fields with sources, or named gaps.
2. **Assess.** Compare the backup schedule and last success with the stated RPO, and the last measured restore duration with the RTO. A store that has never been restored has unproven recoverability, regardless of backups present. **Done:** each store is marked 還原已驗證, 僅備份存在, or 無備份, with evidence.
3. **Plan a drill or recovery.** Restore into an isolated target unless the user explicitly authorizes restoring over live data. Define integrity checks (row counts, checksums, application-level reads) and what to measure. For real recovery, choose the restore point from evidence of when loss began. **Done:** the plan names target, source backup, checks, and the effect on live systems.
4. **Restore and verify.** Within authorization, run the restore with the project's tools, then run the integrity checks. Measure the actual recovery point (newest data present) and duration. **Done:** `還原已驗證` is recorded only with passing checks and both measurements.

## Output

The fixed report from `SKILL.md`, with a per-store table (mechanism, last backup, retention, isolation, last restore test, status), drill measurements against objectives, and the gaps that keep recoverability uncertain.

## Done

A review is done when every store has a status; a drill or recovery is done when integrity checks pass and the measured recovery point and duration are recorded. Backup presence never stands in for restore evidence (see [evidence](evidence.md)).

## Blocked

No access to backup storage or no isolated target: deliver the review from configuration, keep recoverability marked uncertain, and specify the access or environment needed. Missing objectives: report measurements and ask the owner to set targets instead of inventing them.

## Handoff

Data integrity judgment, schema-specific restores, and point-in-time recovery decisions → DBA. Rebuilding environments → [environment](environment.md). An active outage → [incident](incident.md). Scheduled drills → a named platform schedule with an owner, or a tracker ticket.

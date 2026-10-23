---
status: accepted
---

# Maintain the DBA Role Skill in carl-skills

On 2026-10-23, the user selected consolidation of the local `dba-skill` candidate into this collection and removal of the original directory after verification. `skills/dba/` is the single product source; `docs/dba/` owns specifications and development tooling. Local historical evidence is retained losslessly under `.scratch/dba/validation/`.

This revises the dedicated-repository choice in [dbcli ADR-0045](https://github.com/CarlLee1983/dbcli/blob/main/docs/adr/ADR-0045-the-dba-role-skill-lives-outside-dbcli.md) and [issue #233](https://github.com/CarlLee1983/dbcli/issues/233#issuecomment-6233385467). The reason for separation from dbcli still holds: DBA workflows also orchestrate native tools and AWS, and follow their own maintenance cadence. This collection already provides self-contained skill directories and per-skill releases, so a separate repository adds no required boundary.

The `dba` entry remains independent of `devops`. dbcli provides capability-based tools; DBA assessment and human runbooks remain in `dba`. Product text and safety boundaries are unchanged by this move. Existing B1/B2 evidence retains its original candidate identity; B3 behavior, live-environment coverage, native skill discovery and human acceptance remain pending where previously unproven. Consolidation does not authorize installation, publication, or database/cloud changes.

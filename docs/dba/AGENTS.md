# Development agreement

Use Bun. DBA behavior work is bounded by a human-selected Warrant Story in `specs/` (Goal, Out of Scope, Acceptance Criteria). The imported [B3 candidate](specs/b3-candidate.md) records the previously approved development scope; consolidation does not resume that work or complete its acceptance. Preserve the accepted [B1 candidate](specs/b1-candidate.md) and [B2 candidate](specs/b2-candidate.md) baselines. Agent-authored intent is not new authorization.

`make verify` from this directory is the canonical DBA behavior gate. New evidence goes under `../../.scratch/dba/validation/.verification/`. Consolidation preserves existing candidate acceptance limits; it does not select new B3 work. Keep behavioral evidence tied to reconstructable source, fixtures, oracle, model and runner. Unexecuted cases are not PASS. Final acceptance requires human review of that same candidate. Preserve historical failures and report partial results honestly.

The product is `../../skills/dba/`; evaluation tools are development-only. Test actual Skill execution through intercepted tool calls. Do not replace it with a parallel decision engine or text-presence tests. Credentials and sensitive evidence never enter fixtures or published records.

Commit, push, GitHub creation, publication and live database/cloud operations require explicit authorization. Resource changes in B1, B2 and B3 are human-only, including isolated environments. Do not install the candidate into a user's global skills directory as part of development.

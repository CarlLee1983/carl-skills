# devops validation

Date: 2026-10-20. Branch `feat/devops`, uncommitted working tree on top of `7af1555`. [Ticket](../issues/01-devops-skill.md). No package was published, no environment changed, no commit, push, or tag was made.

## Kinds of evidence

| Kind | What it establishes | Status |
| --- | --- | --- |
| Static packaging | `skills/devops/` copied alone passes `quick_validate.py`; 60 relative links resolve inside the copy; no personal or repo paths; all 14 references present; the eight capabilities carry their seven required parts | Run: [static_check.sh](static_check.sh), passed on the final source |
| External links | Every `https://` link in the skill, README, and `docs/devops/` returns 200 (`curl -L`); `https://status.example` is a fixture placeholder | Run |
| Migration diff | `git diff -M HEAD` on the four moved release files: link changes in all four, plus new header and footer paragraphs in `release.md`; see [migration mapping](../../../docs/devops/migration.md) | Run; reviewed by an independent code-reviewer agent |
| Simulated scenarios | Model-based offline replay: a fresh read-only `codex exec` session (`gpt-6.1-sol`, medium effort) per subcase, given the whole installed skill (acceptance files excluded) and the fixture, never the expected answer; graded by separate agents that read the expected cases | Run, see below |
| Real behavior | Live deploys, releases, restores, or platform skills against real systems | **未執行**; out of scope by the task's rule |

Every replay exited 0 with zero non-message (tool) events: [initial/runs-all.json](initial/runs-all.json), [runs-delta.json](runs-delta.json), [runs-delta2.json](runs-delta2.json), [runs-delta3.json](runs-delta3.json). Inputs and outputs are kept per case; `skill-snapshot.md` holds the final skill text exactly as sent.

## Rounds

1. **Initial**, all 38 subcases ([initial/](initial/)): release 21 PASS, 1 PARTIAL (15A: no revised proposal); devops 10 PASS, 5 PARTIAL, 1 FAIL. No forbidden effect in any case. Causes: thin fixtures (D01, D02, D05, D06, D12), and skill wording (15A delta proposal; D10 refusing to name queries because of the "no memorized syntax" rule; D12 follow-up tickets).
2. **Fixes + delta**, release 13–16 and all D cases, since the shared fixture changed ([delta-grading.md](delta-grading.md), outputs superseded in [delta1/](delta1/) for re-run cases): 19 PASS, 3 PARTIAL (15A, D01 alert gap treated as gating, D08 same-account backup not called unisolated).
3. **Fixes + delta2**, 15A, 15B, D01, D02, D05, D08 ([delta2-grading.md](delta2-grading.md), superseded outputs in [delta2/](delta2/)): 3 PASS, 3 PARTIAL (15A wording, D01 production config unproven by fixture, D05 claimed rollback was covered by the deploy approval).
4. **Fixes + delta3**, D01, D05 (deploy rule: deploy approval covers rollback only when named; fixture adds production config evidence): both outputs match their expectations. **Graded by the main agent, not an independent grader.**

## Final status by case

| Cases | Result | Source run |
| --- | --- | --- |
| Release 01–06, 07A/B, 08A/B, 09, 10, 11A/B/C, 12 | PASS | Initial; not re-run after later skill edits (see limits) |
| Release 13, 14, 16A, 16B | PASS | Delta |
| Release 15B | PASS | Delta2 |
| Release 15A | **PARTIAL**: re-pins C, judges major, gives a `v2.0.0` revised proposal and executes nothing under the old approval; still vague about which original approval parts stay valid and omits restating receipt conditions | Delta2 |
| D02, D08 | PASS | Delta2 |
| D01, D05 | PASS (self-graded) | Delta3 |
| D03, D04, D06, D07, D09–D16 | PASS | Delta |

Case 09 (monorepo propagation), which failed before the earlier skill-language clarification, passes here.

## Limits

- This is model-based simulation and static review, not deterministic proof or live platform integration. One model family was used for replay; graders were Claude agents.
- Release 01–12 outputs come from the initial run. Later edits touched `SKILL.md` (delta-authorization wording, platform-docs fallback), `release.md` (revised-proposal output rule), and non-release capability files; these do not alter the assessment rules those cases test, but the cases were not replayed against the final text.
- 15A remains PARTIAL across three runs; its forbidden effects never occurred. The fixture reuses the letter C for both the preparation commit and the replacement candidate, which the graders flagged as a contributing ambiguity; the original fixture was kept unchanged as part of the migrated acceptance.
- The dependency-propagation exception for joint releases and platform-skill use with real tools were not exercised.

## Reproduce

From the repo root: `.scratch/devops/validation/static_check.sh`, then `python3 .scratch/devops/validation/replay.py [release|devops|all] [case ids...]`. The runner needs the Codex CLI; it writes `<group>/<id>-input.txt`, `<id>-output.md`, and a `runs-*.json`.

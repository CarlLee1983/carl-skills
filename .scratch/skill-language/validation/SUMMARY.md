# Skill language validation

Date: 2026-10-19. Baseline: `9862035e06d16252872d9f42dec076ae1c251f73` on `main`. [Work item](../issues/01-english-instructions.md).

## Scope and reason

The user approved concise English descriptions and general agent rules to reduce context cost, retaining Chinese semantics, examples, and specified output. Updated all five skill entry points plus operational references for design-experience, plan-pm, and release-assessment (10 skill files). The repo's `AGENTS.md` owns the language convention; no global rule or calibration ledger was changed.

Preserved Chinese user replies, `單次交接`, release output values/report example, policy template, humanize-writing language references, UI metadata, README, maintenance specs/acceptance fixtures, and historical validation reports. The unrelated `.scratch/carl-personal-website/` remains untouched. No installed skill copy was updated.

One narrow clarification makes existing release acceptance case 09 explicit: a dependent's missing preparation does not block an independently ready dependency unless policy requires joint release; dependency-first order is distinct from unknown operational commands. The original Chinese text reproduced the same failure, so this is a clarification of the existing acceptance contract, not evidence of translation regression.

## Token measurement

Measured with `tiktoken 0.14.0`, `o200k_base`, comparing HEAD to the final source. [Per-file counts](tokens.json), [measurement script](measure_tokens.py).

| Source text | Before | After | Reduction |
| --- | ---: | ---: | ---: |
| Five descriptions | 386 | 255 | 131 (33.9%) |
| Ten changed skill files, including descriptions | 13,831 | 10,508 | 3,323 (24.0%) |

The repo policy grows from 585 to 648 tokens (+63). Description savings minus that policy growth are 68 tokens when both are included. Skill bodies/references load on demand; their aggregate reduction is not a per-turn saving. These are named-tokenizer estimates, not runtime billing or a claim about every model's encoding. `uv run --no-project --with tiktoken python .scratch/skill-language/validation/measure_tokens.py` uses an ephemeral dependency environment; no project dependency was added.

## Static and packaging checks

- All five skill directories were independently copied to temporary directories. Installed `quick_validate.py` passed for each; local Markdown links resolved within each copied skill. [Initial static report](static.json).
- Humanize reference filenames are unchanged and their files are present in the copied package. Chinese/English reference content, release acceptance cases, README, and all UI YAML were compared byte-for-byte against HEAD and remain unchanged.
- After the release paragraph clarification, its metadata validator and whitespace gate passed again. Unchanged packaging/link checks were reused.
- `git diff --check` and new-file `git diff --no-index --check /dev/null <file>` checks passed. New evidence files normalize line-end whitespace and trailing blank lines; simulation wording is preserved.
- Fresh independent reviewer `/root/language_review` understood the repo language rule and reviewed the 11-file source checkpoint with no material semantic findings. It then reviewed only the two-sentence release delta and its new evidence, also clean. Source hashes/checkpoint evidence are in `static.json`, `final-checkpoint.json`, and `source.patch`.

## Behavioral evidence

### Release assessment

[Replay runner](replay_release.py) creates a fresh ephemeral, read-only Codex CLI session for each of 22 acceptance subcases, using the configured subagent model `gpt-6.1-sol` at medium effort. Prompts include the skill, offline common evidence, and case inputs, excluding expected answers. No real workflow operations are allowed. [Original run metadata](release/runs.json) records successful exits and zero non-message/tool events. Inputs and actual outputs are preserved per case in `release/`.

| Cases | Result |
| --- | --- |
| 01–06, 07A/B, 08B, 10, 11A/B/C, 12–14, 15A/B, 16A/B | Pass: required decisions, evidence gaps, scoped authorization, and event boundaries preserved. |
| 08A | Three decisions pass. The fixture's wording about only artifact/check evidence leaves cadence scope ambiguous; do not treat this as proof of cadence isolation. |
| 09 initial | Failed: cli's missing update incorrectly blocked core and release order was treated as unknown. |
| 09 original Chinese baseline | Same failure, [actual output](baseline/09-output.md). |
| 09 final clarification | Pass: core ready, cli blocked, site waits; core → cli; new candidate checks required. [Actual output](release-delta/09-output.md). |

The independent reviewer graded every initial output and the targeted final replay. Only the monorepo paragraph changed after the original runs, so unaffected results were reused. The fixed-version/joint-release exception remains intact by static review; it was not separately replayed.

### Design, PM, and writing

[Inputs](behavior-inputs.md), [actual outputs and source hashes](behavior-output.md). A separate read-only evaluator processed 15 cases independently within one session, without original versions, expected answers, or historical results. The reviewer graded D1–D3/D5, P1–P6, H1–H4 as passing.

D4 initially preserved authorization but assumed outstanding checks absent from its fixture, possibly carrying D3 context. A [fresh isolated replay](d4-isolated/output.md) passed without inventing a known gap; its run recorded no tool events. This is sampled text behavior, not browser or live PM execution. Other maintenance scenarios were not replayed; these samples and static equivalence review do not establish exhaustive cross-model correctness.

### Description selection

[Inputs](routing-input.txt), [outputs](routing-output.json), [runner](check_routing.py). All 12 Chinese/English requests selected the expected skill or no skill, including excluded CSS edits, ordinary README edits, and translation requests. The first run's metadata lacked command detail; a diagnostic rerun recorded two reads of `~/.agents/carl-mode/INDEX.md`, with no full skill-body reads. Both selected correctly. This is not a strictly tool-free metadata test; the host routing context remains an isolation limitation.

## Rollback and activation

`source.patch` is a zero-context diff containing only the 11 tracked source-file changes, excluding evidence and unrelated work. To undo after checking for subsequent edits, use `git apply --reverse --unidiff-zero --check .scratch/skill-language/validation/source.patch`, then the same command without `--check`. Preserve evidence if useful; no history rewrite is needed.

At the validation checkpoint, changes existed only in this repository's working tree. Updating installed skills is a separate operation; the current session's already-loaded catalog has not been refreshed. No commit, push, publication, real release, or global configuration change was performed.

PR preparation: the user subsequently authorized commit, push, and PR creation. The rollback patch was converted to zero-context format to avoid whitespace-only context lines in the staged whitespace check; source content and behavioral evidence are unchanged.

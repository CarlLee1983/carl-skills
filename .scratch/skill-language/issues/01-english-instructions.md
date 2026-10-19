# Prefer concise English for agent instructions

Status: ready-for-agent
State: closed
Blocked by: none
Owner: primary agent

## Scope and acceptance

The user approved English skill descriptions and general execution rules, preserving Chinese semantics, examples, and specified output. Apply this to this repository's five skills and their operational references. Keep human-facing docs, UI metadata, Chinese writing guidance, acceptance fixtures, and historical evidence in their existing language.

- Preserve trigger branches, workflow decisions, authorization, verification, and output contracts.
- Record the language convention once in the repo's `AGENTS.md`.
- Validate metadata, portable links, whitespace, and affected behavior with independent review.
- If measuring tokens, record the tokenizer and before/after counts without claiming runtime billing equivalence.
- No installed-skill updates, global configuration changes, commits, pushes, or releases.

## Comments

- 2026-10-19: Started from clean tracked `main`; preserve unrelated untracked `.scratch/carl-personal-website/`. Language inventory complete; design-experience and plan-pm translations delegated with separate file ownership. Primary owns release-assessment, English description cleanup, policy, integration, and evidence.

- 2026-10-19: Completed all five descriptions and operational prose, policy, metadata/packaging/links, token measurement, 22 release subcases with targeted baseline/delta replay, 15 behavior samples with isolated D4 replay, 12 routing requests, and independent source/evidence review. Final scope, limitations, and rollback: [validation summary](../validation/SUMMARY.md). No commits or installation updates.

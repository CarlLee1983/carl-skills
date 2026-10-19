---
name: calibrate-codex
description: Calibrate Codex from feedback or recurring failures using the narrowest instruction, skill, hook, rule, or validation gate. Use to 調校 Codex, remember workflow rules, or prevent repeated mistakes; excludes ordinary document edits and other agents' configuration.
---

# Calibrate Codex

Turn observed behavior into a small, testable control. Do not treat every preference as a global rule.

This skill targets Codex. Resolve its active home from `CODEX_HOME`, defaulting to `~/.codex`; use that location for user-level files below. Before changing version-dependent settings, hooks, or rules, check the installed Codex capabilities and relevant [official configuration](https://developers.openai.com/codex/config-advanced) or [hook documentation](https://learn.chatgpt.com/docs/hooks). If the required capability is unavailable, report the gap and prepare only the supported, authorized part.

## 1. Capture the signal

Identify the concrete failure or desired behavior, its scope, and at least one example. Distinguish:

- explicit policy: persist when requested;
- recurring failure: persist when supported by repeated evidence;
- one-off preference: keep in the current prompt unless the user asks to persist it.

Do not infer a broad policy from a single ambiguous outcome.

## 2. Audit before editing

Inspect active instruction and configuration layers relevant to the current working directory:

- `AGENTS.md` / `AGENTS.override.md` in the active Codex home and the applicable repo directories;
- `config.toml`, `hooks.json` or inline hooks, and `rules/*.rules` in the active Codex home and trusted repo `.codex/` layers, accounting for active overrides and managed constraints;
- existing skills or plugins with overlapping responsibility;
- repository-native checks such as tests, lint, pre-commit, and CI.

Preserve unrelated configuration and user work. Never expose credentials while inspecting config.

## 3. Select one primary control surface

Choose the narrowest surface that can reliably own the behavior:

| Signal | Primary surface |
| --- | --- |
| Current-task constraint | Prompt/thread context |
| Personal preference across repositories | `AGENTS.md` in the active Codex home |
| Repository convention or command | Closest repo `AGENTS.md` |
| Repeatable multi-step procedure | Skill |
| Deterministic tool-lifecycle invariant | Hook |
| Command sandbox/escalation decision | `.rules` file |
| Team quality requirement | Test, linter, pre-commit, CI, or managed policy; verify how execution is enforced |

Do not duplicate the same rule across surfaces merely for emphasis. Use guidance to explain intent and mechanical enforcement only where it is deterministic.

## 4. Design the smallest change

Write rules as observable behavior:

- trigger or scope;
- required or forbidden action;
- safe alternative or exception;
- verification method.

Avoid vague aspirations, task-specific filenames in global rules, transcript scraping, and hooks that guess semantic intent. Keep global guidance short because it consumes every session's context.

For hooks, fail open on malformed input unless the malformed input itself is the protected condition. Provide a documented user-controlled escape hatch for global guards. For rules, include `match` and `not_match` examples when useful.

## 5. Validate at the owning boundary

- `AGENTS.md`: start a fresh Codex session and ask it to list active instruction sources and summarize the target rule.
- Skill: locate and run an installed skill-creator `quick_validate.py` when available; otherwise check frontmatter and local references and report that the validator was unavailable. Forward-test when the workflow contains non-trivial judgment; metadata checks do not prove behavior.
- Hook: run the script against allow and deny JSON fixtures and validate its configuration against the installed version's schema. Where supported, have the user review/trust it through `/hooks`; report trust as pending until verified.
- Rule: use the installed `codex execpolicy check` interface for matching, non-matching, and overlapping historical rules when available.
- CI/check: demonstrate one failing and one passing case when practical.

Record checks not run and why, including unavailable CLI commands or a fresh-session check that cannot be performed. Never claim a global Codex change is active in the current session when it only loads on restart.

## 6. Record and report

Append a concise entry to `calibration/ledger.md` under the active Codex home when global state changes. Include date, signal, evidence, selected surface, files changed, validation, and rollback. Do not put secrets or full transcripts in the ledger.

Report what changed, why this surface was chosen, what remains inactive until restart/trust, and how to undo it. If the control creates noise or false positives, weaken or remove it rather than layering exceptions indefinitely.

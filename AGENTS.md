# Repository Guidelines

## Project Structure & Module Organization

This repository provides a reusable prompt-based release-assessment skill. `SPEC.md` defines its behavior.

- `SPEC.md` is the authoritative specification, including the project-policy template and 16 acceptance scenarios.
- `.gitignore` excludes the local `graft/` graph cache; `.ignore` controls its search visibility. Preserve both conventions.
- `release-assessment/SKILL.md` is the portable entry point; `references/` contains conditional operation guidance, the policy template, and acceptance scenarios.
- `.scratch/release-assessment/issues/` records implementation work. No application runtime or test framework is required.

## Build, Test, and Development Commands

No build system, package manifest, formatter, linter, or test runner is configured. Use repository inspection and documentation checks:

- `git status --short --branch` — inspect the branch and pending changes before editing.
- `git diff --check` — detect whitespace errors in tracked changes.
- `git diff --no-index --check /dev/null <new-file>` — check an untracked Markdown file.
- When the Codex skill-creator tools are installed, run `python3 ~/.codex/skills/.system/skill-creator/scripts/quick_validate.py release-assessment` to validate skill metadata.
- Follow `release-assessment/references/acceptance.md` for behavioral simulation; metadata checks alone do not validate decisions.

Document runnable commands when implementation introduces tooling.

## Writing Style & Naming Conventions

Use descriptive Markdown headings, short paragraphs, fenced examples, and tables for comparable outputs. Preserve Traditional Chinese terminology in `SPEC.md`. Use lowercase hyphenated names for skill directories, such as `release-assessment`, and the required `SKILL.md` entry-point filename. Keep shared assessment logic separate from project-specific policy; reference authoritative rules instead of duplicating them.

## Testing Guidelines

Use the acceptance scenarios in `SPEC.md` as the behavioral checklist. Verify change inclusion, version adjustment, and release readiness independently. Include missing evidence, monorepo dependencies, non-SemVer policies, and partial authorization cases. Simulate release actions rather than publishing real artifacts during validation. No automated coverage threshold or test naming convention exists yet; document the chosen framework and commands when adding tests.

## Commit & Pull Request Guidelines

Use concise imperative subjects describing the actual change, consistent with the initial commits. No enforced commit-prefix convention exists. PR descriptions should identify the affected specification or behavior, relevant acceptance scenarios, validation performed, and remaining limitations. Link an issue when one exists. Preserve unrelated uncommitted work.

## Release Operations

Follow the proposal and authorization contract in `SPEC.md` before version changes, tags, or publication. Assessment results alone do not authorize execution. Commit, push, and remote workflow actions must also be included in the approved scope.

## Agent skills

### Issue tracker

Track work in local Markdown under `.scratch/<feature>/`. See `docs/agents/issue-tracker.md`.

### Triage labels

Use the five default triage roles. See `docs/agents/triage-labels.md`.

### Domain docs

Use a single-context glossary and ADR layout. See `docs/agents/domain.md`.

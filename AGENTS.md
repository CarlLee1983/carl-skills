# Repository Guidelines

## Project Structure & Module Organization

This repository currently contains the specification for a reusable release-assessment skill, not an implemented application.

- `SPEC.md` is the authoritative specification, including the project-policy template and 16 acceptance scenarios.
- `.gitignore` excludes the local `graft/` graph cache; `.ignore` controls its search visibility. Preserve both conventions.
- No source, automated test, or asset directories exist yet. The planned skill entry point is `release-assessment/SKILL.md`; treat that path as a future deliverable.

## Build, Test, and Development Commands

No build system, package manifest, formatter, linter, or test runner is configured. Use repository inspection and documentation checks:

- `git status --short --branch` — inspect the branch and pending changes before editing.
- `git diff --check` — detect whitespace errors in tracked changes.
- `git diff --no-index --check /dev/null AGENTS.md` — check this file while it remains untracked; substitute another new file as needed.

Document runnable commands when implementation introduces tooling.

## Writing Style & Naming Conventions

Use descriptive Markdown headings, short paragraphs, fenced examples, and tables for comparable outputs. Preserve Traditional Chinese terminology in `SPEC.md`. Use lowercase hyphenated names for skill directories, such as `release-assessment`, and the required `SKILL.md` entry-point filename. Keep shared assessment logic separate from project-specific policy; reference authoritative rules instead of duplicating them.

## Testing Guidelines

Use the acceptance scenarios in `SPEC.md` as the behavioral checklist. Verify change inclusion, version adjustment, and release readiness independently. Include missing evidence, monorepo dependencies, non-SemVer policies, and partial authorization cases. Simulate release actions rather than publishing real artifacts during validation. No automated coverage threshold or test naming convention exists yet; document the chosen framework and commands when adding tests.

## Commit & Pull Request Guidelines

The repository has no commits yet, so no historical message convention exists. Use concise imperative subjects describing the actual change. PR descriptions should identify the affected specification or behavior, relevant acceptance scenarios, validation performed, and remaining limitations. Link an issue when one exists. Preserve unrelated uncommitted work.

## Release Operations

Follow the proposal and authorization contract in `SPEC.md` before version changes, tags, or publication. Assessment results alone do not authorize execution. Commit, push, and remote workflow actions must also be included in the approved scope.

## Agent skills

### Issue tracker

Track work in local Markdown under `.scratch/<feature>/`. See `docs/agents/issue-tracker.md`.

### Triage labels

Use the five default triage roles. See `docs/agents/triage-labels.md`.

### Domain docs

Use a single-context glossary and ADR layout. See `docs/agents/domain.md`.

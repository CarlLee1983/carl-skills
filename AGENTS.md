# Repository Guidelines

## Project Structure & Module Organization

`carl-skills` is a collection of independently installable, self-contained agent skills.

- `skills/<skill-name>/SKILL.md` is each skill's entry point. Keep its required references, scripts, and assets within that directory.
- `docs/<skill-name>/` holds specifications and maintenance documents. The release-assessment specification is `docs/release-assessment/SPEC.md`.
- `README.md` lists available skills and installation guidance; update it when adding a skill.
- `.scratch/<feature>/` records tickets and validation evidence. Preserve historical reports as evidence of their original checkpoints.
- `.gitignore` excludes the local `graft/` cache; `.ignore` controls its search visibility. Preserve these conventions.

## Build, Test, and Development Commands

No collection-wide build system, package manager, linter, or runtime is configured.

- `git status --short --branch` — inspect the branch and pending changes before editing.
- `git diff --check` — check tracked changes for whitespace errors.
- `git diff --no-index --check /dev/null <new-file>` — check a new Markdown file.
- If Codex skill-creator tools are installed, run `python3 ~/.codex/skills/.system/skill-creator/scripts/quick_validate.py skills/<skill-name>` for metadata validation.

Document additional commands when a skill introduces executable tooling.

## Writing Style & Naming Conventions

Use descriptive Markdown headings, short paragraphs, fenced examples, and tables for comparable outputs. Name skill directories with lowercase hyphenated names and their entry points `SKILL.md`.

Write skill descriptions and general agent instructions in concise English. Preserve language-specific rules, examples, trigger phrases, fixed output text, and domain terminology where translation would lose meaning or change behavior. Human-facing documentation and UI metadata may retain their existing language. Review language edits for equivalent triggers, boundaries, and outputs; measure token savings with a named tokenizer rather than assuming them.

Keep each skill independently portable: required files and relative links must work when only its directory is installed. Reference project policies rather than copying them into shared instructions. Add scripts or abstractions only for demonstrated needs.

## Testing Guidelines

Verify affected behavior against the skill's specification and acceptance cases. For release-assessment, use `skills/release-assessment/references/acceptance.md`; simulate releases rather than publishing real artifacts. Metadata and link checks do not establish behavioral correctness. Reuse prior behavioral results for unchanged skill content after mechanical moves.

## Commit & Pull Request Guidelines

Use concise imperative commit subjects. PR descriptions should identify affected skills, behavior, validation, and limitations; link relevant tickets. Preserve unrelated work. Obtain authorization for commits, pushes, tags, and publication; assessment results alone do not authorize execution.

## Agent skills

### Issue tracker

Track work in local Markdown under `.scratch/<feature>/`. See `docs/agents/issue-tracker.md`.

### Triage labels

Use the five default triage roles. See `docs/agents/triage-labels.md`.

### Domain docs

Use a single-context glossary and ADR layout. See `docs/agents/domain.md`.

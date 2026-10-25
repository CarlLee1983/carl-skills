# Shared header delivery validation

Scope: accepted direction A, all 13 outer site pages including 404. Embedded case prototypes excluded. User requested finishing and publishing after selecting A. Baseline: `ec23251b7910c4c98be4a61ee39e86369916e781`.

## Checks

- `python3 .scratch/header-navigation/validation/check.py`: 13 pages; body content, previous navigation targets, and local target/fragment validity checked against baseline. SVG symbols are not navigation targets; pre-existing unused/missing symbols are outside scope.
- `node --check site/assets/site.js` and `git diff --check`: pass.
- `static.json`: source SHA-256 digests and per-page checks.
- `layout.json`: Chrome browser DOM measurements at 1440×900 and 390×664; every outer page has five global links and document width equals viewport width. Header captures reviewed for homepage, design overview, CISO and representative detail; other captures retained locally.
- `interactions.json`: final performed browser results, including Enter, Escape/focus return, outside-body click, cross-skill route, chapter hash, and all three breakpoint focus transitions. No-script CISO fixture omits script tags and retains identical navigation/CSS; native disclosure exposes five links and navigates to PM. This does not claim JavaScript was disabled browser-wide.
- Independent reviewer checked production diff and then the focus-transfer delta: clean after correction. Breakpoint focus initially blurred before the media-query event; focus tracking now preserves a visible target.
- Before: `before-desktop.jpg`; after: `after-desktop.jpg`, `ciso-menu.jpg`. Screens capture header scope; existing body animations can still be in progress.

## Operational plan

Destination: `CarlLee1983/carl-skills`, GitHub Pages `github-pages` environment, `https://carllee1983.github.io/carl-skills/`. Existing `pages.yml` deploys `site/` when site changes merge into main. No new environment, dependency, permission, schema or data changes. GitHub CLI identity verified as CarlLee1983, version 2.97.0.

Before deploy: source review, local checks and fixed source digests above. Then publish branch/PR, merge only reviewed head, wait for Pages workflow for the resulting merge SHA, verify its deployment and production HTML/assets and navigation. Abort if source differs from reviewed head, required checks fail, workflow fails, or deployment identity differs.

Rollback candidate: baseline above. A code-only revert PR of the header merge commit (`git revert -m 1 <header-merge-sha>`), followed by normal review/merge/Pages deployment, restores previous site assets and HTML. Recheck source SHA, HTTP and navigation. No schema/data rollback required. Rollback is a recovery proposal, not an action performed or separately pre-authorized here.

Remaining verification gaps: physical mobile hardware, screen readers, Safari/Firefox, text zoom and comprehensive whole-page visual testing. No continuous monitoring is configured by this change. Deployment and production verification are recorded separately in this task's operational evidence after the actual workflow finishes.

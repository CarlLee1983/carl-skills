# design-experience v1.3.0 release preparation

This is a prepared proposal, not proof of publication or approval of its operations.

## Scope and identity

Queries started 2026-10-25 21:18 Asia/Taipei using authenticated `gh` and local `git`.

- Repository: `CarlLee1983/carl-skills`; default branch `main`; authenticated GitHub account `CarlLee1983`, repository permission ADMIN (verified).
- Baseline: published GitHub Release `design-experience/v1.2.0`, annotated tag peeled to `66866dc660c165a9af6f606026990224faf1f38b` (verified).
- Fetched base: `origin/main` at `9c8037dfacb2066fe8c1c70c336a953bdf7cafae` (verified).
- Candidate: all 14 files in `skills/design-experience/`, corresponding acceptance changes, issues 07/08 and selected autonomous, batch-practice and Impeccable validation evidence. The redundant historical `autonomous-20261024/source.patch` stays local; it is not referenced by the retained reports or fixtures. No CISO, README, site, global rules, hooks or unrelated scratch changes.
- Candidate package manifest SHA-256: `a29eb17ffbcecc12b18eacea239eb8bf7607149a9e5aca4bc9abc00282b0028b` (verified). Computed from sorted relative-path → file-SHA-256 JSON with sorted keys and compact separators.
- Intended channel/destination: ordinary per-skill annotated tag and GitHub Release, following [ADR 0003](../../../../docs/adr/0003-per-skill-versioning.md). No package registry or binary asset upload; no site deployment.
- Actual release commit and merge SHA do not exist yet. Record them only after the explicitly approved commit/merge operations and repeat checks on those actual sources.

## Decisions

| Decision | Result | Basis |
| --- | --- | --- |
| Include current changes | 需要 | Verified package diff adds autonomous decision mode, case comparison, tool output/write handling and optional Impeccable collaboration; these instructions are the delivered product. |
| Version | minor → v1.3.0 | Inferred from the verified ADR rule: new capabilities/modes/rules increment MINOR; no removed invocation or required new installation dependency was found. |
| Release now | 可發布（候選內容）；operations await explicit approval | Local preparation and candidate integration review passed. Recheck the actual commit, PR requirements and merged source before publishing; approval does not replace those checks. |

The Impeccable integration depends on the newer collaboration/evidence sections, so release the complete accumulated skill instead of publishing a detached adapter. Its upstream package is separately installed and is not vendored here.

## Verification

- Standalone 14-file skill copy: metadata and 26 local relative links/anchors passed.
- The first candidate whitespace check flagged blank context lines in the historical unified `source.patch`. Preserve that raw historical file unchanged in the original workspace and omit it from the published evidence set; all executable fixtures and source-hash records remain included. Run the full candidate whitespace gate after exclusion.
- `node --test skills/design-experience/scripts/tool-results.test.mjs`: 4/4 passed with Node v24.21.0.
- From `.scratch/design-experience/validation/autonomous-20261024/forward-results`, `node check-prototypes.cjs`: all 3 prototype checks passed. An initial invocation from repository root failed because fixture paths are relative to that directory; running from its intended directory resolved it without changing the historical script.
- Existing behavioral evidence: [autonomous scenarios](../autonomous-20261024/SUMMARY.md), [batch practice](../batch-practice-20261024/SUMMARY.md), [Impeccable selection scenarios](SUMMARY.md). Preserve the limits of each report; this preparation did not rerun human, device or visual tests or execute Impeccable.
- GitHub release v1.3.0, tag `design-experience/v1.3.0` and branch `release/design-experience-v1.3.0` were absent when queried. Check again immediately before creation.
- Existing workflow `.github/workflows/pages.yml` runs on `site/**` pushes to main or manual dispatch; this candidate changes neither site files nor workflows. No automated package release workflow was found.
- Independent candidate integration review by `/root/review_fit`: Clean on candidate tree `f35df7c967683a853c20d96663a7405db7e7ed94`; helper tests 4/4 and staged whitespace passed. That checkpoint includes the full accumulated source and release drafts; this record's later status update changes no skill content.
- Final scope allowlist passed for 51 changed files; source and isolated candidate package fingerprints match; all 62 relative links in changed maintenance/package Markdown resolve. The original worktree's index remains empty.
- GitHub branch rules query returned `[]`, and the legacy protection endpoint reported `Branch not protected`. Requery before merging and honor any later requirements; no bypass is proposed.

## Exact proposed operations

Approval is requested for the following complete sequence, conditional on unchanged candidate content and passing checks:

1. In the isolated worktree based on the fetched base, create branch `release/design-experience-v1.3.0`, commit only the reviewed candidate files with subject `Add autonomous batches and optional Impeccable collaboration`, record the actual SHA and verify its diff and package fingerprint.
2. Push only that branch to `origin`, using a normal non-forced push. Create a PR to `CarlLee1983/carl-skills:main` titled `Add autonomous batches and optional Impeccable collaboration` using [PR.md](PR.md). Inspect required checks/reviews and merge using `gh pr merge --merge --match-head-commit <candidate-SHA>` only when satisfied; do not bypass branch protection.
3. Fetch and verify the merged commit, its complete package fingerprint and scope. Create annotated tag `design-experience/v1.3.0` on the actual verified merge SHA, then push only `refs/tags/design-experience/v1.3.0`.
4. Publish the GitHub Release with `gh release create design-experience/v1.3.0 --repo CarlLee1983/carl-skills --verify-tag --title 'design-experience v1.3.0' --notes-file <RELEASE-NOTES.md>`. Verify the remote tag target and published release body/source links.
5. Back up the existing shared user skill directory and relevant installer metadata outside skill search directories; run the existing Skills CLI `npx skills update design-experience -g -y` to update only this global skill. Compare all 14 installed files with the released skill and verify the Claude Code symlink still resolves to the shared copy. Preserve other skills and installer entries. Record activation as installation success, not runtime/UI validation; a fresh skill read is needed in cached sessions.

Step 5 is included as an explicit optional local activation action in the requested approval; omitting it still allows remote publication but leaves the installed copy unchanged. Tool versions inspected: git 2.56.0, gh 2.97.0, Skills CLI 1.7.4. No version field, changelog bump, registry publish, site deployment, branch deletion or forced history operation is proposed.

## Stop and recovery conditions

- Stop dependent operations if source content, base history, destination, required checks, credentials or remote results differ. Reassess only the changed portion before asking for any expanded action.
- Before merge/publication, stopping leaves the original dirty worktree intact and a recoverable isolated candidate. A rejected PR does not authorize deleting remote objects.
- After merge, use a reviewed revert for source rollback; do not reset shared history. Once published, avoid moving/deleting the release tag. Correct a defective release through the next version according to project policy.
- For local activation failure, retain the backup and restore only affected skill files/metadata after comparing later changes; never overwrite unrelated installer state.

## Known limits and handoff

Issue 06 remains needs-triage and is not part of this release. Prior batch evidence includes paths in the separate local design-experience-lab repository; those paths are historical evidence pointers, not portable proof. Impeccable's actual command execution, detector behavior and UI quality uplift remain unverified. These gaps must remain explicit in release notes.

PM implementation closeout covers issues 07/08 and their recorded checks. DevOps owns the proposed commit/PR/tag/Release/activation sequence; approval and verified remote/installed results are still outstanding. This file does not claim the publication endpoint is complete.

## Authorized publication — 2026-10-27

User selected the PM handoff with「轉交給 devops 收尾發佈」. This authorizes the reviewed design-experience v1.3.0 commit, PR, merge, annotated tag and GitHub Release sequence. Optional local installation activation is excluded from this publication endpoint.

The refreshed base is `b72ef3675135d81268b03cdaf9f8a1d14bf13d42`; changes since the prepared base are confined to `site/`, outside the 51-file candidate. All 51 prepared files matched the original workspace before this status append. The 14-file skill fingerprint remains `a29eb17ffbcecc12b18eacea239eb8bf7607149a9e5aca4bc9abc00282b0028b`. Historical checks retain their original scope. Remote publication results will be verified after execution.

# Focused independent replay, v2

Evaluated **11 variants**, expanding monorepo case 09 to three units (**13 judgment rows**). Used the current SKILL.md, previously read operations.md, and raw v2 fixtures only; did not read SPEC or expected answers. Every variant resets facts and authorization. No network, actual release commands, or repository writes occurred.

## Scope and evidence

A=`aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`; B=`bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb`; C=`cccccccccccccccccccccccccccccccccccccccc` (case-local). Default scope: merged PR #12; orbit CLI; formal channel at registry.example/orbit; delivered baseline orbit 1.4.2/A; fixed candidate B. These defaults apply unless overridden below.

Evidence IDs: P=`RELEASE-POLICY.md`; K=`RELEASE-POLICY.md#checks`; D=`docs/release.md`; R=`releases/1.4.2.json`; F=`refs.json`; X=`PR-12.diff`; G=`diff/A..B`; T=`checks/B.json`; U=`authorization.txt`; TC=`checks/C.json`; Sxx=the named input in `final-inputs.md`; Q=its authorization common proposal/preflight evidence. IDs identify supplied simulated evidence, not real remote verification.

## Three judgments and next actions

| Variant/unit | Inclusion | Version adjustment | Release readiness | Evidence, reasoning and next action |
|---|---|---|---|---|
| 07A status | 需要 | 依專案策略 → 2026.10.18.1 | 可發布 | X/G/S07: unshipped page text correction. P/S07A fixes Taiwan date, daily sequence and release-version.txt authority; deployments/status.json establishes 2026.10.17.1/A. T proves test/build-site at B; per-change cadence satisfied. Prepare deployment proposal, no action authorized. |
| 07B status | 需要 | 不適用 | 可發布 | X/G/S07: same delivered page correction. P/S07B explicitly has no external version or version file; deployments/status.json establishes A without version. T and cadence pass. Prepare deploy.yml proposal without version/tag operations. |
| 08B orbit | 需要 | 資訊不足 | 被阻擋 | X/G/S08B confirm unshipped optional --color. P and equally authoritative maintenance guide disagree: minor versus major. T passes but cannot settle policy precedence. Resolve precedence, then select 1.5.0 or 2.0.0 and reassess. |
| 09 core | 需要 | minor → 1.3.0 | 可發布 | S09 core receipt establishes 1.2.0/A; B adds compatible API; independent policy and core B checks support release. Propose core release first. |
| 09 cli | 需要 | patch → 3.0.1 | 被阻擋 | S09 cli receipt establishes 3.0.0/A; exact core 1.2.0 dependency must change under P/S09. B does not yet contain required update. Passing B checks cannot validate missing content. Propose dependency preparation, then test the new fixed candidate and release after core. |
| 09 site | 不需要 | 不變 → 2.0.0 | 累積到下次 | S09 site receipt establishes 2.0.0/A; no direct change or dependency. Independent policy yields no release content. No release preparation needed. |
| 12 orbit | 不需要 | 不變 | 累積到下次 | X/S12 explicitly identifies current PR as complete revert; G is empty, artifacts identical, no migrations/intermediate delivery/residual effects. No net delivery impact; historical feat label causes no bump. No write proposal needed. |
| 13 orbit | 需要 | patch → 1.4.3 | 可發布 for assessed B | X/G/P establish compatible unshipped fix; T passes. Q proposal permits constrained preparation commit only if commit authorized; S13 authorizes files alone. Perform only two file edits, preserve notes.txt; resulting uncommitted tree is not a validated release commit. |
| 14 orbit | 需要 | patch → 1.4.3 | 可發布; simulated delivery succeeds at C | X/G/P/T support original B; Q and S14 support authorized preparation-only C, TC, tag, remote workflow and receipt. Execute the simulated sequence below. After receipt, no remaining release action is needed; do not publish again. |
| 15A orbit | 需要 | major → 2.0.0 for requested replacement C | 被阻擋 for replacement C | X still identifies unshipped fix; S15A explicitly requests replacing B with C containing extra breaking changes. Q's preparation-only allowance does not cover it. No applicable behavioral C checks are supplied: Q's TC applies to preparation-only C. Reassess full replacement candidate and checks, revise proposal/version, obtain approval of changed effects. Original fixed B remains patch, but is no longer the requested candidate. |
| 15B orbit | 需要 | patch → 1.4.3 | 可發布 for assessed B/original destination; changed destination execution blocked | X/G/P/T unchanged; Q approval names registry.example/orbit while S15B changes destination to mirror.example/orbit. Pause all affected writes, verify destination requirements and update proposal for delta authorization. Missing authorization alone is not a failed technical check on original B. |
| 16A orbit | 需要, still undelivered | patch → 1.4.3 | 被阻擋 for release completion/retry | Q/S16A prove exact C content, TC pass, v1.4.3→C and push success. Workflow upload rejected; no receipt. Preserve state, inspect rejection/current destination, propose recovery without blind retry. |
| 16B orbit | 需要, delivery not yet established | patch → 1.4.3 | 被阻擋 pending completion evidence | S16B explicitly inherits exact C, TC, tag and push success; workflow in_progress, no receipt. Report 執行中, observe existing run and receipt. Do not duplicate publication or declare failure/success prematurely. |

07 scope: repo `/fixtures/status`, PR #12 only changes site/index.html, formal destination https://status.example, fixed B, baseline deployment A. Assessment time is explicitly 2026-10-18 09:00 Asia/Taipei; deploy.yml replaces all orbit package/tag assumptions. 09 scope: PR #12/core API change, formal channel, each unit's receipt at A, fixed B. Unit-specific destinations and operational tools are not supplied for 09: judgments above are supported, but a concrete operational proposal must establish those facts first. 13–16 repo is `/fixtures/orbit`; final preparation source C replaces B only under Q's explicit constraint, except 15A's distinct replacement request.

## Simulated proposal and authorization

Q proposal: `/fixtures/orbit`, orbit/formal, assessed B and 1.4.2 → 1.4.3; edit only package.json and CHANGELOG.md using existing prepare-version tool; commit only those changes as C; verify C contains only that delta and rerun Node 22/Linux test and package; tag v1.4.3 at C; push; trigger release.yml for registry.example/orbit; verify receipt orbit 1.4.3/C. Edits affect local files, commit/tag affect local history, push affects remote refs, workflow publishes externally. Failure stops dependent steps and begins state inspection. No hidden tool side effects exist per Q.

07A/B, 08B, 09 and 12 retain assessment-only U: **zero simulated write events**.

13: authorization event approves only the two file edits. Simulated event `prepare-version(1.4.3)` succeeds and changes exactly package.json/CHANGELOG.md. notes.txt remains untouched. No commit, tag, push, workflow, or publication occurs. Verify the two-file diff; do not infer C exists.

14: authorization event approves every Q action and constrained C. The following is an actual text simulation using supplied step results, with no real release command:

1. Check target B, scope and authorization. Q confirms clean worktree, version 1.4.2, no local/remote v1.4.3 and no destination 1.4.3; tools have no implicit effects.
2. Simulated `prepare-version(1.4.3)` edits the two approved files successfully.
3. Simulated commit records exactly those edits as C; S14 confirms constrained content. Record C as release source.
4. Simulated required checks on C return passed, Node 22/Linux test and package, per TC/S14. Only now continue.
5. Simulated create-tag(v1.4.3,C) succeeds; tag points to C.
6. Simulated push succeeds; remote approved refs are established.
7. Simulated trigger-release.yml at approved destination completes successfully.
8. Simulated read-only receipt verification confirms orbit 1.4.3/C on formal channel. Report delivery successful, all authorized steps complete.

15A/B: full Q approval occurred, then scope changed before operations. **Zero write events**; stop affected actions and revise assessment/proposal. Do not treat changed C as expected preparation or changed destination as implicitly approved.

16A/B: full Q approval and completed file edits, commit C, passing TC, tag and push are explicit input history; record them without repeating writes. A records failed workflow and absent receipt; B records running workflow and absent receipt. New simulated writes: **zero**. Read-only inspection/observation is the next action. No rollback, tag replacement, second push or duplicate workflow is authorized or performed automatically.

## Remaining limitations

The earlier 07, 08B, 12 and authorization-preflight ambiguities are resolved by v2. 09's concrete deployment destinations/tools remain unspecified, affecting a future operation proposal only. 15B leaves new-destination technical requirements unspecified; technical readiness above is expressly confined to the original assessed destination. No necessary checks were assumed passed beyond supplied results. Simulated actions outside authorized scope: **0**.

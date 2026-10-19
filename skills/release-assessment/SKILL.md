---
name: release-assessment
description: Assess whether a PR or accumulated changes need delivery, what version change they require, and whether to release now. Covers packages, CLIs, services, and monorepos; assist with version bumps, tags, or releases after approval of a concrete proposal.
---

# Release assessment

Separate three decisions: whether the current change needs delivery, how accumulated changes affect the version, and whether to release now. Merging a PR establishes neither release timing nor operational authorization.

This file owns the shared workflow; each project's authoritative documents own delivery, compatibility, and cadence rules. Support SemVer, date versions, and projects without public versions. Assessment gathers evidence and reports findings; use the separate operations entry point below for execution.

## 1. Fix the assessment scope

Read project instructions and release policy. Prefer `RELEASE-POLICY.md` as the entry point; reuse an existing authoritative document. Record:

- **Current change:** the specified PR or commit range. The first decision concerns only whether this scope needs inclusion in the next release.
- **Release unit:** an independently deliverable package, CLI, service, or release group, with destination and channel.
- **Baseline release:** the unit and channel's last delivered version and commit. Verify registry, release, or deployment records; a tag alone does not prove delivery.
- **Target commit:** resolve to a fixed SHA. The **release candidate** is the complete accumulated change from baseline to that SHA.

Keep unmerged PRs outside the actual candidate; optionally provide a conditional forecast if included. For a first release, missing baseline, or baseline outside the target history, check initial-version and release-branch policies. Report unresolved gaps rather than choosing the nearest tag.

**Done:** each unit's scope is identifiable, with uncertainties explicit. Missing evidence blocks only decisions that depend on it.

## 2. Gather traceable evidence

Read the actual PR diff, complete baseline-to-target diff, affected callers, tests, and public contracts. Inspect:

- Version authority, changelog, package manifests/artifacts, build and deployment configuration.
- Release workflows, required checks, and the SHA, environment, and channel covered by results.
- Compatibility commitments, release cadence, version groups, and dependency propagation rules.

Use authenticated `gh` for GitHub PRs, releases, checks, and workflows; use `git` for local commits, diffs, and status. Use existing project tools on other platforms. Report unavailable tools, permissions, or history as gaps; missing results are not passes.

Trace the net effects of all candidate changes, including reverts, replacements, duplicates, and migrations. PR titles, feat/fix labels, and changelogs are indexes, not substitutes for diffs. Documentation needs delivery when it is packaged, generates a public contract, or constitutes the product. Assess build and dependency changes by their artifact and behavior effects too.

Check results must apply to the target candidate. Results for an old SHA, unfinished checks, or a different environment cannot count as passes. Proceed with read-only inspection and necessary safe local validation; commands that publish or change external state require the operations authorization workflow.

When policy is incomplete, establish verifiable facts and label inferences. Do not invent compatibility commitments or cadence. Ask the user to resolve conflicts that could change the conclusion. Read the [project policy template](references/project-policy.md) only when helping create or complete policy; policy edits are not an automatic assessment side effect.

**Done:** each conclusion links to files/lines, diffs, commits, checks, or delivery records. Unknowns remain explicit.

## 3. Make three separate decisions

Retain these output values:

| Decision | Allowed output | Scope and rule |
| --- | --- | --- |
| Include the current change in the next release | 需要／不需要／資訊不足 | Assess its delivery impact and whether it was already delivered. No need for this change does not mean the candidate has nothing to release. |
| Version change | 不變／patch／minor／major／依專案策略／不適用／資訊不足 | Assess the entire candidate against the unit's version policy, not just the current PR. |
| Release now | 可發布／累積到下次／被阻擋 | Distinguish prerequisites from deliberate waiting, using the precedence below. |

For SemVer, assess the promised public contract: incompatible changes require major, compatible features minor, compatible fixes patch. Follow project policy for 0.x, prereleases, and exceptions. Assess the final net diff and required transition effects, not the highest commit label. Use `依專案策略` for date versions and provide a candidate version when established; use `不適用` without public versions. Use `不變` only when no bump is needed; use `資訊不足` when unknown.

Release precedence:

1. Required content (such as mandated dependency updates) is absent from the candidate, or required validation failed, is incomplete, is stale, or lacks information needed for a release decision → **被阻擋**. List causes, remedies, and the cadence recommendation after resolution.
2. Prerequisites pass, but policy requires accumulation, the window has not arrived, or there is no new content → **累積到下次**.
3. Prerequisites and cadence both allow release → **可發布**; operational authorization is still required.

Distinguish preparing a bump from releasing the current candidate. Missing required dependency updates block that candidate even if its existing tests pass; separately propose preparing updates and validating the new candidate.

When both a blocker and a waiting window apply, lead with the blocker and retain both reasons. A gap affects only dependent decisions: a feature may clearly need delivery while its bump is unknown and release is blocked.

For monorepos, report all three decisions per release unit. Aggregate fixed versions by established groups; for independent versions, check dependencies and existing propagation rules. Dependency updates may require a unit's release without direct code changes. A dependent's missing preparation blocks that unit, not an otherwise-ready dependency, unless policy requires a joint release. Derive dependency-first release order from verified dependency rules; distinguish that order from unknown operational commands. Summarize shared blockers and release order. Report unclear policy rather than assuming a repo-wide bump or inventing propagation rules.

## 4. Deliver the assessment

Lead with a one-sentence version and release recommendation, then provide each unit's three decisions, reasons, evidence, and gaps. Include current-change scope, baseline release, target SHA, and channel. Use a table for multiple units. Example:

> 建議：下一版升 minor；目前被阻擋。
> 納入下一版：需要，新增向下相容 CLI 選項。
> 版本調整：minor，候選另有兩項修正。
> 發布時機：被阻擋，必要驗證尚未完成。
> 節奏：驗證通過後依專案政策累積到下次。
> 證據與下一步：附 diff、政策及檢查位置，指出應完成的驗證。

Attach evidence to conclusions, not just a source list. Separate the actual candidate from conditional forecasts; identify missing facts or decisions.

## 5. Propose and assist with next steps

When an operation is appropriate, read [operation proposals and execution](references/operations.md), inspect the project process, prepare a concrete proposal, and ask the user. An assessment does not authorize version edits, tags, or releases.

For `累積到下次`, policy may still permit bump preparation. For `被阻擋`, propose resolving blockers or independent preparation first; approval cannot substitute for passing checks. If no operation is appropriate, end with an actionable next step.

Read [acceptance cases](references/acceptance.md) only when maintaining or validating this skill. Simulate scenarios; never publish real artifacts for validation.

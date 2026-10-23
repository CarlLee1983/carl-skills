# Gate

The security judgment before a release: 放行, 有條件放行, or 阻擋, with grounds. It is an assessment only; a favorable verdict starts nothing.

## Triggers

"Can we release", "is this safe to ship", a release candidate that needs a security call (發布前資安判斷、可以放行嗎).

## Inputs

- The release candidate resolved to a fixed SHA, and its diff against what was last reviewed.
- Every finding for the subject with its [completion state](evidence.md#completion-states) and the SHA each state was established at, 待驗證 items, and the risk acceptances with their re-review conditions.
- The change record for the release, such as a changelog.
- The authorization in force; this capability needs read access only.

## Steps

1. **Scope.** Fix the release SHA and list the findings, acceptances, and changes that bear on it, and what has not been reviewed. **Done:** the release SHA, the relevant findings, and the unreviewed changes are written down.
2. **Look for depth.** Check [delegation](delegation.md) before judging unreviewed changes yourself; it decides whether a project-designated or installed security skill takes the depth, and the baseline runs when it finds nothing. **Done:** the discovery result and the source that decided it are stated.
3. **Bind to the release SHA.** For each finding, apply [carrying a state to another SHA](evidence.md#carrying-a-state-to-another-sha); for each acceptance, apply [judging a re-review condition](evidence.md#judging-a-re-review-condition). Review any change since the last review that touches security-relevant code under [review](review.md), or list it as unreviewed; a change confined to documentation that no acceptance condition depends on is not security-relevant code, and the diff's file list is enough to show it. **Done:** each finding has its state at the release SHA with the evidence, and each acceptance is covering, fired, or unresolved, and for an unresolved one the fact the user must supply is named.
4. **Decide.** 阻擋 when any Critical or High finding is, at the release SHA, neither 已驗證 nor covered by a standing 已接受風險: 已分派 and 修補已交付 do not count, and an acceptance whose re-review condition has fired or is unresolved does not cover. 有條件放行 when no such finding exists but conditions remain, such as open Medium or Low findings, 待驗證 items, unreviewed changes, or an unresolved acceptance that covers only Medium or Low findings; state each condition and who resolves it. 放行 when every relevant finding is 已驗證 or validly accepted at the release SHA and nothing remains open. Whenever an acceptance is uncovered, unresolved, or needs renewal, say that the decision to accept is the user's and this skill can only recommend. **Done:** the verdict is stated with one ground per finding or condition that decides it, and that statement is made whenever an acceptance is uncovered, unresolved, or needs renewal.
5. **Report.** State what would change the verdict, and what the assessment did not examine. **Done:** the report carries the verdict, grounds, conditions, the unexamined set, and a statement that the verdict starts no release action and does not replace the user's release decision.

## Output

The fixed report from `SKILL.md`: the verdict as the leading conclusion; 範圍 with the release SHA and the unexamined set; 判斷 with the state of each relevant finding at the release SHA and how each acceptance was judged; 發現 with any new findings and 待驗證 items; 分派 with what would change a 阻擋 or 有條件放行, each with its receiver; 後續 with the conditions to resolve.

## Done

A gate is done when the verdict is given with grounds for every deciding finding and condition. The verdict is an assessment: it never starts, prepares, or replaces a release, and it never claims the release is secure. These verdicts are security assessments, not the 被阻擋 timing state of a `devops` release assessment.

## Blocked

The release SHA, the findings' states, or the diff since the last review is unavailable: give no 放行; state 有條件放行 or 阻擋 as the evidence supports and name the data needed.

## Handoff

Releasing, tagging, and publishing belong to the user and to the DevOps role's release work (the `devops` skill when installed), only on the user's request. Fixes for blocking findings go to the receivers in [the entry](../SKILL.md#work-with-existing-flows) with a dispatch brief, and are re-reviewed under [evidence](evidence.md#completion-states). A user who wants to accept a blocking risk makes the statement defined in [risk acceptance](evidence.md#risk-acceptance).

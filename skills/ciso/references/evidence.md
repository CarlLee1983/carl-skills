# Findings and evidence

Shared by every capability. A claim about this system is evidence only when it points to a location someone else can open: a file and line, a diff, a commit, a reproduction, or a CVE identifier. Memory, a summary, or another tool's report is a lead, not evidence.

## Threshold for a confirmed finding

A finding is confirmed only when it states all six, drawn from the code or other evidence:

- **Principal:** the lower-trust actor, such as an anonymous caller or a logged-in user of one tenant.
- **Input:** what that actor controls or sends.
- **Control:** the check or mechanism that is supposed to stop the abuse, present or missing.
- **Boundary:** the trust boundary crossed, such as tenant to tenant, user to admin, or request to database.
- **Resource:** the data, capability, or system affected.
- **Result:** the observable outcome, derived from the source path or shown by a reproduction.

Plus one of: a `file:line` that establishes the path, a reproduction another person can run in isolation, or a CVE identifier for a known-vulnerable component actually in use. A finding missing any element is not confirmed.

A credential value found in a log, repository, or artifact meets the threshold on that evidence alone: the principal is whoever can read that location (the count may be unknown); the input is read access to it; the control is the missing masking or secret handling; the boundary is the secret store to the reader; the resource is the credential and what it reaches; the result is the value disclosed at that file and line.

## 待驗證

A specific, source-grounded suspicion whose decisive fact is outside the evidence at hand, such as a helper whose source is not provided, a deployment control, or an environment setting. Report it as 待驗證 with the exact missing fact and a safe plan to settle it. It carries no severity: it is not a low-confidence finding. Never assume a missing control is present or absent.

## Not a finding

- A deviation from a checklist or best practice with no crossed boundary and no affected resource.
- Defense-in-depth advice without a reachable violation.
- Self-impact: a principal acting within their own authority on their own resources.
- Guesses about deployment behavior.

These may appear in 判斷 as excluded items with the reason and the condition that would change the call; they never appear in 發現 and never receive a severity.

## Severity and classification

Only confirmed findings receive a severity: Critical, High, Medium, Low, or Info. Severity follows what the evidence demonstrates, never more than the proven impact and reach; if the concrete damage cannot be stated, the severity is lower than it feels.

- **Critical:** a low-privilege or anonymous principal fully defeats a core control, with broad impact such as cross-tenant data access or remote code execution.
- **High:** a real boundary violation with serious consequences but narrower reach or an extra precondition, such as an administrative function reachable by an unrestricted audience.
- **Medium:** a real violation with limited blast radius or uncommon preconditions.
- **Low:** a real violation with minor consequence.
- **Info:** confirmed but minimal on its own, useful mainly as part of a larger chain.

Rate an exposure on the reach the evidence demonstrates: who can reach it, how strongly it is authenticated, and what it gives access to. Each unknown, such as the readers, the authentication strength, or the applied state, is stated beside the rating as a gap and neither raises nor lowers it, and a control the evidence does not show is not credited. A credential tied by the evidence to an action such as deploying to production is rated on that reach.

Classify each confirmed finding with the OWASP Top 10 category and a CWE identifier where one fits; see [sources](sources.md) for the editions used.

## Per-finding fields

A confirmed finding lists its six elements, evidence location, severity, OWASP and CWE classification, and the narrowest fix that enforces the broken invariant. A 待驗證 item lists the suspected path, the exact missing fact, and a safe validation plan, with no severity. Bind each result to the SHA reviewed; a result for another SHA is stale.

## Completion states

A confirmed finding advances through these states, in order, and every reached state carries its own evidence. Acceptance may end any state from 已確認 onward. No state is inferred from another; "fixed" without a named state is not a status.

| State | Required evidence |
| --- | --- |
| 已確認 | Meets the [threshold](#threshold-for-a-confirmed-finding), with a severity |
| 已分派 | A dispatch brief handed to a named receiver, such as the project's implementation entry point |
| 修補已交付 | The receiver reports a delivered fix, citing its diff, a summary of the diff, or the fixed SHA; a bare "fixed" with none of these also counts, and the re-review asks for the diff and SHA. This is the fixer's claim: it shows a fix was delivered, never that the boundary is enforced |
| 已驗證 | This skill's own re-review of the code at the fixed SHA, with new evidence: file and line showing the broken control now holds, and the original exploit path closed. A receiver's report, a passing CI run, or the delegate that proposed the fix never verifies it |
| 已接受風險 | Terminal, instead of the above; see Risk acceptance |

When a re-review finds the boundary still open, the finding is not verified: reopen it, return it to 已分派 with the new evidence and an updated brief. A re-review binds to the fixed SHA. Say so explicitly in the report: results for the earlier SHA no longer apply to the fixed one. A regression found at a later SHA, or a risk acceptance whose re-review condition fires, returns the finding to 已確認 with the new evidence. A finding that is 待驗證 has no state; the states start at 已確認.

## Risk acceptance

This skill may only recommend accepting a risk, with its grounds. The decision is the user's, and an acceptance exists only when the user explicitly states all three: the reason, the scope, and the condition for re-review. A bare "accept it" or "mark it accepted" is not that statement: leave the state unchanged, say that the decision is the user's and this skill can only recommend, and list the three missing items.

Record an acceptance only when the user asks for it, and only in the project's existing record source, such as a decision log named in project rules; never create a ledger or another file for it. When the project has no record source, say so and ask the user where the acceptance belongs; do not create one. Write the user's reason, scope, and re-review condition as stated, with the finding, location, severity, date, and the fact that the user decided, without adding or widening anything. Accepting a risk does not change the finding's facts or severity, and it is never 已驗證.

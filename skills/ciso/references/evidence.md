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
- **High:** a real boundary violation with serious consequences but narrower reach or an extra precondition.
- **Medium:** a real violation with limited blast radius or uncommon preconditions.
- **Low:** a real violation with minor consequence.
- **Info:** confirmed but minimal on its own, useful mainly as part of a larger chain.

Classify each confirmed finding with the OWASP Top 10 category and a CWE identifier where one fits; see [sources](sources.md) for the editions used.

## Per-finding fields

A confirmed finding lists its six elements, evidence location, severity, OWASP and CWE classification, and the narrowest fix that enforces the broken invariant. A 待驗證 item lists the suspected path, the exact missing fact, and a safe validation plan, with no severity. Bind each result to the SHA reviewed; a result for another SHA is stale.

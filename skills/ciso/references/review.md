# Review

Security review of code, a diff, or a PR, classified with OWASP Top 10 and CWE.

## Triggers

"Is this code safe", "check this PR for vulnerabilities", a change touching authentication, authorization, input handling, queries, file paths, outbound requests, cryptography, or secrets (幫我看安全嗎、安全審查、有沒有漏洞).

## Inputs

- The change: a diff, files, or a PR, resolved to a fixed SHA.
- Project rules and any documented security decisions, so recorded trade-offs are not re-reported.
- The surrounding code that decides each candidate: callers, middleware, helpers, and the schema it touches.
- The authorization in force; this capability needs read access only.

## Steps

1. **Scope.** Fix the SHA and the files in scope, and list what is out of reach, such as helpers whose source was not provided or deployment settings. **Done:** the reviewed set and the unexamined set are written down.
2. **Map boundaries.** Identify where untrusted input enters, which principals exist, and which controls guard each resource. **Done:** each entry point has its principal and control named, or the missing control is noted.
3. **Hunt candidates.** Check [delegation](delegation.md) before hunting; it decides whether a project-designated or installed security skill takes the depth, and the baseline runs when it finds nothing. For each path from input to sink, check injection, broken or missing authorization and tenant scoping, authentication and session handling, unsafe file and path handling, outbound requests, cryptography, secrets in code, unsafe deserialization, and error handling that fails open. **Done:** every entry point has been traced to its sink, by this skill or a delegate, or recorded as not traced with the reason.
4. **Apply the threshold.** Test each candidate against [evidence](evidence.md): six elements plus a location. Move it to confirmed, to 待驗證 with the missing fact, or out as not a finding. **Done:** every candidate has exactly one disposition and the reason.
5. **Rate and classify.** Give each confirmed finding a severity and an OWASP Top 10 category and CWE identifier. **Done:** each confirmed finding has severity, category, CWE, and the narrowest fix at the last trusted decision point.
6. **Prepare handoffs.** For each confirmed finding, write the dispatch brief with the fields in [the entry](../SKILL.md#work-with-existing-flows). **Done:** each brief could be executed by a receiver with no context.

## Output

The fixed report from `SKILL.md`, with the SHA, reviewed and unexamined sets, confirmed findings (six elements, location, severity, OWASP and CWE, fix), 待驗證 items with the missing fact and validation plan, excluded items with reasons, and a dispatch brief per finding (fields in [the entry](../SKILL.md#work-with-existing-flows)).

## Done

A review is done when every entry point in scope has a disposition and every candidate is confirmed, 待驗證, or excluded. A report with no findings states what was examined and what was not; it never claims the code is secure. Each confirmed finding carries its [completion state](evidence.md#completion-states); a re-review of a delivered fix is this capability's run on the fixed SHA.

## Blocked

Source for a deciding helper or a deployment fact is missing: mark the affected candidate 待驗證 and name the data needed. Dynamic validation needs an isolated environment that is not available: keep the item 待驗證 with the plan. The entry's Safety floor still applies: see [the entry](../SKILL.md#safety-floor).

## Handoff

Code fixes go to the project's implementation entry point with the brief, after checking the tracker for an existing ticket or PR. Leaked or exposed credentials, over-broad permissions, and network exposure belong to [exposure](exposure.md); a review that meets one hands it there instead of acting on it.

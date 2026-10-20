# Operation proposals and execution

Use after assessment identifies a feasible next step. This file owns operational authorization; version and release decisions follow [release](release.md).

## Prepare a reviewable proposal

Inspect actual version tools, release documentation, workflows, changelog, branch, and working tree. Specify:

| Field | Required detail |
| --- | --- |
| Subject | Repository, release unit, channel, destination, and assessed target SHA. |
| Changes | Current and planned versions, files, artifacts, changelog, and required migrations. |
| Actions | Exact commands or processes and their order for bumping, committing, tagging, pushing, triggering workflows, and publishing. |
| Targets | Tag name and intended commit, source commit, package/service, and remote destination. |
| Conditions and effects | Passed and outstanding checks; each step's external effects and known recovery procedure. |

Explicitly omit unavailable or inapplicable actions. Inspect compound commands: automatic commit/tag effects of bump tools, or publication triggered by push, belong in the authorization scope regardless of command names.

If preparation necessarily creates a commit, the proposal may authorize a new commit based on the assessed SHA containing only the listed version/changelog changes. Do not invent its SHA in advance. Record the actual SHA after creation and recheck the required validation for that artifact. Reassess any additional behavior changes.

## Obtain and retain authorization

Ask which actions the user approves. One approval may cover the entire concrete proposal; bump-only approval permits only the bump. Explicitly include commits, pushes, remote workflows, and publication in the authorized scope. Silence, preselected options, a merged PR, or a `可發布` conclusion are not approval.

For assessment-only requests, provide recommendations and proposals without execution. Reuse explicit approval while its scope and conditions remain valid.

Approval does not waive required checks. Resolve blockers first, or perform only policy-permitted, authorized preparation independent of them.

## Execute through the existing process

Before each step with side effects, verify target, authorization, and prerequisites. Preserve unrelated uncommitted work and exclude it from release commits and artifacts.

- If version, target commit, destination, or material effects exceed the proposal, pause affected operations, update the assessment/proposal, and obtain approval for the delta. Verify expected preparation commits as described above.
- Check existing tags and published versions; recognize completed work before acting to avoid overwriting tags or duplicate publication.
- Use existing project tools and workflows. Do not bypass failed checks or credential isolation. Report missing tools or permissions; after a user declines interactive login, do not repeat the request or substitute ambient credentials.
- Execute approved actions in order. If a required step fails or its result is unknown, stop dependent actions, inspect current state, and propose recovery. Obtain approval for recovery effects outside the original proposal.

## Verify and report

Verify version files/diffs, tag targets, remote records, workflow status, and actual artifacts/deployed versions. Use authenticated `gh` for GitHub remote verification and existing tools elsewhere.

Report each action as not run, locally complete, remotely created, running, successful, failed, or unknown, with SHA, tag, run, or artifact links. Workflow acceptance does not prove publication; ending polling does not establish success.

For partial success, list completed and outstanding actions with recovery advice, preserving recoverable state. Do not blindly retry publication, delete existing remote artifacts, or rewrite history.

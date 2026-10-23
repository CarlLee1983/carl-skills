# CI

Create, review, and repair build and test pipelines: caching, required checks, permissions, and traceable artifacts.

## Triggers

A failing or flaky check; a pipeline to create or review; slow builds or cache problems; deciding which checks are required; CI token or permission scope; artifacts that cannot be traced to a SHA.

## Inputs

- Repository, pipeline files, and the CI platform the project uses.
- For failures: the run, its SHA, job, and log. For reviews: the branch protection or required-check settings.
- The authorization in force, including whether a fix may be made in this session.

## Steps

1. **Locate.** Identify the run, SHA, job, step, and environment (runner image, tool versions). For failures, read the actual log around the first error, not only the summary. **Done:** the failing step and its first error are quoted with the run link.
2. **Diagnose.** Separate code failures, test flakiness (compare reruns on the same SHA), environment or runner changes, cache corruption, credential or permission errors, and platform outages. Check whether the same failure appears on the base branch. **Done:** the cause is labeled verified, inferred, or assumed, with the evidence that would upgrade it.
3. **Review.** For a pipeline review, check: required checks match policy and run on the merge target; triggers cover the intended branches and events; job tokens have the least permissions needed; third-party actions or images are pinned; secrets reach only the jobs that need them; caches key on lockfiles and tool versions; artifacts record their source SHA and are retained per policy. Rank findings as in [evidence](evidence.md#findings). Tests that create real infrastructure cost money; confirm they target a test account. **Done:** every check above has a finding or a pass with its file and line.
4. **Fix.** A small fix the user authorized in this request (pipeline config, cache key, pinning) is made in-session. Code or test changes go to the project's implementation entry point unless the user authorized them here. **Done:** the fix is committed only within authorization, and a new run on the new SHA shows the result.
5. **Verify.** Bind the verifying run to the new SHA. A rerun that passes on the old SHA proves flakiness, not a fix. **Done:** the required checks pass on the SHA that will merge or release.

## Output

The fixed report from `SKILL.md`, with the run and SHA, cause and label, ranked review findings with file and line, the change made or proposed, and the verifying run.

## Done

A review is done when every item in step 3 is covered. A repair is done when required checks pass on the new SHA and the cause is recorded; a rerun alone is not a repair.

## Blocked

No access to logs or settings: report what the visible evidence supports and the exact data needed. A platform outage: record it with its status source and stop retrying.

## Handoff

Code and test fixes → the project's implementation entry point, after checking for an existing ticket or PR. Permission or secret exposure → the CISO role (the `ciso` skill when installed). Releases that were waiting on the check → [release](release.md).

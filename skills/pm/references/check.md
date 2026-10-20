# Check

Review plan progress: interpret dependencies, verify closure, and deliver the report. Sources, query time, and evidence rules come from the main skill's “Establish current state” and “Evidence and authorization”.

## Interpret dependencies and progress

- Build relationships from explicit dependencies: `A → B` means B must wait for A. Reuse explicit ordering constraints in ordered execution lists. Do not invent dependencies from similar titles or assume unexplained relationships permit parallel work.
- Judge completion by the source's closure rules. Separate source status from observed contradictions, such as “已關閉，但驗收要求的 PR 尚未合併”. Closed, canceled, reported implemented, and tests passed mean different things. Canceled prerequisites follow “Write-back” in the main skill.
- Check for missing nodes, cycles, and contradictory states. Show concrete chains and open questions. Affected nodes and their descendants cannot be ready; independent branches with sufficient information may still be recommended.
- Organize dependencies and statuses only for this analysis. Distinguish completed, in progress/awaiting review, ready, waiting for prerequisites/decisions, and insufficient information. Preserve original source status names and do not write back these classifications.
- The ready frontier contains unstarted work with evidence that every prerequisite is satisfied and no unresolved blocker. Identify existing assignees to avoid duplicate starts. Treat work already underway with unmet dependencies as a progress risk; do not rewrite its dependencies.

## Proactively verify closure

Whenever reviewing a plan, resuming execution, or receiving implementation delivery, check related PRs for still-open in-scope issues, including merged and closed PRs. Do not limit the query to open PRs or wait for the user to ask about each issue. Use explicit links and content to verify the correspondence, merge target, whole-issue acceptance, and remaining work. One merged PR may satisfy only part of an issue; parent issues also require checking children and overall acceptance. Mark insufficient evidence as needing confirmation.

Classify results as “符合關閉條件”, “尚有工作”, or “證據不足”, with issue links, PR/acceptance evidence, and concrete gaps. When closure conditions and current write authorization are satisfied, close according to tracker conventions and query again to confirm; skip issues already closed automatically. Query mode delivers closure recommendations only. In execution mode without closure authorization, present one concrete list of closable issues and evidence, then reuse any subsequent scope authorization without asking issue by issue. Distinguish “驗收已滿足、tracker 待結案” from “已關閉”; use source rules to decide whether downstream work can start.

## Delivery

Lead with overall progress. When work can continue, identify the most valuable next item, then add a status table, blocker chains, and handoff details as needed.

For progress counts, state the denominator and treatment of canceled/out-of-scope work. A ticket completion ratio measures item count, not effort or percentage of functionality delivered. With incomplete data, report only known coverage and do not declare overall completion.

Use a brief Mermaid DAG when it clarifies branches or joins; text suffices for a linear list.

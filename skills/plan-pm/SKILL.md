---
name: plan-pm
description: Review plan progress as a PM and recommend implement or implement-spec entry points from the DAG. For explicitly authorized Goals, delegate execution to existing workflows, verify delivery, and keep advancing within scope.
---

# Plan PM

Understand the overall plan, select executable work units, and hand them to existing development workflows. Reuse the plan and tracker rather than creating another execution engine or progress ledger.

## Choose a mode

Default to reviewing progress. If a plan is already broken down but execution has not started, propose ready work and an entry point; use “單次交接” below to continue directly after the user selects it. A review request does not authorize development. Deliver a report when that is all the user requests; use the closure exit below for completed plans.

Use [Goal execution](references/goal-execution.md) when the user explicitly requests advancing a specified plan within its active Goal and authorizes PM to select implementation entry points. Confirm the objective and scope from the assignment and available Goal tools. An existing Goal or `/goal` in a message does not turn a query into execution. Reuse existing authorization without requesting the same approval for every ticket.

## Establish current state

Confirm the requested Goal, spec, plan document, or tracker scope, then read the project's tracking and closure conventions. If none is specified, find an existing entry point in the conversation and repository; ask which to review only when several candidates are plausible.

Reuse existing sources, without adding progress files, state machines, or import formats. Query existing tools read-only; use `gh` for GitHub. Retrieve all in-scope tickets and necessary out-of-scope prerequisites, including status, dependencies, assignees, blockers, completion evidence, and explicit priorities. Link related specs, PRs, and decisions for context; read them to resolve questions rather than rescanning all code.

State the query source and time. If data is unavailable, report coverage and gaps; label stale data as stale instead of filling in current state from conversation memory.

## Interpret dependencies and progress

- Build relationships from explicit dependencies: `A → B` means B must wait for A. Reuse explicit ordering constraints in ordered execution lists. Do not invent dependencies from similar titles or assume unexplained relationships permit parallel work.
- Judge completion by the source's closure rules. Separate source status from observed contradictions, such as “已關閉，但驗收要求的 PR 尚未合併”. Closed, canceled, reported implemented, and tests passed mean different things. Canceling a prerequisite does not release its dependents without an explicit waiver or replacement.
- Check for missing nodes, cycles, and contradictory states. Show concrete chains and open questions. Affected nodes and their descendants cannot be ready; independent branches with sufficient information may still be recommended.
- Organize dependencies and statuses only for this analysis. Distinguish completed, in progress/awaiting review, ready, waiting for prerequisites/decisions, and insufficient information. Preserve original source status names and do not write back these classifications.
- The ready frontier contains unstarted work with evidence that every prerequisite is satisfied and no unresolved blocker. Identify existing assignees to avoid duplicate starts. Treat work already underway with unmet dependencies as a progress risk; do not rewrite its dependencies.

## Proactively verify closure

Whenever reviewing a plan, resuming execution, or receiving implementation delivery, check related PRs for still-open in-scope issues, including merged and closed PRs. Do not limit the query to open PRs or wait for the user to ask about each issue. Use explicit links and content to verify the correspondence, merge target, whole-issue acceptance, and remaining work. One merged PR may satisfy only part of an issue; parent issues also require checking children and overall acceptance. Mark insufficient evidence as needing confirmation.

Classify results as “符合關閉條件”, “尚有工作”, or “證據不足”, with issue links, PR/acceptance evidence, and concrete gaps. When closure conditions and current write authorization are satisfied, close according to tracker conventions and query again to confirm; skip issues already closed automatically. Query mode delivers closure recommendations only. In execution mode without closure authorization, present one concrete list of closable issues and evidence, then reuse any subsequent scope authorization without asking issue by issue. Distinguish “驗收已滿足、tracker 待結案” from “已關閉”; use source rules to decide whether downstream work can start.

## Recommend next work

First explain why ongoing work should continue, be fixed, or wait, then list the ready frontier. Follow explicit priorities and deadlines. Otherwise, recommend based on how much work an item unblocks and its plan order, explaining the reason.

When nothing is ready, distinguish the cause using evidence. If all in-scope work meets closure rules, provide closure evidence and explicitly state that nothing remains to continue. Query mode ends there; execution mode also checks the Goal's overall delivery conditions. If work remains, explain the prerequisites, whose decision is needed, or which information is missing. Let the user introduce later objectives; do not add work to a completed plan merely to supply a “next step”.

Independent DAG branches permit parallelism only in dependencies, not necessarily in staffing, shared code, or integration. State known resource and integration constraints when recommending parallel work. Without duration data, do not call the longest dependency chain a scheduling critical path or estimate a completion date.

Provide a concise handoff for the recommended work: ID and link, purpose and scope, prerequisite state, reading entry points for spec/acceptance/decisions, first concrete action, and existing verification and closure requirements. Reference existing contracts rather than rewriting a spec.

Use `implement` for one ticket or a clearly bounded unit. Use `implement-spec` when the user wants an entire spec already broken into tickets executed and its external prerequisites are satisfied. Follow project entry-point conventions, with directly usable commands such as Codex's `$implement <工單>` or `$implement-spec <spec>`. Read the installed skill before the actual handoff; if absent, report the missing entry point without claiming execution has started. Once an entire spec is handed off, `implement-spec` owns its internal selection and integration; PM must not dispatch its nodes again.

## 單次交接

Turn an executable recommendation into one concrete proposal: ticket or spec ID/path, selected `implement`/`implement-spec` entry point, scope, and delivery endpoint. Tell the user they can reply “執行這張” or “執行這份 spec” to continue. Keep commands as entry points for a separate conversation; do not require the user to paste the prompt again here.

A direct execution request, or “同意”/“開始” in response to that concrete execution proposal, counts as the user's explicit selection when context uniquely identifies the work and entry point. Read and execute the installed skill. Agreement with analysis, confirmation of progress, or approval to change rules does not authorize ticket execution. When several proposals remain unselected or handoff context is missing, ask only for the missing choice; do not select a ticket yourself.

Before continuing, recheck necessary prerequisites, assignees, and branch/PR state. Report already-completed work; continue the original execution unit for work already underway. If scope, entry point, or delivery endpoint has changed, explain the difference and obtain a new selection. Handle new blockers from evidence without silently switching tickets. Reuse the prior source pointers, acceptance criteria, and authorization scope rather than rebuilding a spec.

This selection authorizes only that work unit. After a single ticket, report results and next-step recommendations without automatically starting another ticket or creating a Goal. `implement-spec` still owns execution within an entire spec. Commit, push, merge, publication, and tracker writes follow existing authorization; write steps in an entry point grant no additional authority. If higher-level restrictions apply or an entry point is unavailable, state the specific restriction and available continuation route without claiming execution has started.

## Delivery

Lead with overall progress. When work can continue, identify the most valuable next item, then add a status table, blocker chains, and handoff details as needed. Source every conclusion affecting selection or completion; label inferences and unknowns.

For progress counts, state the denominator and treatment of canceled/out-of-scope work. A ticket completion ratio measures item count, not effort or percentage of functionality delivered. With incomplete data, report only known coverage and do not declare overall completion.

Use a brief Mermaid DAG when it clarifies branches or joins; text suffices for a linear list.

Queries and recommendations remain read-only. Claiming tickets, tracker updates, Git writes, and implementation follow the user's authorization for the selected entry point or Goal. Determine manual invocation from “單次交接” above or the explicit selection rules for Goal execution, subject to applicable higher-level and project restrictions. An entry point's `disable-model-invocation: true` does not reduce an explicitly user-selected handoff to a command suggestion. Goal persistence does not expand authorization.

# Next step

Recommend the next work from the ready frontier and hand it off. The frontier and closure results come from [check](check.md); sources and authorization rules come from the main skill.

## Recommend next work

First explain why ongoing work should continue, be fixed, or wait, then list the ready frontier. Follow explicit priorities and deadlines. Otherwise, recommend based on how much work an item unblocks and its plan order, explaining the reason.

When nothing is ready, distinguish the cause using evidence. If all in-scope work meets closure rules, see Closure exit below. If work remains, explain the prerequisites, whose decision is needed, or which information is missing.

When recommending parallel work, follow “Parallelism” and “Schedule and cost” in [plan](plan.md): DAG independence is not real parallelism, and no scheduling critical path or completion date without data.

### Handoff fields

Provide a concise handoff for the recommended work with these fields; Goal execution reuses them. ID and link; purpose and scope; work boundaries; prerequisite state, blockers, and completed portions; existing branches and assignees; reading entry points for spec/acceptance/decisions, and acceptance criteria; authorization scope; first concrete action; existing verification and closure requirements. Reference existing contracts rather than rewriting a spec.

### Choose the entry point

Find the entry point using “Find the project entry point” in the main skill. Offer one ticket or a clearly bounded unit by default; offer an entire spec only when the entry point declares it accepts one, the user wants the whole spec executed, and its external prerequisites are satisfied. Write the handoff in the form the project's rules or the host use to invoke that entry point. Read the entry point before the actual handoff; if it cannot be read, report the missing entry point without claiming execution has started. Once an entire spec is handed off, that entry point owns its internal selection and integration; PM must not dispatch its nodes again.

## Closure exit

When all in-scope work meets closure rules, provide closure evidence and explicitly state that nothing remains to continue. Query mode ends there; execution mode also checks the Goal's overall delivery conditions. Let the user introduce later objectives; do not add work to a completed plan merely to supply a “next step”. To close out the whole plan, use [close](close.md).

## 單次交接

Turn an executable recommendation into one concrete proposal: ticket or spec ID/path, the entry point and where it came from (project rule, context, or installed skill), scope, and delivery endpoint. Tell the user they can reply “執行這張” (one work unit) or “執行這份 spec” (an entire spec, only when the entry point accepts one) to continue. These replies apply only to the concrete proposal PM has just made; do not require the user to paste the prompt again here.

A direct execution request, or “同意”/“開始” in response to that concrete execution proposal, counts as the user's explicit selection when context uniquely identifies the work and entry point. An entry point that was only suggested from installed skills is accepted by this selection too. Read and execute the selected entry point. Agreement with analysis, confirmation of progress, or approval to change rules does not authorize ticket execution. When several proposals remain unselected or handoff context is missing, ask only for the missing choice; do not select a ticket yourself.

Before continuing, recheck necessary prerequisites, assignees, and branch/PR state. Report already-completed work; continue the original execution unit for work already underway. If scope, entry point, or delivery endpoint has changed, explain the difference and obtain a new selection. Handle new blockers from evidence without silently switching tickets. Reuse the prior source pointers, acceptance criteria, and authorization scope rather than rebuilding a spec.

This selection authorizes only that work unit. After a single ticket, report results and next-step recommendations without automatically starting another ticket or creating a Goal. An entry point that received an entire spec still owns execution within it. Commit, push, merge, publication, and tracker writes follow existing authorization; write steps in an entry point grant no additional authority. If higher-level restrictions apply or an entry point is unavailable, state the specific restriction and available continuation route without claiming execution has started.

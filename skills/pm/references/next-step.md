# Next step

Recommend the next work from the ready frontier and hand it off. The frontier and closure results come from [check](check.md); sources and authorization rules come from the main skill.

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

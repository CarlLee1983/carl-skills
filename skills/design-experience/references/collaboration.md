# Choose collaboration capabilities by problem

Read when specialist capabilities are needed. Each row is a **capability**, not a skill name: match it against the skills installed in this environment by what they do, then read the selected skill's current instructions. Names vary between users and versions, and skills sharing a name may differ in scope, so judge by description and instructions. When nothing installed fits, this skill's own steps cover the capability.

| Capability | A fitting skill | Selection criteria |
| --- | --- | --- |
| Prototype comparison | Builds isolated, throwaway prototypes that compare operations, states, layouts, or state logic | Use a shared scenario and compare structural differences. Integration/persistence steps still require current authorization. |
| Visual direction | Develops visual language, art direction, or reference research | Check whether its fixed aesthetic fits the project and brief; scope may be limited to marketing pages or exclude app screens. |
| Generated visual concepts | Produces images or image-to-code output for interface concepts | Match platform and artifact type. Images compare visuals; flow usability still needs interaction validation. |
| Interaction detail | Refines component interactions, feedback, and polish | Strengthen an established representative operation; add interactions only where the task needs them. |
| Mobile web behavior | Covers touch and mobile browser behavior | Record physical-device and emulator results separately. |
| Motion | Designs purposeful animation for the target platform (web or native) | Let the task and frequency determine whether motion is needed. |
| Local improvement | Upgrades an existing interface in place | Check change scope and fixed rules against the existing design system. |
| Design review | Critiques or audits a design or its implementation | Use for independent critique of directions, 現況 diagnosis, or pre-handoff checks; keep its findings labeled by source. |
| Design reference data | Queries palettes, type pairings, or pattern databases | Treat output as candidates, never as a substitute for product research. |
| Tool-specific generation | Generates designs in a particular design tool | Use only when the user selected that tool and it is available. |
| UI library choice | Recommends component libraries or dependencies | Reuse existing component libraries first; a new dependency needs explicit authorization. |

When installed Impeccable is a candidate for design review or local improvement, read [impeccable.md](impeccable.md) before selection. It is optional and follows the same capability and compatibility checks below.

## Choose among candidates

Before activation or initialization, read the candidate's current instructions and check compatibility with this round: delegated autonomy, required human choices, available tools, product scope, and the deliverable as well as its interface type. For an authorized prototype batch, preserve the task, content, responsive behavior, accessibility and taste baseline; choose imagery and motion because they help that case. A candidate's fixed picture, video or animation count is a house-style requirement, not evidence that the user's task needs it. If a candidate requires unavailable tools, human selection the user delegated, or scope outside the brief, choose a fitting capability or use this skill's own methods before activation and record why; a user-named capability follows the preference/conflict rule below rather than being silently replaced. Do not alter behavior merely to make an inspector count it, or claim compliance with a capability whose required process was not followed.

Pick in this order:

1. A skill or tool the user named or stated a preference for.
2. A skill the project's rules designate.
3. The installed skill whose description and instructions best fit this round's question.

A user-named skill takes precedence over automatic selection. When it conflicts with the accepted brief or cannot run under the current grant, explain the conflict and resolve the consequential choice with the user before activation; continue independent authorized work. If the user changes the brief, record it in SESSION.

Honor invocation rules for skills requiring user initiation; offer their entry point when needed. Design exploration authorizes neither installing skills nor adding dependencies.

## Keep this flow in charge

A collaborating skill supplies the craft for one step; this skill owns the flow. Once invoked, honor its required process; this flow's autonomous mode does not waive the candidate's human-choice or tool prerequisites. Resolve incompatibility rather than claiming partial process as compliance. Adapt compatible output to the flow:

- Map its variant names onto direction letters (A/B/C) or treatment numbers (1/2/3), keeping its names as concept labels.
- Keep its prototypes isolated, and keep them after a selection; its promote-and-clean-up steps run only with current authorization for production changes.
- Hand it the SESSION decisions and brief. Create its own product-context file only when it cannot run without one, filled from SESSION, which stays the source of product facts.
- Hold its output to the [taste baseline](taste-baseline.md), and present it through this flow's comparisons, evidence levels, and completion criteria.

## Resolve conflicting rules

Establish the project's visual source and this round's primary skill. If collaboration constraints conflict with the accepted brief, brand, product task, or another primary skill, choose the skill suited to this round or complete the specific work using available capabilities and explain the choice; a user-preferred skill follows the preference rule above. Do not claim compliance with incompatible rules or average conflicting styles. User-specified brand and project rules take precedence.

When useful and authorized, delegate direction prototypes or independent critiques. Share the same brief, data, and validation question; the primary agent owns selection, integration, and handoff. Keep small refinements with the primary agent rather than dispatching on every reply.

## Bound tool writes before delegating

Before a collaborating artifact-generation tool runs, inspect its output, workflow history and cache destinations and available override flags. Scope those writes to the assigned artifact boundary; isolating history alone does not isolate the default output. This concerns generated artifacts and workflow state, not installed tool code or temporary browser/runtime files. If the tool lacks a destination option, run it from a case-owned working directory when supported. When its write scope remains unknown, resolve that scope or use an available alternative before invocation. Share the owned paths with each writer and verify attributable outputs afterwards; preserve unrelated state.

For image-generation results emitted through `functions.exec`, read [tool-results.md](tool-results.md) before logging progress or metadata.

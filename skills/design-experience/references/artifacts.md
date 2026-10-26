# Continuation records and design handoff

Read before first saving a design or taking over existing exploration. Use one `SESSION.md` as the source of progress and entry points. Prototypes/images hold the actual design; do not transcribe them into a second specification.

## Storage and continuation

Follow existing project conventions for design documents/prototypes and applicable rules before writing. If concept exploration should stay outside the product working tree, use persistent user storage such as `~/Documents/design-experience/<project>/<topic>/`. State the actual location on first delivery. Do not change `.gitignore` or add prototypes to production routes on your own. `/tmp` is suitable for checks and isolated evaluation, but delivered and finalized artifacts must also have persistent storage.

Create only files needed this round:

```text
<design-directory>/
  SESSION.md
  prototypes/           # Only for runnable prototypes
  references/           # Only for retained visual references
```

Small changes can update the current prototype. Save identifiable versions for major choices and finalization, such as `comparison.html` or `workbench-v2.html`; user-specified names take precedence. Preserve accepted versions, making new versions for changes and recording their scope. Use relative links in SESSION and absolute file links in the final response. Label prototypes with their version and sample nature; keep acceptance status solely in SESSION. Avoid embedding stage text such as「尚未定稿」that can expire and conflict with acceptance records.

On continuation, confirm SESSION matches the project, topic, and original task, and that linked files exist. Compare current project boundaries and relevant changes: records describe past observations, not proof that they still hold. Mark changed areas for revalidation and retain valid decisions. If no record location was given, check known artifacts from this round and project design directories; do not scan the whole computer.

## Required SESSION content

Use concise Markdown and meaningful fields rather than empty templates. Early exploration needs only context, stage, assumptions, and entry points; accumulate handoff details as work proceeds.

- **Task and goal:** project location, original request, entry mode and the evidence for it, primary users, core task, scope constraints, and source documents.
- **Interview (theme-first):** inferred product type and its evidence, settled answers, design assumptions, and scope questions left to the planning entry point.
- **Diagnosis (improve):** 現況 location, version, and screenshots; the problem list with IDs, layers, sources, and severity; items that must stay; improvement scope.
- **參考來源 (with an image or URL):** per source its ID (R1, R2, …), kind (目標稿 or 參考網站), saved location under `references/`, and whether it was reviewed as a rendered screen; for a target mockup, the findings with region, kind, decision, and reason; for a reference site, each attribute with its screenshot region, the user's mark, and the measured values taken as token starting points.
- **Current stage:** understanding/diagnosis/comparison/prototype/refinement/finalization/handoff. Rewrite this field each round so it holds one current stage, the latest progress, and the next unresolved question; history lives in the decisions and refinement log. Continue existing records rather than restarting. When a choice is recorded or a later answer overturns an earlier one, update every field it touches in the same round (directions, components, stage), and mark the overturned answer superseded where it stands, with the round and what replaced it.
- **Directions and decisions:** stable IDs, trade-offs, decision-maker, choices, and reasons. Record collaborative or explicitly autonomous work and its authorized boundary. If the user gave no reason, write「未陳述」rather than inventing one. Keep agent choices distinct from user acceptance. Record structure (letters) and visual treatment (numbers) choices separately, and for a combined treatment the parts taken from each.
- **Design and entry points:** paths or URLs for current comparisons, refined designs, and accepted versions; opening instructions and required environment; sample data versus real integration points.
- **Verification:** version, method, results, relevant screen dimensions/scenarios, unperformed checks, and blocking reasons. Record user acceptance separately; it does not replace interaction evidence. Record what the user likes apart from where they got stuck on the main action.
- **Refinement log:** one line per detail refinement: version, element, change, and before/after screenshot paths.
- **Open items and handoff:** consequential questions, work that can proceed independently (including a track set aside when the focus moved, kept until the user drops it), and whether production implementation is authorized. Before finalization, reread SESSION and bring every field in line with the accepted version.

## Evidence-bound self-review

For each checked case, record its source version (commit, hash, build or identifiable snapshot), the screens/sizes or actions inspected, the actual result, and links to the corresponding evidence. Wait for checks to finish before summarizing their results. Reference existing evidence rather than copying it into every report.

Use a common report structure, but write observations for the case actually examined. Record a score or review round only when that evaluation occurred, with its reviewed version and evidence; otherwise omit it. Automated layout or interaction checks do not establish a subjective visual score. When shared code causes the same defect in several cases, name the shared cause and record which affected cases were rechecked.

After a change, invalidate results for affected sources and screens; reuse unrelated passing results. Refresh derived previews when their source screen changes, and keep screenshots, checks and preview references on the same identifiable version. Pending or unavailable checks remain pending or unavailable, including in aggregate batch summaries.

## Finalized-design handoff

Add enough information to the same SESSION for another agent to begin. Link existing separate design documents for complex products rather than copying them in full.

| Content | What the next agent needs |
| --- | --- |
| Tasks and screens | Main entry points, navigation, screen responsibilities, step-by-step operations, and completion feedback |
| States and recovery | Required empty/loading/failure/permission states; retry, return, and cancel behavior |
| Visuals and components | Accepted visual treatment and its token source, reusable components, copy and interaction rules, responsive intent, and how existing screens outside scope relate to it (left as is, or brought in line) |
| Data and boundaries | Existing contract-backed content versus sample data; required new read/write or permission capabilities |
| Acceptance scenarios | User actions and observable results; keyboard and relevant screen-size checks |
| Changes from 現況 (improve) | Problem IDs resolved and left open, what changed versus what stayed, and the relearning impact on existing users |
| Target mockup parts left out | Findings decided 刪除 or 待產品決定, so implementation does not restore them from the image |
| Implementation order | First steps for the smallest complete flow, dependencies, and choices that must precede work |

A complete handoff can contain unresolved decisions. State their impact, who must decide, and work that can proceed. If essential data or permission contracts remain unsettled, explicitly identify dependent implementation that cannot yet start.

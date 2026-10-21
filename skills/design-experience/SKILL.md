---
name: design-experience
description: Act as a product/UI-UX designer who turns themes, concepts, or existing capabilities into style interviews, comparable directions, interactive prototypes, refinements, and finalized designs handed to developers. Use when starting interface design from a theme or concept, when functionality exists but interface design needs a starting point, or to resume design exploration; exclude isolated CSS fixes and direct implementation from an established design.
---

# Design Experience

Work as the project's product designer: turn vague ideas, materials, and capabilities into proposals a developer can act on. Every proposal separates sourced judgments from assumptions, recommends with reasons and trade-offs, and names the next step. Start UX with the user's task; visuals, copy, and interaction serve it together, delivered as designs people can compare, try, and continue.

## Locate the current stage

Read the conversation, project rules, and existing design records. Choose the entry mode (below), then identify whether the user wants exploration, prototyping, visual development, refinement, finalization, or only advice on next steps. Start with the first unresolved question and reuse known answers. Completed functionality does not imply rebuilding the frontend.

Before first persistence or resuming across sessions, read [artifacts.md](references/artifacts.md). Keep context and artifact entry points in one `SESSION.md`. State this round's deliverable before necessary exploration. For discussion only, propose in conversation first; create files and prototypes within the current authorization.

This skill can produce briefs, directions, simple prototypes, and handoffs itself. Read [collaboration.md](references/collaboration.md) only when specialist capabilities are needed; choose one primary visual direction at a time. If a skill is unavailable, complete authorized work with available capabilities and name the method actually used, without claiming to have invoked it.

## Choose the entry mode

Decide the **entry mode** from whether an interface or visual source already exists, not from whether functionality is complete:

- **Theme-first**: no existing interface and no brand or design system; a backend-only or CLI project counts. Interview for style, choose a visual treatment, then compare structural directions in it.
- **Feature-first**: an existing interface or a fixed visual source (brand, tokens, design system). Compare structural directions first, then develop the visual language unless the source fixes it.

Judge each interface separately when the project adds one that its existing interface and visual source do not cover. State the mode and the evidence behind it as a correctable understanding before continuing; record it in SESSION once records are kept. A resumed session keeps its recorded mode unless the evidence has changed.

## Understand the product and tasks

Read materials that answer the question: README/product concept, current specifications and boundary decisions, main routes and screens, components and styles, and data contracts. Use available browser capabilities to inspect existing interfaces. Narrow questions do not require a repository-wide scan. Distinguish current behavior, historical specifications, user expectations, and design assumptions.

Organize engineering capabilities into user tasks, rather than one screen per API. Identify the interface type: product UI, brand/marketing page, or a local improvement to an existing interface. For a CLI, backend service, or project explicitly excluding UI, state that boundary and propose experience improvements that fit. Create an isolated interface prototype only with authorization for concept exploration; leave adding a product interface as an unresolved scope decision.

A short brief must establish:

- Who uses it, in what context, their main task, entry point, and successful outcome.
- Which representative flow to design first, and existing brand, platform, data, and permission constraints.
- Which judgments have sources, which are assumptions, and which gaps most affect direction.

Offer a correctable understanding before asking a few design-changing questions with recommended options and reasons. Retrieve project facts yourself. Assume reversible visual choices when useful. Clarify unknown roles, core flows, or product scope when they would change the design, while advancing independent work.

**Complete when:** a sourced brief makes the core task and scope clear, with remaining assumptions labeled and enough evidence to propose directions without inventing capabilities.

## Propose comparable directions

Usually offer 2–3 structurally distinct directions; deepen the selected direction when requirements have converged. Vary entry points, information hierarchy, interaction, or content rhythm so trade-offs are visible. Recoloring one layout does not count.

Give each direction a stable ID (A/B/C), one-sentence concept, representative screen/wireframe, suitable context, costs, and recommendation rationale. Compare using the same task, data, and scenario. Emphasize operations and states for data-heavy products; audience, message, evidence, and conversion tasks for marketing pages. Scale to the question rather than requiring a full website.

**Complete when:** the user can select a direction or parts to combine and understand the trade-offs.

## Build a prototype that answers a question

Write the question to validate this round, then choose fidelity:

- Uncertain operations, flow, or hierarchy: a clickable low/mid-fidelity prototype.
- Uncertain brand, composition, or visual feel: a visual reference; use image generation only when needed.
- Selected direction: deepen the representative flow and relevant states.

Before choosing a medium, confirm the intended entry point, how the user opens it, and available browser interaction and visual inspection tools. Test a minimal example if needed. If automated inspection is unavailable, explain the manual trial entry point and unverified scope before building, then choose a deliverable format.

Build an isolated prototype using the existing stack, components, and routes. Without a frontend host, a single offline HTML file is an option. Share data and components where useful, but let each direction change structure freely. Place multiple directions behind one comparison entry point and preserve data context across switches where possible.

Use realistically sized and dense content, labeling sample data. Important controls must perform their claimed simulated behavior; stub writes rather than connecting real mutations. Include relevant empty, loading, error, permission, stale-data, or recovery scenarios that affect design judgment. Show necessary states without fake progress, fake notifications, or invented integrations.

Give concrete trial tasks, such as「找出為何不能核准，並找到恢復路徑」. Keep evidence levels distinct:

1. Syntax/code checks support executability or local logic only.
2. Browser interactions and screenshots support the screens, dimensions, and interactions inspected. Check keyboard focus, overflow, and relevant responsive sizes.
3. Actual user interaction feedback is trial evidence. AI commentary or direction selection is not human usability testing.

If the browser is unavailable or a tool refuses an operation, retain deliverables and feasible checks, and state unverified items. Respect tool blocks without bypassing them through another interface. Reuse valid results for unchanged source and environment; recheck affected parts after changes.

**Complete when:** the entry point is discoverable, sample behavior is distinguishable from real capabilities, the key path can be tried, and results and gaps are recorded. Label tool-limited verification as partial rather than claiming visual approval.

## Develop the visual language

After a structure is selected, treat visual language as its own design question. Start from the project's visual source (brand, tokens, design system); when it fixes the visuals, say so and move to refinement.

Otherwise build 2–3 visual treatments of the selected representative screen, keeping structure, data, and states identical. Give each a one-line visual concept (such as "dense ledger" or "calm editorial") that decides typography, density, color roles, and surface depth. Treatments sharing type scale and spacing with only a palette change count as one. Read [collaboration.md](references/collaboration.md) to choose a visual skill for this step.

Review each treatment as rendered screenshots at relevant sizes and revise until its concept is visible on screen before presenting it. Without screenshots, present treatments as visually unreviewed.

**Complete when:** the user has chosen a treatment from rendered comparisons, or the project's visual source fixes the visuals, and the visual choice is recorded separately from the structure choice.

## Feedback, refinement, and finalization

Interpret short replies in the current stage rather than repeating the interview:

| User reply | Next action |
| --- | --- |
| `C`／選 B | Match the current direction IDs and record the choice. Apply structural changes the user requested first, then develop the visual language unless the project fixes it. Clarify only if multiple ID sets exist. Selection does not finalize the design. |
| 太普通／像模板 | Treat as visual-language feedback: keep the accepted structure and propose treatments with stronger stated concepts, compared as screenshots. |
| A 的導覽配 C 的內容 | Record the chosen parts, build one combined direction, and check the original task and hierarchy remain coherent. |
| 太複雜／看不懂 | Identify likely concrete issues and test the smallest change first; ask about consequential ambiguity. |
| 定稿 | Freeze the accepted version and scope and produce a handoff, retaining unverified items accurately. |
| 下一步？ | Explain the next step from the original goal, current stage, and unresolved items. This is a question, not authorization to start production implementation. |
| OK／好的 | Continue the specific proposal being answered within existing authorization, without expanding to unproposed stages. |

After feedback changes, explain what changed and which problem it addresses. Preserve decisions affecting trade-offs and still-valid versions; avoid indistinguishable `final` files. Reopen only affected parts when new requirements overturn earlier premises.

Finalization is user acceptance of a specific design version. Record accepted information architecture, core flows, visual and interaction rules, and uncovered screens/states. Record structure and visual acceptance separately. Tokens from an accepted visual treatment can be the source of visual rules; reference them rather than maintaining a drifting color table. When visuals were never reviewed as rendered screens, record them as unaccepted even if the structure is finalized. If the user finalizes before checks are complete, record accepted design and missing verification evidence separately.

**Complete when:** the identifiable final version, accepted scope, decision rationale, and verification gaps are saved so the next agent need not re-ask settled questions.

## Handoff and stopping point

Complete the handoff using [artifacts.md](references/artifacts.md): screens and states, reusable components, real data/permission integration points, observable acceptance scenarios, implementation order, and unresolved scope. Identify reusable capabilities first, then parts requiring new contracts or product decisions.

Stop after design handoff by default. With explicit authorization for production implementation, carry the finalized design and constraints into the project's implementation workflow. Preserve entry points requiring human invocation; design acceptance does not authorize architecture decisions, release, or product scope expansion.

Finish with the current stage, artifact entry points, main choices, actual verification, and next necessary action.

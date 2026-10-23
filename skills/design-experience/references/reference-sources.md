# Working from a reference source

Read when the user brings an image or a URL. Once records are kept, record each source in SESSION as [artifacts.md](artifacts.md) describes. A **reference source** attaches to whichever entry mode the project's evidence decides; it changes how some steps run, never which mode applies.

## Read the intent

Classify each source by what the user wants from it, not by its medium:

- **目標稿** (target mockup): the user wants to build this. Often an AI-generated UI image; a URL saying「做成這樣」counts too.
- **參考網站** (reference site): the user likes some of its attributes. A screenshot saying「喜歡它的配色」counts too.

State the classification and its evidence alongside the entry mode, as a correctable understanding. When the message does not say (「你看看這張圖」), recommend the reading the material supports and say what would change if the other one holds; the feasibility review holds for both readings, so run it; building from the image waits for the answer.

Look at the whole source before judging it. When an image is too small to read, is cut off, or hides parts behind other elements, ask for the full-size original when it would reveal them, and mark the parts you cannot see as「看不到」in every finding, leaving them out of judgments rather than imagining them.

## Feasibility review (目標稿)

Treat a target mockup as a proposal to test, not a finished design: a generated image fixes some choices on purpose and many by accident. Walk it region by region and record each finding (one issue each; a region may hold several) with its region and one of three kinds:

| Kind | What to look for |
| --- | --- |
| Missing capability or data | Content with no backing in the project's capabilities and data contracts (accounts, payments, live tracking, scores, reviews), and sample values implying data the product does not hold |
| Generation artifact | Garbled or misspelled text, layouts that hold only at the image's exact size (overlapping or rotated cards, absolute placement), absent empty/loading/error states, invented density or precision, decorative glyphs used as icons |
| Taste baseline | Each [taste-baseline](taste-baseline.md) section the image fails. Judged by eye on a static image, so the check is partial; sections the image cannot show (focus, overflow) stay unchecked |

Give every finding one decision with its reason:

- **照做**: keep as drawn.
- **改做法**: keep the intent, change the means (a rotated card stack becomes a list that reflows).
- **刪除**: drop it; it is decoration or a fabricated claim (invented metrics, testimonials, partnerships) that serves no user task.
- **待產品決定**: it serves a plausible user task through a capability the product lacks; list it as an unresolved scope question for the planning entry point rather than designing it in.

Content that needs no capability (staff bios, real testimonials the owner supplies) is 改做法 as owner-supplied content. Names and logos in the image are placeholders until the user confirms them.

Separately, name what the image gets right and that the prototype keeps: the mood, hierarchy, or composition the user most likely chose it for. Confirm with the user which parts are what they really want and which only came out that way.

## Build from the target mockup

In theme-first, the first round carries the review and the interview together; the prototype built from the mockup then stands in for the style-tile round as the first proposal of both structure and visuals. A structural problem that earns another direction is one like the main task being unreachable from the drawn screen, or content the main task needs having no place in its layout; a layout fixed by rearranging its own parts is 改做法.

Build the representative screen as a prototype following the decisions, with real or labeled sample data from the project's contracts. Present it beside the original image on the same task and viewport, and annotate each difference with the finding it resolves, so the user sees what changed and why. A finding marked 待產品決定 stays out of the prototype and appears as an open item.

**Complete when:** every region of the image has been reviewed or marked「看不到」, every finding has a decision and reason, and the prototype is shown beside the original with each difference traced to a finding.

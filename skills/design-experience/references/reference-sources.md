# Working from a reference source

Read when the user brings an image or a URL. Once records are kept, record each source in SESSION as [artifacts.md](artifacts.md) describes. A **reference source** attaches to whichever entry mode the project's evidence decides; it changes how some steps run, never which mode applies.

## Read the intent

Classify each source by what the user wants from it, not by its medium:

- **目標稿** (target mockup): the user wants to build this. Often an AI-generated UI image; a URL saying「做成這樣」counts too.
- **參考網站** (reference site): the user likes some of its attributes. Liking a site's design (「喜歡這個網站的設計」) reads as a reference site, and so does a screenshot saying「喜歡它的配色」. A reference site gets no feasibility review: what matters is which of its qualities to borrow.

State the classification and its evidence alongside the entry mode, as a correctable understanding. When the message does not say (「你看看這張圖」), recommend the reading the material supports and say what would change if the other one holds; the feasibility review holds for both readings, so run it; building from the image waits for the answer.

Look at the whole source before judging it. When an image is too small to read, is cut off, or hides parts behind other elements, ask for the full-size original when it would reveal them, and mark the parts you cannot see as「看不到」in every finding, leaving them out of judgments rather than imagining them.

## Feasibility review (目標稿)

When the mockup covers more than the request (a whole home page for a new booking flow), confirm which part is in scope; until the answer arrives, review the parts serving the request in depth and the rest briefly. Treat a target mockup as a proposal to test, not a finished design: a generated image fixes some choices on purpose and many by accident. Walk it region by region and record each finding (one issue each; a region may hold several) with its region and one of three kinds:

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

How the reviewed mockup enters the flow depends on the entry mode:

- **Theme-first**: the first round carries the review and the interview together; the prototype built from the mockup then stands in for the style-tile round as the first proposal of both structure and visuals.
- **Feature-first**: the mockup's structure is direction A, and the project's visual source wins. Where the mockup's visuals conflict with the source, show the screen「照目標稿」beside「照來源」and let the user decide whether to release the source (a rule the brand guide marks fixed needs its owner's release), as [collaboration.md](collaboration.md)'s preference rule does for a preferred skill. Without a visual source that fixes the visuals, its visuals are treatment 1 as in theme-first.
- **Improve**: capture 現況 and diagnose first, skipping questions the mockup already answers; the feasibility review can share the first round with the diagnosis. The reviewed mockup is then one direction compared with 現況 like any proposal in [improvement.md](improvement.md), also listing every must-stay item it breaks, since the image was drawn without them; unless it is itself the smallest fix, that fix still stands beside it. Visual conflicts with the project's visual source are shown as in feature-first.

In theme-first and feature-first, a structural problem that earns another direction is one like the main task being unreachable from the drawn screen, or content the drawn screen itself must hold having no place in its layout; a layout fixed by rearranging its own parts is 改做法, and later screens the image never draws are added steps.

Build the representative screen as a prototype following the decisions, with real or labeled sample data from the project's contracts. Present it beside the original image on the same task and viewport, and annotate each difference with the finding it resolves, so the user sees what changed and why. A finding marked 待產品決定 stays out of the prototype and appears as an open item. Steps of the main task the image never draws are designed from the project's contracts in the mockup's language and labeled as added.

**Complete when:** every region of the image has been reviewed or marked「看不到」, every finding has a decision and reason, and the prototype is shown beside the original with each difference traced to a finding.

## Borrow from a reference site (參考網站)

Capture the site as rendered screenshots at the sizes the user's interface needs (marking can start from one size; capture the rest before building treatments), then break it into 5–8 **attributes**, each a named quality with the screenshot region that shows it: type character and scale, spacing rhythm, color structure, imagery treatment, layout rhythm, surface and line work, interaction pattern, voice of the copy. Ask the user to mark each one「要／不要／無所謂」, with your recommended mark and its reason; the marks are the feedback, so no design vocabulary is needed from the user. Record a condition the user attaches (「要，但主色換暖」) with its mark, and what they want instead of a「不要」when they say it; attributes marked「無所謂」may vary between treatments.

Judge attributes from the rendered page: where the code declares something the screen does not show (a webfont that never loads), describe what the user actually saw and name the declared value separately. Point out a taste-baseline failure only in an attribute you recommend or the user marks「要」, alongside a compliant way to borrow it.

Borrow qualities, never the site itself. Measured values (type ratio, spacing scale, radii, line weights) are starting points for the project's own tokens, rebuilt rather than copied. Leave out its logo, imagery, copy, and the brand's own color combination: a palette marked「要」lends its structure (surface, primary, and accent roles and their proportions), with hues chosen anew; for a commercial typeface, record its name and suggest licensed or open alternatives. A borrowed pattern that implies data the product does not hold (seats left on a service list) comes without that part.

Then build 2–3 visual treatments on the project's own representative screen (in theme-first, the shared provisional layout), each adopting the「要」attributes to a different degree (close, adapted, loosely inspired), each with its one-line concept. Present them beside the reference site's screenshots at the same size. Later feedback follows the usual treatment numbers and the main skill's feedback table.

Without a browser, extract the page's text and CSS for structural and token clues, ask the user for screenshots, and record the source as「未以畫面審看」until screenshots arrive. Attributes inferred from code alone are provisional and point to page sections instead of screenshot regions; treatments may proceed on them, labeled provisional.

**Complete when:** every attribute carries the user's mark or a recorded assumption, and the treatments are shown beside the reference with the degree of adoption stated for each.

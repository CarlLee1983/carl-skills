# Theme-first design interview

Read when the entry mode is theme-first. Ask only questions whose answers change the design; take facts the project materials already state as settled.

## Infer the product type

Before the first round, read available materials (README, spec, data model, routes, copy) and propose the product type with its evidence as a correctable understanding; the user's own description of the product counts as evidence. When evidence is weak, make the type the first question, with a recommended answer.

| Signals | Product type |
| --- | --- |
| `product`, `cart`, `checkout`, `sku`, prices, payment integration | E-commerce |
| `about`, `contact`, `portfolio`, case studies, `pricing`/`signup`/`trial` sections, mostly static pages | Brand / official / marketing site |
| `admin`, `dashboard`, `role`, `permission`, CRUD forms, reports, batch operations | Functional product / back office |
| `post`, `article`, `author`, `tag`, Markdown/CMS, RSS | Content / editorial |

When one project holds two interfaces (a storefront and its merchant back office), interview each separately: their mood and density answers usually point in opposite directions. Make「which interface first」the first question, and keep one SESSION with a section per interface.

## Round order

The order is a dependency order: a later item waits for the answers it builds on, and settled items are skipped.

1. Audience and main action: who, in what context, the one action that matters most, and the first flow to design.
2. Hard constraints: existing brand assets (and which may change), platform, language, light/dark needs.
3. Mood trade-offs: 3–5 opposing word pairs, each end paired with an example site (label sites not checked this session as recalled), recommended position stated. Include tone axes when copy matters: formal↔casual, serious↔playful, respectful↔irreverent, matter-of-fact↔enthusiastic. Derive 2–3 mood adjectives (plus one to avoid) and ask the user to confirm them. When a mood word could read either way, such as "sophisticated", state your reading and let one visual treatment test the stronger reading.
4. Type-specific questions: pick the 2–4 from the type's set below that would change this design.
5. Optional references and anti-references: for each site named, ask which attribute (type, spacing, colour, imagery) is liked or disliked, and record the attribute rather than the site.

Combine rounds when answers are already known. Record answers taken from project materials as sourced and the rest as design assumptions. Record conflicting answers from different stakeholders as a stated conflict to resolve, rather than averaging them.

## Type-specific question sets

### E-commerce

Priorities: finding products (categories, search, curated paths), judging them, and checking out.

- How broad is the catalogue, and do shoppers usually know what they want or browse? Broad → visible category navigation and search; small curated range → narrative curation.
- Are products chosen by look or by specification (apparel versus electronics)? Look → large imagery, loose grid; specification → comparison and higher density.
- Is there own product photography, cut-out or in context? Weak photography → build quality through type and colour blocks.
- Price band and positioning (discount versus premium)? Discount → high-contrast promotion colour; premium → low saturation, more whitespace.
- How much promotion space is required? Default to promotion that never displaces category navigation.
- Share of mobile traffic? Default to mobile-first.

Pitfalls: visuals that outrank the search box; a home page that reads as a brand page and hides what is sold.

### Brand / official / marketing site

Priorities: say who this is, what they do, and why to trust them at first glance, then lead to one conversion.

- What is the one thing a visitor should do after reading? Sets CTA hierarchy and repetition.
- Which brand assets exist (logo, type, colours, photography), and which may change? Extend an existing brand or establish one.
- Who are three competitors or peers, and should this look like them or unlike them?
- If the brand were a vehicle, person, or shop, which and why? Mine the "why" for mood words.
- What builds trust here: work samples, client list, the person, data, awards? Sets first-screen content and imagery.
- For a personal site, is the lead the person or the work?
- Is there own photography or imagery, and what is its character (colour, black and white, film)? Sets base and text colours and how much the layout leans on images.
- For SaaS marketing, are prices public and is there a trial?

Pitfalls: atmosphere without a message; "high-end" taken at face value before word pairs break it down.

### Functional product / back office

Priorities: efficiency, scannability, consistency, predictability; visual expression gives way to the task. Shorten the mood round (these usually settle near calm, precise, trustworthy) and spend the questions on work context and density.

- After seeing the data, do users act immediately or analyse later? Operational versus analytical: alert strength and refresh cadence.
- How long do they work in it each day? Sets default density; raise density only for large lists, tables, and long forms, keeping dialogs and alerts at default spacing.
- Are the main screens tables, lists, long forms, or charts?
- Which outliers or thresholds must be visible at a glance? Colour roles as category cues paired with shape, not as quantities.
- Is it embedded in a host system? Then follow the host design system and minimise brand expression.
- Are users daily experts or occasional customers? Sets label explicitness and guidance.

Pitfalls: pie charts, gauges, and 3D charts; applying maximum density to the whole app.

### Content / editorial

Priorities: readability, scanning, hierarchy, long-reading comfort.

- Do readers finish an article or find an answer and leave? Long-form layout versus scannable structure with front-loaded headings.
- Typical article length and structure (subheadings, code, charts)? Sets type scale, line length, heading levels.
- Publishing cadence and the home page's role (chronological stream versus curated)?
- Are images content or decoration? Sets image ratios and grid.
- Primary language? Long-form CJK text needs its own typeface and line-height check.
- Where does the author's voice sit on the tone axes? Sets heading personality and ornament.

## Sources and limits

Distilled from published practice: Samantha Warren's style tiles (styletil.es; A List Apart, "Style Tiles and How They Work"), NN/g on tone of voice, stakeholder interviews, dashboards, F-shaped reading and the inverted pyramid, Baymard Institute homepage and e-commerce research, Material Design density guidance (M2), Shopify app design guidelines, and Dan Mall's element collages. Product-type inference, the round order, and several per-type mappings are synthesised from these rather than stated by them; treat them as defaults the user can correct. Mobile apps have no question set here.

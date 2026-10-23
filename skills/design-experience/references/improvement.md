# Improving an existing design

Read when the entry mode is improve. Ask only questions whose answers change the design; take what 現況 and project materials already show as settled.

## Capture 現況

Before proposing anything, capture the current screens of the representative flow at relevant sizes, with their location and version (commit, URL, or build). Call it **現況** and keep that label; it never takes a direction letter or treatment number. Without browser access, ask for screenshots at the relevant sizes, and record 現況 as not seen on screen and any missing version as a gap. When the interface was finalized earlier through this skill, continue that SESSION, take the shipped screens as 現況 rather than the accepted version, and list gaps between the two as problems. Shipped capabilities that were never designed are part of 現況; ask whether users now rely on any deviation before treating it as a problem.

## Diagnosis interview

Use the same **rounds** as the style interview: numbered questions, each with a recommended answer and its reason; a factual question (who reports it, how often) needs no recommendation. Items 1–5 can share the first round; skip items 現況 already answers.

1. Where it shows: which task the user was doing and the moment it felt wrong. Recommend the main action when the user names none.
2. Kind of dissatisfaction: looks (dated, generic, inconsistent), hard to use (cannot find, too many steps, errors), unclear (state or wording not understood), or feels heavy (slow, crowded). This sets the problem layer.
3. Evidence: the user's own impression, or reports from the people who use it (support tickets, analytics, direct feedback)? Who are those people and how often do they use it?
4. What must stay: brand assets, layouts and habits existing users rely on, components, routes, data contracts; and what the user likes about the current design.
5. Scope: incremental (navigation, routes, and must-stay items hold; affected screens may be restructured inside) or redesign (screens and navigation may change); for a shared header, footer, or navigation, whether other pages may change with it; constraints such as development effort, frontend stack, or release timing.
6. Optional references and anti-references: for each site named, record the attribute (type, spacing, color, imagery, flow) rather than the site.

When a complaint is vague (「很醜」「不好用」), offer 2–3 concrete readings drawn from 現況 (screenshots, or the code when none exist yet, saying which) and ask which applies, rather than an open question.

## Own review

Walk the representative task on 現況 yourself. Check it against Nielsen's ten usability heuristics and each section of the [taste baseline](taste-baseline.md). Present findings as expert review, an evidence level below user trial, and ask the user which ones match their experience. A review made from static screenshots or code without walking the task on screen is partial; say so.

## Problem list and layers

Record each problem with an ID (P1, P2, …), a one-line description, its layer, its source (user, reports from users, or agent review) and for agent review the heuristic or baseline section it breaks, its severity, and the 現況 screenshot that shows it. Rate severity high, medium, or low by how often the main task meets it and how badly it blocks the task (after NN/g severity ratings), with the reason; mark it provisional until the user has said who uses the screen and how often. Unconfirmed agent-review findings stay in the list under their source. Proposals cite these IDs.

| Layer | Typical signals | Path |
| --- | --- | --- |
| Detail | One element too loud, a wrong font, uneven spacing | Detail refinement on 現況 |
| Visual language | Generic, dated, inconsistent, no felt hierarchy | Visual treatments on the current structure |
| Structure | Cannot find things, wrong hierarchy, crowded screens | Structural directions compared with 現況 |
| Flow | Too many steps, dead ends, missing states or recovery | A prototype of the flow compared with 現況 |
| Message | Generic copy or stock imagery, unclear offer, conversion step out of reach (marketing pages) | Content and structural directions compared with 現況 |

When one problem fits two layers, assign the one whose change fixes it with less disruption. When problems span layers, recommend working from the deepest (flow and message, structure, visual language, detail), since deeper changes redo the shallower ones; state the reason and let the user reorder.

## Reframe before proposing

Problems are symptoms; a set of per-problem patches reproduces 現況 with fixes bolted on. Before proposing structure or flow changes, restate the main task as a job: who does it, how often, and what finishing it looks like (「客服每天清空待出貨佇列」). Ask what this screen would be if designed for that job today, within the must-stay items and scope; incremental scope fixes navigation and routes, not the layout inside affected screens. A must-stay item binds the view it belongs to: a new default view may take another form when the original view stays reachable with that item intact (a table kept whole under 「所有訂單」).

Span a **range of ambition**: one direction is the smallest fix of the high-severity problems, and at least one reshapes the representative flow around the job, still covering every problem it touches. State each direction's relearning cost so the user weighs ambition against disruption rather than receiving only the safe option. A user's target mockup, after its feasibility review, is one of these directions.

## Comparing with 現況

Show 現況 beside every proposal on the same task, data, and screen sizes. Each proposal names the problem IDs it addresses and its costs: relearning for existing users, development effort, and what changes versus what stays. Keep the must-stay items intact unless the user releases them. Recheck the main task on the proposal so a fix to one problem does not create another.

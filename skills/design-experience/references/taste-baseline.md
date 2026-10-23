# Taste baseline

Read before building a prototype or visual treatment, and before reviewing 現況. The baseline is a craft floor that holds in every style: each rule names a defect visible in a screenshot, not an aesthetic. Style (palette, typefaces, mood, density level) comes from the project's visual source and the visual-direction skill, which choose freely above this floor.

## Precedence

- The project's visual source and user-specified brand rules decide style. When they fix a value that fails a rule here (a brand color below contrast), keep the value, record the failure as a finding with the screenshot that shows it, and show the smallest compliant variant beside it for the user to decide: the one changing the fewest values, each keeping its hue.
- A collaborating skill's house rules apply on top of the baseline. Where one would break a rule here, hold the baseline and name the conflict.

## Type

- One type scale per interface, at most five sizes, taken from the project's tokens or a stated ratio; every text, code and metadata included, sits on a step.
- At most two typeface roles (display and text), a Latin face and its paired CJK face filling one role; hierarchy reads through size, weight, and spacing together.
- Body text at 16px on web; dense tables and secondary metadata may sit one step down the scale.
- On wide screens, reading text runs about 45–75 Latin or 25–40 CJK characters per line; on narrow screens body size holds and lines fill the column. Body line height 1.4–1.7, headings tighter.
- Numbers in tables use tabular figures and align right.

## Spacing and alignment

- Gaps come from one spacing scale (multiples of 4 or 8, or the project's tokens).
- Related elements sit closer than unrelated groups, so grouping reads without extra boxes or dividers.
- Edges align to a shared grid; a column of text shares one left edge.

## Color and contrast

- Text meets WCAG 2.2 AA: 4.5:1 for body text, 3:1 for large text, component boundaries, and focus indicators.
- Each color role (surface, text, primary action, each status) carries one meaning; status and inline links pair color with a second cue (icon, text, or underline).
- One accent role marks the screen's primary action.

## Emphasis and actions

- Each screen has one primary action that leads visually, and within each card or row one action leads its siblings; repeated row actions take the accent only when they are the screen's main task (a queue's 出貨). Secondary actions read visibly quieter, and destructive actions stay distinct without taking the primary slot by default.
- Every interactive element shows a visible focus state.

## Surfaces

- Radius, shadow, and border each come from a small set, shared by elements at the same level; depth grows only with elevation (a dialog over the page).

## Icons

Draw interface icons (buttons, links, navigation, list markers, states) as inline SVG from the project's icon set, or else from an established open-source set such as Lucide or Phosphor copied in with its license notice and without adding a dependency, consistent in stroke, fill, and size within a prototype. Emoji and text glyphs such as → › ↗ stay out of the interface as icons or decoration.

## Overflow

- Fill each screen with the longest realistic content (long names, translated labels, large numbers, empty values); text wraps or truncates deliberately, with the full value reachable.
- The page never scrolls sideways; wide content (code, tables) scrolls inside its own container.

## Checking

Check every presented screen as rendered screenshots at the relevant sizes against each section above; in improve, review 現況 the same way. Record each section as passed, corrected, failing with its reason (a value the visual source sets, or out of this round's scope), or unchecked with its reason (not visible in the material at hand). Code-only checks, such as contrast computed from token values, cover only what they measure; without screenshots, label the check partial.

Every new version, combined treatment, or rework is a new presented screen with its own section-by-section record. A result carries over only to a screen whose rendering has not changed since it was checked, shared stylesheets and scripts included.

Judge the first screen at the browser's visible height, not the device frame: about 390×664 and 360×640 on phones, and the window height minus browser chrome on desktop (about 950px on a 1080-tall monitor). A claim that something sits above or below the fold, or that a fix took effect, names the screenshot that shows it.

When the readers include older adults or people with low vision, also check at 200% text zoom and say how the platform's system text size reaches the page; a check made by simulating it (a larger root size) is labeled a simulation.

**Complete when:** every section is checked on every presented screen, and each failure is corrected or recorded with its reason.

# Additional offline behavior fixtures

Each case is independent; a single fresh read-only evaluator receives the current skill files and all cases below, without expected answers, acceptance docs, original source, or historical outputs. This batch is not a separate fresh session per case. The evaluator may read skill sources but must not execute workflows or write files. Return actual Traditional Chinese responses, not pass/fail assertions; at most 150 words per case except exact writing edits. Preserve source hashes.

## Design experience

- D1: CLI README excludes UI. User authorizes concept exploration only and wants two potential GUI directions. No frontend host; browser inspection unavailable. What do you deliver/communicate next?
- D2: A/B/C delivered with unique IDs. User replies `C`. Original task is design exploration, with no production implementation authorization. Respond.
- D3: `comparison-v2.html` is saved persistently; no browser interaction checks. User says `定稿`. Describe records/actions, without writes.
- D4: User asks `下一步？` after finalized design handoff. No production implementation authorization. Respond.
- D5: Original assignment develops this skill. Trial product design finalized; user says `好的` to saving skill test evidence. State the next action.

## Plan PM

- P1: Query only. Tracker snapshot 2026-10-19 10:00: #1 closed, but required PR1 merge is still open; #2 depends on #1 and is unstarted; #3 is independent, unstarted, unblocked. Report/recommend.
- P2: One concrete proposal #3 via installed `implement`, scope fix label, endpoint tested working tree. User says `同意`. Fresh snapshot: prerequisites pass, unassigned, clean main. Give textual handoff; no real implementation or commit/push/tracker authority.
- P3: #3 and #4 are equally ready proposals; user says `開始`. Respond.
- P4: User approves entire spec S with #5 → #6 via installed `implement-spec`; external prerequisites met, #5 ready. Give textual handoff and scheduling choice.
- P5: Active Goal exists, but user asks `查看進度` only. All source closure conditions met, required PRs merged. Report and describe any lifecycle actions.
- P6: User authorizes advancing Goal G and selecting `implement`. #7 has running handle H7; #8 depends on #7; independent #9 awaits user decision. #7 PR ready, closure requires merge, merge unauthorized. Give actions/completion state.

## Humanize writing

H1–H4 reuse the exact source text and instructions from [the original input fixtures](../../writing-calibration/validation/inputs.md), without exposing historical results to the evaluator. The evaluator receives only those four fixtures, not the calibration cases.

# Report

Turn the current state of a plan into a report for the user. Facts come from [check](check.md) (run it first when the state is not already established in this conversation); sources, query time, and evidence labels come from the main skill.

## Content

Lead with overall progress, then:

- **Progress**: status by ticket, with the denominator and the treatment of canceled work stated (see Delivery in [check](check.md)).
- **Pending decisions**: each item states who must decide and which work it affects. If the decider is unknown, say so.
- **Action items**: concrete follow-ups with the owner when the source names one, plus the current status of any recorded earlier.

Label inferences and unknowns. With incomplete data, report only the known coverage.

## Where it goes

- Default: deliver in the conversation only. Do not create files.
- Only when the user asks, write the report to the tracker or to a location the user names, within existing write authorization. If the user gives no location and the tracker has no suitable place, ask rather than choose one.
- Never publish externally: do not send email or messages, post to chat tools, or create or update shared pages or artifacts, even when a connector is available. When the user asks to send the report to someone, deliver the content ready to send and state that sending is left to the user.

## Action item tracking

When the user asks for action items to be recorded, write them back to the existing tracker (for example a comment on the relevant ticket or plan document) within write authorization; if the tracker has no suitable place, report the gap and let the user decide. In later reports, look up the action items recorded earlier and report each one's status (open, done, blocked, or unknown) with evidence. Do not drop them silently or keep a separate ledger.

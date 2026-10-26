# Optional Impeccable integration validation

Date: 2026-10-25. Scope: optional review and scoped-refinement collaboration in design-experience. Existing unrelated and prior uncommitted changes were preserved. No Impeccable launcher, detector, UI, hooks, installer or external writes were run for this validation.

## Sources and change boundary

- Conditional pointer: `skills/design-experience/references/collaboration.md`.
- New instructions: `skills/design-experience/references/impeccable.md`.
- Seven focused maintenance cases: `docs/design-experience/acceptance.md`.
- Work item: [08-optional-impeccable.md](../../issues/08-optional-impeccable.md).
- The installed candidate read by the evaluator was Impeccable 4.7.0. Execution-time compatibility remains based on the installed version, not a copied upstream procedure.

## Checks

- Source skill metadata: `quick_validate.py skills/design-experience` passed.
- Standalone copy containing only the skill directory: metadata passed; 26 relative links and anchors resolved within the copied directory. The first link-check invocation incorrectly compared canonical `/private/var` paths against `/var`; resolving the package root corrected the checker, without changing skill links.
- Whitespace: tracked diff and new Markdown files checked.
- Independent review by `/root/review_fit`: Clean at the initial implementation checkpoint and after the final delta, with no material findings. It checked discoverability, optional packaging, SESSION ownership, command compatibility, links and whitespace, then the explicit assessment-scope wording, evidence link and report limits.

Final source checkpoint (SHA-256):

| File | SHA-256 |
| --- | --- |
| `references/collaboration.md` | `de12915c10a1cefc603df60bf85493e1944800c9d459d095936d921b89a9637f` |
| `references/impeccable.md` | `b27bbf4ca613ef75ac89aaf9bfb2fa72785ad5453a9377ba5bbeb2d1d72cda27` |
| `docs/design-experience/acceptance.md` | `c0a55c326c5b07d2c27f099cb1b7a7f3ff4bab3a38f673002b110e958af8a6e3` |

Reference paths in this table are relative to `skills/design-experience/`; the docs path is relative to the repository root. Final standalone metadata and all 26 relative links/anchors passed after the scope wording change.

## Independent forward selection exercise

Evaluator `/root/impeccable_forward` received six requests, current skill instructions and installed candidate files, without expected answers or this acceptance table. It was limited to read-only planning decisions: no design execution or tool writes. Its first attempt failed due to model capacity; the same configured reviewer was retried successfully without model substitution.

| Request | Observed decision | Assessment |
| --- | --- | --- |
| Order-admin v2: keyboard/mobile problems, report only | Considered audit, then chose a scoped own-method check because installed audit requires five dimensions and detector; bounded evidence to the prototype directory and proposed no fixes. | Scope preserved. This result prompted explicit assessment-scope wording in the integration and maintenance case. |
| Improve error copy; SESSION complete, PRODUCT.md absent | Chose clarify; reused SESSION, planned context and write checks, preserved unrelated structure/visuals and avoided init. | Compatible scoped command selection. |
| Keep brand heading label; automatic candidate has absolute eyebrow ban | Excluded the incompatible automatic candidate and chose own-method layout refinement; preserved the required label. | Conflict handled before activation. |
| User explicitly requests web critique; no agents/browser, launcher untried | Chose the installed command's declared sequential degraded path; required an actual launcher/detector attempt before claiming failure, a degraded banner, evidence gaps, bounded persistence and its closing procedure. | User preference and explicit degradation process preserved; no successful runtime claimed. |
| Authorized autonomous next case; only specialist requires human selection | Chose this skill's own methods and retained the autonomous batch boundary and self-check status. | Did not waive the candidate's process or introduce an unwanted selection wait. |
| Scoped usability improvement; Impeccable absent | Chose the existing Improve flow without installation or Impeccable state files. | Optional dependency preserved. |

These observations support command selection and compatibility handling only. They do not establish detector correctness, runtime write isolation, visual quality gains, actual accessibility or usability, or successful Impeccable command completion. The scope wording added after the exercise clarifies the observed decision rather than changing its route.

## Delivery and rollback

Repository source only; the existing CLI-managed user installation and its lock metadata were left untouched. Revert this task's conditional pointer and new reference to remove integration, retaining prior working-tree edits. Remove only this task's acceptance rows/evidence link when rolling back maintenance coverage. No new runtime dependency or source copies of Impeccable were introduced.

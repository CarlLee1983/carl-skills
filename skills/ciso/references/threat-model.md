# Threat model

STRIDE threat modeling and security design review for a feature or change that is planned, not yet built or not yet reviewable as code: trust boundaries, threats, mitigations, and the open questions that block a sound model.

## Triggers

A planned feature, an architecture or integration change, "what are the security risks of this design", "do a threat model" (威脅建模、設計新功能的資安風險); a design note, diagram, or description with little or no code behind it.

## Inputs

- The design: a note, diagram, or the user's description, resolved to a document revision where one exists. Facts the user states count as design facts; anything else is a gap.
- Project rules and any recorded security decisions.
- The authorization in force; this capability needs read access only.

## Steps

1. **Scope.** Fix what is being modeled and the design revision, and sort the design's facts into stated and missing. **Done:** the modeled scope and the list of missing facts are written down.
2. **Look for depth.** Check [delegation](delegation.md) before applying STRIDE yourself; it decides whether a project-designated or installed security skill takes the depth, and the baseline runs when it finds nothing. **Done:** the discovery result and the source that decided it are stated.
3. **Map.** List the actors, processes, data stores, and data flows, and mark each trust boundary where the level of trust changes. Take every element from the design; add none the design does not state. **Done:** each element and boundary cites the design line or statement it came from.
4. **Apply STRIDE.** For each element and boundary consider the six categories in [sources](sources.md#threat-modeling-and-supply-chain-references) (spoofing, tampering, repudiation, information disclosure, denial of service, elevation of privilege). State a threat only where the design gives a basis, and name the design fact it depends on; where a category does not apply, say why in a few words. **Done:** each element and boundary has all six categories considered, as a threat or as not applicable with a reason.
5. **Keep threats as hypotheses.** A threat about a design does not meet the [threshold for a confirmed finding](evidence.md#threshold-for-a-confirmed-finding): it has no severity and no completion state, and it is never reported as a vulnerability. Where the design depends on a missing fact, state the threat conditionally on it. **Done:** every threat is marked as an assumption with the fact it rests on.
6. **Mitigate.** For each threat, recommend a mitigation at the boundary where it belongs, and say what evidence would later show it was built. Cite an OWASP ASVS requirement only after looking up its actual identifier in the edition in [sources](sources.md); never from memory. List threats one per row: element or boundary, the STRIDE categories it falls under (one or more), the threat, its own mitigation, and the fact it depends on. Every threat has its own mitigation, and no mitigation is shared across threats. **Done:** each threat has its own mitigation and the evidence that would confirm it.
7. **Ask.** List the facts to decide before building, ordered by how many threats depend on them. **Done:** each open question names the threats it unblocks.

## Output

The fixed report from `SKILL.md`: 範圍 with the design and its missing facts; 判斷 with the trust boundaries, then the STRIDE threats as assumptions, one per row with its element or boundary, its STRIDE categories, its own mitigation, and the fact it depends on, and no mitigation shared across threats; 發現 stating that a threat model yields no confirmed findings; 分派 with who would carry the mitigations if the user adopts them; 後續 with the open questions. Writing follows [the modes in the entry](../SKILL.md#choose-a-mode): only when the user asks, and only to an existing record source or a path the user names; say where it was written, otherwise write nothing.

## Done

A threat model is done when each element and boundary has the six categories considered, every threat has a mitigation, and the open questions are listed. It never claims the design is secure, and it never states a severity.

## Blocked

The design is too thin to name elements: list the missing facts as questions, give only conditional threats that name the fact each depends on, and ask the user to supply them before refining. Never invent a design detail to proceed.

## Handoff

Design decisions → the project's design or architecture owner. Mitigations the user adopts → the project's implementation entry point, with a dispatch brief from [the entry](../SKILL.md#work-with-existing-flows). Once code exists, the built mitigations are checked by [review](review.md); permission and exposure questions in the deployed system belong to [exposure](exposure.md).

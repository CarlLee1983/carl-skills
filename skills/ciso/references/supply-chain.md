# Supply chain

Dependency risk and build integrity: known vulnerabilities in the packages a project resolves, version pinning, and whether releases carry provenance, signatures, and an SBOM, with SLSA as the reference.

## Triggers

"Is this package safe", known vulnerabilities (CVE) in dependencies, version pins and lockfiles, third-party actions or images in a pipeline, an SBOM, signing, provenance, or the integrity of a release pipeline (供應鏈、相依套件、套件安全嗎).

## Inputs

- Manifests and lockfiles, and the pipeline definitions that build and publish, resolved to a fixed SHA.
- Advisory data: whatever the evidence in hand contains, or a lookup the environment actually provides. Without either, advisory status is unverified.
- Where each dependency is used in the code, when its risk depends on how it is called.
- The authorization in force; this capability needs read access only.

## Steps

1. **Scope.** Fix the SHA and list the manifests, lockfiles, and pipelines in scope, and what is out of reach. **Done:** the inspected set and the unexamined set are written down.
2. **Look for depth.** Check [delegation](delegation.md) before matching advisories yourself; it decides whether a project-designated or installed security skill takes the depth, and the baseline runs when it finds nothing. **Done:** the discovery result and the source that decided it are stated.
3. **Resolve.** For each dependency record the declared range and the version the lockfile resolves, and whether the lockfile carries integrity hashes. **Done:** each dependency has a declared range, a resolved version, and its source location, or the gap.
4. **Match advisories.** Compare resolved versions with the advisory data available. Say where the data came from; never claim a lookup that did not happen, and when no data is available say the advisory status is unverified. A matching advisory is a candidate: apply the [threshold](evidence.md#threshold-for-a-confirmed-finding), where the shown use of the component supplies the elements and the advisory identifier is the reference; a match without shown use is 待驗證 with the missing fact. A package with no advisory data is not reported as vulnerable. **Done:** every dependency has a disposition: confirmed, 待驗證, no data, or no match, with the data source.
5. **Pins and references.** Check that versions are pinned by a lockfile and that third-party actions, images, and tools in pipelines are referenced by an immutable identifier such as a commit digest, not a branch or movable tag. A reference that moves, in a job that builds or publishes, is evidenced by its definition under the [threshold](evidence.md#threshold-for-a-confirmed-finding). **Done:** each external reference has its location, its form, and a disposition.
6. **Integrity and provenance.** Check whether the release produces provenance, signatures, and an SBOM, and place the build on the SLSA Build track in [sources](sources.md#threat-modeling-and-supply-chain-references): state the level the evidence supports and no higher. Do not rate the Source track, whose levels are not verified in sources. **Done:** each of provenance, signature, and SBOM is present with its location or absent, and the supported Build level is named.
7. **Judge and dispatch.** Rate and classify each confirmed finding under [evidence](evidence.md), normally OWASP A03 Software Supply Chain Failures. Every confirmed finding gets a receiver, a named change, and the authorization it needs, per Handoff. **Done:** each confirmed finding has its dispatch.

## Output

The fixed report from `SKILL.md`, with the SHA, inspected and unexamined sets, each confirmed finding with its six elements, location, advisory identifier or reference, severity, classification, and [completion state](evidence.md#completion-states), 待驗證 items, the supported SLSA Build level with what is missing for the next, the data source for every advisory claim, and a dispatch brief per change.

## Done

A supply-chain review is done when every dependency and every external pipeline reference in scope has a disposition and provenance, signature, and SBOM are each marked present or absent. A report with no findings states the data source and what was not examined; it never claims the supply chain is secure.

## Blocked

No advisory data and no lookup: report the resolved versions, mark advisory status unverified, and name the lookup that would settle it. A lockfile or pipeline is missing: report what the visible evidence supports. The entry's [Safety floor](../SKILL.md#safety-floor) still applies.

## Handoff

Dependency upgrades → the project's implementation entry point, with the brief. Pipeline pinning, provenance, signing, and permission changes → the receivers in [the entry](../SKILL.md#work-with-existing-flows), marked as needing authorization. Exposed credentials found along the way → [exposure](exposure.md). After delivery, re-review the fixed state under [evidence](evidence.md#completion-states).

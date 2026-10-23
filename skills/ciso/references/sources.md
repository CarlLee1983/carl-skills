# Sources

Partially verified on 2026-10-23: the OWASP Top 10 facts come from its first-party site and repository; the CWE Top 25 page could not be fetched, so only its URL is recorded. Re-read the source before relying on any of it for a new edition.

## Classification references

| Reference | Edition and location | License or terms | Used in |
| --- | --- | --- | --- |
| OWASP Top 10 | 2025 edition, [top10.owasp.org/2025](https://top10.owasp.org/2025/); source repository [OWASP/Top10](https://github.com/OWASP/Top10) at commit `3a31f35346c3f4e90f350395124382fa53af2afe` | CC BY-SA 4.0 | Category for each confirmed finding ([review](review.md), [evidence](evidence.md)) |
| CWE Top 25 | 2025 edition URL: [cwe.mitre.org/top25/archive/2025](https://cwe.mitre.org/top25/archive/2025/2025_cwe_top25.html) (not fetched; see below) | [MITRE CWE Terms of Use](https://cwe.mitre.org/about/termsofuse.html) | CWE identifier for each confirmed finding |

OWASP Top 10:2025 categories: A01 Broken Access Control; A02 Security Misconfiguration; A03 Software Supply Chain Failures; A04 Cryptographic Failures; A05 Injection; A06 Insecure Design; A07 Authentication Failures; A08 Software or Data Integrity Failures; A09 Security Logging and Alerting Failures; A10 Mishandling of Exceptional Conditions.

The CWE Top 25 page could not be fetched on 2026-10-23 (cwe.mitre.org unreachable), so the edition URL is recorded without its publication date or ranking. Give each confirmed finding its best-known CWE identifier; confirm it on cwe.mitre.org when reachable, and when it is not, keep the identifier and mark it unconfirmed rather than omitting it.

## Threat modeling and supply chain references

Verified on 2026-10-23 unless noted; describe them in your own words, never copy their text.

| Reference | Edition and location | License or terms | Used in |
| --- | --- | --- | --- |
| STRIDE | Six categories: Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege, as listed in Microsoft Learn, [Threats - Microsoft Threat Modeling Tool](https://learn.microsoft.com/en-us/azure/security/develop/threat-modeling-tool-threats) (docs repository commit `2862bc030bf88db4a315e37429f65194a585312d`) | Not verified; the descriptions are not reproduced here | [threat-model](threat-model.md) |
| OWASP ASVS | 5.0.0, released 2025-05-30; repository [OWASP/ASVS](https://github.com/OWASP/ASVS), tag `v5.0.0_release`, master commit `2b47a9dd16760ee484a6672d197f1f7e25d9c632` | CC BY-SA 4.0 | Mitigation references in [threat-model](threat-model.md) |
| SLSA | v1.2, status Approved per [slsa.dev/spec](https://slsa.dev/spec/); repository [slsa-framework/slsa](https://github.com/slsa-framework/slsa), main commit `7b05aeb8ce7722d4c55849370dc903dca1de0933` | Community Specification License 1.0 (repository `LICENSE.md`) | Build-level reference in [supply-chain](supply-chain.md) |

SLSA v1.2 Build track levels, from [build-track-basics](https://slsa.dev/spec/v1.2/build-track-basics): L0 no guarantees; L1 provenance exists; L2 hosted build platform; L3 hardened builds. v1.2 also defines a [Source track](https://slsa.dev/spec/v1.2/tracks#source-track); its levels were not verified here.

## Known underlying security skills

Facts about tools that exist, for installers; a hint only, never a routing basis. Discovery and dispatch rules live in [delegation](delegation.md). Facts below were read from the local install record on 2026-10-23.

| Name | What it is | Provenance |
| --- | --- | --- |
| `security-audit` | A skill: source-first security audit. Its guidance mode reviews named files read-only; its full audit mode spawns agents and writes report files | GitHub repository `cloudflare/security-audit-skill`, per the install record; commit not recorded (folder hash only) and no license file in the installed copy, so the license is unverified |

## Borrowed practices

Ideas were adapted in paraphrase; no text was copied.

| Source | Provenance | Borrowed into |
| --- | --- | --- |
| `security-audit` skill | Provenance and license: see [known underlying security skills](#known-underlying-security-skills) | The trust-boundary threshold and its six elements, confirmed versus needs-validation, no severity for unconfirmed items, "a checklist deviation is not a finding", the rule against probing deployed systems ([evidence](evidence.md), [review](review.md)) |
| `security-reviewer` agent | A locally authored agent definition; provenance unknown, no upstream or license recorded | OWASP and CWE classification of each finding and the review report layout ([review](review.md)) |

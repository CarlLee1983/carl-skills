# Sources

Partially verified on 2026-10-23: the OWASP Top 10 facts come from its first-party site and repository; the CWE Top 25 page could not be fetched, so only its URL is recorded. Re-read the source before relying on any of it for a new edition.

## Classification references

| Reference | Edition and location | License or terms | Used in |
| --- | --- | --- | --- |
| OWASP Top 10 | 2025 edition, [top10.owasp.org/2025](https://top10.owasp.org/2025/); source repository [OWASP/Top10](https://github.com/OWASP/Top10) at commit `3a31f35346c3f4e90f350395124382fa53af2afe` | CC BY-SA 4.0 | Category for each confirmed finding ([review](review.md), [evidence](evidence.md)) |
| CWE Top 25 | 2025 edition URL: [cwe.mitre.org/top25/archive/2025](https://cwe.mitre.org/top25/archive/2025/2025_cwe_top25.html) (not fetched; see below) | [MITRE CWE Terms of Use](https://cwe.mitre.org/about/termsofuse.html) | CWE identifier for each confirmed finding |

OWASP Top 10:2025 categories: A01 Broken Access Control; A02 Security Misconfiguration; A03 Software Supply Chain Failures; A04 Cryptographic Failures; A05 Injection; A06 Insecure Design; A07 Authentication Failures; A08 Software or Data Integrity Failures; A09 Security Logging and Alerting Failures; A10 Mishandling of Exceptional Conditions.

The CWE Top 25 page could not be fetched on 2026-10-23 (cwe.mitre.org unreachable), so the edition URL is recorded without its publication date or ranking. Give each confirmed finding its best-known CWE identifier; confirm it on cwe.mitre.org when reachable, and when it is not, keep the identifier and mark it unconfirmed rather than omitting it.

## Known underlying security skills

Facts about tools that exist, for installers; a hint only, never a routing basis. Discovery and dispatch rules live in [delegation](delegation.md). Facts below were read from the local install record on 2026-10-23.

| Name | What it is | Provenance |
| --- | --- | --- |
| `security-audit` | A skill: source-first security audit. Its guidance mode reviews named files read-only; its full audit mode spawns agents and writes report files | GitHub repository `cloudflare/security-audit-skill`, per the install record; commit not recorded (folder hash only) and no license file in the installed copy, so the license is unverified |

## Borrowed practices

Ideas were adapted in paraphrase; no text was copied.

| Source | Provenance | Borrowed into |
| --- | --- | --- |
| `security-audit` skill | Installed from the GitHub repository `cloudflare/security-audit-skill`, per the install record; no license file is present in the installed copy and the commit is not recorded (only a folder hash), so the license is unverified | The trust-boundary threshold and its six elements, confirmed versus needs-validation, no severity for unconfirmed items, "a checklist deviation is not a finding", the rule against probing deployed systems ([evidence](evidence.md), [review](review.md)) |
| `security-reviewer` agent | A locally authored agent definition; provenance unknown, no upstream or license recorded | OWASP and CWE classification of each finding and the review report layout ([review](review.md)) |

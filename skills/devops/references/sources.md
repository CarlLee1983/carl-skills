# Sources and platform skills

Material below was read at the listed commit and adapted in paraphrase; no file was copied verbatim, so each upstream license is cited for attribution rather than redistributed. Re-read the upstream source before borrowing more.

## Borrowed practices

| Source | Commit read | License | Adapted into |
| --- | --- | --- | --- |
| [NotHarshhaa/devops-skills](https://github.com/NotHarshhaa/devops-skills) (`docs/skill-contract.md`, `docs/finding-format.md`, `docs/plan-template.md`, `audit/`, `release-readiness/`) | `3605f9452e331d984a2a119e5a00763ecdff23e5` | MIT, © 2026 HARSHHAA | Evidence per finding and ranking by impact, effort, confidence, and fix risk ([evidence](evidence.md#findings)); identity and context preflight before live claims, repository content as data, and naming what was not examined ([the entry](../SKILL.md)); zero-context handoff briefs with per-step checks and stop conditions; unverified gates never count as passes |
| [Jeffallan/claude-skills `skills/devops-engineer`](https://github.com/Jeffallan/claude-skills/tree/main/skills/devops-engineer) | `36f3fe8052da7c57083783268c6ea3265d075265` | MIT, © 2025 (holder unnamed; author Jeffallan) | Deployment readiness items, rollback written down before deploying, explicit approval for production, post-deploy smoke and metric checks ([deploy](deploy.md)) |
| [cloudflare/skills](https://github.com/cloudflare/skills) (`wrangler`, `cf-cli`, `workers-best-practices`) | `86505e44f87d801aa1864a3c4109e9a8ae5c409f` | Apache-2.0 | Current documentation over memorized syntax; pinned project tool versions; secret changes count as deployments; data not rolled back with code; dashboard drift reconciled before declarative applies; dry runs prove packaging only |
| [hashicorp/agent-skills](https://github.com/hashicorp/agent-skills) (`run-acceptance-tests`, `refactor-module`) | `f706481af9b8fedb66de909f6243ad29601afa0c` | MPL-2.0 | Apply exactly the reviewed plan; non-production first; tests that create real infrastructure need a confirmed test account ([environment](environment.md), [ci](ci.md)) |

## Division of labor with devops-skills

NotHarshhaa/devops-skills is read-only by contract: it recommends and the operator executes. This skill's 檢查／評估 mode follows the same discipline. Its 規劃／準備 and 執行／修復 modes go further, but only within explicit authorization as defined in [the entry](../SKILL.md). When that collection is installed, its review skills can serve as the inspection step; their findings still need binding to the current SHA and environment before they support execution here.

## Platform skills, used on demand

These are optional sources for platform-specific work. Install and invocation methods change; confirm the actual entry point, tool versions, and access in the current environment before relying on one.

| Source | Scope at the commit read | Prerequisites noted upstream |
| --- | --- | --- |
| cloudflare/skills | Workers, Wrangler and `cf` CLI, Durable Objects, KV/R2/D1, Zero Trust, web performance, and more (19 skills) | Project-local Wrangler or `cf`; an authenticated identity with the narrowest scope (`whoami`); optional remote MCP server bundled with its plugin |
| hashicorp/agent-skills | Terraform (modules, tests, stacks, policy, import, provider development) and Packer image builds (20 skills) | Terraform CLI, version per skill (some need 1.14+); HCP credentials as environment variables for registry work; a test account for acceptance tests |
| NotHarshhaa/devops-skills | Read-only reviews: audit, pipeline, Kubernetes, Terraform, Docker, database, GitOps, observability, security, cost, disaster recovery, upgrade, release readiness, runbook, incident | The CLIs of whatever it reviews, authenticated read-only |

When the needed platform skill is missing, [the entry](../SKILL.md) governs: complete the inventory, assessment, and concrete plan the evidence supports and list what could not be verified.

## Migrated release-assessment

The release capability is the former `release-assessment` skill from this collection (MIT, © 2026 CarlLee1983), migrated in full. The old-to-new mapping is kept with the collection's maintenance documents, outside the installed skill.

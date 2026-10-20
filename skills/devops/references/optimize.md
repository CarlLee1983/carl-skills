# Optimize

Analyze capacity, performance, quotas, and cost, and propose or carry out improvements backed by data.

## Triggers

Rising cost or a budget question; slow responses or resource saturation; approaching quota or capacity limits; rightsizing, scaling, or reserved capacity decisions.

## Inputs

- Services, environments, and the question (cost, latency, throughput, saturation, quota).
- Billing exports, usage metrics, performance data, quotas, and their time ranges.
- Reliability targets and constraints that limit changes.

## Steps

1. **Collect.** Gather the data with its source, period, and granularity. Note gaps (missing tags, sampled data, short history). **Done:** every figure has a source and period, or the gap is named with the query that would fill it.
2. **Baseline.** Describe current usage and cost, peaks, and trends from the data. Find the largest contributors and the bottlenecks. **Done:** each claim cites the data behind it.
3. **Options.** For each improvement, state the expected effect, how it was estimated, the data period, confidence, and the reliability trade-off (headroom lost, failover capacity, latency risk). Without data, give the method and the data needed instead of a figure. **Done:** each option shows method, basis, and trade-off; no number appears without its basis.
4. **Apply and measure.** Within authorization, apply a change through the project's method, then measure the same metric over a comparable period. **Done:** the realized effect is reported with before and after periods, separately from the estimate.

## Output

The fixed report from `SKILL.md`, with the data inventory, baseline, ranked options (largest supported effect at acceptable risk first), and measured results for applied changes.

## Done

Every estimate carries its period, basis, and reliability trade-off (see [evidence](evidence.md)); applied changes have measured outcomes, or a later measurement backed by a named platform schedule or tracker ticket with an owner.

## Blocked

Insufficient data: deliver the analysis the data supports, state that savings cannot be quantified yet, and specify the data to collect and for how long.

## Handoff

Architecture changes (re-platforming, caching layers, data model) → SA. Query and database tuning → DBA. Code-level performance fixes → the project's implementation entry point. Capacity alerts → [observe](observe.md).

# Domain Docs

## Layout

This repository uses a single context: `GLOSSARY.md` at the repository root and decisions under `docs/adr/`, named `NNNN-short-title.md`.

## Before exploring

Read `GLOSSARY.md` and ADRs relevant to the area being changed. If these files do not exist, proceed silently. Do not create empty placeholders; use the `domain-modeling` skill to record terms or decisions when they are resolved.

## Vocabulary

Use glossary terms consistently in specifications, issues, implementation, and tests. If a concept is missing, reconsider whether it is needed or record the gap for domain modeling.

## Decision conflicts

Explicitly identify any conflict with an existing ADR and explain why reconsidering that decision is warranted. Do not silently override it.

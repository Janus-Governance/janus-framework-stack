# Janus Operational Protocol (Local)

This folder contains the operational protocol stack used to run Janus work locally, adjacent to (but separate from) Janus Core.

Stack entrypoint: evidence-first.md

## Scope
- Applies to local workflow execution: prompts, audits, evidence capture, intervention rules, and human gates.
- Does not modify or redefine Janus Core or RFCs.

## Files
- prompt-governance.md
- evidence-first.md
- duplicate-prompt-guard.md
- frontend-link-governance.md
- runtime-intervention-rules.md
- human-gate-rules.md

## Protocol Stack Order

1. evidence-first.md
2. prompt-governance.md
3. human-gate-rules.md
4. omission-response.md
5. core-protection.md
6. repo-structure-governance.md
7. duplicate-prompt-guard.md
8. frontend-link-governance.md
9. runtime-intervention-rules.md

## Operating principle
Prefer deterministic, repeatable steps:
- declare intent
- collect evidence
- make minimal changes
- validate
- record outcomes

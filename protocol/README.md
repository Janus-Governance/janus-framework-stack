# Janus Operational Protocol (Local)

This folder contains the operational protocol stack used to run Janus work locally, adjacent to (but separate from) Janus Core.

Stack entrypoint: evidence-first.md

## Scope
- Applies to local workflow execution: prompts, audits, evidence capture, intervention rules, and human gates.
- Does not modify or redefine Janus Core or RFCs.


## Files
- evidence-first.md
- prompt-governance.md
- human-gate-rules.md
- core-protection.md
- omission-response.md
- repo-structure-governance.md
- duplicate-prompt-guard.md
- frontend-link-governance.md
- runtime-intervention-rules.md

#
# Protocol Layers
#
- **change-governance/**
	Governs how changes are introduced, validated, observed, 
	and reverted in the system. Ensures deterministic promotion, 
	rollback safety, and runtime traceability.

	Includes:
	- Promotion Gate v1.0
	- Baseline & Rollback v1.0
	- Runtime Observability v1.0


## Protocol Stack Order

- evidence-first.md
- prompt-governance.md
- human-gate-rules.md
- core-protection.md
- omission-response.md
- repo-structure-governance.md
- duplicate-prompt-guard.md
- frontend-link-governance.md
- runtime-intervention-rules.md

## Operating principle
Prefer deterministic, repeatable steps:
- declare intent
- collect evidence
- make minimal changes
- validate
- record outcomes

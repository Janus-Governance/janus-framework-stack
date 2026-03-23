# Baseline & Rollback v1.0

Status: draft-local

## Problem it solves

When a promoted change introduces runtime errors, broken 
interfaces, or degraded UX, the system must recover 
immediately. Without a formal rollback protocol, teams 
tend to patch on top of broken states, increasing 
instability and compounding errors.

## Rule

At all times, a named and restorable baseline must exist.

If a promoted change introduces breakage, the system 
must revert to the last stable baseline before any 
additional change is applied.

Rollback takes precedence over debugging or patching.
Rollback is a governance action and must be executed 
by an authorized actor.

## Operational definition

- **Baseline:**
	A named, explicitly accepted system state considered 
	stable and safe. Identifiable and restorable using 
	only its reference identifier, without additional 
	context or interpretation.

- **Breakage:**
	Any condition where the system deviates from expected 
	behavior, including runtime errors, missing components, 
	UI failure, or UX degradation that prevents a user 
	from completing the primary task of the affected surface.

- **Rollback:**
	A controlled reversion to the last stable baseline. 
	Rollback is a governance action, not an optional 
	operation. Must be executed before any additional 
	change is applied to the broken state.

## Acceptance criteria

A system is compliant only if:

- A current baseline is explicitly defined and identifiable
- The baseline can be restored using only its reference 
	identifier
- Any detected breakage triggers immediate rollback 
	before further changes
- No attempt is made to patch or debug before 
	restoring baseline
- The system returns to a stable working state 
	after rollback
- If rollback cannot be executed, failure is escalated 
	to human authority before any other action is taken

## Required evidence

- **Baseline reference:** identifier of the current 
	stable baseline
- **Breakage detection:** description of the failure 
	condition and how it was observed
- **Rollback action:** record of the rollback execution, 
	including actor and timestamp
- **Authorization:** identity of the authorized actor 
	who executed the rollback
- **Post-rollback state:** confirmation that the system 
	returned to stable state

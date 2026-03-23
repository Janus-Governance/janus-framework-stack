# Promotion Gate v1.0

Status: draft-local

## Problem it solves

Unstable or unvalidated experiments must not reach the main 
or public product surface. Without an explicit promotion gate, 
experimental changes can silently enter the accepted baseline, 
introducing undefined behavior, broken states, or unreviewed 
UX into production.

## Rule

No change may be promoted to the main or public baseline 
without passing the following sequence:

lab/local → human validation → promote

Skipping any step is non-compliant.

## Operational definition

- **Lab/local:**
	An isolated experimental environment where changes are 
	tested without affecting the accepted baseline or any 
	public-facing surface.

- **Human validation:**
	Explicit approval by an authorized human reviewer based 
	on observed behavior and expected UX or runtime outcome. 
	Validation must be based on visible, verifiable evidence — 
	not on assumption or intent.

- **Promote:**
	A controlled, explicit move of a validated state into 
	the accepted baseline. Promotion is a governance event, 
	not an automatic operation.

## Acceptance criteria

A change may be promoted only when all of the following 
are true:

- The change was tested in lab/local environment
- A human reviewer observed the behavior directly
- The result was explicitly accepted before promotion
- No broken or experimental state reaches the main 
	or public surface as part of the promotion
- A corresponding evidence record exists for the promotion

## Required evidence

The following evidence must exist before promotion is 
considered complete:

- **Changed file scope:** exact paths affected by the change
- **Validation context:** environment and conditions under 
	which human validation occurred
- **Human verdict:** explicit acceptance or rejection 
	by the authorized reviewer
- **Promotion decision:** record of the decision to promote, 
	including who decided and when
- **Resulting baseline reference:** the state of the baseline 
	after promotion (commit, version, or equivalent reference)

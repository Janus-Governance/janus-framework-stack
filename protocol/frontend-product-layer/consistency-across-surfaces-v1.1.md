# Consistency Across Surfaces — v1.1

## Description
This protocol states that, within the Frontend Product Layer, similar interface elements and interaction patterns must behave consistently across all surfaces.

## Problem it solves
It prevents confusion, reduces cognitive load, and avoids user errors caused by inconsistent behavior, labeling, or interaction patterns across the product.

## Rule
Any similar component, interaction, or pattern MUST behave consistently across all relevant surfaces.
Inconsistent behavior for equivalent elements is non-compliant unless explicitly approved and documented.

## Operational definition

- **Surface:**
	Any user-facing interface context, including pages, views, components, or flows.

- **Similar element:**
	Any component or interaction that serves the same purpose.
	Two elements serve the same purpose when they trigger equivalent system actions or produce equivalent outcomes for the user, regardless of labeling or visual presentation.

- **Consistency:**
	Alignment in behavior, labeling, feedback, and interaction logic for similar elements across surfaces.

- **Inconsistency:**
	A condition where equivalent elements behave differently.
	Justified inconsistencies require explicit documentation and human approval before implementation.
	Undocumented inconsistencies are non-compliant.

## Practical application

If two buttons perform the same type of action, they must follow the same interaction pattern and feedback behavior.
If similar forms exist in different parts of the product, validation, error handling, and submission behavior must be consistent.
If navigation patterns are repeated, they must follow the same structure and response logic.

## Notes

- This protocol applies only within the Frontend Product Layer as defined in the Janus architecture.
- This protocol applies to visual interfaces with human end-users.
- Consistency is evaluated from the perspective of a first-time user with no prior knowledge of internal implementation.
- Consistency is required across surfaces serving equivalent user roles and contexts.
- Predictable Interaction States defines what states must exist per interaction. This protocol defines that equivalent interactions must produce those same states consistently across surfaces.
- This protocol complements Clarity Over Cleverness and User Surface First.

## Status
draft
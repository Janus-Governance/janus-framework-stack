# Progressive Disclosure — v1.1

## Description
This protocol states that, within the Frontend Product Layer, information and interface complexity must be revealed progressively based on user context and intent.

## Problem it solves
It prevents cognitive overload, reduces friction, and improves usability by avoiding the presentation of unnecessary or overwhelming information at once.

## Rule
Information and functionality MUST be revealed progressively.
Exposing full complexity upfront without user intent is non-compliant.
Critical information must remain visible at all times.

## Operational definition

- **Progressive disclosure:**
	A design approach where only essential information is shown initially, and additional details are revealed through user interaction or context.

- **User intent:**
	A signal derived from user actions such as clicks, navigation, or input that indicates the need for more information or functionality.
	Passive signals (hover, focus) may trigger disclosure only for supplementary information.
	Active signals (clicks, explicit input) are required for functional complexity disclosure.

- **Critical information:**
	Any data or action required to complete the current task without which the user cannot proceed or would make an irreversible error.

- **Excessive complexity:**
	Any information or interface element not required to complete the primary user task visible on the current surface.

## Practical application

If a form contains advanced options, they must be hidden by default and revealed only when needed.
If a dashboard contains detailed analytics, only high-level summaries should be shown initially, with deeper data accessible on demand.
If an interface includes rarely used actions, they should be placed behind secondary interactions such as menus or expansions.

## Notes

- This protocol applies only within the Frontend Product Layer as defined in the Janus architecture.
- This protocol applies to visual interfaces with human end-users.
- Critical information must never be hidden by progressive disclosure.
- An initial state with hidden content is not an empty state. Empty States Are Intentional applies only when no data exists, not when data is present but not yet disclosed.
- Where external UX references conflict with this protocol, this definition takes precedence within the Frontend Product Layer.
- This protocol complements Clarity Over Cleverness and User Surface First.

## Status
draft
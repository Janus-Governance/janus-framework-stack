# Error States Are Actionable — v1.1

## Description
This protocol ensures that error states in the user interface provide clear, actionable guidance so users can understand what happened and what to do next.

## Problem it solves
Prevents users from being blocked or confused when something goes wrong by ensuring errors are understandable and actionable.

## Rules
- Error messages MUST clearly describe the issue in user-understandable language
- Error states MUST provide a next step or recovery path
- Technical or internal error details MUST NOT be exposed to end users unless explicitly justified
- Silent failures are non-compliant

## Constraints
- Error handling must prioritize user recovery over system explanation
- Errors must not expose sensitive system information
- The system must remain consistent with other interaction states

## Operational definition

**Error state:**  
Any system condition where the intended user action cannot be completed.

**Actionable option:**  
A clearly available action that allows the user to:

- retry the operation,
- correct the input,
- choose an alternative path, or
- safely exit the flow.

**Safe exit:**  
A safe exit returns the user to a known and stable state without data loss or ambiguous system state.

## Practical application

When an error occurs, the system MUST:

- Clearly state what failed (no vague messages).
- Provide at least one direct action the user can take.
- Prioritize recovery actions (retry, fix, alternative).
- Avoid dead-end states with no navigation or resolution.

When no recovery action exists:

The system MUST provide:

- a safe exit path, or
- an explicit explanation of why no action is possible.

## Scope

This protocol applies to errors presented within an active user interface session.
Background or system-level errors without active user context are out of scope.

## Notes

- Error messages alone are not sufficient; they must be paired with action.
- Passive errors (logs, silent failures) do not satisfy this protocol.

This protocol complements:

- Clarity Over Cleverness
- Predictable Interaction States

## Status
draft

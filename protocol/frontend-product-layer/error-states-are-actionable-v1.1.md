Error States Are Actionable — v1.1
Rule

Every error state MUST present at least one actionable option.

Rationale

Errors without a clear next step leave users blocked and break task continuity.
An actionable error maintains flow by providing a path forward, even in failure.

Operational definition

Error state:
Any system condition where the intended user action cannot be completed.

Actionable option:
A clearly available action that allows the user to:

retry the operation,

correct the input,

choose an alternative path, or

safely exit the flow.

Safe exit:
A safe exit returns the user to a known and stable state without data loss or ambiguous system state.

Application

When an error occurs, the system MUST:

Clearly state what failed (no vague messages).

Provide at least one direct action the user can take.

Prioritize recovery actions (retry, fix, alternative).

Avoid dead-end states with no navigation or resolution.

When no recovery action exists:

The system MUST provide:

a safe exit path, or

an explicit explanation of why no action is possible.

Scope

This protocol applies to errors presented within an active user interface session.
Background or system-level errors without active user context are out of scope.

Notes

Error messages alone are not sufficient; they must be paired with action.

Passive errors (logs, silent failures) do not satisfy this protocol.

This protocol complements:

Clarity Over Cleverness

Predictable Interaction States

Acceptance criteria:

File created at the exact path /protocols/

Markdown structure preserved

No wording changes

No additional sections added

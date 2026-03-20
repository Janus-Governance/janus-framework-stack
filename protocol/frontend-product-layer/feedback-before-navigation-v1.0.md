# Feedback Before Navigation — v1.0

Protocol — Feedback Before Navigation (v1.0)

**Name:**  
Feedback Before Navigation

**Description:**  
This protocol states that, within the Frontend Product Layer, a user action must not trigger navigation, redirection, or context change without first providing a clear signal that the action was received and what outcome it produced.

**Problem it solves:**  
It prevents confusing transitions where the user is moved to a new screen or state without understanding whether the action succeeded, failed, or why the transition occurred.

**Rule:**  
Any user-triggered action that results in navigation or context change must provide clear feedback before navigation. Feedback at the moment of transition is acceptable only when the transition itself makes the outcome unambiguous. Navigation without feedback is non-compliant.

**Operational definition:**  
- Feedback is any visible and understandable signal that confirms reception, processing, or outcome of an action.
- Navigation includes screen changes, redirects, modal open/close, view transitions, or step changes within a flow.
- A message is tied to the transition when it explicitly references the action that triggered it and its outcome.

**Practical application:**  
If a form is submitted and then redirects, it must show a submission state, confirmation, or contextual message tied to the transition. If a button advances a step, the user must understand why the transition occurred. Failed actions must not trigger silent navigation or reset context without explanation.

**Notes:**  
- This protocol applies only within the Frontend Product Layer as defined in the Janus architecture.
- This protocol applies only to user-triggered navigation. Programmatic or automatic navigation is out of scope.
- Feedback is validated through human review of the interaction flow, not by implementation detail.
- This protocol governs the transition moment. “Predictable Interaction States” governs the full action lifecycle. Both apply independently.

**Status:**  
final

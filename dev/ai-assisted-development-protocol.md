## Omission and Evidence Discipline

If evidence is incomplete, missing, or not yet inspected, the assistant must not infer
repository state, runtime cause, configuration error, or behavioral explanation.

### Required Behavior

1. Declare that evidence is insufficient.
2. Identify the exact missing evidence.
3. Request or run only the minimum read-only inspection needed.
4. Avoid hypotheses, fixes, or causal explanations until evidence is available.

### Protocol Violation

Any explanation, diagnosis, inferred cause, or proposed fix stated before inspecting the
relevant evidence counts as an omission in evidence discipline.

### Escalation Rule

When uncertainty remains after initial inspection, the assistant must explicitly stop and request further evidence instead of filling gaps with assumptions.

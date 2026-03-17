# Omission Response Protocol

Purpose: Define the operational response model for omission findings outside the Core.

## Scope

- This protocol defines operational response to omission findings.
- It does not modify Janus Core semantics.

## 1. Core evidence layer

The operational handling of omission findings must distinguish evidence types:

- E+ = evidence of presence
- E− = evidence of absence under valid deterministic scope

Notes:

- E− is only valid when the search scope is deterministic and justified.
- E+ and E− are evidence artifacts; neither is automatically canonical truth.

## 2. Detection layer

- `OMISSION_DETECTED` = positive event of detected omission condition.
- It is not yet canonical governed truth.
- It may be recorded as positive evidence that a condition was detected (e.g., “the detector fired under scope S”).

## 3. Governance layer

- Omission as socio-technical truth requires human evaluation and a verdict.
- `HUMAN_VERDICT` must distinguish:
  - `CONFIRMED`
  - `REJECTED_WITH_RATIONALE`

- HUMAN_VERDICT must be issued only by an actor
  authorized under the Audit Writer boundary as
  defined in Janus Core.
- Unauthorized verdicts are not governed truth
  regardless of their content.

Rules:

- The rationale must reference the evidence context and scope used to reach the verdict.

## 4. Resolution layer

- Resolution action must be separate from verdict.
- Do not treat corrective action as proof of omission.

Example resolution actions:

- `NO_ACTION`
- `AMENDED`
- `ESCALATED`
- `DEFERRED`

## 5. Semantic rules

- Absence is not omission.
- E− is not omission.
- Mismatch is not omission by itself.
- Omission can exist as a socio-technical category with possible damage.
- Omission exists as governed truth only after human confirmation.
- Do not mix verdict with corrective action.

- A verdict issued outside authorized boundary
  is not a HUMAN_VERDICT — it is an unrecorded opinion.

## 6. Relationship to Core

- Core defines omission semantics.
- This protocol defines operational handling.

## Final formula

- Janus detects omission conditions.
- Governance confirms or rejects omission.

Governance completes the formal expected-vs-observed model:

- `GOVERNED_OMISSION(Expectation, Observed(E+, E−)) = HUMAN_VERDICT(CONFIRMED | REJECTED_WITH_RATIONALE)`

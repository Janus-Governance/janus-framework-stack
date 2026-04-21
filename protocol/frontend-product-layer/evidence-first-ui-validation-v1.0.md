# Evidence-First UI Validation v1.0

## Principle

Visual anomalies must be validated against system evidence before any modification is applied.

## Enforcement Rule

No UI change (styles, layout, typography, interaction) is permitted unless:
1. The anomaly is reproducible
2. The anomaly is confirmed by inspecting source (CSS, HTML, tokens)
3. Environmental factors are ruled out

## Failure Mode

Acting on perceived anomalies without validation leads to:
- unnecessary UI changes
- divergence from design baseline
- system inconsistency

## Required Checks

Before modifying UI:

1. Inspect source styles
2. Compare against baseline definitions (janus-design)
3. Verify environment:
   - browser zoom
   - cache state
   - viewport/device
4. Confirm reproducibility

## Example

Observed issue:
Typography inconsistency in core surface

Validation:
- CSS matches baseline
- Tokens correct
- Browser zoom at 80%

Conclusion:
No system modification required

## Governance Mapping

- Layer: frontend-product-layer
- Type: validation protocol
- Dependency: janus-design baseline

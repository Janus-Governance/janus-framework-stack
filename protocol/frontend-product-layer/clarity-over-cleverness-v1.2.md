# Clarity Over Cleverness — v1.2

## Description
This protocol states that, within the Frontend Product Layer, clarity in communication and interaction takes priority over clever solutions, aesthetic optimizations, or elegant implementations that reduce understanding for either the user or the system reviewer.

## Problem it solves
It prevents confusing interfaces, ambiguous microcopy, unclear flows, or design and code decisions that prioritize originality or sophistication over comprehension. It reduces cognitive load for both users and the team.

## Rule
When multiple ways exist to solve an interaction, message, or component, the clearest, most explicit, and most predictable option MUST be chosen, even if it is less elegant, less compact, or more redundant from a technical or visual perspective.

## Operational definition

- **Clear interaction:**  
  An interface behavior that can be understood immediately without interpretation or prior knowledge.

- **Clever interaction:**  
  An interface behavior that prioritizes novelty, surprise, or aesthetics over immediate comprehension.

- **Cognitive load:**  
  The mental effort required for a user to understand and interact with the system.

## Constraints

- Clarity MUST take precedence over elegance.  
- Ambiguity introduced for stylistic effect is non-compliant.  
- A compact solution is acceptable only if it does not reduce immediate understanding.

## Practical application

If a button can use an abstract icon or explicit text, explicit text should be preferred when comprehension would otherwise be reduced.

If a flow can be shortened but becomes less understandable, the clearer flow MUST be preferred.

If frontend code can be made shorter through obscure abstraction, the more readable structure MUST be preferred when clarity is affected.

## Notes

- This protocol applies only within the Frontend Product Layer as defined in the Janus architecture.  
- This protocol applies to visual interfaces with human end-users.  
- Clarity is evaluated from the perspective of a first-time user or reviewer with no prior knowledge of the system.  
- This protocol complements Predictable Interaction States and Consistency Across Surfaces.  

## Status
draft

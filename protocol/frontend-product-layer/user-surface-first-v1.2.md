# User Surface First — v1.2

## Description
This protocol states that, within the Frontend Product Layer, the highest priority for any intervention is the visible and usable surface of the product for the end user. Before optimizing internal structures, abstractions, or technical improvements not perceptible to the user, the concrete experience of use must be resolved, clear, and functional.

## Problem it solves
It prevents development from drifting toward internal logic, refactors, or technically correct decisions in the abstract that are disconnected from the visible value of the product. It reduces the risk of building a technically polished frontend that is poor, confusing, or incomplete in its real experience.

## Rule
In frontend/product development decisions, priority MUST be given to anything that directly impacts the visible, understandable, and usable experience of the end user. No internal improvement may displace a correction or improvement of the surface if it affects comprehension, navigation, reading, interaction, or perception of the product.

## Operational definition

- **User surface:**  
  Any interface layer directly perceivable or interactable by the user (UI, messages, feedback, navigation states).

- **System capability:**  
  Any underlying logic, data processing, or backend functionality not directly exposed to the user.

- **Visible outcome:**  
  A perceivable change in the user interface that reflects system state or action results.

## Constraints

- Surface improvements MUST be prioritized over internal optimizations when user comprehension or usability is affected.
- Technical refactors or abstractions are acceptable only if they do not reduce the clarity or usability of the user surface.

## Practical application

If a screen works technically but the user does not understand what to do, visual hierarchy, texts, states, calls to action, or interaction flow MUST be corrected first.

If there is a debate between refactoring internal components or solving a visible problem of layout, feedback, clarity, or basic accessibility, the visible issue MUST be resolved first.

In progress reviews, the initial criterion is not "if the code is better" but "if the product surface is clearer, more usable, and more solid."

## Notes

- This protocol applies only within the Frontend Product Layer as defined in the Janus architecture. It does not apply to backend, infrastructure, or governance layers.
- Surface improvement is validated through human review of the end user's interaction flow, not through isolated technical metrics.
- This protocol formalizes user-centered priority within the Janus context. It is compatible with user-centered design approaches but is defined operationally for this framework.

## Status
draft

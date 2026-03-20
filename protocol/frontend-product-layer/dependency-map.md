# Frontend Product Layer — Dependency Map v1.0

## Purpose
This document defines dependency relationships between protocols in the Frontend Product Layer.

---

## Dependency structure

### Foundational layer (interpretation rules)

- User Surface First  
- Clarity Over Cleverness  

These protocols define how all other protocols must be interpreted.

---

### State model layer

- Predictable Interaction States  

Defines the universal state model for user interactions.

---

### Transition layer

Feedback Before Navigation occupies its own layer because it governs transition moments specifically, not state representation.
Future transition protocols must be placed in this layer.

- Feedback Before Navigation  

Depends on:
- Predictable Interaction States  

Defines behavior at transition moments.

---

### State visibility layer

- Loading States Are Visible  
- Error States Are Actionable  
- Empty States Are Intentional  

Depend on:
- Predictable Interaction States  

These protocols define how specific states must be represented.

---

## Dependency rules

- Foundational protocols apply to all other layers  
- State model protocols define the base structure  
- Transition and state visibility protocols must not contradict the state model  
- No protocol may depend on a lower-level protocol  
- Foundational protocols constrain interpretation of all other protocols as defined in the Frontend Product Layer Index v1.1 application model.  

---

## Notes

- This document is part of the Janus Meta-layer  
- This map defines logical dependency, not execution order  
- Cyclic dependencies are not allowed  
- This map complements but does not replace the Frontend Product Layer Index v1.1.  
- Reading order and conflict resolution are defined in the index.  

---

## Status
draft

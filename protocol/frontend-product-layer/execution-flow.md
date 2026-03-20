# Frontend Product Layer — Execution Flow v1.1

## Purpose
This document defines the runtime decision flow for applying Frontend Product Layer protocols.

---

## Execution sequence

Reading order defines conceptual understanding.  
Execution sequence defines runtime application.  
Both follow the same protocol order by design.

1. Evaluate the user-visible surface  
2. Apply clarity constraints  
3. Determine interaction state  
4. Evaluate transition requirements  
5. Evaluate loading visibility  
6. Evaluate error actionability  
7. Evaluate empty state intentionality  

---

## Runtime rules

- User Surface First is evaluated before all other protocols.  
- Clarity Over Cleverness constrains every decision that follows.  
- State-related protocols are evaluated only when their triggering condition exists. Triggering conditions for each protocol are defined within the protocol itself. This flow assumes familiarity with the full stack.  
- Multiple protocols apply when a single interface decision affects more than one protocol's scope. Each step must be evaluated independently before invoking conflict resolution.  
- If multiple protocols apply, conflict resolution must follow the Frontend Product Layer Index.  

---

## Escalation rule

If protocol evaluation does not produce a clear decision, escalate to human authority and record the result through the Janus Core HUMAN_DECISION mechanism as defined in RFC 0004.

---

## Notes

- This document complements the Frontend Product Layer Index and Dependency Map.  
- This flow defines application order, not protocol validity.  
- This flow presents a flat evaluation sequence. Layer structure is defined in the Dependency Map and does not affect execution order.  
- All runtime decisions remain bounded by higher-order protocols.  

---

## Status
draft

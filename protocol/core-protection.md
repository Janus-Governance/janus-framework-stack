# Core Protection

## Purpose
Protect the Janus Core from accidental modification, drift, or semantic corruption.

## 1. Core Definition
The protected Core consists of:
- core/
- docs/glossary.md
- rfcs/0001–0008

## 2. Core Invariants
The Core defines:
- semantic truth
- governance events
- evidence model
- rebuildability guarantees

## 3. Forbidden Actions
Without explicit human approval and RFC:
- editing files in core/
- modifying glossary semantic definitions
- changing governance event definitions
- modifying canonical log model

## 4. Allowed Actions
- referencing the Core
- implementing runtimes
- writing documentation
- adding protocols
- adding demos

## 5. Human Gate Requirement
Any Core modification requires:
- RFC proposal
- human approval
- evidence report

## 6. Protection Principle
"The Core evolves slowly. Everything else evolves around it."

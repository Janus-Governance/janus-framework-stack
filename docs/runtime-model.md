# Janus Runtime Model

## 1. Purpose

Janus defines a governance core; runtimes execute the model in concrete environments.

## 2. Reference Runtime

The current Node demo runtime is a reference implementation proving:
- governance evaluation
- omission detection
- evidence model (E+ / E-)
- audit writer boundary
- deterministic rebuild

Location:

runtime/demo-node/

It is intentionally minimal and designed for demonstration.

## 3. Future Runtimes

Production runtimes may implement the same model in different environments, for example:
- Node runtime
- Python runtime
- Apps Script runtime
- Database-backed runtime

These runtimes must respect the Janus Core invariants.

## 4. Adapters

Runtimes may use adapters for:
- storage
- databases
- message systems
- APIs

Examples:

filesystem adapter  
postgres adapter  
event-stream adapter

## 5. Principle

Janus governs system evolution.  
Runtimes execute governance evaluation.

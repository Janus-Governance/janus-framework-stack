# Janus Framework Stack

This repository is the public **operational layer** of the Janus ecosystem. It integrates protocols, Core references, runtimes, RFCs, and public-facing interfaces into a single, inspectable framework.

This is **not a finished product**. The system is in **early validation** and is **not production-ready**.

## What is Janus

Janus is a micro operational governance layer for AI-assisted development. It focuses on making work **traceable**, **deterministic**, and **rebuildable** by requiring explicit evidence, explicit scope, and explicit authority decisions.

## Core principles

- Evidence-first execution
- Deterministic scope
- Human authority gates
- Rebuildability
- No implicit operations

## Architecture Overview

### Core repos

Janus Core and its canonical specifications live in separate repositories (conceptual sources of truth), including:

- janus-core
- janus-governance-core
- janus-runtime
- janus-rfc

### Framework layer (this repo)

This repository assembles the operational framework layer:

- /protocol
- /docs
- /demos
- /assets

### Public interfaces

Public-facing integration points (documentation, demos, and web interface) live in companion repositories such as:

- janus-docs
- janus-demo
- janus-governance.github.io

## Current Status

- Early validation
- Structurally aligned
- Not production-ready

## Relationship with janus-governance-core

- janus-governance-core is the conceptual origin and specification baseline.
- This repository is the operational framework that organizes and deploys protocols, references, and runnable artifacts around that baseline.

## Why this exists

AI-assisted development needs operational controls that make outcomes reproducible and accountable:

- Traceability: decisions and actions are recorded with evidence context.
- Authority: outcomes requiring accountability pass through explicit human gates.
- Reproducibility: deterministic scope and evidence allow reconstruction of what happened and why.

## Important note

This repository is released before full validation. It is intended for testing and inspection rather than production deployment.

## Next Steps

- Real workflows (IA ↔ Copilot)
- Protocol validation
- Runtime alignment
- RFC formalization

## Author

Martín Nicolás Sánchez Morales


Domain: https://framework.janusgovernance.org

# Janus Framework Stack

**Janus** is an open framework for making AI-assisted development transparent, accountable, and reproducible. It helps teams track decisions, evidence, and human approvals in software projects.

## Why Janus?
Modern AI tools can automate code and decisions, but this creates risks: missing context, unclear authority, and hard-to-reproduce results. Janus solves this by enforcing traceability, explicit evidence, and human sign-off at every step.

## How does it work?
Janus wraps your development process with a protocol stack that:
- Records every key action and decision with evidence
- Requires human approval for critical steps
- Makes it easy to rebuild or audit what happened, when, and why

## What is the protocol stack?
The Janus protocol stack is a set of rules and interfaces that ensure:
- Every change is linked to evidence ("evidence-first")
- Scope and authority are always explicit
- All actions are reproducible and reviewable
This repository assembles these protocols, reference implementations, and demos in one place.


## Quick Start Guide
1. Read the README overview above for context.
2. Get familiar with the protocol stack—see how Janus links evidence, scope, and authority.
3. Try a simple workflow: open the `demos/` folder and follow an example.
4. For deeper understanding, explore the `rfcs/` directory for detailed concepts.

> **Note:** Janus is in early validation and not production-ready. Use it for testing, learning, or contributing feedback.

## Learn More
- [docs/](docs/) — Guides and explanations
- [protocol/](protocol/) — Protocol definitions
- [demos/](demos/) — Example workflows
- [runtimes/](runtimes/) — Reference runtime implementations
- `dev/runtime-observability/` — Minimal runtime telemetry lab with flight recorder, functional test, benchmark, and stress test.

---
MIT License | Author: Martín Nicolás Sánchez Morales

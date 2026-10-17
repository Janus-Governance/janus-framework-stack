# Janus Stack (Architecture)

Janus is a governance kernel and layered architecture for auditable systems operating in AI-assisted environments.

This non-normative Framework document describes the conceptual separation of layers. Janus Core Lite v0.2 Draft is the normative source.

Any MUST/SHOULD/MAY language here is Framework guidance and does not add to or alter Core requirements.

## Layer separation

Janus is structured as a set of layers with explicit responsibilities.

### Core

Location: `core/`

Core defines:
- Canonical terms and semantics defined by Janus Core Lite v0.2
- Protocols and policy primitives
- Canonical log types and event identifiers (e.g., `MANAGEMENT_LOG`, `SCHEMA_LOG`, `AUDIT_LOG`, `OMISSION_DETECTED`)

Core does not define:
- Runtime technologies, vendors, or deployment assumptions
- Storage engines, network transports, or UI constraints

### Framework

Location: `framework/`

Framework defines:
- Reusable governance mechanisms that compose with Core semantics
- Gate patterns (`gates`) and reference models that constrain transitions and outputs

Framework should remain compatible with multiple runtimes.

### Runtimes

Location: `runtimes/`

Runtimes:
- Execute workflows that implement Core and Framework requirements
- Produce and consume records that conform to Core-defined semantics

Runtimes MUST NOT redefine Core meanings.

### Adapters

Location: `adapters/`

Adapters:
- Map runtime interfaces to external storage/transport surfaces
- Preserve the meaning of canonical records while providing interoperability

Adapters MUST document any lossy mapping.

### SDK

Location: `sdk/`

SDKs:
- Provide developer-facing helpers to integrate with a Janus runtime or adapter
- Improve ergonomics without altering Core semantics

## Knowledge spaces

The repository separates normative specifications from supporting material.

- `docs/`: Non-normative Framework interpretation and guidance, subordinate to Janus Core Lite v0.2.
- `papers/`: Background analysis and research notes. Non-normative by default.
- `studies/`: Experiments, logs, and results. Non-normative by default.
- `philosophy/`: Canon and essays. Non-normative by default.

No document in this Framework repository supersedes or extends the normative Core.

## Semantic stability rule (Core-first)

Janus Core Lite v0.2 is the source of semantic truth. `docs/glossary.md` is a subordinate, non-normative aid.

Rules:
1) Framework, Runtime, Adapter, and SDK terminology should remain aligned with the Core.
2) Changing the Framework glossary should trigger review of dependent Framework documents.
3) When a conflict is discovered, the Framework material should be corrected to match the Core.

This rule is intended to keep semantics stable while allowing implementations to evolve independently.

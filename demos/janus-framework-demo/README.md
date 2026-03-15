# Janus Framework Demo (Local-Only)

## Purpose

This is a **private, local-only** demo framework inside the Janus Governance Core repository.

It is intentionally isolated under `demos/janus-framework-demo/` and is meant to validate a **reusable micro-layer** for future products (starting with a trivia-like domain, later other domains).

## Why it does not affect Janus Core

- No changes are made to `core/`.
- No existing documentation or specifications are modified.
- This demo is a **scaffold** for application patterns that *use* Janus-style ideas (events, evidence, gates, audit output) without redefining Janus semantics.

## Current runnable flow

A single minimal, working flow is implemented:

`CSV/source-like input` → `normalize` → `validate (gate)` → `emit Janus-style management event` → `write deterministic audit output`

- Input: `data/sample-questions.csv`
- Output (deterministic): `data/out/audit-log.jsonl` (JSON Lines)

## Future expansion points (prepared, not implemented)

The code is structured to support later additions without refactoring the core demo:

- Supabase adapters (storage + auth)
- memberships (identity / access control)
- AI-assisted content generation (new import sources producing evidence)

## Commands

From this folder:

- `npm install`
- `npm run build`
- `npm test`
- `npm run demo`

## Key folders

- `src/janus/`: typed event model, evidence record builder, validation gates, audit writer
- `src/domain/`: generic domain entity + use case (CSV import)
- `src/adapters/`: swap points for persistence/output (local file now; Supabase later)
- `scripts/test-demo.ts`: proves the flow works deterministically

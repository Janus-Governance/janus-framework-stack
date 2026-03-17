# Janus Bridge — Runtime Status (Experimental)

Janus Bridge is **experimental developer tooling** under `dev/` for validating and demonstrating a minimal, deterministic prompt → validate/execute → result loop with append-only logging.

This runtime is **local-only**, **read/write on the local filesystem**, and **not promoted to `/demos`**.

## Purpose

- Provide a small, deterministic “bridge” runtime for capability-style prompts.
- Produce durable evidence artifacts (`outbox/result.json` + append-only logs).
- Support local experimentation without changing Janus Core.

## Relationship to Janus Core

- Janus Bridge is **not Janus Core**.
- It is an **experimental runtime demo** that lives under `dev/`.
- It does not define or modify Janus Core specifications; it is a tool to exercise workflows and generate evidence.

## Runtime Execution Model

Inputs:
- Prompt file: `dev/janus-bridge/inbox/prompt.json`

Execution:
- One-shot run: `npm run bridge` (from `dev/janus-bridge/`)
- The runtime:
  1. Reads `inbox/prompt.json`
  2. Validates against the capability contract in `dev/janus-bridge/capabilities.json`
  3. Optionally executes the requested capability (unless simulation mode is enabled)
  4. Writes `dev/janus-bridge/outbox/result.json` as the outcome record

Dedupe:
- Prompts are treated as “already processed” if prior bridge lifecycle lines reference the same prompt id in `janus-runtime/events.log`.

## Supported Statuses

Primary validated statuses:
- `validated` — capability + payload validated
- `executed` — capability executed and result produced
- `simulated` — simulation mode validated successfully without execution

Notes:
- `rejected` is also emitted for invalid prompts or missing required fields.

## Supported Capabilities

- `create_file`
  - Writes a file at `payload.path` (repo-root relative)
  - Optional `payload.content` (defaults to empty string)

- `read_file`
  - Reads a file at `payload.path` (repo-root relative)
  - Returns file content in the result payload

- `append_event`
  - Appends one JSON line event to `dev/janus-bridge/logs/events.log`
  - Required payload fields: `event_type`, `event_data`
  - Optional payload fields: `actor_ref`, `scope_ref`

## Append-Only Logs

There are two relevant append-only logs:

1) Janus runtime lifecycle log
- Location: `janus-runtime/events.log`
- Contains bridge lifecycle lines (e.g., received/validated/rejected/executed) and simulation lifecycle events.

2) Bridge-local event log (for `append_event`)
- Location: `dev/janus-bridge/logs/events.log`
- Contains JSONL events appended by the `append_event` capability.

## Simulation Mode

Prompt schema supports:
- Optional field: `simulation: true | false`

When `simulation: true`:
- Capability and payload are validated exactly as normal.
- The capability is **not executed**.
- The runtime **does not** emit normal bridge lifecycle lines (e.g., received/validated/executed).
- The runtime writes `outbox/result.json` with:
  - `status: "simulated"`
  - `summary: "Simulation OK: <action>"`
  - `action: <action>`
  - `simulation: true`
  - `validated_payload: <payload>`
- Logging: appends a single simulation lifecycle line to `janus-runtime/events.log`:
  - `{ "event_type": "simulation", "action": "<action>", "timestamp": "<iso>" }`

## Verified Test Cases Achieved (in-repo)

The following outcomes have been exercised end-to-end in this workspace:

- `read_file` executed:
  - Produced `outbox/result.json` with `status: "executed"` and returned file content.

- `append_event` executed:
  - Produced `outbox/result.json` with `status: "executed"`.
  - Appended one JSONL line into `dev/janus-bridge/logs/events.log`.

- Simulation mode (`simulation: true`) for an existing capability:
  - Produced `outbox/result.json` with `status: "simulated"` and `validated_payload`.
  - Appended a simulation lifecycle line to `janus-runtime/events.log`.

- Rejection behavior:
  - Invalid prompts / missing required payload fields produce `status: "rejected"` results.

## Non-goals

- Not a hosted service.
- Not a security sandbox.
- Not a general workflow engine.
- Not a replacement for Janus Core governance semantics.
- Not a stable API guarantee (interfaces may change as the demo evolves).

## Current Maturity

- Experimental, local-only runtime under `dev/`.
- Intended to be small, inspectable, and deterministic.
- Suitable for capability-contract prototyping and evidence generation, not production use.

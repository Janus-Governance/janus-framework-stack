# Janus Bridge MVP (Experimental)

This folder contains **experimental developer tooling** for local AI-assisted development workflows.
It intentionally lives under `dev/` because it is **not Janus Core** and is not part of the governance runtime itself.

## What it is

The **Janus Bridge MVP** is a minimal, deterministic, file-based bridge that proves a one-shot loop:

1. Read a structured instruction file from `dev/janus-bridge/inbox/prompt.json`
2. Append a `prompt_received` event to `janus-runtime/events.log`
3. Write a deterministic result file to `dev/janus-bridge/outbox/result.json`
4. Append a `result_written` event to `janus-runtime/events.log`

It is a simulation/MVP only.

- No networking
- No telemetry
- No external services
- No VS Code automation
- No Copilot control
- No watchers (one-shot execution)

All reads/writes are constrained to:
- `dev/janus-bridge/**`
- `janus-runtime/**`

## Why it lives in dev/

Janus Core is about governance structures and runtime semantics.
This bridge is **developer tooling** to help connect:

- structured prompts (from a chat system)
- a Janus-compatible event log (for traceability)
- deterministic local evidence artifacts (result files)

Keeping it under `dev/` ensures the repository can evolve this tooling independently without changing Janus Core.

## Current one-shot flow

### Prompt format (required)

`dev/janus-bridge/inbox/prompt.json`

```json
{
  "id": "prompt-001",
  "source": "chatgpt",
  "target": "copilot",
  "action": "create_file",
  "payload": {
    "path": "example.txt",
    "description": "Create a sample file"
  },
  "timestamp": "2026-03-15T00:00:00Z"
}
```

### Result format (written)

`dev/janus-bridge/outbox/result.json`

```json
{
  "id": "prompt-001",
  "status": "received",
  "handledBy": "janus-bridge",
  "timestamp": "...",
  "summary": "Prompt received and logged",
  "sourcePromptPath": "..."
}
```

### Janus events.log behavior

Append JSONL lines to `janus-runtime/events.log`:

```jsonl
{"type":"bridge","name":"prompt_received","actor":"janus-bridge","timestamp":"...","id":"prompt-001"}
{"type":"bridge","name":"result_written","actor":"janus-bridge","timestamp":"...","id":"prompt-001"}
```

## Usage

From this folder:

- Build: `npm run build`
- Run one-shot bridge: `npm run bridge`
- Demo: `npm run demo`

### Behavior notes

- If `inbox/prompt.json` does not exist, the bridge exits cleanly with a message.
- If it exists, the bridge processes it once and exits.
- The MVP does **not** delete `prompt.json`.

## Future direction (not implemented)

Later iterations could connect:

- ChatGPT (or other instruction sources) -> drop structured prompts into `inbox/`
- Janus runtime -> consume `janus-runtime/events.log` for governance traceability
- VS Code / Copilot -> convert prompts into actions and capture execution evidence

This MVP only proves the file-based loop and event logging discipline.

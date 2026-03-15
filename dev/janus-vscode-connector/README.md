# Janus VS Code Connector (Experimental)

Experimental VS Code developer tooling for observing Janus event streams.
**Not part of Janus Core.**

## Scope

- Read-only observer.
- Does **not** import or depend on Janus Core.
- Watches a local append-only file only:

`janus-runtime/events.log`

No telemetry. No networking. No runtime modifications.

## Current behavior

- Command: `Janus: Start Flow Viewer` (`janus.startFlowViewer`)
- Opens a Webview panel that renders a vertical flow of parsed events.
- Tails JSONL entries appended to `janus-runtime/events.log`.

Expected JSON line shape:

```json
{ "type": "gate", "name": "evidence_written", "timestamp": "...", "actor": "copilot" }
```

## Development

From this folder:

- `npm install`
- `npm run compile`

To test in VS Code:

- Open this repo in VS Code
- Run the extension host (F5)
- Run the command: `Janus: Start Flow Viewer`

## Notes

This connector is intentionally minimal and is meant as a dev-only visualization aid.
Future work can add richer rendering and filtering, but must remain local and read-only.

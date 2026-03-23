# Runtime Observability Lab

Status: draft-local

Purpose: minimal flight recorder for Janus runtime observability experiments

## Files

- `runtime-events.js` — Defines canonical runtime event types (BUILD_INFO, COMPONENT_MOUNT, USER_EVENT, STATE_TRANSITION, JS_ERROR, STATE_SNAPSHOT)
- `runtime-state.js` — Minimal state snapshot factory for runtime state capture
- `flight-recorder.js` — In-memory event recorder with record, list, error filter, and clear functions

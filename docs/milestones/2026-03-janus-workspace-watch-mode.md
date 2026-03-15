# Janus Workspace — Bridge Watch Mode

Date: 2026-03

## Objective

Enable the Janus Bridge to automatically detect new prompts dropped into the inbox directory.

## Motivation

The current bridge requires manual execution:

npm run bridge

This milestone introduces an event-driven workflow where the bridge listens for new prompts and processes them automatically.

## Target workflow

prompt.json appears in inbox
↓
Janus Bridge detects file automatically
↓
events.log updated
↓
Flow Viewer displays new events
↓
result.json written to outbox

## Architectural scope

No changes to Janus Core.

Changes limited to:

dev/janus-bridge/

## Expected capabilities

* watch inbox directory
* process prompt.json automatically
* emit Janus events
* write deterministic results
* keep bridge deterministic and file-based

## Success criteria

Flow Viewer displays events without running:

npm run bridge

Bridge operates continuously in watch mode.

## Scope boundaries

Implementation must remain under:

dev/janus-bridge/

Janus Core remains untouched.

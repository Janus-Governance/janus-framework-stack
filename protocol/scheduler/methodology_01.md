# Janus Audit Scheduler Methodology 01

Status: PROTOCOL_READY

Scope: Janus Framework Stack public audit layer.
This protocol defines audit-observable task sequencing.
It does not execute tasks, control system behavior, optimize workflows, or expose private construction logic.

Subtitle: Audit-observable scheduler methodology

## Purpose

This protocol defines how task sequences are represented and made auditable
within Janus Framework. It does not execute tasks or define system behavior.

Define an auditable task-sequence structure for governed systems.

The scheduler methodology makes progression explicit, deterministic, and
auditable. It gives reviewers a stable way to inspect task order, state
transitions, evidence, and replay.

This protocol does not represent a task executor. It does not optimize
workflows. It does not define domain-specific construction logic.

## Public Framework Boundary

The public Janus Framework exposes:

- auditability
- evidence
- transitions
- replay

It does not expose private construction heuristics, compensators, or
optimization logic.

## Core Principles

- deterministic representation
- no ad-hoc branching in the recorded task sequence
- criteria frozen before task observation
- queue-based processing
- one step at a time
- no implicit assumptions

## Structure

### Task Queue

A task queue is an ordered list of work items.

Each task must define:

- objective
- authority
- inputs
- constraints
- expected artifact
- verification criteria

Tasks are expected to appear in queue order unless a recorded governance
decision changes the order.

### Task State

Each task has exactly one current state:

- PLANNED
- RUNNING
- COMPLETED_E_PLUS
- FAILED_E_MINUS

PLANNED:

The task is defined but has not started.

RUNNING:

The task is actively represented as in progress.

COMPLETED_E_PLUS:

The task produced explicit positive evidence or an expected artifact that
satisfies the frozen criteria.

FAILED_E_MINUS:

The task did not produce the required evidence or artifact, or it produced an
explicit failure result.

## Representation Model

Tasks are represented sequentially.

The protocol does not control task behavior. It records and constrains the visible
task sequence so auditors can detect speculative, skipped, or unverified
progression.

Each represented step must produce an artifact. The artifact may be:

- a document
- a validation report
- a decision record
- a failed check
- a blocked-state note

The artifact is the durable record of what happened.

## Audit Focus

The scheduler methodology helps auditors detect:

- skipped steps
- missing transitions
- invalid state jumps
- silent success
- post-hoc criteria changes

## Evidence Model

E+ means explicit result.

Examples:

- required file exists
- validation command passed
- expected artifact was produced
- frozen criteria were satisfied

E- means absence or failure.

Examples:

- required file is missing
- validation command failed
- expected artifact was not produced
- criteria were not satisfied

There is no silent success. If a task succeeds, the evidence must be recorded.
If a task fails or cannot be evaluated, that result must also be recorded.

## Constraints

- no hidden state
- no mutation without record
- no skipping steps
- no criteria changes during recorded progression
- no retroactive success claims
- no unrecorded dependency changes

If a task requires changed criteria, the current task must stop or fail, and a
new task must be scheduled with the revised criteria.

## Application Examples

### Governed Review Flows

Governed review flows can use the scheduler methodology to represent movement
from initial request to review, evidence capture, and decision record. Each step
must produce an artifact and preserve explicit non-claims.

### Audit Flows

Audit flows can use task states to show whether a claim is planned, under
review, supported by explicit evidence, or blocked by missing evidence.

### Bot Decision Pipelines

Bots can use queue-based processing to avoid ungoverned branching. Each decision
is tied to a task, a state transition, and an artifact.

## Framework Role

Janus Framework provides visibility over task flows.

It enables detection of:

- skipped steps
- missing transitions
- invalid state changes
- silent success

It does not:

- control execution
- optimize processes
- implement domain logic

## Explicit Statement

No runtime code.
No implementation.
Protocol only.

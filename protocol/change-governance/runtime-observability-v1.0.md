# Runtime Observability v1.0

Status: draft-local

## Problem it solves

When a system behaves unexpectedly, teams often rely on 
assumptions, partial logs, or manual reproduction to 
understand what happened. Without minimal observability, 
failures cannot be traced deterministically, and decisions 
such as rollback or promotion become guesswork.

## Rule

The system must record a minimal, structured set of runtime 
events that allow reconstruction of system behavior without 
relying on assumptions.

Every critical state transition and error must be captured 
by the flight recorder during active system execution.

The flight recorder must be verified as operational in 
lab/local environment before any promotion is approved.

## Operational definition

- **Runtime event:**
	Any change, action, or error that affects user experience, 
	system flow, or decision-making, recorded during 
	active system execution.

- **Flight recorder:**
	A minimal telemetry mechanism that records runtime events 
	as they occur during active system execution, producing 
	structured evidence sufficient for state reconstruction.

- **Critical state:**
	Any state relevant to user experience, system flow, or 
	decision-making (e.g., active screen, current value, 
	animation state).

- **State value relevance:**
	A state value is relevant when it directly affects the 
	outcome of a user interaction or a system state transition. 
	State values must be recorded at the moment they influence 
	a state transition or user-visible outcome.

## Acceptance criteria

A system is compliant only if:

- The active build/version is identifiable at runtime
- The currently mounted component or screen is recorded
- User-triggered events are recorded
- Screen or state transitions are recorded
- JavaScript errors are recorded with file and line reference
- State values are recorded when they directly affect 
	the outcome of a user interaction or state transition
- Recorded data is complete enough to reproduce the sequence 
	of events without requiring additional context beyond 
	the recorded data
- The flight recorder is verified as operational in 
	lab/local before promotion is approved

## Required evidence

- **Build/version:** identifier of the running version
- **Mounted component:** current active component or screen
- **User events:** actions triggered by the user
- **State transitions:** changes between screens or states
- **Errors:** runtime errors with file and line reference
- **Key state snapshot:** relevant state values at the 
	time of events
- **Recorder verification:** confirmation that the flight 
	recorder was operational before promotion

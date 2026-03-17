# Duplicate Prompt Guard

## Goal
Prevent re-processing the same PROMPT_ID and creating inconsistent state.

## Rule
If a prompt states:
"If this PROMPT_ID was already processed, return only: ALREADY_PROCESSED"
then:
- search locally for the PROMPT_ID in session logs / notes
- if found and fully completed, return exactly `ALREADY_PROCESSED`
- if partially completed, treat as NOT processed and continue only after clarifying with the operator

## Evidence
Acceptable signals that a prompt is processed:
- recorded output that matches the Return contract
- matching git state (staged/committed files) consistent with the operation

## Notes
Do not rely on memory alone; verify via repo state and artifacts.

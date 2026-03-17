# Prompt Governance

## Goal
Ensure each prompt is uniquely identified, scoped, and executed deterministically.

## Required fields
Every operational prompt must include:
- PROMPT_ID: stable unique identifier
- Scope: explicit in-scope paths/components
- Out of scope: explicit exclusions
- Allowed actions: read-only / modify / commit / deploy (as applicable)
- Return contract: exact required outputs

## Execution rules
- Follow the Return contract exactly.
- If scope is ambiguous, choose the simplest interpretation and ask for clarification.
- Do not perform work outside the declared scope.

## Logging
Record:
- inputs (PROMPT_ID + constraints)
- commands run (if any)
- files touched
- validation performed
- final status

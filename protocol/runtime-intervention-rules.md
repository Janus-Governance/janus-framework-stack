# Runtime Intervention Rules

## Goal
Define when and how it is acceptable to intervene in runtime artifacts during local runs.

## Allowed interventions
- Delete generated artifacts (dist/, out/, logs, node_modules/) to return to a clean working state.
- Regenerate artifacts via documented build steps.

## Disallowed interventions
- Deleting tracked source or required assets.
- Editing runtime outputs to "make tests pass".

## Safety checks
Before deletion:
- confirm path is generated or local-only
- confirm it is not tracked at HEAD

## Reporting
Always report:
- what was deleted
- what was preserved
- resulting git status

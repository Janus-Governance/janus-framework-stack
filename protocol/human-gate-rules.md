# Human Gate Rules

## Goal
Ensure a human explicitly approves high-impact actions.

## Requires explicit approval
- any `git commit` or `git push`
- any changes outside the requested scope
- deleting or rewriting tracked source files
- introducing new dependencies

## Operator confirmation checklist
- scope confirmed
- rollback strategy understood
- validation plan agreed

## Output requirements
When a human gate is required, stop and ask for approval with:
- exact command(s) to run
- exact files affected
- expected outcomes

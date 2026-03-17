# Evidence-First Workflow

## Principle
Make decisions based on observable repo state (git, filesystem, tests) rather than assumptions.

## Minimum evidence set (typical)
- Current git status
- Tracked vs local-only diffs (when relevant)
- Existence checks for referenced paths
- Targeted validation (lint/test/run) when changes are made

## Order of operations
1. Establish baseline state (status + inventory)
2. Capture evidence needed for the decision
3. Apply minimal changes
4. Validate
5. Summarize outcomes + residual risks

## Anti-patterns
- Guessing file presence/paths
- Making broad changes without proving need
- Mixing unrelated fixes into a single operation

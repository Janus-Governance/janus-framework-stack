# Frontend Link Governance

## Goal
Keep documentation/demo links consistent, stable, and policy-compliant.

## Site-first policy (local repo)
- Prefer local/relative paths when the target exists in-repo.
- Prefer rendered local pages (e.g., .html) when they exist.
- Use external links only when no in-repo equivalent exists.

## Rules
- Do not invent pages that do not exist.
- Keep link text honest about the destination (source vs rendered view).
- Avoid deep-linking to ephemeral build artifacts.

## Verification
- Validate target files exist.
- Grep for broken links if a batch change is performed.

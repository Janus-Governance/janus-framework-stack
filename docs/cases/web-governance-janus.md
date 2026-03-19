# Janus Web Surface Governance — Reference Implementation

## Context
Multi-repository web publishing across: apex, core, docs, rfc, runtime.

## Problem
Lack of consistency across publishing surfaces, broken sitemap chains, and an unclear source of truth for required web artifacts.

## Solution
Adopt the Web Publishing Governance Protocol and enforce it with CI.

## Implementation
- GitHub Actions workflow validates publishing invariants.
- CNAME-based scoping: repositories without a root `CNAME` skip validation.
- Validates presence of `robots.txt` and `sitemap.xml` and checks they return HTTP 200 at the declared production domain.
- Requires `README.md` to declare the production domain exactly matching `CNAME`.
- Emits a semantic failure signal: `JANUS_EVENT=OMISSION_DETECTED`.

## Outcome
- Detected missing `README.md` across publishing repositories.
- Corrected and aligned required artifacts and domain declarations.
- Achieved full system validation (all green across the publishing set).

## Key Insight
Governance is applied before deployment, not after.

## Limitations
This is an internal reference implementation; it does not demonstrate external adoption.

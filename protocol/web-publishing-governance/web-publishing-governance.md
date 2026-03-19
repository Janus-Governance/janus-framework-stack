# Web Publishing Governance Protocol
Version: 0.2.1
Status: adoptable

## Purpose
Ensure that every web publication under Janus Governance is:
- Traceable
- Deterministic
- Rebuildable
- Verifiable in production

This protocol prevents broken deployments, orphan domains, and inconsistent source-of-truth scenarios.

---

## Core Principles

### 1. Single Source of Truth
Every domain or subdomain MUST map to exactly one repository.

- No shared repos across unrelated domains
- No domain pointing to multiple repos
- No “temporary” publishing sources

---

### 2. Explicit Repository Ownership
Each repository MUST explicitly declare:

- Its production domain
- Its deployment method
- Its publishing branch

Required files:
- `CNAME` (for GitHub Pages custom domains)
- `README.md` (with domain declaration)

---

### 3. Deterministic Deployment
A deployment must be reproducible from:

- Repository state
- Branch reference
- Static assets

No hidden steps.
No manual overrides.

---

### 4. Sitemap Integrity
Rules:

- Apex sitemap MUST reference only valid child sitemaps
- Every referenced sitemap MUST return HTTP 200
- No broken links allowed

Validation required before publish.

---

### 5. Pre-Publish Validation (Mandatory)

Before any publish:

- Verify correct repository
- Verify domain mapping
- Verify CNAME correctness
- Verify sitemap.xml
- Verify robots.txt
- Confirm GitHub Pages configuration

---

### 6. Production Verification

After deployment:

- Domain resolves correctly
- HTTPS enforced
- Sitemap accessible
- No 404 on critical paths

---

### 7. No Blind Intervention Rule

Never modify production without:

- Identifying the source repository
- Confirming deployment configuration

If unknown → STOP.

---

## Standard Workflow

1. Identify domain
2. Locate source repository
3. Validate repository configuration
4. Validate publishing files
5. Deploy from canonical branch
6. Verify production endpoints

---

## Failure Modes Prevented

- Wrong repo deployment
- Missing CNAME
- Broken sitemap chains
- Mixed environments
- Non-reproducible builds

---

## Compliance

A system is compliant if:

- Repo ↔ Domain mapping is 1:1
- Deployment is reproducible
- Sitemap returns 200
- Production matches repo state

---

## Notes

This protocol is part of the Janus Governance Stack.

It operates as a control layer for web publishing systems, ensuring traceability and rebuildability across environments.

# RFC-0009 — Publication Link Semantics

## Status
Accepted

## Category
Governance / Publication Layer

## Abstract
This RFC defines the canonical rules for link semantics across Janus publication surfaces. It ensures that every link explicitly declares its interaction intent (reading vs inspecting) and aligns with its target surface (rendered HTML vs source repository).

## 1. Problem
During system publication, inconsistencies were detected across multiple surfaces (docs, runtime, rfc):

- Links labeled as “Read full document” pointing to GitHub .md
- Links labeled as “(Rendered)” pointing to non-rendered sources
- Mixed semantics between user intent and destination
- Broken or misleading navigation

These issues degraded user experience and system trust.

## 2. Principle
> Every link must declare its interaction contract and match its surface.

A link is not just navigation — it is a semantic contract.

## 3. Definitions

### Rendered Surface
A controlled HTML page (.html) hosted and maintained within the Janus publication infrastructure.

Third-party rendered views (e.g. GitHub markdown preview) are not considered controlled surfaces.

### Source Surface
A raw file or repository view (e.g. GitHub .md, .js, folders) intended for inspection.

### Link Intent
The expected user action:
- Reading (consumption)
- Inspecting (verification / code access)

### Existence Constraint
A rendered surface (.html) must physically exist at publication time. Assumed or anticipated rendering is not valid evidence of existence.

Existence is necessary but not sufficient. The rendered surface must reflect the current canonical source.

## 4. Rules

These rules apply to HTML publication surfaces.
PDF and binary formats are out of scope for this RFC.

### 4.1 Reading Intent
If the link invites reading:

Must use labels like:
- Read full document
- Explore
- Learn more

Must point to:
- .html rendered surface

### 4.2 Inspecting Intent
If the link invites inspection:

Must use labels like:
- View source
- Browse repository

Must point to:
- GitHub or source files (.md, .js, folders)

### 4.3 Forbidden States
The following are not allowed:

- “Read full document” → GitHub .md
- “(Rendered)” → non-HTML targets
- A link whose label implies reading but whose target is a source surface, or vice versa.
- Implicit or assumed rendering

### 4.4 Existence Constraint
- A .html target must physically exist
- Rendering must never be assumed
- If no .html exists → fallback to View source

## 5. Validation

### 5.1 Automated
- Scan links across all HTML files
- Detect mismatches between label and target

Automated validation must run post-deployment, not during build phase.

### 5.2 Manual (Mandatory)
- Validate in production (not only local)
- Use real navigation (click-through)
- Human observation is valid evidence

### 5.3 Migration
Existing links that violate this RFC must be catalogued before enforcement.

A migration report must include:
- surface affected
- current label
- current target
- required correction

Migration must be completed before this RFC is considered enforced.

## 6. Enforcement
All publication surfaces must comply:
- runtime
- docs
- rfc
- core / landing

Violations must be fixed before considering a deployment complete.

## 7. Impact
- Improves navigation clarity
- Eliminates ambiguity
- Increases trust in the system
- Aligns UX with system architecture
- Prevents future semantic drift

## 8. Conclusion
> A system is trustworthy when its links mean what they say.

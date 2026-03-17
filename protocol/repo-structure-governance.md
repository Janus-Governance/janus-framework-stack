# Repo Structure Governance

## 1. Scope
This protocol governs repository structure only (directories, placement, and structural drift). It does not modify Janus Core semantics.

## 2. Canonical Top-Level Structure
The canonical top-level structure is:

- core/
- rfcs/
- protocol/
- runtimes/
- docs/
- dev/
- demos/

## 3. Structural Change Rules
- No new top-level folders without RFC approval.
- Experiments must live in dev/.
- Demonstrations must live in demos/.
- Implementations belong in runtimes/.
- Documentation belongs in docs/.
- Governance discipline belongs in protocol/.

## 4. Forbidden Actions
- Moving Core files.
- Renaming Core directories.
- Creating parallel “core-like” folders.
- Creating new root folders without RFC.

## 5. Structural Validation
Any structural change must report:
- affected paths
- reason
- impact on docs and demos
- RFC reference if applicable

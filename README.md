
# Janus Framework Stack

This repository is the Janus Framework Stack — non-normative interpretation and operational guidance built on top of Janus Core.

The normative source is Janus Core Lite v0.2 Draft:
https://github.com/Janus-Governance/janus-governance-core/blob/main/core/lite/JANUS_CORE_LITE_v0.2.md

This Framework Stack interprets and applies the Core through protocols, runtimes, demos, and observability tools. It does not redefine Core semantics. Runtimes are technical implementations, and demos are illustrative; neither establishes conformity.

---

Domain: https://framework.janusgovernance.org  
Operational governance layer for AI-assisted development.

→ Start here: https://janusgovernance.org

---

## 🚀 Quick Start

### Path A — Python SDK (fastest)

Run from the repository root. No package installation is required.

```bash
rm -f runtimes/python-sdk/janus/janus_events.jsonl
python3 runtimes/python-sdk/quickstart.py
python3 runtimes/python-sdk/janus/cli.py report
```

Runs the repository-local Python SDK quickstart and then prints a governance report describing the E+ or E− evidence referenced by that illustrative case.

---

### Path B — Run a demo (visual evidence)

```bash
cd demos/visual-evidence
npm install
npm run install-playwright
node capture.js
```

Generates a screenshot and visual analysis of a governed artifact.

---

## What is this repository

This repository contains the **Janus framework stack**:

- protocol definitions
- reference implementations
- runnable demos

It operationalizes the Janus governance model at the development layer.

---

## What does Janus do

Janus introduces governance at the point where development happens:

- makes decisions traceable
- records evidence explicitly (E+ / E−)
- enforces human authority where required
- enables deterministic reconstruction of workflows

---

## Structure

- `protocol/` — governance rules and constraints  
- `demos/` — runnable examples  
- `runtimes/` — reference implementations  
- `docs/` — extended explanations  

---

## Framework Paper

- Read paper (v1.0) → https://zenodo.org/records/19239183
- View repository context → docs/paper/README.md

---

## Notes

Janus is under active development and evaluation. No demo or test result by itself establishes Core conformity.

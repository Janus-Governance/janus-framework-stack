# Janus ↔ EU AI Act (conceptual mapping)

## Purpose
This document maps Janus governance mechanisms to common EU AI Act concerns at a conceptual level. It is intended as a technical orientation for teams using Janus alongside an EU AI Act compliance program.

**Non-claim:** This is **not** a compliance assessment and does **not** claim that Janus (or any Janus-based workflow) is EU AI Act compliant.

## Scope
- **What Janus is:** a governance-support layer for AI-assisted development and operations, focused on traceability, human authority, evidence capture, and reconstructability.
- **What this mapping covers:** where Janus can support documentation, logging, oversight, and auditability practices that are commonly relevant when implementing AI governance controls.
- **What this mapping does not do:** interpret legal obligations, determine risk classification, or substitute for provider/deployer compliance activities.

## Where Janus aligns conceptually
Janus is designed around invariants that are directionally compatible with many governance expectations for higher-risk systems:
- **Traceability & record-keeping:** structured prompts, evidence artifacts, and append-only logs can help reconstruct how an output or change was produced.
- **Human oversight:** explicit human authority gates can support defined approval points and accountability for decisions.
- **Reconstructability:** deterministic scope and reproducible runs can support post-incident analysis and audit preparation.
- **Change control evidence:** governance events and protocol-driven workflows can support internal controls and operational assurance.

## Where Janus does not cover requirements
Janus is not a complete legal/compliance solution and does not implement many EU AI Act obligations by itself, including:
- **Risk classification and legal role determination** (provider vs deployer vs distributor; high-risk categorization).
- **Model/system-level technical documentation** required by law (beyond what your organization chooses to record).
- **Training-data governance, bias testing, and performance validation** for AI systems/models.
- **Conformity assessment, CE marking, EU database registration**, and other regulatory processes.
- **Post-market monitoring and incident reporting** programs (Janus can log events, but you still need processes, owners, and reporting mechanisms).
- **Security controls** beyond what is implemented in the surrounding stack (Janus can require evidence, but does not itself secure your infrastructure).

## Compact mapping table

| EU AI Act concern | Janus contribution | Gap / non-goal |
|---|---|---|
| Accountability & governance | Authority gates + protocolized decision points can clarify “who approved what, when.” | Does not assign legal roles or meet governance obligations by itself. |
| Technical documentation | Structured artifacts (runbooks, protocols, evidence) can be used to assemble documentation packs. | Does not guarantee completeness of required technical documentation. |
| Record-keeping / logging | Append-only logs + evidence-first traces support reconstructing actions and outputs. | Not equivalent to mandated system logs; coverage depends on integration and operator discipline. |
| Human oversight | Enforces explicit human checkpoints for sensitive actions (configurable). | Does not define the required oversight design for a particular AI system/use case. |
| Transparency to users | Can standardize disclosure steps as process requirements (e.g., checklists, approvals). | Does not automatically produce legally sufficient disclosures or UI/UX notices. |
| Risk management process | Can require risk artifacts as “evidence” before changes ship (risk register, assessments). | Does not perform risk management or validate adequacy of mitigations. |
| Data governance | Can require provenance/evidence for datasets used in a workflow. | Does not implement dataset curation, labeling controls, or representativeness testing. |
| Accuracy / robustness / cybersecurity | Can require tests, evaluations, and security reviews as evidence gates. | Does not provide model robustness, red-teaming, or security hardening by itself. |
| Change management | Deterministic scope + reproducible runs help link changes to outcomes. | Does not replace SDLC controls, approvals, or quality systems required for regulated deployments. |
| Post-market monitoring & incident reporting | Logs can support investigations and timeline reconstruction. | Does not implement monitoring programs, thresholds, reporting workflows, or regulator communications. |

## Short conclusion
Janus can strengthen **traceability**, **human oversight**, and **reconstructability** practices that are often useful when operationalizing EU AI Act-aligned governance. It should be treated as a **supporting control layer** within a broader compliance program, not as a substitute for legal interpretation, risk classification, or required regulatory processes.

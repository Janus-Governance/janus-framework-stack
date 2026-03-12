const fs = require("fs");
const { nextId } = require("./ids");
const { buildEvidence } = require("./buildEvidence");

function readJsonArray(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = JSON.parse(raw);
  if (!Array.isArray(parsed)) {
    throw new Error(`Expected JSON array in ${filePath}`);
  }
  return parsed;
}

function evaluateGovernance({
  managementLogPath,
  schemaLogPath,
  auditLogPath,
  nowIso,
}) {
  const management = readJsonArray(managementLogPath);
  const schema = readJsonArray(schemaLogPath);
  const auditExisting = readJsonArray(auditLogPath);

  const proposed = management.filter((e) => e && e.type === "CHANGE_PROPOSED");
  const humanDecision = management.find((e) => e && e.type === "HUMAN_DECISION");

  const schemaEntry = schema.find((s) => s && s.entity === "change_request");
  const schemaAllowsDecision = Boolean(schemaEntry && Array.isArray(schemaEntry.fields) && schemaEntry.fields.includes("decision"));

  const requiredEvent = proposed.length > 0 ? "HUMAN_DECISION" : null;
  const humanDecisionPresent = Boolean(humanDecision);

  const auditEventsToWrite = [];

  if (requiredEvent && !humanDecisionPresent) {
    const evidence = buildEvidence({ requiredEvent, present: humanDecisionPresent });
    auditEventsToWrite.push({
      id: nextId("audit", auditExisting.length + auditEventsToWrite.length),
      ts: nowIso,
      type: "OMISSION_DETECTED",
      evidence,
      source: "evaluateGovernance",
      payload: { missing_event: requiredEvent },
    });
  }

  if (requiredEvent && humanDecisionPresent && schemaAllowsDecision) {
    const evidence = buildEvidence({ requiredEvent, present: humanDecisionPresent });
    auditEventsToWrite.push({
      id: nextId("audit", auditExisting.length + auditEventsToWrite.length),
      ts: nowIso,
      type: "HUMAN_DECISION_REGISTERED",
      evidence,
      source: "evaluateGovernance",
      payload: { decision: humanDecision.payload && humanDecision.payload.decision },
    });
  }

  return {
    requiredEvent,
    schemaAllowsDecision,
    proposedChanges: proposed.length,
    humanDecisionPresent,
    auditEventsToWrite,
  };
}

module.exports = {
  evaluateGovernance,
};

const fs = require("fs");
const path = require("path");

const { appendManagementEvent } = require("./src/appendManagementEvent");
const { evaluateGovernance } = require("./src/evaluateGovernance");
const { resetAuditLog, writeAuditEvents } = require("./src/auditWriter");
const { rebuildState } = require("./src/rebuildState");

const logsDir = path.join(__dirname, "logs");
const managementLogPath = path.join(logsDir, "MANAGEMENT_LOG.json");
const schemaLogPath = path.join(logsDir, "SCHEMA_LOG.json");
const auditLogPath = path.join(logsDir, "AUDIT_LOG.json");

const BASE_TS = new Date("2026-03-06T00:00:00.000Z");

function tsPlusSeconds(seconds) {
  return new Date(BASE_TS.getTime() + seconds * 1000).toISOString();
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2) + "\n", "utf8");
}

function resetLogs() {
  writeJson(managementLogPath, []);
  resetAuditLog(auditLogPath);
  writeJson(schemaLogPath, [
    {
      id: "schema-001",
      ts: tsPlusSeconds(0),
      entity: "change_request",
      version: 1,
      fields: ["change", "actor", "decision"],
    },
  ]);
}

function runFlowA() {
  console.log("FLOW A — omission case");
  resetLogs();

  appendManagementEvent(managementLogPath, {
    id: "mgmt-001",
    ts: tsPlusSeconds(0),
    type: "CHANGE_PROPOSED",
    actor: "AI_ARCHITECT",
    payload: { change: "add field email" },
  });

  const evaluation = evaluateGovernance({
    managementLogPath,
    schemaLogPath,
    auditLogPath,
    nowIso: tsPlusSeconds(120),
  });

  writeAuditEvents(auditLogPath, evaluation.auditEventsToWrite);

  console.log(JSON.stringify({
    requiredEvent: evaluation.requiredEvent,
    proposedChanges: evaluation.proposedChanges,
    humanDecisionPresent: evaluation.humanDecisionPresent,
    auditEventsWritten: evaluation.auditEventsToWrite.map((e) => e.type),
  }, null, 2));

  const state = rebuildState({ managementLogPath, auditLogPath });
  console.log("REBUILD STATE");
  console.log(JSON.stringify(state, null, 2));
  console.log("");
}

function runFlowB() {
  console.log("FLOW B — approved case");
  resetLogs();

  appendManagementEvent(managementLogPath, {
    id: "mgmt-001",
    ts: tsPlusSeconds(0),
    type: "CHANGE_PROPOSED",
    actor: "AI_ARCHITECT",
    payload: { change: "add field email" },
  });

  appendManagementEvent(managementLogPath, {
    id: "mgmt-002",
    ts: tsPlusSeconds(60),
    type: "HUMAN_DECISION",
    actor: "HUMAN_HEAD",
    payload: { decision: "approve" },
  });

  const evaluation = evaluateGovernance({
    managementLogPath,
    schemaLogPath,
    auditLogPath,
    nowIso: tsPlusSeconds(120),
  });

  writeAuditEvents(auditLogPath, evaluation.auditEventsToWrite);

  console.log(JSON.stringify({
    requiredEvent: evaluation.requiredEvent,
    proposedChanges: evaluation.proposedChanges,
    humanDecisionPresent: evaluation.humanDecisionPresent,
    auditEventsWritten: evaluation.auditEventsToWrite.map((e) => e.type),
  }, null, 2));
  console.log("");
}

function runFlowC() {
  console.log("FLOW C — rebuild");
  const state = rebuildState({ managementLogPath, auditLogPath });
  console.log(JSON.stringify(state, null, 2));
}

runFlowA();
runFlowB();
runFlowC();
resetLogs();

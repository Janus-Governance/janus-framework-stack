const fs = require("fs");

function readJsonArray(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = JSON.parse(raw);
  if (!Array.isArray(parsed)) {
    throw new Error(`Expected JSON array in ${filePath}`);
  }
  return parsed;
}

function rebuildState({ managementLogPath, auditLogPath }) {
  const management = readJsonArray(managementLogPath);
  const audit = readJsonArray(auditLogPath);

  const proposedChanges = management.filter((e) => e && e.type === "CHANGE_PROPOSED").length;
  const humanDecisionPresent = management.some((e) => e && e.type === "HUMAN_DECISION");
  const omissionsDetected = audit.filter((e) => e && e.type === "OMISSION_DETECTED").length;

  return {
    proposedChanges,
    humanDecisionPresent,
    omissionsDetected,
    auditEvents: audit.length,
  };
}

module.exports = {
  rebuildState,
};

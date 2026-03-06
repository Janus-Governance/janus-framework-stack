const fs = require("fs");

function readJsonArray(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = JSON.parse(raw);
  if (!Array.isArray(parsed)) {
    throw new Error(`Expected JSON array in ${filePath}`);
  }
  return parsed;
}

function writeJsonArray(filePath, value) {
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2) + "\n", "utf8");
}

function resetAuditLog(auditLogPath) {
  writeJsonArray(auditLogPath, []);
}

function writeAuditEvents(auditLogPath, auditEvents) {
  const existing = readJsonArray(auditLogPath);
  for (const e of auditEvents) {
    existing.push(e);
  }
  writeJsonArray(auditLogPath, existing);
  return auditEvents;
}

module.exports = {
  resetAuditLog,
  writeAuditEvents,
};

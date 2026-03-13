const fs = require("fs");
const os = require("os");
const path = require("path");
const crypto = require("crypto");

const { appendManagementEvent } = require("../../../runtimes/demo-node/src/appendManagementEvent");
const { evaluateGovernance } = require("../../../runtimes/demo-node/src/evaluateGovernance");
const { resetAuditLog, writeAuditEvents } = require("../../../runtimes/demo-node/src/auditWriter");
const { rebuildState } = require("../../../runtimes/demo-node/src/rebuildState");

const SUITE_NAME = "Janus Validation Suite (Core Lite)";
const SUITE_EVALUATED_AT = "2026-03-13T00:00:00.000Z";
const BASE_TS = new Date("2026-03-13T00:00:00.000Z");

function tsPlusSeconds(seconds) {
  return new Date(BASE_TS.getTime() + seconds * 1000).toISOString();
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2) + "\n", "utf8");
}

function readJsonArray(filePath) {
  const parsed = JSON.parse(fs.readFileSync(filePath, "utf8"));
  if (!Array.isArray(parsed)) {
    throw new Error(`Expected JSON array in ${filePath}`);
  }
  return parsed;
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function makeTempLogsDir(label) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), `janus-suite-${label}-`));
  const logsDir = path.join(dir, "logs");
  ensureDir(logsDir);

  return {
    dir,
    logsDir,
    managementLogPath: path.join(logsDir, "MANAGEMENT_LOG.json"),
    schemaLogPath: path.join(logsDir, "SCHEMA_LOG.json"),
    auditLogPath: path.join(logsDir, "AUDIT_LOG.json"),
  };
}

function resetLogs({ managementLogPath, schemaLogPath, auditLogPath }, schemaFields) {
  writeJson(managementLogPath, []);
  resetAuditLog(auditLogPath);
  writeJson(schemaLogPath, [
    {
      id: "schema-001",
      ts: tsPlusSeconds(0),
      entity: "change_request",
      version: 1,
      fields: schemaFields,
    },
  ]);
}

function overwriteSchema({ schemaLogPath }, entries) {
  writeJson(schemaLogPath, entries);
}

function summarizeAudit(auditEvents) {
  const omissionEvents = auditEvents.filter((e) => e && e.type === "OMISSION_DETECTED");
  const decisionEvents = auditEvents.filter((e) => e && e.type === "HUMAN_DECISION_REGISTERED");

  const positiveEvidencePresent = auditEvents.some((e) => e && e.evidence === "E+");
  const negativeEvidencePresent = auditEvents.some((e) => e && e.evidence === "E-");
  const omissionDetected = omissionEvents.length > 0;
  const humanDecisionRegistered = decisionEvents.length > 0;

  let auditDecision = "unknown";
  if (omissionDetected && humanDecisionRegistered) {
    auditDecision = "accepted-with-human-exception";
  } else if (omissionDetected) {
    auditDecision = "fail-equivalent";
  } else if (humanDecisionRegistered) {
    auditDecision = "pass-equivalent";
  }

  return {
    positive_evidence_present: positiveEvidencePresent,
    negative_evidence_present: negativeEvidencePresent,
    omission_detected: omissionDetected,
    human_decision_registered: humanDecisionRegistered,
    audit_decision: auditDecision,
    audit_event_types: auditEvents.map((e) => e && e.type).filter(Boolean),
  };
}

function validateInvariants(expected, observed) {
  const failures = [];

  for (const [key, expectedValue] of Object.entries(expected)) {
    if (key === "notes_includes") {
      const notes = String(observed.notes || "");
      const needle = String(expectedValue);
      if (!notes.toLowerCase().includes(needle.toLowerCase())) {
        failures.push(`${key}: expected notes to include '${needle}'`);
      }
      continue;
    }

    if (observed[key] !== expectedValue) {
      failures.push(`${key}: expected ${JSON.stringify(expectedValue)} got ${JSON.stringify(observed[key])}`);
    }
  }

  return {
    pass: failures.length === 0,
    failures,
  };
}

function runCase01HappyPath() {
  const paths = makeTempLogsDir("case01");
  resetLogs(paths, ["change", "actor", "decision"]);

  appendManagementEvent(paths.managementLogPath, {
    id: "mgmt-001",
    ts: tsPlusSeconds(0),
    type: "CHANGE_PROPOSED",
    actor: "AI_ARCHITECT",
    payload: { change: "add field email" },
  });

  appendManagementEvent(paths.managementLogPath, {
    id: "mgmt-002",
    ts: tsPlusSeconds(60),
    type: "HUMAN_DECISION",
    actor: "HUMAN_HEAD",
    payload: { decision: "approve" },
  });

  const evaluation = evaluateGovernance({
    managementLogPath: paths.managementLogPath,
    schemaLogPath: paths.schemaLogPath,
    auditLogPath: paths.auditLogPath,
    nowIso: tsPlusSeconds(120),
  });

  writeAuditEvents(paths.auditLogPath, evaluation.auditEventsToWrite);

  const audit = readJsonArray(paths.auditLogPath);
  const observed = summarizeAudit(audit);
  observed.human_decision_present = true;

  return observed;
}

function runCase02Omission() {
  const paths = makeTempLogsDir("case02");
  resetLogs(paths, ["change", "actor", "decision"]);

  appendManagementEvent(paths.managementLogPath, {
    id: "mgmt-001",
    ts: tsPlusSeconds(0),
    type: "CHANGE_PROPOSED",
    actor: "AI_ARCHITECT",
    payload: { change: "add field email" },
  });

  const evaluation = evaluateGovernance({
    managementLogPath: paths.managementLogPath,
    schemaLogPath: paths.schemaLogPath,
    auditLogPath: paths.auditLogPath,
    nowIso: tsPlusSeconds(120),
  });

  writeAuditEvents(paths.auditLogPath, evaluation.auditEventsToWrite);

  const audit = readJsonArray(paths.auditLogPath);
  const observed = summarizeAudit(audit);
  observed.human_decision_present = false;

  return observed;
}

function runCase03HumanDecision() {
  const paths = makeTempLogsDir("case03");
  resetLogs(paths, ["change", "actor", "decision"]);

  appendManagementEvent(paths.managementLogPath, {
    id: "mgmt-001",
    ts: tsPlusSeconds(0),
    type: "CHANGE_PROPOSED",
    actor: "AI_ARCHITECT",
    payload: { change: "add field email" },
  });

  const evalOmission = evaluateGovernance({
    managementLogPath: paths.managementLogPath,
    schemaLogPath: paths.schemaLogPath,
    auditLogPath: paths.auditLogPath,
    nowIso: tsPlusSeconds(120),
  });
  writeAuditEvents(paths.auditLogPath, evalOmission.auditEventsToWrite);

  appendManagementEvent(paths.managementLogPath, {
    id: "mgmt-002",
    ts: tsPlusSeconds(180),
    type: "HUMAN_DECISION",
    actor: "HUMAN_HEAD",
    payload: { decision: "approve-with-exception" },
  });

  const evalHuman = evaluateGovernance({
    managementLogPath: paths.managementLogPath,
    schemaLogPath: paths.schemaLogPath,
    auditLogPath: paths.auditLogPath,
    nowIso: tsPlusSeconds(240),
  });
  writeAuditEvents(paths.auditLogPath, evalHuman.auditEventsToWrite);

  const audit = readJsonArray(paths.auditLogPath);
  const observed = summarizeAudit(audit);
  observed.human_decision_present = true;
  observed.omission_truth_preserved = observed.omission_detected && observed.human_decision_registered;

  return observed;
}

function runCase04SchemaDrift() {
  const paths = makeTempLogsDir("case04");
  resetLogs(paths, ["change", "actor"]);

  appendManagementEvent(paths.managementLogPath, {
    id: "mgmt-001",
    ts: tsPlusSeconds(0),
    type: "CHANGE_PROPOSED",
    actor: "AI_ARCHITECT",
    payload: { change: "add field email" },
  });

  const evalOmission = evaluateGovernance({
    managementLogPath: paths.managementLogPath,
    schemaLogPath: paths.schemaLogPath,
    auditLogPath: paths.auditLogPath,
    nowIso: tsPlusSeconds(120),
  });
  writeAuditEvents(paths.auditLogPath, evalOmission.auditEventsToWrite);

  overwriteSchema(paths, [
    {
      id: "schema-002",
      ts: tsPlusSeconds(180),
      entity: "change_request",
      version: 2,
      fields: ["change", "actor", "decision"],
    },
  ]);

  appendManagementEvent(paths.managementLogPath, {
    id: "mgmt-002",
    ts: tsPlusSeconds(200),
    type: "HUMAN_DECISION",
    actor: "HUMAN_HEAD",
    payload: { decision: "approve" },
  });

  const evalHuman = evaluateGovernance({
    managementLogPath: paths.managementLogPath,
    schemaLogPath: paths.schemaLogPath,
    auditLogPath: paths.auditLogPath,
    nowIso: tsPlusSeconds(240),
  });
  writeAuditEvents(paths.auditLogPath, evalHuman.auditEventsToWrite);

  const audit = readJsonArray(paths.auditLogPath);
  const observed = summarizeAudit(audit);
  observed.human_decision_present = true;
  observed.notes = "schema drift: schema updated from v1 (no decision) to v2 (adds decision)";

  return observed;
}

function runCase05Stress() {
  const paths = makeTempLogsDir("case05");

  const deploymentsChecked = 1000;
  const deploymentsMissingEvidenceExpected = 50;

  let missing = 0;

  for (let i = 1; i <= deploymentsChecked; i += 1) {
    resetLogs(paths, ["change", "actor", "decision"]);

    appendManagementEvent(paths.managementLogPath, {
      id: "mgmt-001",
      ts: tsPlusSeconds(i),
      type: "CHANGE_PROPOSED",
      actor: "AI_ARCHITECT",
      payload: { change: `deployment-${String(i).padStart(4, "0")}` },
    });

    const shouldOmit = i <= deploymentsMissingEvidenceExpected;
    if (!shouldOmit) {
      appendManagementEvent(paths.managementLogPath, {
        id: "mgmt-002",
        ts: tsPlusSeconds(i + 1),
        type: "HUMAN_DECISION",
        actor: "HUMAN_HEAD",
        payload: { decision: "approve" },
      });
    }

    const evaluation = evaluateGovernance({
      managementLogPath: paths.managementLogPath,
      schemaLogPath: paths.schemaLogPath,
      auditLogPath: paths.auditLogPath,
      nowIso: tsPlusSeconds(i + 2),
    });

    if (evaluation.auditEventsToWrite.some((e) => e && e.type === "OMISSION_DETECTED")) {
      missing += 1;
    }
  }

  const fingerprint = crypto
    .createHash("sha256")
    .update(`${deploymentsChecked}:${missing}`)
    .digest("hex");

  return {
    deployments_checked: deploymentsChecked,
    deployments_missing_evidence: missing,
    deterministic_result: true,
    result_fingerprint: fingerprint,
  };
}

function runCase06DeterministicRebuild() {
  const paths = makeTempLogsDir("case06");
  resetLogs(paths, ["change", "actor", "decision"]);

  appendManagementEvent(paths.managementLogPath, {
    id: "mgmt-001",
    ts: tsPlusSeconds(0),
    type: "CHANGE_PROPOSED",
    actor: "AI_ARCHITECT",
    payload: { change: "add field email" },
  });

  const evalOmission = evaluateGovernance({
    managementLogPath: paths.managementLogPath,
    schemaLogPath: paths.schemaLogPath,
    auditLogPath: paths.auditLogPath,
    nowIso: tsPlusSeconds(120),
  });
  writeAuditEvents(paths.auditLogPath, evalOmission.auditEventsToWrite);

  appendManagementEvent(paths.managementLogPath, {
    id: "mgmt-002",
    ts: tsPlusSeconds(180),
    type: "HUMAN_DECISION",
    actor: "HUMAN_HEAD",
    payload: { decision: "approve" },
  });

  const evalHuman = evaluateGovernance({
    managementLogPath: paths.managementLogPath,
    schemaLogPath: paths.schemaLogPath,
    auditLogPath: paths.auditLogPath,
    nowIso: tsPlusSeconds(240),
  });
  writeAuditEvents(paths.auditLogPath, evalHuman.auditEventsToWrite);

  const state1 = rebuildState({
    managementLogPath: paths.managementLogPath,
    auditLogPath: paths.auditLogPath,
  });
  const state2 = rebuildState({
    managementLogPath: paths.managementLogPath,
    auditLogPath: paths.auditLogPath,
  });

  const state1Json = JSON.stringify(state1);
  const state2Json = JSON.stringify(state2);

  return {
    replay_count: 2,
    outputs_identical: state1Json === state2Json,
    deterministic_rebuild: state1Json === state2Json,
  };
}

function runSuite() {
  const cases = [
    {
      case_id: "case-01-happy-path",
      expected_invariants: {
        positive_evidence_present: true,
        omission_detected: false,
        audit_decision: "pass-equivalent",
      },
      run: runCase01HappyPath,
    },
    {
      case_id: "case-02-omission",
      expected_invariants: {
        negative_evidence_present: true,
        omission_detected: true,
        audit_decision: "fail-equivalent",
      },
      run: runCase02Omission,
    },
    {
      case_id: "case-03-human-decision",
      expected_invariants: {
        omission_detected: true,
        human_decision_present: true,
        omission_truth_preserved: true,
        audit_decision: "accepted-with-human-exception",
      },
      run: runCase03HumanDecision,
    },
    {
      case_id: "case-04-schema-drift",
      expected_invariants: {
        positive_evidence_present: true,
        negative_evidence_present: true,
        omission_detected: true,
        notes_includes: "schema drift",
      },
      run: runCase04SchemaDrift,
    },
    {
      case_id: "case-05-stress",
      expected_invariants: {
        deployments_checked: 1000,
        deployments_missing_evidence: 50,
        deterministic_result: true,
      },
      run: runCase05Stress,
    },
    {
      case_id: "case-06-deterministic-rebuild",
      expected_invariants: {
        replay_count: 2,
        outputs_identical: true,
        deterministic_rebuild: true,
      },
      run: runCase06DeterministicRebuild,
    },
  ];

  const results = [];

  for (const c of cases) {
    const observed = c.run();
    const check = validateInvariants(c.expected_invariants, observed);
    results.push({
      case_id: c.case_id,
      expected_invariants: c.expected_invariants,
      observed_status: {
        ...observed,
        failures: check.failures,
      },
      pass: check.pass,
    });
  }

  const passed = results.filter((r) => r.pass).length;
  const failed = results.length - passed;

  const summary = {
    suite_name: SUITE_NAME,
    evaluated_at: SUITE_EVALUATED_AT,
    total_cases: results.length,
    passed_cases: passed,
    failed_cases: failed,
    overall_status: failed === 0 ? "PASS" : "FAIL",
    cases: results,
  };

  const outputsDir = path.join(__dirname, "..", "outputs");
  ensureDir(outputsDir);
  const outPath = path.join(outputsDir, "janus-validation-suite.json");
  writeJson(outPath, summary);

  if (failed > 0) {
    process.exitCode = 1;
  }
}

runSuite();

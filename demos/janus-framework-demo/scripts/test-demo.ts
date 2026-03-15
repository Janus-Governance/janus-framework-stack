import assert from "assert";
import fs from "fs";

import { NodeFileAppender } from "../src/adapters/fileAdapter";
import { FileAuditWriter } from "../src/janus/auditWriter";
import { EventBus } from "../src/janus/eventBus";
import { appConfig } from "../src/config/appConfig";
import { defaultContentGate, importFromCsvFile } from "../src/domain/useCases";

async function run(): Promise<void> {
  // Clean deterministic output location
  if (fs.existsSync(appConfig.auditOutPath)) {
    fs.unlinkSync(appConfig.auditOutPath);
  }

  const gate = defaultContentGate();
  const { imported, event } = importFromCsvFile(appConfig.sampleCsvPath, { gate });

  assert.equal(imported.length, 3);
  assert.equal(event.type, "CONTENT_IMPORTED");
  assert.equal(event.payload.importedCount, 3);
  assert.equal(event.payload.rejectedCount, 0);

  const bus = new EventBus<typeof event.payload>();
  const audit = new FileAuditWriter(new NodeFileAppender(), appConfig.auditOutPath);

  bus.subscribe((e) => audit.write(e));
  await bus.publish(event);

  const out = fs.readFileSync(appConfig.auditOutPath, "utf8").trim().split(/\r?\n/);
  assert.equal(out.length, 1);

  const parsed = JSON.parse(out[0]);
  assert.equal(parsed.eventId, event.eventId);
  assert.equal(parsed.type, "CONTENT_IMPORTED");
  assert.equal(parsed.payload.importedCount, 3);

  console.log("TEST_OK", {
    eventId: event.eventId,
    auditOutPath: appConfig.auditOutPath,
    importedCount: event.payload.importedCount,
  });
}

run().catch((err) => {
  console.error("TEST_FAIL", err);
  process.exitCode = 1;
});

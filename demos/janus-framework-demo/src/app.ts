import { NodeFileAppender } from "./adapters/fileAdapter";
import { FileAuditWriter } from "./janus/auditWriter";
import { EventBus } from "./janus/eventBus";
import { appConfig } from "./config/appConfig";
import { defaultContentGate, importFromCsvFile } from "./domain/useCases";

async function main(): Promise<void> {
  const gate = defaultContentGate();
  const { event } = importFromCsvFile(appConfig.sampleCsvPath, { gate });

  const bus = new EventBus<typeof event.payload>();
  const audit = new FileAuditWriter(new NodeFileAppender(), appConfig.auditOutPath);

  bus.subscribe((e) => {
    audit.write(e);
    // deterministic console evidence
    console.log("AUDIT_EVENT", e.eventId, e.type, "imported=", e.payload.importedCount);
  });

  await bus.publish(event);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

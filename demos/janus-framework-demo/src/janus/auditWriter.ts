import type { FileAppender } from "../adapters/fileAdapter";
import { stableJson } from "./evidence";
import type { JanusEvent } from "./types";

export interface AuditWriter {
  write(event: JanusEvent<any>): void;
}

export class FileAuditWriter implements AuditWriter {
  constructor(
    private readonly appender: FileAppender,
    private readonly outputPath: string,
  ) {}

  write(event: JanusEvent<any>): void {
    this.appender.appendLine(this.outputPath, stableJson(event));
  }
}

import { appendLine } from "./fileUtils";
import type { BridgeEvent } from "./types";

export interface EventLoggerOptions {
  eventsLogPath: string;
}

export class EventLogger {
  constructor(private readonly options: EventLoggerOptions) {}

  append(event: BridgeEvent): void {
    const line = JSON.stringify(event);
    appendLine(this.options.eventsLogPath, line);
  }
}

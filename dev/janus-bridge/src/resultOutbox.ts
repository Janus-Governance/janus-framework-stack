import path from "path";

import { writeJsonAtomic } from "./fileUtils";
import type { BridgeResult } from "./types";

export interface ResultOutboxPaths {
  outboxResultPath: string;
}

export function getDefaultResultOutboxPaths(projectRoot: string): ResultOutboxPaths {
  return {
    outboxResultPath: path.join(projectRoot, "outbox", "result.json"),
  };
}

export function writeResult(paths: ResultOutboxPaths, result: BridgeResult): void {
  writeJsonAtomic(paths.outboxResultPath, result);
}

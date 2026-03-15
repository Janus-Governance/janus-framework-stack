import path from "path";

import { exists, readJson } from "./fileUtils";
import type { BridgePrompt } from "./types";

export interface PromptInboxPaths {
  inboxPromptPath: string;
}

export function getDefaultPromptInboxPaths(projectRoot: string): PromptInboxPaths {
  return {
    inboxPromptPath: path.join(projectRoot, "inbox", "prompt.json"),
  };
}

export function readPromptOnce(paths: PromptInboxPaths):
  | { kind: "missing"; path: string }
  | { kind: "present"; path: string; prompt: BridgePrompt } {
  if (!exists(paths.inboxPromptPath)) {
    return { kind: "missing", path: paths.inboxPromptPath };
  }

  const prompt = readJson<BridgePrompt>(paths.inboxPromptPath);
  return { kind: "present", path: paths.inboxPromptPath, prompt };
}

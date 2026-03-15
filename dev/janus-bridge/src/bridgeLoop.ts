import path from "path";

import { EventLogger } from "./eventLogger";
import { getDefaultPromptInboxPaths, readPromptOnce } from "./promptInbox";
import { getDefaultResultOutboxPaths, writeResult } from "./resultOutbox";
import type { BridgeEvent, BridgePrompt, BridgeResult } from "./types";

export interface BridgePaths {
  projectRoot: string;
  repoRoot: string;
  eventsLogPath: string;
}

export function getDefaultBridgePaths(projectRoot: string): BridgePaths {
  const repoRoot = path.resolve(projectRoot, "..", "..");
  return {
    projectRoot,
    repoRoot,
    eventsLogPath: path.join(repoRoot, "janus-runtime", "events.log"),
  };
}

export interface BridgeRunResult {
  handled: boolean;
  message: string;
  promptPath?: string;
  resultPath?: string;
  eventsLogPath: string;
}

function nowIso(): string {
  return new Date().toISOString();
}

function toPromptReceivedEvent(prompt: BridgePrompt): BridgeEvent {
  return {
    type: "bridge",
    name: "prompt_received",
    actor: "janus-bridge",
    timestamp: nowIso(),
    id: prompt.id,
  };
}

function toResultWrittenEvent(prompt: BridgePrompt): BridgeEvent {
  return {
    type: "bridge",
    name: "result_written",
    actor: "janus-bridge",
    timestamp: nowIso(),
    id: prompt.id,
  };
}

function makeResult(prompt: BridgePrompt, sourcePromptPath: string): BridgeResult {
  return {
    id: prompt.id,
    status: "received",
    handledBy: "janus-bridge",
    timestamp: nowIso(),
    summary: "Prompt received and logged",
    sourcePromptPath,
  };
}

export function runBridgeOnce(projectRoot: string): BridgeRunResult {
  const bridgePaths = getDefaultBridgePaths(projectRoot);
  const inboxPaths = getDefaultPromptInboxPaths(projectRoot);
  const outboxPaths = getDefaultResultOutboxPaths(projectRoot);

  const read = readPromptOnce(inboxPaths);
  if (read.kind === "missing") {
    return {
      handled: false,
      message: `No prompt.json found at ${read.path}. Nothing to do.`,
      eventsLogPath: bridgePaths.eventsLogPath,
      promptPath: read.path,
    };
  }

  const prompt = read.prompt;
  validatePrompt(prompt);

  const logger = new EventLogger({ eventsLogPath: bridgePaths.eventsLogPath });

  logger.append(toPromptReceivedEvent(prompt));

  const result = makeResult(prompt, read.path);
  writeResult(outboxPaths, result);

  logger.append(toResultWrittenEvent(prompt));

  return {
    handled: true,
    message: `Processed ${read.path} -> ${outboxPaths.outboxResultPath} and appended events to ${bridgePaths.eventsLogPath}.`,
    eventsLogPath: bridgePaths.eventsLogPath,
    promptPath: read.path,
    resultPath: outboxPaths.outboxResultPath,
  };
}

function validatePrompt(prompt: BridgePrompt): void {
  const missing: string[] = [];

  if (!prompt || typeof prompt !== "object") {
    throw new Error("prompt.json must be a JSON object");
  }

  if (!prompt.id) missing.push("id");
  if (!prompt.source) missing.push("source");
  if (!prompt.target) missing.push("target");
  if (!prompt.action) missing.push("action");
  if (!prompt.payload) missing.push("payload");
  if (!prompt.timestamp) missing.push("timestamp");

  if (missing.length) {
    throw new Error(`prompt.json missing required fields: ${missing.join(", ")}`);
  }

  if (prompt.action !== "create_file") {
    throw new Error(`Unsupported action: ${prompt.action}`);
  }

  if (!prompt.payload.path || !prompt.payload.description) {
    throw new Error("payload.path and payload.description are required");
  }
}

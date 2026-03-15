import fs from "fs";
import path from "path";

import { runBridgeOnce } from "./bridgeLoop";
import { writeJsonAtomic } from "./fileUtils";
import type { BridgePrompt } from "./types";

function usage(): void {
  // Keep output minimal and deterministic.
  console.log("Usage: node dist/index.js <bridge|demo>");
}

function projectRootFromCwd(): string {
  return process.cwd();
}

function writeDemoPrompt(projectRoot: string): string {
  const inboxPromptPath = path.join(projectRoot, "inbox", "prompt.json");

  const prompt: BridgePrompt = {
    id: "prompt-001",
    source: "chatgpt",
    target: "copilot",
    action: "create_file",
    payload: {
      path: "example.txt",
      description: "Create a sample file",
    },
    timestamp: "2026-03-15T00:00:00Z",
  };

  writeJsonAtomic(inboxPromptPath, prompt);
  return inboxPromptPath;
}

function printFileIfExists(filePath: string): void {
  if (!fs.existsSync(filePath)) {
    console.log(`(missing) ${filePath}`);
    return;
  }
  const content = fs.readFileSync(filePath, "utf8");
  console.log(`--- ${filePath} ---`);
  process.stdout.write(content);
}

function tailFile(filePath: string, maxLines: number): void {
  if (!fs.existsSync(filePath)) {
    console.log(`(missing) ${filePath}`);
    return;
  }

  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split(/\r?\n/).filter((l) => l.length > 0);
  const tail = lines.slice(Math.max(0, lines.length - maxLines));

  console.log(`--- ${filePath} (last ${Math.min(maxLines, lines.length)} lines) ---`);
  for (const line of tail) console.log(line);
}

function main(): void {
  const mode = process.argv[2];
  if (!mode) {
    usage();
    process.exitCode = 2;
    return;
  }

  const projectRoot = projectRootFromCwd();

  if (mode === "bridge") {
    const result = runBridgeOnce(projectRoot);
    console.log(result.message);
    return;
  }

  if (mode === "demo") {
    const promptPath = writeDemoPrompt(projectRoot);
    console.log(`Wrote demo prompt: ${promptPath}`);

    const result = runBridgeOnce(projectRoot);
    console.log(result.message);

    // Print resulting files for the demo.
    const outboxResultPath = path.join(projectRoot, "outbox", "result.json");
    printFileIfExists(outboxResultPath);

    const repoRoot = path.resolve(projectRoot, "..", "..");
    const eventsLogPath = path.join(repoRoot, "janus-runtime", "events.log");
    tailFile(eventsLogPath, 20);

    return;
  }

  usage();
  process.exitCode = 2;
}

main();

import fs from "fs";
import path from "path";

import { runBridgeOnce } from "./bridgeLoop";

const PROMPT_FILENAME = "prompt.json";

function projectRootFromScriptLocation(): string {
  // When compiled, this file lives in dev/janus-bridge/dist.
  // Derive the project root as dist/.. so watch mode works
  // even when invoked from an arbitrary working directory.
  return path.resolve(__dirname, "..");
}

function nowIso(): string {
  return new Date().toISOString();
}

function log(message: string): void {
  // Keep logs simple and local-only.
  console.log(`[janus-bridge][watch] ${message}`);
}

interface WatchState {
  processing: boolean;
  pending: boolean;
  timer: NodeJS.Timeout | null;
}

function rewriteJsonAtomically(finalPath: string, value: unknown): void {
  const tmpPath = `${finalPath}.tmp`;
  fs.mkdirSync(path.dirname(tmpPath), { recursive: true });
  fs.writeFileSync(tmpPath, JSON.stringify(value, null, 2));
  fs.renameSync(tmpPath, finalPath);
}

function createWatchState(): WatchState {
  return { processing: false, pending: false, timer: null };
}

async function processOnce(projectRoot: string, reason: string, state: WatchState): Promise<void> {
  if (state.processing) {
    state.pending = true;
    return;
  }

  state.processing = true;
  state.pending = false;

  try {
    log(`processing trigger (${reason}) at ${nowIso()}`);
    const result = runBridgeOnce(projectRoot);
    log(result.message);

    if (result.resultPath) {
      const raw = fs.readFileSync(result.resultPath, "utf8");
      const parsed = JSON.parse(raw) as unknown;
      rewriteJsonAtomically(result.resultPath, parsed);
    }
  } catch (err) {
    log(`error: ${String(err)}`);
  } finally {
    state.processing = false;
    if (state.pending) {
      // If something changed while processing, run once more.
      await processOnce(projectRoot, "pending_change", state);
    }
  }
}

function scheduleProcess(projectRoot: string, reason: string, state: WatchState): void {
  // Debounce noisy fs.watch bursts.
  if (state.timer) clearTimeout(state.timer);
  state.timer = setTimeout(() => {
    state.timer = null;
    void processOnce(projectRoot, reason, state);
  }, 75);
}

export function startWatchMode(): void {
  const projectRoot = projectRootFromScriptLocation();
  const inboxDir = path.join(projectRoot, "inbox");
  const promptPath = path.join(inboxDir, PROMPT_FILENAME);

  const lockPath = path.join(projectRoot, ".janus-bridge-watch.lock");
  try {
    fs.mkdirSync(path.dirname(lockPath), { recursive: true });
    fs.writeFileSync(fs.openSync(lockPath, "wx"), `${process.pid}\n`, "utf8");
  } catch {
    log(`another watcher appears to be running (lock exists): ${lockPath}`);
    return;
  }

  const cleanupLock = (): void => {
    try {
      fs.unlinkSync(lockPath);
    } catch {
      // ignore
    }
  };

  process.once("exit", cleanupLock);
  process.once("SIGINT", cleanupLock);
  process.once("SIGTERM", cleanupLock);

  const hadPromptAtStartup = fs.existsSync(promptPath);

  const state = createWatchState();

  // Emit startup logs on the next tick so they reliably appear
  // in background-terminal capture.
  setTimeout(() => {
    log(`starting watcher`);
    log(`inbox: ${inboxDir}`);
    log(`prompt: ${promptPath}`);
    if (!hadPromptAtStartup) log("waiting for prompt.json...");
  }, 250);

  // If a prompt already exists, process once at startup.
  if (hadPromptAtStartup) {
    scheduleProcess(projectRoot, "startup_existing_prompt", state);
  }

  // Watch the inbox directory for changes to prompt.json.
  const watcher = fs.watch(inboxDir, { persistent: true }, (eventType, filename) => {
    const name = filename ? filename.toString() : "";

    // macOS sometimes reports empty filename; in that case, still check prompt.json.
    if (name && name !== PROMPT_FILENAME) return;
    if (eventType !== "change" && eventType !== "rename") return;

    scheduleProcess(projectRoot, `${eventType}:${name || "(unknown)"}`, state);
  });

  const shutdown = (): void => {
    log("shutting down watcher");
    watcher.close();
    cleanupLock();
  };

  process.on("SIGINT", () => {
    shutdown();
  });

  process.on("SIGTERM", () => {
    shutdown();
  });
}

if (require.main === module) {
  startWatchMode();
}

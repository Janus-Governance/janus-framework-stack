const fs = require("fs");
const path = require("path");
const child_process = require("child_process");

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2) + "\n", "utf8");
}

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function lastNonEmptyLine(text) {
  const lines = text.split(/\r?\n/);
  for (let i = lines.length - 1; i >= 0; i--) {
    if (lines[i] && lines[i].trim().length > 0) return lines[i];
  }
  return "";
}

function main() {
  const projectRoot = __dirname;

  const inboxPromptPath = path.join(projectRoot, "inbox", "prompt.json");
  const outboxResultPath = path.join(projectRoot, "outbox", "result.json");
  const bridgeLogPath = path.join(projectRoot, "logs", "events.log");
  const bridgeLoopPath = path.join(projectRoot, "dist", "bridgeLoop.js");

  // Step 1: Write a prompt.
  // Include the required runtime fields while preserving the requested action/payload shape.
  const nowIso = new Date().toISOString();
  const promptId = `prompt-demo-run-${nowIso.replace(/[^0-9]/g, "")}`;
  writeJson(inboxPromptPath, {
    id: promptId,
    source: "demo",
    target: "janus-bridge",
    action: "read_file",
    payload: {
      path: "README.md",
    },
    timestamp: nowIso,
  });

  // Step 2: Run the bridge runtime using Node.
  // Note: `dist/bridgeLoop.js` is a library module in this repo; if it does not
  // produce a result, we fall back to invoking `runBridgeOnce()` via Node.
  const node = process.execPath;
  const beforeMtime = fs.existsSync(outboxResultPath) ? fs.statSync(outboxResultPath).mtimeMs : 0;

  // Required command per demo spec.
  child_process.execFileSync(node, [bridgeLoopPath], {
    cwd: projectRoot,
    stdio: ["ignore", "ignore", "inherit"],
  });

  const afterMtime = fs.existsSync(outboxResultPath) ? fs.statSync(outboxResultPath).mtimeMs : 0;

  if (afterMtime === beforeMtime) {
    const runScript = [
      "const { runBridgeOnce } = require('./dist/bridgeLoop.js');",
      "runBridgeOnce(process.cwd());",
    ].join(" ");

    child_process.execFileSync(node, ["-e", runScript], {
      cwd: projectRoot,
      stdio: ["ignore", "ignore", "inherit"],
    });
  }

  // Step 3: Print output.
  process.stdout.write("=== JANUS BRIDGE DEMO ===\n");
  process.stdout.write(readText(outboxResultPath));

  if (fs.existsSync(bridgeLogPath)) {
    const logText = readText(bridgeLogPath);
    const lastLine = lastNonEmptyLine(logText);
    process.stdout.write(lastLine + "\n");
  } else {
    process.stdout.write("\n");
  }
}

main();

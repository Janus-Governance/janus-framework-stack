import path from "path";

import * as vscode from "vscode";

import { JsonlTailWatcher } from "./eventWatcher";
import { FlowPanel } from "./flowPanel";

let watcher: JsonlTailWatcher | null = null;
let panel: FlowPanel | null = null;

const SELECT_FOLDER_COMMAND = "janus.selectFlowViewerFolder";

function stopWatcher(): void {
  if (watcher) watcher.stop();
  watcher = null;
}

function startWatchingProjectFolder(
  projectRoot: string,
  options?: { emptyMessage?: string | null },
): void {
  if (!panel) return;

  stopWatcher();

  const eventsLogPath = path.join(projectRoot, "janus-runtime", "events.log");

  panel.setAction(null);
  panel.setEmptyMessage(options?.emptyMessage ?? null);
  panel.setStatus(`Experimental read-only watcher. Source: ${eventsLogPath}`);

  watcher = new JsonlTailWatcher({ filePath: eventsLogPath });
  watcher.onStatus((msg) => panel?.setStatus(msg));
  watcher.onEvent((event) => panel?.appendEvent(event));
  watcher.start();
}

export function activate(context: vscode.ExtensionContext): void {
  const startCommand = vscode.commands.registerCommand("janus.startFlowViewer", async () => {
    if (!panel) panel = new FlowPanel(context);
    panel.show();

    stopWatcher();

    const workspaceFolders = vscode.workspace.workspaceFolders;
    const workspaceRoot = workspaceFolders?.[0]?.uri.fsPath;
    if (workspaceFolders && workspaceFolders.length > 0 && workspaceRoot) {
      startWatchingProjectFolder(workspaceRoot);
      return;
    }

    // No workspace open: keep the panel visible and let the user pick a folder.
    panel.setEmptyMessage(
      "No workspace folder is open. Select a project folder to watch Janus events.",
    );
    panel.setStatus("Waiting for folder selection.");
    panel.setAction({
      label: "Select project folder",
      commandId: SELECT_FOLDER_COMMAND,
    });

    const picked = await vscode.window.showInformationMessage(
      "No workspace folder is open. Select a project folder to watch Janus events.",
      "Select Folder",
    );
    if (picked === "Select Folder") {
      await vscode.commands.executeCommand(SELECT_FOLDER_COMMAND);
    }
  });

  const selectFolderCommand = vscode.commands.registerCommand(SELECT_FOLDER_COMMAND, async () => {
    if (!panel) {
      panel = new FlowPanel(context);
      panel.show();
    }

    const selection = await vscode.window.showOpenDialog({
      canSelectFiles: false,
      canSelectFolders: true,
      canSelectMany: false,
      openLabel: "Select project folder",
      title: "Select a Janus project folder to watch",
    });

    const folderUri = selection?.[0];
    if (!folderUri) {
      panel.setStatus("Folder selection canceled.");
      return;
    }

    startWatchingProjectFolder(folderUri.fsPath, {
      emptyMessage:
        "No events yet. Waiting for Janus events in janus-runtime/events.log (relative to the selected folder).",
    });
  });

  context.subscriptions.push(startCommand, selectFolderCommand);
}

export function deactivate(): void {
  stopWatcher();
}

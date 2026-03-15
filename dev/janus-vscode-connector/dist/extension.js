"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const path_1 = __importDefault(require("path"));
const vscode = __importStar(require("vscode"));
const eventWatcher_1 = require("./eventWatcher");
const flowPanel_1 = require("./flowPanel");
let watcher = null;
let panel = null;
const SELECT_FOLDER_COMMAND = "janus.selectFlowViewerFolder";
function stopWatcher() {
    if (watcher)
        watcher.stop();
    watcher = null;
}
function startWatchingProjectFolder(projectRoot, options) {
    if (!panel)
        return;
    stopWatcher();
    const eventsLogPath = path_1.default.join(projectRoot, "janus-runtime", "events.log");
    panel.setAction(null);
    panel.setEmptyMessage(options?.emptyMessage ?? null);
    panel.setStatus(`Experimental read-only watcher. Source: ${eventsLogPath}`);
    watcher = new eventWatcher_1.JsonlTailWatcher({ filePath: eventsLogPath });
    watcher.onStatus((msg) => panel?.setStatus(msg));
    watcher.onEvent((event) => panel?.appendEvent(event));
    watcher.start();
}
function activate(context) {
    const startCommand = vscode.commands.registerCommand("janus.startFlowViewer", async () => {
        if (!panel)
            panel = new flowPanel_1.FlowPanel(context);
        panel.show();
        stopWatcher();
        const workspaceFolders = vscode.workspace.workspaceFolders;
        const workspaceRoot = workspaceFolders?.[0]?.uri.fsPath;
        if (workspaceFolders && workspaceFolders.length > 0 && workspaceRoot) {
            startWatchingProjectFolder(workspaceRoot);
            return;
        }
        // No workspace open: keep the panel visible and let the user pick a folder.
        panel.setEmptyMessage("No workspace folder is open. Select a project folder to watch Janus events.");
        panel.setStatus("Waiting for folder selection.");
        panel.setAction({
            label: "Select project folder",
            commandId: SELECT_FOLDER_COMMAND,
        });
        const picked = await vscode.window.showInformationMessage("No workspace folder is open. Select a project folder to watch Janus events.", "Select Folder");
        if (picked === "Select Folder") {
            await vscode.commands.executeCommand(SELECT_FOLDER_COMMAND);
        }
    });
    const selectFolderCommand = vscode.commands.registerCommand(SELECT_FOLDER_COMMAND, async () => {
        if (!panel) {
            panel = new flowPanel_1.FlowPanel(context);
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
            emptyMessage: "No events yet. Waiting for Janus events in janus-runtime/events.log (relative to the selected folder).",
        });
    });
    context.subscriptions.push(startCommand, selectFolderCommand);
}
function deactivate() {
    stopWatcher();
}
//# sourceMappingURL=extension.js.map
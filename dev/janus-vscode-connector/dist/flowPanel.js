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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlowPanel = void 0;
const vscode = __importStar(require("vscode"));
const janusParser_1 = require("./janusParser");
class FlowPanel {
    constructor(context) {
        this.context = context;
        this.panel = null;
        this.events = [];
        this.status = null;
        this.emptyMessage = null;
        this.action = null;
    }
    show() {
        if (this.panel) {
            this.panel.reveal(vscode.ViewColumn.Beside);
            return;
        }
        this.panel = vscode.window.createWebviewPanel("janusFlowViewer", "Janus Flow (Experimental)", vscode.ViewColumn.Beside, {
            enableScripts: false,
            enableCommandUris: true,
        });
        this.panel.onDidDispose(() => {
            this.panel = null;
        }, null, this.context.subscriptions);
        this.render();
    }
    setStatus(message) {
        this.status = message;
        this.render();
    }
    setEmptyMessage(message) {
        this.emptyMessage = message;
        this.render();
    }
    setAction(action) {
        this.action = action;
        this.render();
    }
    appendEvent(event) {
        this.events.push(event);
        // keep minimal memory footprint
        if (this.events.length > 200)
            this.events.shift();
        this.render();
    }
    render() {
        if (!this.panel)
            return;
        const flow = this.events.map((e) => (0, janusParser_1.formatEventLabel)(e));
        const statusLine = this.status ? `<div class="status">${escapeHtml(this.status)}</div>` : "";
        const body = flow.length
            ? `<div class="flow">${flow
                .map((label, i) => {
                const arrow = i === flow.length - 1 ? "" : `<div class="arrow">↓</div>`;
                return `<div class="event">${escapeHtml(label)}</div>${arrow}`;
            })
                .join("")}</div>`
            : `<div class="empty">${escapeHtml(this.emptyMessage ??
                "No events yet. Append JSON lines to janus-runtime/events.log (relative to the workspace root).")}</div>${this.renderAction()}`;
        this.panel.webview.html = `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline';" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Janus Flow</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; padding: 16px; }
    h1 { font-size: 16px; margin: 0 0 12px 0; }
    .status { font-size: 12px; opacity: 0.8; margin-bottom: 12px; }
    .flow { display: flex; flex-direction: column; gap: 8px; }
    .event { font-weight: 650; }
    .arrow { opacity: 0.7; margin-left: 8px; }
    .empty { opacity: 0.8; }
    .actions { margin-top: 12px; }
    .btn { display: inline-block; padding: 8px 10px; border: 1px solid; border-radius: 6px; text-decoration: none; color: inherit; }
    code { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; }
  </style>
</head>
<body>
  <h1>JANUS FLOW</h1>
  ${statusLine}
  ${body}
</body>
</html>`;
    }
    renderAction() {
        if (!this.action)
            return "";
        const commandUri = `command:${this.action.commandId}`;
        return `<div class="actions"><a class="btn" href="${escapeHtml(commandUri)}">${escapeHtml(this.action.label)}</a></div>`;
    }
}
exports.FlowPanel = FlowPanel;
function escapeHtml(value) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&#39;");
}
//# sourceMappingURL=flowPanel.js.map
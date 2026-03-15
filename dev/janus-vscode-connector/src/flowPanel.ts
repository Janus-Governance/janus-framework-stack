import * as vscode from "vscode";

import type { JanusRuntimeEvent } from "./janusParser";
import { formatEventLabel } from "./janusParser";

export class FlowPanel {
  private panel: vscode.WebviewPanel | null = null;
  private readonly events: JanusRuntimeEvent[] = [];
  private status: string | null = null;
  private emptyMessage: string | null = null;
  private action: { label: string; commandId: string } | null = null;

  constructor(private readonly context: vscode.ExtensionContext) {}

  show(): void {
    if (this.panel) {
      this.panel.reveal(vscode.ViewColumn.Beside);
      return;
    }

    this.panel = vscode.window.createWebviewPanel(
      "janusFlowViewer",
      "Janus Flow (Experimental)",
      vscode.ViewColumn.Beside,
      {
        enableScripts: false,
        enableCommandUris: true,
      },
    );

    this.panel.onDidDispose(() => {
      this.panel = null;
    }, null, this.context.subscriptions);

    this.render();
  }

  setStatus(message: string): void {
    this.status = message;
    this.render();
  }

  setEmptyMessage(message: string | null): void {
    this.emptyMessage = message;
    this.render();
  }

  setAction(action: { label: string; commandId: string } | null): void {
    this.action = action;
    this.render();
  }

  appendEvent(event: JanusRuntimeEvent): void {
    this.events.push(event);
    // keep minimal memory footprint
    if (this.events.length > 200) this.events.shift();
    this.render();
  }

  private render(): void {
    if (!this.panel) return;

    const flow = this.events.map((e) => formatEventLabel(e));
    const statusLine = this.status ? `<div class="status">${escapeHtml(this.status)}</div>` : "";

    const body = flow.length
      ? `<div class="flow">${flow
          .map((label, i) => {
            const arrow = i === flow.length - 1 ? "" : `<div class="arrow">↓</div>`;
            return `<div class="event">${escapeHtml(label)}</div>${arrow}`;
          })
          .join("")}</div>`
      : `<div class="empty">${escapeHtml(
          this.emptyMessage ??
            "No events yet. Append JSON lines to janus-runtime/events.log (relative to the workspace root).",
        )}</div>${this.renderAction()}`;

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

  private renderAction(): string {
    if (!this.action) return "";
    const commandUri = `command:${this.action.commandId}`;
    return `<div class="actions"><a class="btn" href="${escapeHtml(commandUri)}">${escapeHtml(
      this.action.label,
    )}</a></div>`;
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

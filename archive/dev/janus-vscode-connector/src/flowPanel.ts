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
    // ...existing code...
  }
}

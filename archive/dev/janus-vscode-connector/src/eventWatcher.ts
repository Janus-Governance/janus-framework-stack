import fs from "fs";
import path from "path";
import { EventEmitter } from "events";

import { parseJsonLine, type JanusRuntimeEvent } from "./janusParser";

export interface EventWatcherOptions {
  filePath: string;
}

export interface EventWatcher {
  onEvent(handler: (event: JanusRuntimeEvent) => void): void;
  onStatus(handler: (message: string) => void): void;
  start(): void;
  stop(): void;
}

export class JsonlTailWatcher implements EventWatcher {
  private readonly emitter = new EventEmitter();
  private watcher: fs.FSWatcher | null = null;
  private buffer = "";
  private offset = 0;
  private running = false;
  private lastStatus: string | null = null;

  constructor(private readonly options: EventWatcherOptions) {}

  onEvent(handler: (event: JanusRuntimeEvent) => void): void {
    this.emitter.on("event", handler);
  }

  onStatus(handler: (message: string) => void): void {
    this.emitter.on("status", handler);
  }

  start(): void {
    if (this.running) return;
    this.running = true;

    this.emitStatus(`Watching: ${this.options.filePath}`);

    if (!fs.existsSync(this.options.filePath)) {
      this.emitStatus(`Waiting for file to be created: ${this.options.filePath}`);
    }

    // Initialize offset to current file size (tail -f behavior).
    this.offset = this.getCurrentSizeOrZero();

    const dir = path.dirname(this.options.filePath);
    const base = path.basename(this.options.filePath);

    try {
      this.watcher = fs.watch(dir, (eventType, filename) => {
        if (!this.running) return;
        if (!filename || filename.toString() !== base) return;
        if (eventType !== "change" && eventType !== "rename") return;
        this.readNewBytes();
      });
    } catch (err) {
      this.emitStatus(`fs.watch failed: ${String(err)}`);
      // Fallback: poll.
      const interval = setInterval(() => {
        if (!this.running) {
          clearInterval(interval);
          return;
        }
        this.readNewBytes();
      }, 500);
    }
  }

  stop(): void {
    if (!this.running) return;
    this.running = false;
    if (this.watcher) {
      this.watcher.close();
      this.watcher = null;
    }
  }

  private emitStatus(message: string): void {
    this.lastStatus = message;
    this.emitter.emit("status", message);
  }

  private getCurrentSizeOrZero(): number {
    try {
      return fs.statSync(this.options.filePath).size;
    } catch {
      return 0;
    }
  }

  private readNewBytes(): void {
    // ...existing code...
  }
}

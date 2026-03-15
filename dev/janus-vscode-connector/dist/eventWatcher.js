"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonlTailWatcher = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const events_1 = require("events");
const janusParser_1 = require("./janusParser");
class JsonlTailWatcher {
    constructor(options) {
        this.options = options;
        this.emitter = new events_1.EventEmitter();
        this.watcher = null;
        this.buffer = "";
        this.offset = 0;
        this.running = false;
        this.lastStatus = null;
    }
    onEvent(handler) {
        this.emitter.on("event", handler);
    }
    onStatus(handler) {
        this.emitter.on("status", handler);
    }
    start() {
        if (this.running)
            return;
        this.running = true;
        this.emitStatus(`Watching: ${this.options.filePath}`);
        if (!fs_1.default.existsSync(this.options.filePath)) {
            this.emitStatus(`Waiting for file to be created: ${this.options.filePath}`);
        }
        // Initialize offset to current file size (tail -f behavior).
        this.offset = this.getCurrentSizeOrZero();
        const dir = path_1.default.dirname(this.options.filePath);
        const base = path_1.default.basename(this.options.filePath);
        try {
            this.watcher = fs_1.default.watch(dir, (eventType, filename) => {
                if (!this.running)
                    return;
                if (!filename || filename.toString() !== base)
                    return;
                if (eventType !== "change" && eventType !== "rename")
                    return;
                this.readNewBytes();
            });
        }
        catch (err) {
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
    stop() {
        this.running = false;
        if (this.watcher) {
            this.watcher.close();
            this.watcher = null;
        }
    }
    emitStatus(message) {
        if (this.lastStatus === message)
            return;
        this.lastStatus = message;
        this.emitter.emit("status", message);
    }
    emitEvent(event) {
        this.emitter.emit("event", event);
    }
    getCurrentSizeOrZero() {
        try {
            return fs_1.default.statSync(this.options.filePath).size;
        }
        catch {
            return 0;
        }
    }
    readNewBytes() {
        let stat;
        try {
            stat = fs_1.default.statSync(this.options.filePath);
        }
        catch {
            this.emitStatus(`Waiting for file to be created: ${this.options.filePath}`);
            return;
        }
        if (stat.size < this.offset) {
            // File rotated/truncated.
            this.offset = 0;
            this.buffer = "";
            this.emitStatus("events.log truncated/rotated; restarting tail");
        }
        if (stat.size === this.offset)
            return;
        const fd = fs_1.default.openSync(this.options.filePath, "r");
        try {
            const toRead = stat.size - this.offset;
            const buf = Buffer.allocUnsafe(toRead);
            fs_1.default.readSync(fd, buf, 0, toRead, this.offset);
            this.offset = stat.size;
            this.buffer += buf.toString("utf8");
            this.flushLines();
        }
        finally {
            fs_1.default.closeSync(fd);
        }
    }
    flushLines() {
        const parts = this.buffer.split(/\r?\n/);
        this.buffer = parts.pop() ?? "";
        for (const line of parts) {
            const event = (0, janusParser_1.parseJsonLine)(line);
            if (event)
                this.emitEvent(event);
        }
    }
}
exports.JsonlTailWatcher = JsonlTailWatcher;
//# sourceMappingURL=eventWatcher.js.map
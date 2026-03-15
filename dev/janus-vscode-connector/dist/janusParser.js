"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseJsonLine = parseJsonLine;
exports.formatEventLabel = formatEventLabel;
function parseJsonLine(line) {
    const trimmed = line.trim();
    if (!trimmed)
        return null;
    try {
        const parsed = JSON.parse(trimmed);
        if (!parsed || typeof parsed !== "object")
            return null;
        const event = parsed;
        if (typeof event.type !== "string" || !event.type)
            return null;
        return event;
    }
    catch {
        return null;
    }
}
function formatEventLabel(event) {
    const type = String(event.type || "").trim();
    const name = typeof event.name === "string" ? event.name.trim() : "";
    const primary = [type, name].filter(Boolean).join(":");
    return primary ? primary.toUpperCase() : "UNKNOWN";
}
//# sourceMappingURL=janusParser.js.map
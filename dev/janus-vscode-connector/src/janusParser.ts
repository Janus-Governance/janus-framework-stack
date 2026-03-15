export interface JanusRuntimeEvent {
  type: string;
  name?: string;
  timestamp?: string;
  actor?: string;
  [key: string]: unknown;
}

export function parseJsonLine(line: string): JanusRuntimeEvent | null {
  const trimmed = line.trim();
  if (!trimmed) return null;

  try {
    const parsed = JSON.parse(trimmed) as unknown;
    if (!parsed || typeof parsed !== "object") return null;

    const event = parsed as JanusRuntimeEvent;
    if (typeof event.type !== "string" || !event.type) return null;

    return event;
  } catch {
    return null;
  }
}

export function formatEventLabel(event: JanusRuntimeEvent): string {
  const type = String(event.type || "").trim();
  const name = typeof event.name === "string" ? event.name.trim() : "";
  const primary = [type, name].filter(Boolean).join(":");
  return primary ? primary.toUpperCase() : "UNKNOWN";
}

import crypto from "crypto";
import type { EvidenceRecord, EvidenceType, Hash } from "./types";

export function stableJson(value: unknown): string {
  return JSON.stringify(sortObject(value));
}

function sortObject(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sortObject);
  if (value && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>).sort(([a], [b]) =>
      a.localeCompare(b),
    );
    return Object.fromEntries(entries.map(([k, v]) => [k, sortObject(v)]));
  }
  return value;
}

export function sha256Hex(input: string): Hash {
  return crypto.createHash("sha256").update(input).digest("hex");
}

export function buildEvidence(
  type: EvidenceType,
  description: string,
  subject: unknown,
): EvidenceRecord {
  const hash = sha256Hex(stableJson({ description, subject }));
  return { type, description, hash };
}

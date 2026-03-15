import fs from "fs";
import { buildEvidence, sha256Hex } from "../janus/evidence";
import type { JanusEvent } from "../janus/types";
import { fail, ok, type ValidationGate } from "../janus/gates";
import type { ContentEntity, NormalizedImportRow } from "./entity";

export interface ContentImportedPayload {
  source: { type: "csv"; path: string };
  importedCount: number;
  rejectedCount: number;
  importedKinds: string[];
  rejected: Array<{ sourceId: string; errors: string[] }>;
}

export interface ImportResult {
  imported: ContentEntity[];
  event: JanusEvent<ContentImportedPayload>;
}

export interface ImportDependencies {
  gate: ValidationGate<ContentEntity>;
}

function parseCsv(csvText: string): Record<string, string>[] {
  const lines = csvText
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  if (lines.length < 2) return [];

  const header = splitCsvLine(lines[0]);
  return lines.slice(1).map((line) => {
    const cells = splitCsvLine(line);
    const row: Record<string, string> = {};
    header.forEach((h, i) => {
      row[h] = cells[i] ?? "";
    });
    return row;
  });
}

function splitCsvLine(line: string): string[] {
  const out: string[] = [];
  let cur = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
      continue;
    }
    if (ch === "," && !inQuotes) {
      out.push(cur);
      cur = "";
      continue;
    }
    cur += ch;
  }
  out.push(cur);
  return out.map((s) => s.trim());
}

function normalizeRow(row: Record<string, string>): NormalizedImportRow {
  const kind = row.kind.trim();
  const sourceId = row.sourceId.trim();

  const answer = row.answer.trim();
  const tags = row.tags.trim().replace(/^"|"$/g, "");
  const tagList = tags ? tags.split(";").map((t) => t.trim()).filter(Boolean) : [];

  const attributes: Record<string, unknown> = {
    question: row.question.trim(),
    choices: {
      A: row.choiceA.trim(),
      B: row.choiceB.trim(),
      C: row.choiceC.trim(),
      D: row.choiceD.trim(),
    },
    answer,
    tags: tagList,
  };

  return { kind, sourceId, attributes };
}

export function defaultContentGate(): ValidationGate<ContentEntity> {
  return {
    name: "default-content-gate",
    validate(entity) {
      const errors: string[] = [];
      if (!entity.kind) errors.push("kind is required");
      if (!entity.sourceId) errors.push("sourceId is required");
      if (typeof entity.attributes.question !== "string" || !entity.attributes.question) {
        errors.push("attributes.question is required");
      }
      const choices = entity.attributes.choices as Record<string, unknown> | undefined;
      if (!choices || typeof choices !== "object") errors.push("attributes.choices is required");
      if (typeof entity.attributes.answer !== "string" || !entity.attributes.answer) {
        errors.push("attributes.answer is required");
      }
      return errors.length ? fail(...errors) : ok();
    },
  };
}

export function importFromCsvFile(
  csvPath: string,
  deps: ImportDependencies,
): ImportResult {
  const csvText = fs.readFileSync(csvPath, "utf8");
  const rows = parseCsv(csvText).map(normalizeRow);

  const imported: ContentEntity[] = [];
  const errors: Array<{ sourceId: string; errors: string[] }> = [];

  for (const row of rows) {
    const entity: ContentEntity = {
      id: sha256Hex(JSON.stringify({ kind: row.kind, sourceId: row.sourceId, attributes: row.attributes })),
      kind: row.kind,
      sourceId: row.sourceId,
      schemaVersion: 1,
      attributes: row.attributes,
    };

    const gateRes = deps.gate.validate(entity);
    if (!gateRes.ok) {
      errors.push({ sourceId: entity.sourceId, errors: gateRes.errors });
      continue;
    }

    imported.push(entity);
  }

  const payload: ContentImportedPayload = {
    source: { type: "csv", path: csvPath },
    importedCount: imported.length,
    rejectedCount: errors.length,
    importedKinds: Array.from(new Set(imported.map((e) => e.kind))).sort(),
    rejected: errors,
  };

  const evidence = [
    buildEvidence("E_PLUS", "normalized-import-payload", payload),
    ...(errors.length
      ? [buildEvidence("E_MINUS", "rejections-present", errors)]
      : [buildEvidence("E_PLUS", "no-rejections", { rejectedCount: 0 })]),
  ];

  const eventId = sha256Hex(JSON.stringify({ type: "CONTENT_IMPORTED", payload, evidence: evidence.map((e) => e.hash) }));

  const event: JanusEvent<ContentImportedPayload> = {
    kind: "MANAGEMENT",
    type: "CONTENT_IMPORTED",
    eventId,
    sequence: 1,
    payload,
    evidence,
  };

  return { imported, event };
}

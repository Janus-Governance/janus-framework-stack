import type { Hash } from "../janus/types";

export type ContentKind = string;

export interface ContentEntity<TAttributes extends Record<string, unknown> = Record<string, unknown>> {
  id: Hash;
  kind: ContentKind;
  sourceId: string;
  schemaVersion: number;
  attributes: TAttributes;
}

export interface NormalizedImportRow {
  kind: string;
  sourceId: string;
  attributes: Record<string, unknown>;
}

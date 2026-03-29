// Canonical EvidenceRecord definition for Janus (shared)
export type EvidenceType = "E+" | "E-";

export interface EvidenceRecord {
  type: EvidenceType;
  description: string;
  hash?: string;
}

export type Hash = string;

export type EvidenceType = "E_PLUS" | "E_MINUS";

export type EventKind = "MANAGEMENT";

export interface EvidenceRecord {
  type: EvidenceType;
  description: string;
  hash: Hash;
}

export interface JanusEvent<TPayload extends object = Record<string, unknown>> {
  kind: EventKind;
  type: string;
  eventId: Hash;
  sequence: number;
  payload: TPayload;
  evidence: EvidenceRecord[];
}

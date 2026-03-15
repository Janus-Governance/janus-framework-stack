export interface GateResult {
  ok: boolean;
  errors: string[];
}

export interface ValidationGate<T> {
  name: string;
  validate(input: T): GateResult;
}

export function runGate<T>(gate: ValidationGate<T>, input: T): GateResult {
  return gate.validate(input);
}

export function ok(): GateResult {
  return { ok: true, errors: [] };
}

export function fail(...errors: string[]): GateResult {
  return { ok: false, errors };
}

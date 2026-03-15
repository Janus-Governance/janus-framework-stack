export interface KeyValueStore {
  get(key: string): string | undefined;
  set(key: string, value: string): void;
}

export class MemoryKeyValueStore implements KeyValueStore {
  private store = new Map<string, string>();

  get(key: string): string | undefined {
    return this.store.get(key);
  }

  set(key: string, value: string): void {
    this.store.set(key, value);
  }
}

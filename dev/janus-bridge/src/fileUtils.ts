import fs from "fs";
import path from "path";

export function exists(filePath: string): boolean {
  try {
    fs.accessSync(filePath, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

export function ensureDir(dirPath: string): void {
  fs.mkdirSync(dirPath, { recursive: true });
}

export function readUtf8(filePath: string): string {
  return fs.readFileSync(filePath, "utf8");
}

export function readJson<T>(filePath: string): T {
  const raw = readUtf8(filePath);
  return JSON.parse(raw) as T;
}

export function writeJsonAtomic(filePath: string, value: unknown): void {
  const dir = path.dirname(filePath);
  ensureDir(dir);

  const tmpPath = `${filePath}.tmp`;
  const json = JSON.stringify(value, null, 2) + "\n";

  fs.writeFileSync(tmpPath, json, "utf8");
  fs.renameSync(tmpPath, filePath);
}

export function appendLine(filePath: string, line: string): void {
  const dir = path.dirname(filePath);
  ensureDir(dir);
  fs.appendFileSync(filePath, line + "\n", "utf8");
}

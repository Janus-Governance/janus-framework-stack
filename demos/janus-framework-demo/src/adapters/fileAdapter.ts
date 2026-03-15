import fs from "fs";
import path from "path";

export interface FileAppender {
  ensureDir(dirPath: string): void;
  appendLine(filePath: string, line: string): void;
}

export class NodeFileAppender implements FileAppender {
  ensureDir(dirPath: string): void {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  appendLine(filePath: string, line: string): void {
    const dir = path.dirname(filePath);
    this.ensureDir(dir);
    fs.appendFileSync(filePath, line + "\n", { encoding: "utf8" });
  }
}

import path from "path";

export const appConfig = {
  // NOTE: This demo is local-only and run via npm scripts from the demo folder.
  // Use process.cwd() so compiled JS under dist/ still resolves the correct data/ paths.
  dataDir: path.join(process.cwd(), "data"),
  sampleCsvPath: path.join(process.cwd(), "data", "sample-questions.csv"),
  auditOutPath: path.join(process.cwd(), "data", "out", "audit-log.jsonl"),
};

export type PromptAction = "create_file";

export interface PromptPayload {
  path: string;
  description: string;
}

export interface BridgePrompt {
  id: string;
  source: string;
  target: string;
  action: PromptAction;
  payload: PromptPayload;
  timestamp: string;
}

export type BridgeResultStatus = "received";

export interface BridgeResult {
  id: string;
  status: BridgeResultStatus;
  handledBy: "janus-bridge";
  timestamp: string;
  summary: string;
  sourcePromptPath: string;
}

export interface BridgeEvent {
  type: "bridge";
  name: "prompt_received" | "result_written";
  actor: "janus-bridge";
  timestamp: string;
  id: string;
}

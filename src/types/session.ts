import type { ISO8601, Status } from './shared';

export type DebugEventType =
  | 'session_running'
  | 'user_message'
  | 'model_request_start'
  | 'model_request_end'
  | 'thinking'
  | 'tool_use'
  | 'tool_result'
  | 'agent_message'
  | 'session_idle'
  | 'session_error';

export interface DebugEvent {
  id: string;
  type: DebugEventType;
  label: string;
  timestamp: string; // mm:ss offset from session start
  payload?: Record<string, unknown>;
}

export interface TranscriptMessage {
  id: string;
  role: 'user' | 'agent';
  content: string;
  timestamp: string; // mm:ss
  durationMs?: number;
  inputTokens?: number;
  outputTokens?: number;
  cacheReadTokens?: number;
  cacheWriteTokens?: number;
}

export interface Session {
  id: string;
  title: string;
  status: Status;
  agentId: string;
  agentName: string;
  environmentId: string;
  environmentName: string;
  vaultIds: string[];
  inputTokens: number;
  outputTokens: number;
  durationMs: number;
  createdAt: ISO8601;
  version: string;
  transcript: TranscriptMessage[];
  events: DebugEvent[];
}

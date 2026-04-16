import type { ISO8601, Status } from './shared';

export interface Credential {
  id: string;
  name: string;
  type: 'OAuth' | 'Bearer token';
  mcpServerName: string;
  mcpServerUrl: string;
  status: Status;
  updatedAt: ISO8601;
}

export interface Vault {
  id: string;
  name: string;
  status: Status;
  createdAt: ISO8601;
  updatedAt: ISO8601;
  credentials: Credential[];
}

export interface McpServerOption {
  id: string;
  name: string;
  url: string;
  initial: string;
  color: string;
}

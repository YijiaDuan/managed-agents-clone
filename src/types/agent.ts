import type { ISO8601, Status } from './shared';

export interface AgentTool {
  name: string;
  category: 'built-in' | 'custom' | 'mcp';
}

export interface AgentMcp {
  id: string;
  name: string;
  url: string;
}

export interface AgentSkill {
  id: string;
  name: string;
  description: string;
}

export interface Agent {
  id: string;
  name: string;
  description: string;
  model: string;
  status: Status;
  version: string;
  systemPrompt: string;
  tools: AgentTool[];
  mcps: AgentMcp[];
  skills: AgentSkill[];
  createdAt: ISO8601;
  updatedAt: ISO8601;
}

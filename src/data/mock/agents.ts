import type { Agent } from '../../types/agent';

export const mockAgents: Agent[] = [
  {
    id: 'agt_01ABCdef1234567890',
    name: 'Agent 1',
    description: 'A general-purpose agent that can research, write code, run commands, and use connected tools to complete the user\'s task end to end.',
    model: 'claude-opus-4-6',
    status: 'active',
    version: 'v3',
    systemPrompt: 'You are a general-purpose agent that can research, write code, run commands, and use connected tools to complete the user\'s task end to end.',
    tools: [{ name: 'agent_toolset_20260401', category: 'built-in' }],
    mcps: [],
    skills: [],
    createdAt: '2026-04-15T10:35:00Z',
    updatedAt: '2026-04-15T11:20:00Z',
  },
  {
    id: 'agt_02XYZghi9876543210',
    name: 'Agent 2',
    description: 'Conducts multi-step web research with source synthesis and citations.',
    model: 'claude-opus-4-6',
    status: 'active',
    version: 'v1',
    systemPrompt: 'You conduct multi-step web research, synthesize findings from multiple sources, and produce well-cited answers. Always include citations with URLs.',
    tools: [
      { name: 'agent_toolset_20260401', category: 'built-in' },
      { name: 'web_search', category: 'built-in' },
    ],
    mcps: [],
    skills: [],
    createdAt: '2026-04-10T09:00:00Z',
    updatedAt: '2026-04-10T09:30:00Z',
  },
  {
    id: 'agt_03MNOpqr1122334455',
    name: 'Agent 3',
    description: 'Scans software blogs for a topic and writes a weekly what-changed brief.',
    model: 'claude-sonnet-4-6',
    status: 'active',
    version: 'v2',
    systemPrompt: 'Each week, scan listed software blogs for the configured topic and produce a concise what-changed brief.',
    tools: [{ name: 'agent_toolset_20260401', category: 'built-in' }],
    mcps: [
      { id: 'mcp_notion', name: 'Notion', url: 'https://mcp.notion.com/mcp' },
    ],
    skills: [],
    createdAt: '2026-04-10T10:08:00Z',
    updatedAt: '2026-04-10T10:08:00Z',
  },
  {
    id: 'agt_04STUvwx5566778899',
    name: 'Agent 4',
    description: 'Answers customer questions from your docs and knowledge base, and escalates when needed.',
    model: 'claude-sonnet-4-6',
    status: 'active',
    version: 'v1',
    systemPrompt: 'Answer customer support questions using the connected knowledge base. Escalate to a human when the answer is not found.',
    tools: [{ name: 'agent_toolset_20260401', category: 'built-in' }],
    mcps: [
      { id: 'mcp_slack', name: 'Slack', url: 'https://mcp.slack.com/mcp' },
    ],
    skills: [],
    createdAt: '2026-04-08T14:00:00Z',
    updatedAt: '2026-04-09T09:00:00Z',
  },
  {
    id: 'agt_05YZAbcd1357924680',
    name: 'Agent 5',
    description: 'Pulls a closed sprint from Linear, synthesizes themes, and writes the retro doc before the meeting.',
    model: 'claude-opus-4-6',
    status: 'archived',
    version: 'v4',
    systemPrompt: 'Read the latest closed sprint, cluster issues by theme, and produce a retro document with celebrations, frictions, and action items.',
    tools: [{ name: 'agent_toolset_20260401', category: 'built-in' }],
    mcps: [
      { id: 'mcp_linear', name: 'Linear', url: 'https://mcp.linear.app/mcp' },
    ],
    skills: [],
    createdAt: '2026-03-20T08:00:00Z',
    updatedAt: '2026-04-01T16:00:00Z',
  },
];

export function getAgent(id: string): Agent | undefined {
  return mockAgents.find((a) => a.id === id);
}

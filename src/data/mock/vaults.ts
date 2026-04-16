import type { Vault, McpServerOption } from '../../types/vault';

export const mockMcpServers: McpServerOption[] = [
  { id: 'mcp_adisinsight', name: 'AdisInsight', url: 'https://adisinsight-mcp.springer.com/mcp', initial: 'A', color: '#1B5E20' },
  { id: 'mcp_aiera', name: 'Aiera', url: 'https://mcp-pub.aiera.com/', initial: 'A', color: '#0D47A1' },
  { id: 'mcp_airtable', name: 'Airtable', url: 'https://mcp.airtable.com/mcp', initial: 'A', color: '#FBBC04' },
  { id: 'mcp_airwallex', name: 'Airwallex Developer', url: 'https://mcp-demo.airwallex.com/developer', initial: 'A', color: '#3F51B5' },
  { id: 'mcp_amplitude', name: 'Amplitude', url: 'https://mcp.amplitude.com/', initial: 'A', color: '#1565C0' },
  { id: 'mcp_asana', name: 'Asana', url: 'https://mcp.asana.com/sse', initial: 'A', color: '#F06A6A' },
  { id: 'mcp_atlassian', name: 'Atlassian', url: 'https://mcp.atlassian.com/v1/sse', initial: 'A', color: '#0052CC' },
  { id: 'mcp_brave', name: 'Brave Search', url: 'https://mcp.brave.com/search', initial: 'B', color: '#FB542B' },
  { id: 'mcp_clickup', name: 'ClickUp', url: 'https://mcp.clickup.com/mcp', initial: 'C', color: '#7B68EE' },
  { id: 'mcp_github', name: 'GitHub', url: 'https://mcp.github.com/mcp', initial: 'G', color: '#181717' },
  { id: 'mcp_gmail', name: 'Gmail', url: 'https://mcp.gmail.com/mcp', initial: 'G', color: '#EA4335' },
  { id: 'mcp_hubspot', name: 'HubSpot', url: 'https://mcp.hubspot.com/mcp', initial: 'H', color: '#FF7A59' },
  { id: 'mcp_linear', name: 'Linear', url: 'https://mcp.linear.app/mcp', initial: 'L', color: '#5E6AD2' },
  { id: 'mcp_notion', name: 'Notion', url: 'https://mcp.notion.com/mcp', initial: 'N', color: '#191919' },
  { id: 'mcp_slack', name: 'Slack', url: 'https://mcp.slack.com/mcp', initial: 'S', color: '#4A154B' },
];

export const mockVaults: Vault[] = [
  {
    id: 'vlt_01EnpYTiG',
    name: 'Vault 1',
    status: 'active',
    createdAt: '2026-04-10T10:08:00Z',
    updatedAt: '2026-04-10T10:09:00Z',
    credentials: [
      {
        id: 'vcrd_pkiRMab',
        name: 'Notion',
        type: 'OAuth',
        mcpServerName: 'Notion',
        mcpServerUrl: 'https://mcp.notion.com/mcp',
        status: 'active',
        updatedAt: '2026-04-10T10:09:00Z',
      },
    ],
  },
  {
    id: 'vlt_02CNvgtd',
    name: 'Vault 2',
    status: 'active',
    createdAt: '2026-04-16T22:00:00Z',
    updatedAt: '2026-04-16T22:00:00Z',
    credentials: [],
  },
  {
    id: 'vlt_03YzbXq8',
    name: 'Vault 3',
    status: 'archived',
    createdAt: '2026-03-15T08:00:00Z',
    updatedAt: '2026-04-01T08:00:00Z',
    credentials: [
      {
        id: 'vcrd_AbCd123',
        name: 'Linear',
        type: 'Bearer token',
        mcpServerName: 'Linear',
        mcpServerUrl: 'https://mcp.linear.app/mcp',
        status: 'archived',
        updatedAt: '2026-04-01T08:00:00Z',
      },
    ],
  },
];

export function getVault(id: string): Vault | undefined {
  return mockVaults.find((v) => v.id === id);
}

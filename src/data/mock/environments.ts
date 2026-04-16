import type { Environment } from '../../types/environment';

export const mockEnvironments: Environment[] = [
  {
    id: 'env_01stVwREv',
    name: 'env-1',
    description: 'Default cloud environment with limited networking.',
    status: 'active',
    type: 'Cloud',
    networking: {
      type: 'Limited',
      allowMcp: false,
      allowPackageManagers: false,
      allowedHosts: [],
    },
    packages: [],
    metadata: {},
    createdAt: '2026-04-10T10:00:00Z',
  },
  {
    id: 'env_02bbF5sq9',
    name: 'env-2',
    description: 'Open networking, package managers enabled.',
    status: 'active',
    type: 'Cloud',
    networking: {
      type: 'Open',
      allowMcp: true,
      allowPackageManagers: true,
      allowedHosts: ['*'],
    },
    packages: [
      { manager: 'pip', values: ['pandas==2.2.0', 'numpy', 'matplotlib'] },
      { manager: 'apt', values: ['ffmpeg'] },
    ],
    metadata: { team: 'research' },
    createdAt: '2026-04-10T10:05:00Z',
  },
  {
    id: 'env_03Sjj87gM',
    name: 'env-3',
    description: 'Restricted environment for production agents.',
    status: 'active',
    type: 'Cloud',
    networking: {
      type: 'Limited',
      allowMcp: true,
      allowPackageManagers: false,
      allowedHosts: ['api.example.com', 'mcp.notion.com'],
    },
    packages: [],
    metadata: { tier: 'prod' },
    createdAt: '2026-04-10T10:08:00Z',
  },
  {
    id: 'env_04grqFxic',
    name: 'env-4',
    description: 'Lightweight env for monitoring agents.',
    status: 'active',
    type: 'Cloud',
    networking: {
      type: 'Limited',
      allowMcp: true,
      allowPackageManagers: false,
      allowedHosts: ['mcp.notion.com'],
    },
    packages: [],
    metadata: {},
    createdAt: '2026-04-10T10:12:00Z',
  },
];

export function getEnvironment(id: string): Environment | undefined {
  return mockEnvironments.find((e) => e.id === id);
}

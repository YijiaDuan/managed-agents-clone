import type { ISO8601, Status } from './shared';

export interface Environment {
  id: string;
  name: string;
  description: string;
  status: Status;
  type: 'Cloud' | 'Self-hosted';
  networking: {
    type: 'Limited' | 'Open';
    allowMcp: boolean;
    allowPackageManagers: boolean;
    allowedHosts: string[];
  };
  packages: { manager: string; values: string[] }[];
  metadata: Record<string, string>;
  createdAt: ISO8601;
}

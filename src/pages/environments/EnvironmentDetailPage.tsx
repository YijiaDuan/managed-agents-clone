import { Link, useParams } from 'react-router-dom';
import { Pencil } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { CopyableId } from '../../components/ui/CopyableId';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { PageContainer } from '../../components/page/PageContainer';
import { getEnvironment } from '../../data/mock/environments';

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[180px,1fr] items-start gap-4 py-2">
      <p className="text-sm text-ink-500">{label}</p>
      <div className="text-sm text-ink-900">{value}</div>
    </div>
  );
}

export function EnvironmentDetailPage() {
  const { envId } = useParams<{ envId: string }>();
  const env = envId ? getEnvironment(envId) : undefined;

  if (!env) {
    return (
      <PageContainer>
        <p className="text-sm text-ink-500">Environment not found.</p>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="mb-2 text-sm text-ink-500">
        <Link to="/environments" className="hover:text-ink-900">Environments</Link>
        <span className="mx-1">/</span>
        <span className="text-ink-900">{env.name}</span>
      </div>

      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold text-ink-900">{env.name}</h1>
            <StatusBadge status={env.status} />
            <span className="inline-flex items-center rounded-md bg-ink-100 px-1.5 py-0.5 text-xs font-medium text-ink-600">
              <span className="mr-1">🌐</span>
            </span>
          </div>
          <div className="mt-1">
            <CopyableId id={env.id} full />
          </div>
        </div>
        <Button variant="secondary" leftIcon={<Pencil size={14} />}>Edit</Button>
      </div>

      <div className="space-y-5">
        <Card className="px-5 py-4">
          <p className="font-medium text-ink-900">Networking</p>
          <p className="mt-0.5 text-xs text-ink-500">Configure network access policies for this environment.</p>
          <div className="mt-3 divide-y divide-ink-100">
            <Field label="Type" value={env.networking.type} />
            <Field
              label="Allow MCP server network access"
              value={env.networking.allowMcp ? 'Enabled' : 'Disabled'}
            />
            <Field
              label="Allow package manager network access"
              value={env.networking.allowPackageManagers ? 'Enabled' : 'Disabled'}
            />
            <Field
              label="Allowed Hosts"
              value={env.networking.allowedHosts.length ? env.networking.allowedHosts.join(', ') : 'None provided'}
            />
          </div>
        </Card>

        <Card className="px-5 py-4">
          <p className="font-medium text-ink-900">Packages</p>
          <p className="mt-0.5 text-xs text-ink-500">Specify packages and their versions available in this environment. Separate multiple values with spaces.</p>
          {env.packages.length === 0 ? (
            <p className="mt-3 text-sm text-ink-500">No packages configured</p>
          ) : (
            <div className="mt-3 space-y-2">
              {env.packages.map((p) => (
                <div key={p.manager} className="flex items-start gap-3 rounded-md border border-ink-200 bg-ink-50 px-3 py-2">
                  <span className="font-mono text-xs font-medium text-ink-900">{p.manager}</span>
                  <span className="font-mono text-xs text-ink-700">{p.values.join('  ')}</span>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card className="px-5 py-4">
          <p className="font-medium text-ink-900">Metadata</p>
          <p className="mt-0.5 text-xs text-ink-500">Add custom key-value pairs to tag and organize this environment. Keys must be lowercase.</p>
          {Object.keys(env.metadata).length === 0 ? (
            <p className="mt-3 text-sm text-ink-500">No metadata</p>
          ) : (
            <div className="mt-3 grid grid-cols-2 gap-2">
              {Object.entries(env.metadata).map(([k, v]) => (
                <div key={k} className="rounded-md border border-ink-200 bg-white px-3 py-2 text-sm">
                  <span className="font-mono text-xs text-ink-500">{k}</span>
                  <span className="ml-2 text-ink-900">{v}</span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </PageContainer>
  );
}

import { Link, useParams } from 'react-router-dom';
import { Globe, Pencil } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { CopyableId } from '../../components/ui/CopyableId';
import { getEnvironment } from '../../data/mock/environments';

function SectionCard({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-ink-200 bg-white px-5 py-4">
      <h2 className="font-semibold text-ink-900">{title}</h2>
      <p className="mt-0.5 text-sm text-ink-500">{description}</p>
      <div className="mt-4 space-y-4 text-sm">{children}</div>
    </section>
  );
}

function StackedField({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p className="text-ink-700">{label}</p>
      <div className="mt-0.5 text-ink-900">{value}</div>
    </div>
  );
}

export function EnvironmentDetailPage() {
  const { envId } = useParams<{ envId: string }>();
  const env = envId ? getEnvironment(envId) : undefined;

  if (!env) {
    return (
      <div className="mx-auto max-w-3xl px-8 py-8">
        <p className="text-sm text-ink-500">Environment not found.</p>
      </div>
    );
  }

  const isUnrestricted = env.networking.type === 'Open';

  return (
    <div className="mx-auto max-w-3xl px-8 pt-6 pb-12">
      <div className="mb-6 text-sm text-ink-500">
        <Link to="/environments" className="hover:text-ink-900">Environments</Link>
        <span className="mx-1.5">/</span>
        <span className="text-ink-900">{env.name}</span>
      </div>

      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold text-ink-900">{env.name}</h1>
            <span className="inline-flex items-center rounded-md border border-ink-200 px-1.5 py-0.5 text-xs text-ink-700">{env.type}</span>
            <Globe size={14} className="text-ink-500" />
          </div>
          <div className="mt-1.5 font-mono text-xs text-ink-500">{env.id}</div>
        </div>
        <Button variant="secondary" leftIcon={<Pencil size={13} />}>Edit</Button>
      </div>

      <div className="space-y-5">
        <SectionCard
          title="Networking"
          description="Configure network access policies for this environment."
        >
          <StackedField label="Type" value={isUnrestricted ? 'Unrestricted' : 'Limited'} />
          {!isUnrestricted ? (
            <>
              <StackedField label="Allow MCP server network access" value={env.networking.allowMcp ? 'Enabled' : 'Disabled'} />
              <StackedField label="Allow package manager network access" value={env.networking.allowPackageManagers ? 'Enabled' : 'Disabled'} />
              <StackedField label="Allowed Hosts" value={env.networking.allowedHosts.length ? env.networking.allowedHosts.join(', ') : 'None provided'} />
            </>
          ) : null}
        </SectionCard>

        <SectionCard
          title="Packages"
          description="Specify packages and their versions available in this environment. Separate multiple values with spaces."
        >
          {env.packages.length === 0 ? (
            <p className="text-ink-500">No packages configured</p>
          ) : (
            env.packages.map((p) => (
              <div key={p.manager} className="flex items-start gap-3 rounded-md border border-ink-200 bg-ink-50 px-3 py-2">
                <span className="font-mono text-xs font-medium text-ink-900">{p.manager}</span>
                <span className="font-mono text-xs text-ink-700">{p.values.join('  ')}</span>
              </div>
            ))
          )}
        </SectionCard>

        <SectionCard
          title="Metadata"
          description="Add custom key-value pairs to tag and organize this environment. Keys must be lowercase."
        >
          {Object.keys(env.metadata).length === 0 ? (
            <p className="text-ink-500">No metadata</p>
          ) : (
            <div className="space-y-1.5">
              {Object.entries(env.metadata).map(([k, v]) => (
                <div key={k} className="rounded-md border border-ink-200 bg-white px-3 py-2 text-sm">
                  <span className="font-mono text-xs text-ink-500">{k}</span>
                  <span className="ml-2 text-ink-900">{v}</span>
                </div>
              ))}
            </div>
          )}
        </SectionCard>

        <p className="pt-2 text-xs text-ink-500">
          <CopyableId id={env.id} full />
        </p>
      </div>
    </div>
  );
}

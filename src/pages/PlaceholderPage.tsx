import { Construction } from 'lucide-react';
import { PageContainer } from '../components/page/PageContainer';
import { PageHeader } from '../components/page/PageHeader';
import { EmptyState } from '../components/ui/EmptyState';

interface Props {
  title: string;
  description?: string;
}

export function PlaceholderPage({ title, description }: Props) {
  return (
    <PageContainer>
      <PageHeader title={title} description={description} />
      <EmptyState
        icon={<Construction size={32} />}
        title="This section is not part of the demo"
        description="Only Managed Agents views are wired up in this clone."
      />
    </PageContainer>
  );
}

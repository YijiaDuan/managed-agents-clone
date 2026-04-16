import { PageContainer } from '../components/page/PageContainer';

export function NotFoundPage() {
  return (
    <PageContainer>
      <h1 className="text-2xl font-semibold text-ink-900">404</h1>
      <p className="mt-2 text-sm text-ink-500">Page not found.</p>
    </PageContainer>
  );
}

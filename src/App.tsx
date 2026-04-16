import { Navigate, Route, Routes } from 'react-router-dom';
import { ConsoleLayout } from './layouts/ConsoleLayout';
import { QuickstartPage } from './pages/QuickstartPage';
import { AgentsListPage } from './pages/agents/AgentsListPage';
import { AgentDetailPage } from './pages/agents/AgentDetailPage';
import { SessionsListPage } from './pages/sessions/SessionsListPage';
import { SessionDetailPage } from './pages/sessions/SessionDetailPage';
import { EnvironmentsListPage } from './pages/environments/EnvironmentsListPage';
import { EnvironmentDetailPage } from './pages/environments/EnvironmentDetailPage';
import { VaultsListPage } from './pages/vaults/VaultsListPage';
import { VaultDetailPage } from './pages/vaults/VaultDetailPage';
import { PlaceholderPage } from './pages/PlaceholderPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  return (
    <Routes>
      <Route element={<ConsoleLayout />}>
        <Route path="/" element={<Navigate to="/quickstart" replace />} />

        <Route path="/quickstart" element={<QuickstartPage />} />

        <Route path="/agents" element={<AgentsListPage />} />
        <Route path="/agents/:agentId" element={<AgentDetailPage />} />

        <Route path="/sessions" element={<SessionsListPage />} />
        <Route path="/sessions/:sessionId" element={<SessionDetailPage />} />

        <Route path="/environments" element={<EnvironmentsListPage />} />
        <Route path="/environments/:envId" element={<EnvironmentDetailPage />} />

        <Route path="/vaults" element={<VaultsListPage />} />
        <Route path="/vaults/:vaultId" element={<VaultDetailPage />} />

        <Route path="/build/workbench" element={<PlaceholderPage title="Workbench" />} />
        <Route path="/build/files" element={<PlaceholderPage title="Files" />} />
        <Route path="/build/skills" element={<PlaceholderPage title="Skills" />} />
        <Route path="/analytics/usage" element={<PlaceholderPage title="Usage" />} />
        <Route path="/analytics/cost" element={<PlaceholderPage title="Cost" />} />
        <Route path="/analytics/logs" element={<PlaceholderPage title="Logs" />} />
        <Route path="/docs" element={<PlaceholderPage title="Documentation" />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

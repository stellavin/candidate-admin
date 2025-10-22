import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout } from '@/components';
import { 
  CandidatesListPage, 
  SettingsPage, 
  NotFoundPage 
} from '@/pages';

/**
 * Application routing configuration.
 * Defines all routes and their corresponding components.
 * @returns {JSX.Element} Configured routes
 */
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Navigate to="/candidates" replace />} />
        <Route path="candidates" element={<CandidatesListPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}


import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout } from '@/components';
import { 
  DashboardPage, 
  CandidatesListPage, 
  SettingsPage, 
  NotFoundPage 
} from '@/pages';

export function AppRoutes() {
  return (
    <Routes>
      {/* Admin routes with layout */}
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="candidates" element={<CandidatesListPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
      
      {/* 404 - outside admin layout to avoid duplicate shell */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}


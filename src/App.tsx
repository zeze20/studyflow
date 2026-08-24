import React, { useState } from 'react';
import { StudyProvider } from './context/StudyContext';
import { Header } from './components/common/Header';
import { DashboardPage } from './pages/DashboardPage';
import { ProfilePage } from './pages/ProfilePage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { useStudy } from './hooks/useStudy';

const MainLayout: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'profile' | 'analytics'>('dashboard');
  const { profile } = useStudy();

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans">
      <Header
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        avatarLetter={profile.avatarLetter}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentPage === 'dashboard' && <DashboardPage />}
        {currentPage === 'analytics' && <AnalyticsPage />}
        {currentPage === 'profile' && <ProfilePage />}
      </main>

      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4">
          StudyFlow Pro © 2026 - Production-Ready Architecture & Netlify Deployment
        </div>
      </footer>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <StudyProvider>
      <MainLayout />
    </StudyProvider>
  );
};

export default App;

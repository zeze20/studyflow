import React from 'react';

interface HeaderProps {
  currentPage: 'dashboard' | 'profile' | 'analytics';
  onNavigate: (page: 'dashboard' | 'profile' | 'analytics') => void;
  avatarLetter: string;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate, avatarLetter }) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate('dashboard')}>
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-md shadow-blue-500/30">
            S
          </div>
          <span className="text-lg font-black tracking-tight text-slate-900">
            Study<span className="text-blue-600">Flow</span> <span className="text-xs font-semibold px-2 py-0.5 bg-blue-50 text-blue-600 border border-blue-200 rounded-full">PRO</span>
          </span>
        </div>

        <nav className="flex items-center space-x-1 sm:space-x-2">
          <button
            onClick={() => onNavigate('dashboard')}
            className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition ${
              currentPage === 'dashboard'
                ? 'bg-blue-50 text-blue-600'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Panel
          </button>
          <button
            onClick={() => onNavigate('analytics')}
            className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition ${
              currentPage === 'analytics'
                ? 'bg-blue-50 text-blue-600'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Analitik
          </button>
          <button
            onClick={() => onNavigate('profile')}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-semibold transition ${
              currentPage === 'profile'
                ? 'bg-blue-50 text-blue-600'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
              {avatarLetter}
            </div>
            <span className="hidden sm:inline">Profil</span>
          </button>
        </nav>
      </div>
    </header>
  );
};

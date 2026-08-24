import React, { useState } from 'react';
import { useStudy } from '../hooks/useStudy';
import { StudySession } from '../interfaces';
import { StudyTable } from '../components/dashboard/StudyTable';
import { StudyFormModal } from '../components/dashboard/StudyFormModal';
import { FilterBar } from '../components/dashboard/FilterBar';
import { StatCard } from '../components/common/StatCard';

export const DashboardPage: React.FC = () => {
  const { filteredSessions, metrics, profile, addSession, updateSession, deleteSession, filters, setFilters } = useStudy();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSession, setEditingSession] = useState<StudySession | null>(null);

  const handleOpenAdd = () => {
    setEditingSession(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (session: StudySession) => {
    setEditingSession(session);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (data: Omit<StudySession, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingSession) {
      updateSession(editingSession.id, data);
    } else {
      addSession(data);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Üst Karşılama ve Hızlı Ekleme */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Hoş Geldin, {profile.fullName} 👋
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Bugünkü hedefin: <span className="font-semibold text-slate-800">{profile.targetDailyMinutes} dk</span> | Tamamlanan: <span className="font-semibold text-blue-600">{metrics.todayMinutes} dk</span>
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-md shadow-blue-500/20 transition-all active:scale-95"
        >
          + Yeni Çalışma Ekle
        </button>
      </div>

      {/* 4'lü Metrik / İstatistik Kartları Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Bugünkü Çalışma"
          value={metrics.todayMinutes}
          unit="dk"
          subtitle={`%${metrics.targetCompletionRate} Hedefe Ulaşıldı`}
          subtitleColor="text-blue-600"
        />
        <StatCard
          title="Haftalık Toplam"
          value={Math.round((metrics.weeklyMinutes / 60) * 10) / 10}
          unit="saat"
          subtitle="Son 7 gün kümülatif"
          subtitleColor="text-slate-500"
        />
        <StatCard
          title="Toplam Oturum"
          value={metrics.totalSessions}
          unit="oturum"
          subtitle={`${metrics.totalMinutes} dk toplam süre`}
          subtitleColor="text-emerald-600"
        />
        <StatCard
          title="Odak Ders"
          value={metrics.topSubject}
          subtitle="En Çok Zaman Ayrılan"
          subtitleColor="text-purple-600"
        />
      </div>

      {/* Filtreleme ve Arama Çubuğu */}
      <FilterBar filters={filters} onFilterChange={setFilters} />

      {/* CRUD Veri Tablosu */}
      <StudyTable
        sessions={filteredSessions}
        onEdit={handleOpenEdit}
        onDelete={deleteSession}
      />

      {/* Ekleme / Güncelleme Modal Penceresi */}
      <StudyFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingSession}
      />
    </div>
  );
};

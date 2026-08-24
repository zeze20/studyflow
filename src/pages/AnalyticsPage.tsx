import React from 'react';
import { useStudy } from '../hooks/useStudy';
import { formatMinutesToHours } from '../utils/formatters';

export const AnalyticsPage: React.FC = () => {
  const { sessions, metrics, profile } = useStudy();

  const subjectStats: Record<string, { minutes: number; count: number }> = {};
  sessions.forEach((s) => {
    if (!subjectStats[s.subject]) {
      subjectStats[s.subject] = { minutes: 0, count: 0 };
    }
    subjectStats[s.subject].minutes += Number(s.durationMinutes);
    subjectStats[s.subject].count += 1;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Detaylı Çalışma Analitiği 📊
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Kategorilere göre süre dağılımları ve verimlilik göstergeleri.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Kategori Dağılımı */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-800">Ders Bazlı Süre Dağılımı</h2>
          <div className="space-y-3">
            {Object.entries(subjectStats).map(([subj, data]) => {
              const percentage = metrics.totalMinutes > 0 ? Math.round((data.minutes / metrics.totalMinutes) * 100) : 0;
              return (
                <div key={subj} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-slate-700">{subj} ({data.count} oturum)</span>
                    <span className="font-bold text-slate-900">{formatMinutesToHours(data.minutes)} (%{percentage})</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
            {Object.keys(subjectStats).length === 0 && (
              <p className="text-sm text-slate-500">Henüz veri bulunmuyor.</p>
            )}
          </div>
        </div>

        {/* Hedef Analizi ve Trend */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-800">Hedef & Odak Durumu</h2>
          <div className="space-y-4 text-sm">
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 flex justify-between items-center">
              <div>
                <div className="font-bold text-blue-900">Günlük Çalışma Hedefi</div>
                <div className="text-blue-700 text-xs mt-0.5">Tanımlanan hedef süre</div>
              </div>
              <div className="text-xl font-black text-blue-900">{profile.targetDailyMinutes} dk</div>
            </div>

            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex justify-between items-center">
              <div>
                <div className="font-bold text-emerald-900">Bugün Ulaşılan Oran</div>
                <div className="text-emerald-700 text-xs mt-0.5">{metrics.todayMinutes} dk tamamlandı</div>
              </div>
              <div className="text-xl font-black text-emerald-900">%{metrics.targetCompletionRate}</div>
            </div>

            <div className="p-4 bg-purple-50 rounded-xl border border-purple-100 flex justify-between items-center">
              <div>
                <div className="font-bold text-purple-900">En Çok Çalışılan Alan</div>
                <div className="text-purple-700 text-xs mt-0.5">Zaman lideri ders</div>
              </div>
              <div className="text-xl font-black text-purple-900">{metrics.topSubject}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { StudySession } from '../../interfaces';

interface StudyTableProps {
  sessions: StudySession[];
  onEdit: (session: StudySession) => void;
  onDelete: (id: string) => void;
}

const getSubjectBadgeColor = (subject: string) => {
  switch (subject) {
    case 'Yazılım':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'Matematik':
      return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'Fizik':
      return 'bg-purple-50 text-purple-700 border-purple-200';
    case 'Siber Güvenlik':
      return 'bg-red-50 text-red-700 border-red-200';
    case 'Veri Bilimi':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    default:
      return 'bg-slate-50 text-slate-700 border-slate-200';
  }
};

export const StudyTable: React.FC<StudyTableProps> = ({ sessions, onEdit, onDelete }) => {
  if (sessions.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-sm">
        <div className="w-14 h-14 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl font-bold">
          ?
        </div>
        <h4 className="text-base font-semibold text-slate-700">Kayıtlı Çalışma Bulunamadı</h4>
        <p className="text-sm text-slate-500 mt-1">
          Kriterlere uygun oturum bulunamadı veya henüz bir kayıt eklenmedi.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
              <th className="py-3.5 px-4">Kategori</th>
              <th className="py-3.5 px-4">Konu & Açıklama</th>
              <th className="py-3.5 px-4 text-center">Süre</th>
              <th className="py-3.5 px-4">Tarih</th>
              <th className="py-3.5 px-4 text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {sessions.map((session) => (
              <tr key={session.id} className="hover:bg-slate-50/60 transition duration-150">
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getSubjectBadgeColor(
                      session.subject
                    )}`}
                  >
                    {session.subject}
                  </span>
                </td>
                <td className="py-3.5 px-4 max-w-xs md:max-w-md">
                  <div className="font-medium text-slate-900 truncate">{session.topic}</div>
                  {session.notes && (
                    <div className="text-xs text-slate-500 truncate mt-0.5">{session.notes}</div>
                  )}
                </td>
                <td className="py-3.5 px-4 text-center whitespace-nowrap">
                  <span className="font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md text-xs">
                    {session.durationMinutes} dk
                  </span>
                </td>
                <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap text-xs">
                  {session.date}
                </td>
                <td className="py-3.5 px-4 text-right whitespace-nowrap space-x-2">
                  <button
                    onClick={() => onEdit(session)}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-2.5 py-1 rounded transition"
                  >
                    Düzenle
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`"${session.topic}" kaydını silmek istediğinize emin misiniz?`)) {
                        onDelete(session.id);
                      }
                    }}
                    className="text-xs font-semibold text-red-600 hover:text-red-800 hover:bg-red-50 px-2.5 py-1 rounded transition"
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

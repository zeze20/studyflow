import React, { useState, useEffect } from 'react';
import { StudySession, SubjectCategory } from '../../interfaces';
import { validateSessionForm } from '../../utils/validators';

interface StudyFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<StudySession, 'id' | 'createdAt' | 'updatedAt'>) => void;
  initialData?: StudySession | null;
}

const SUBJECT_OPTIONS: SubjectCategory[] = [
  'Yazılım',
  'Matematik',
  'Fizik',
  'Siber Güvenlik',
  'Veri Bilimi',
  'Diğer',
];

export const StudyFormModal: React.FC<StudyFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [subject, setSubject] = useState<SubjectCategory>('Yazılım');
  const [topic, setTopic] = useState('');
  const [durationMinutes, setDurationMinutes] = useState(45);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setSubject(initialData.subject);
      setTopic(initialData.topic);
      setDurationMinutes(initialData.durationMinutes);
      setDate(initialData.date);
      setNotes(initialData.notes || '');
    } else {
      setSubject('Yazılım');
      setTopic('');
      setDurationMinutes(45);
      setDate(new Date().toISOString().split('T')[0]);
      setNotes('');
    }
    setError('');
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateSessionForm(topic, durationMinutes);
    if (validationError) {
      setError(validationError);
      return;
    }

    onSubmit({
      subject,
      topic: topic.trim(),
      durationMinutes: Number(durationMinutes),
      date,
      notes: notes.trim(),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-100 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <h3 className="text-lg font-bold text-slate-800">
            {initialData ? 'Çalışma Kaydını Güncelle' : 'Yeni Çalışma Oturumu Ekle'}
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-xl font-bold p-1 rounded-lg"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 text-sm text-red-700 bg-red-50 rounded-lg border border-red-200">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Ders / Kategori
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value as SubjectCategory)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                {SUBJECT_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Süre (Dakika)
              </label>
              <input
                type="number"
                min="1"
                max="1440"
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Çalışılan Konu & Başlık
            </label>
            <input
              type="text"
              placeholder="Örn: React Hooks & State Yönetimi"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Tarih
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Notlar & Özet (Opsiyonel)
            </label>
            <textarea
              rows={3}
              placeholder="Kritik algoritmalar, çözülen soru adedi veya dokümantasyon notları..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition"
            >
              Vazgeç
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition"
            >
              {initialData ? 'Değişiklikleri Kaydet' : 'Oturumu Ekle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

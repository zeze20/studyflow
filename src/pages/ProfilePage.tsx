import React, { useState } from 'react';
import { useStudy } from '../hooks/useStudy';
import { SubjectCategory } from '../interfaces';

export const ProfilePage: React.FC = () => {
  const { profile, updateProfile } = useStudy();
  const [fullName, setFullName] = useState(profile.fullName);
  const [email, setEmail] = useState(profile.email);
  const [targetDailyMinutes, setTargetDailyMinutes] = useState(profile.targetDailyMinutes);
  const [primarySubject, setPrimarySubject] = useState<SubjectCategory>(profile.primarySubject);
  const [bio, setBio] = useState(profile.bio || '');
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      fullName: fullName.trim(),
      email: email.trim(),
      targetDailyMinutes: Number(targetDailyMinutes),
      primarySubject,
      bio: bio.trim(),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-slate-100 pb-8">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-4xl font-black shadow-lg shadow-blue-500/30 ring-4 ring-blue-50">
            {profile.avatarLetter}
          </div>
          <div className="text-center sm:text-left flex-1">
            <h1 className="text-2xl font-black text-slate-900">{profile.fullName}</h1>
            <p className="text-sm text-slate-500 mt-0.5">{profile.email}</p>
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start mt-3">
              <span className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-xs font-semibold">
                Hedef Ders: {profile.primarySubject}
              </span>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-semibold">
                Hedef: {profile.targetDailyMinutes} dk / gün
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {saved && (
            <div className="p-3 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl">
              Profil ve çalışma hedefleri başarıyla güncellendi.
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Ad Soyad</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">E-Posta</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Günlük Hedef Süre (Dakika)</label>
              <input
                type="number"
                min="10"
                max="1440"
                value={targetDailyMinutes}
                onChange={(e) => setTargetDailyMinutes(Number(e.target.value))}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Birincil Hedef Alan</label>
              <select
                value={primarySubject}
                onChange={(e) => setPrimarySubject(e.target.value as SubjectCategory)}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
              >
                <option value="Yazılım">Yazılım</option>
                <option value="Matematik">Matematik</option>
                <option value="Fizik">Fizik</option>
                <option value="Siber Güvenlik">Siber Güvenlik</option>
                <option value="Veri Bilimi">Veri Bilimi</option>
                <option value="Diğer">Diğer</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Hakkında / Biyografi</label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            />
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-md transition"
            >
              Profili Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

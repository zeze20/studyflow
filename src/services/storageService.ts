import { StudySession, UserProfile } from '../interfaces';
import { IStorageAdapter } from '../interfaces/storage';

const STORAGE_KEYS = {
  SESSIONS: 'studyflow_sessions_v1',
  PROFILE: 'studyflow_profile_v1',
};

const INITIAL_PROFILE: UserProfile = {
  id: 'usr_default_01',
  fullName: 'Emre İlksöz',
  email: 'emre@studyflow.local',
  targetDailyMinutes: 180,
  primarySubject: 'Yazılım',
  avatarLetter: 'E',
  bio: 'Full-Stack Web ve Güvenlik Odaklı Yazılım Geliştirici.',
};

const INITIAL_SESSIONS: StudySession[] = [
  {
    id: 'ses_170001',
    subject: 'Yazılım',
    topic: 'React Context API ve State Mimarisi',
    durationMinutes: 90,
    date: new Date().toISOString().split('T')[0],
    notes: 'Kapsamlı durum yönetimi ve TypeScript entegrasyonu tamamlandı.',
    createdAt: Date.now() - 3600000 * 4,
    updatedAt: Date.now() - 3600000 * 4,
  },
  {
    id: 'ses_170002',
    subject: 'Matematik',
    topic: 'Lineer Cebir & Matris Dönüşümleri',
    durationMinutes: 60,
    date: new Date().toISOString().split('T')[0],
    notes: 'Big-O optimizasyonu ve karmaşık hesaplamalar incelendi.',
    createdAt: Date.now() - 3600000 * 2,
    updatedAt: Date.now() - 3600000 * 2,
  },
  {
    id: 'ses_170003',
    subject: 'Siber Güvenlik',
    topic: 'XSS ve CORS Origin Güvenlik Politikaları',
    durationMinutes: 45,
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    notes: 'Tarayıcı güvenlik önlemleri ve HTTPs Only çerez protokolleri.',
    createdAt: Date.now() - 86400000,
    updatedAt: Date.now() - 86400000,
  },
];

export const StorageService: IStorageAdapter = {
  getSessions(): StudySession[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.SESSIONS);
      if (!raw) {
        this.saveSessions(INITIAL_SESSIONS);
        return INITIAL_SESSIONS;
      }
      return JSON.parse(raw) as StudySession[];
    } catch (error) {
      console.error('[StorageService] Çalışma oturumları okunamadı:', error);
      return INITIAL_SESSIONS;
    }
  },

  saveSessions(sessions: StudySession[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
    } catch (error) {
      console.error('[StorageService] Çalışma oturumları kaydedilemedi:', error);
    }
  },

  getProfile(): UserProfile {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (!raw) {
        this.saveProfile(INITIAL_PROFILE);
        return INITIAL_PROFILE;
      }
      return JSON.parse(raw) as UserProfile;
    } catch (error) {
      console.error('[StorageService] Profil okunamadı:', error);
      return INITIAL_PROFILE;
    }
  },

  saveProfile(profile: UserProfile): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    } catch (error) {
      console.error('[StorageService] Profil kaydedilemedi:', error);
    }
  },
};

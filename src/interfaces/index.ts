export type SubjectCategory = 'Yazılım' | 'Matematik' | 'Fizik' | 'Siber Güvenlik' | 'Veri Bilimi' | 'Diğer';

export interface StudySession {
  id: string;
  subject: SubjectCategory;
  topic: string;
  durationMinutes: number;
  date: string; // YYYY-MM-DD formatında ISO string
  notes?: string;
  createdAt: number;
  updatedAt: number;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  targetDailyMinutes: number;
  primarySubject: SubjectCategory;
  avatarLetter: string;
  bio?: string;
}

export interface StatMetrics {
  totalMinutes: number;
  totalSessions: number;
  todayMinutes: number;
  weeklyMinutes: number;
  topSubject: string;
  targetCompletionRate: number; // Yüzde 0 - 100
}

export interface FilterOptions {
  searchTerm: string;
  selectedSubject: string;
  startDate: string;
  endDate: string;
  sortBy: 'date' | 'durationMinutes' | 'subject';
  sortOrder: 'asc' | 'desc';
}

export type StudyAction =
  | { type: 'SET_SESSIONS'; payload: StudySession[] }
  | { type: 'ADD_SESSION'; payload: StudySession }
  | { type: 'UPDATE_SESSION'; payload: StudySession }
  | { type: 'DELETE_SESSION'; payload: string }
  | { type: 'SET_PROFILE'; payload: UserProfile }
  | { type: 'SET_FILTERS'; payload: Partial<FilterOptions> };

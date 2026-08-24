import { StudySession, UserProfile } from './index';

export interface IStorageAdapter {
  getSessions(): StudySession[];
  saveSessions(sessions: StudySession[]): void;
  getProfile(): UserProfile;
  saveProfile(profile: UserProfile): void;
}

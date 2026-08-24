import React, { createContext, useEffect, useReducer, useMemo } from 'react';
import { StudySession, UserProfile, StatMetrics, FilterOptions, StudyAction } from '../interfaces';
import { StorageService } from '../services/storageService';

export interface StudyContextType {
  sessions: StudySession[];
  filteredSessions: StudySession[];
  profile: UserProfile;
  metrics: StatMetrics;
  filters: FilterOptions;
  addSession: (session: Omit<StudySession, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateSession: (id: string, session: Partial<StudySession>) => void;
  deleteSession: (id: string) => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  setFilters: (filters: Partial<FilterOptions>) => void;
  resetFilters: () => void;
}

interface State {
  sessions: StudySession[];
  profile: UserProfile;
  filters: FilterOptions;
}

const initialFilters: FilterOptions = {
  searchTerm: '',
  selectedSubject: 'ALL',
  startDate: '',
  endDate: '',
  sortBy: 'date',
  sortOrder: 'desc',
};

const initialState: State = {
  sessions: [],
  profile: StorageService.getProfile(),
  filters: initialFilters,
};

function studyReducer(state: State, action: StudyAction): State {
  switch (action.type) {
    case 'SET_SESSIONS':
      return { ...state, sessions: action.payload };
    case 'ADD_SESSION': {
      const updated = [action.payload, ...state.sessions];
      StorageService.saveSessions(updated);
      return { ...state, sessions: updated };
    }
    case 'UPDATE_SESSION': {
      const updated = state.sessions.map((s) =>
        s.id === action.payload.id ? { ...action.payload, updatedAt: Date.now() } : s
      );
      StorageService.saveSessions(updated);
      return { ...state, sessions: updated };
    }
    case 'DELETE_SESSION': {
      const updated = state.sessions.filter((s) => s.id !== action.payload);
      StorageService.saveSessions(updated);
      return { ...state, sessions: updated };
    }
    case 'SET_PROFILE': {
      StorageService.saveProfile(action.payload);
      return { ...state, profile: action.payload };
    }
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    default:
      return state;
  }
}

export const StudyContext = createContext<StudyContextType | undefined>(undefined);

export const StudyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(studyReducer, initialState);

  useEffect(() => {
    const loadedSessions = StorageService.getSessions();
    const loadedProfile = StorageService.getProfile();
    dispatch({ type: 'SET_SESSIONS', payload: loadedSessions });
    dispatch({ type: 'SET_PROFILE', payload: loadedProfile });
  }, []);

  const addSession = (data: Omit<StudySession, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newSession: StudySession = {
      ...data,
      id: 'ses_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 5),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    dispatch({ type: 'ADD_SESSION', payload: newSession });
  };

  const updateSession = (id: string, updates: Partial<StudySession>) => {
    const target = state.sessions.find((s) => s.id === id);
    if (!target) return;
    const updated: StudySession = { ...target, ...updates, updatedAt: Date.now() };
    dispatch({ type: 'UPDATE_SESSION', payload: updated });
  };

  const deleteSession = (id: string) => {
    dispatch({ type: 'DELETE_SESSION', payload: id });
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    const updated = { ...state.profile, ...updates };
    if (updates.fullName && updates.fullName.length > 0) {
      updated.avatarLetter = updates.fullName.charAt(0).toUpperCase();
    }
    dispatch({ type: 'SET_PROFILE', payload: updated });
  };

  const setFilters = (filters: Partial<FilterOptions>) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  };

  const resetFilters = () => {
    dispatch({ type: 'SET_FILTERS', payload: initialFilters });
  };

  const filteredSessions = useMemo(() => {
    return state.sessions
      .filter((s) => {
        const matchesTerm =
          state.filters.searchTerm === '' ||
          s.topic.toLowerCase().includes(state.filters.searchTerm.toLowerCase()) ||
          (s.notes && s.notes.toLowerCase().includes(state.filters.searchTerm.toLowerCase()));
        const matchesSubject =
          state.filters.selectedSubject === 'ALL' || s.subject === state.filters.selectedSubject;
        const matchesStart = !state.filters.startDate || s.date >= state.filters.startDate;
        const matchesEnd = !state.filters.endDate || s.date <= state.filters.endDate;
        return matchesTerm && matchesSubject && matchesStart && matchesEnd;
      })
      .sort((a, b) => {
        const factor = state.filters.sortOrder === 'asc' ? 1 : -1;
        if (state.filters.sortBy === 'date') return (a.date.localeCompare(b.date)) * factor;
        if (state.filters.sortBy === 'durationMinutes') return (a.durationMinutes - b.durationMinutes) * factor;
        return (a.subject.localeCompare(b.subject)) * factor;
      });
  }, [state.sessions, state.filters]);

  const metrics = useMemo<StatMetrics>(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    const sevenDaysAgo = new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0];

    const totalMinutes = state.sessions.reduce((acc, s) => acc + Number(s.durationMinutes), 0);
    const totalSessions = state.sessions.length;

    const todayMinutes = state.sessions
      .filter((s) => s.date === todayStr)
      .reduce((acc, s) => acc + Number(s.durationMinutes), 0);

    const weeklyMinutes = state.sessions
      .filter((s) => s.date >= sevenDaysAgo)
      .reduce((acc, s) => acc + Number(s.durationMinutes), 0);

    const subjectCounts: Record<string, number> = {};
    state.sessions.forEach((s) => {
      subjectCounts[s.subject] = (subjectCounts[s.subject] || 0) + Number(s.durationMinutes);
    });

    let topSubject = 'Yok';
    let maxMin = 0;
    Object.entries(subjectCounts).forEach(([subj, min]) => {
      if (min > maxMin) {
        maxMin = min;
        topSubject = subj;
      }
    });

    const target = state.profile.targetDailyMinutes || 180;
    const targetCompletionRate = Math.min(100, Math.round((todayMinutes / target) * 100));

    return {
      totalMinutes,
      totalSessions,
      todayMinutes,
      weeklyMinutes,
      topSubject,
      targetCompletionRate,
    };
  }, [state.sessions, state.profile]);

  return (
    <StudyContext.Provider
      value={{
        sessions: state.sessions,
        filteredSessions,
        profile: state.profile,
        metrics,
        filters: state.filters,
        addSession,
        updateSession,
        deleteSession,
        updateProfile,
        setFilters,
        resetFilters,
      }}
    >
      {children}
    </StudyContext.Provider>
  );
};

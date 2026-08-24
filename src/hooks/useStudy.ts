import { useContext } from 'react';
import { StudyContext, StudyContextType } from '../context/StudyContext';

export const useStudy = (): StudyContextType => {
  const context = useContext(StudyContext);
  if (!context) {
    throw new Error('useStudy, StudyProvider sarmalayıcısı içerisinde çağrılmalıdır.');
  }
  return context;
};

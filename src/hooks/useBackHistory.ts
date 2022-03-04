import { useCallback } from 'react';
import customHistory from '../config/history';

const useBackHistory = (): (() => void) => {
  return useCallback(() => {
    customHistory.back();
  }, []);
};

export default useBackHistory;

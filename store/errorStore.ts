import { create } from 'zustand';

type ErrorStore = {
  error: string;
  setError: (_error: string) => void;
};

export const useErrorStore = create<ErrorStore>()(set => {
  return {
    error: '',
    setError: (error: string) => {
      return set(() => {
        return {
          error,
        };
      });
    },
  };
});

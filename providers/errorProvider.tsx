'use client';

import React, { createContext, useState } from 'react';
import type { Dispatch } from 'react';

type ErrorContextType = {
  error: string;
  setError: Dispatch<string>;
};

export const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export default function ErrorProvider({ children }: { children: React.ReactNode }) {
  const [error, setError] = useState<string>('');

  return <ErrorContext.Provider value={{ error, setError }}>{children}</ErrorContext.Provider>;
}

export function useError() {
  const context = React.useContext(ErrorContext);
  if (context === undefined) {
    throw new Error('useError must be used within a ErrorProvider');
  }
  return context;
}

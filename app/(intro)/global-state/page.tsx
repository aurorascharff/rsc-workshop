import React from 'react';
import ErrorProvider from '@/providers/ErrorProvider';
import Error from './_components/Error';

export default function GlobalStatePage() {
  // We can wrap a React Context provider around server components without converting them to client components
  // Or, we can use a global store like Zustand
  return (
    <>
      <h1>Global State</h1>
      <ErrorProvider>
        <Error />
      </ErrorProvider>
    </>
  );
}

import React from 'react';
import ErrorProvider from '@/providers/errorProvider';
import Error from './_components/Error';

export default function GlobalState() {
  // We can wrap a React Context provider around server components without converting them to client components
  // Or, we can use a global store like Zustand
  return (
    <div className="flex flex-col gap-8">
      <h1>Global State</h1>
      <ErrorProvider>
        <Error />
      </ErrorProvider>
    </div>
  );
}

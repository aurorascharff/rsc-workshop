'use client';

import React from 'react';
import Button from '@/components/ui/Button';
import { useError } from '@/providers/errorProvider';
import { useErrorStore } from '@/store/errorStore';

export default function Error() {
  // Use provider or store from any client component
  const { error, setError } = useError();
  const { error: zustandError, setError: setErrorZustand } = useErrorStore();

  return (
    <>
      <div className="flex gap-4">
        Error from provider context: {error}
        <Button
          onClick={() => {
            return setError('Error');
          }}
        >
          Create error
        </Button>
      </div>
      <div className="flex gap-4">
        Error from Zustand store: {zustandError}
        <Button
          onClick={() => {
            return setErrorZustand('Error');
          }}
        >
          Create error
        </Button>
      </div>
    </>
  );
}

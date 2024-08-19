'use client';

import React, { useTransition } from 'react';
import { createEmptyContact } from '@/lib/actions/createEmptyContact';
import Button from './ui/Button';

export default function NewContactButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      disabled={isPending}
      theme="secondary"
      onClick={() => {
        startTransition(async () => {
          await createEmptyContact();
        });
      }}
      type="submit"
    >
      {isPending ? 'Creating...' : 'New'}
    </Button>
  );
}

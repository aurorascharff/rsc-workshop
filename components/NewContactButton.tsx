'use client';

import React, { useTransition } from 'react';
import { createEmptyContact } from '@/lib/actions/createEmptyContact';
import Button from './Button';

export default function NewContactButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      theme="secondary"
      onClick={() => {
        startTransition(() => {
          createEmptyContact();
        });
      }}
      disabled={isPending}
      type="submit"
    >
      New
    </Button>
  );
}

'use client';

import React, { useTransition } from 'react';
import { deleteContact } from '../lib/actions/deleteContact';
import Button from './Button';

export default function DeleteContactButton({ contactId }: { contactId: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      theme="destroy"
      disabled={isPending}
      onClick={() => {
        const response = confirm('Please confirm you want to delete this record.');
        if (!response) {
          return;
        }
        startTransition(() => {
          deleteContact(contactId);
        });
      }}
    >
      {isPending ? 'Deleting...' : 'Delete'}
    </Button>
  );
}

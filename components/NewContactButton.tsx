'use client';

import React from 'react';
import { createEmptyContact } from '@/lib/actions/createEmptyContact';
import Button from './ui/Button';

export default function NewContactButton() {
  return (
    <Button
      theme="secondary"
      onClick={async () => {
        await createEmptyContact();
      }}
      type="submit"
    >
      New
    </Button>
  );
}

'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import Button from '@/components/ui/Button';

export default function BackButton() {
  const router = useRouter();

  return (
    <Button
      theme="ghost"
      onClick={() => {
        router.back();
      }}
    >
      Back
    </Button>
  );
}

'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useTransition } from 'react';
import Button from '@/components/ui/Button';

export default function TransitionButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [count, setCount] = useState(0);

  return (
    <>
      {count}
      <Button
        disabled={isPending}
        theme="secondary"
        onClick={() => {
          // Mark a state update as a transition and track the pending state
          startTransition(() => {
            setCount(count + 1);
            router.push('/intro/transitions/slow');
          });
        }}
      >
        {isPending ? 'Loading...' : 'Go to slow page'}
      </Button>
    </>
  );
}

'use client';

import React, { useState, useTransition } from 'react';
import Button from '@/components/ui/Button';

function SlowComponent() {
  const startTime = performance.now();
  while (performance.now() - startTime < 1) {
    // Do nothing for 1 ms per item to emulate extremely slow code
  }
  return <div>Slow Component</div>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const items: any[] = [];
for (let i = 0; i < 500; i++) {
  items.push(<SlowComponent />);
}

export default function TransitionsPage() {
  const [tab, setTab] = useState(1);
  const [isPending, startTransition] = useTransition();
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Transitions</h1>
      {count}
      <div className="flex gap-4">
        <Button
          onClick={() => {
            setTab(1);
          }}
        >
          Tab 1 {tab === 1 && '(Active)'}
        </Button>
        <Button
          onClick={() => {
            setTab(2);
          }}
        >
          Tab 2 {tab === 2 && '(Active)'}
        </Button>
        <Button
          className={isPending ? 'opacity-50' : ''}
          onClick={() => {
            startTransition(() => {
              setTab(3);
              // Count will update once all state updates inside the transition complete, allowing them to be batched
              setCount(count => {
                return count + 1;
              });
            });
          }}
        >
          Tab 3 {tab === 3 && '(Active)'}
        </Button>
      </div>
      {tab === 1 && <div>Tab 1 Content</div>}
      {tab === 2 && <div>Tab 2 Content</div>}
      {tab === 3 && (
        <div>
          Tab 3 Content
          {items}
        </div>
      )}
    </>
  );
}

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

export default function TransitionsPage() {
  const [tab, setTab] = useState(1);
  const [isPending, startTransition] = useTransition();
  const [count, setCount] = useState(0);

  const items = [];
  for (let i = 0; i < 500; i++) {
    items.push(<SlowComponent />);
  }

  const onTabChange = (tab: number) => {
    // Without startTransition, the UI will freeze while the slow component is rendering
    startTransition(() => {
      setTab(tab);
      // Count will update once all state updates inside the transition complete, allowing them to be batched
      setCount(count => {
        return count + 1;
      });
    });
  };

  return (
    <>
      <h1>Transitions</h1>
      {count}
      <div className="flex gap-4">
        <Button
          onClick={() => {
            onTabChange(1);
          }}
        >
          Tab 1 {tab === 1 && '(Active)'}
        </Button>
        <Button
          onClick={() => {
            onTabChange(2);
          }}
        >
          Tab 2 {tab === 2 && '(Active)'}
        </Button>
        <Button
          className={isPending ? 'opacity-50' : ''}
          onClick={() => {
            onTabChange(3);
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

import React, { Suspense } from 'react';
import { slow } from '@/utils/slow';

async function SlowComponent() {
  await slow();

  return <div>SlowComponent</div>;
}

export default async function SlowPage() {
  // While we are awaiting this, loading.tsx displays
  await slow();

  // While we are awaiting the slow component, the fallback is displayed
  return (
    <div>
      SlowPage
      <Suspense fallback={<div>Loading slow component..</div>}>
        <SlowComponent />
      </Suspense>
    </div>
  );
}

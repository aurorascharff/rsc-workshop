import React, { Suspense } from 'react';
import { slow } from '@/utils/slow';
import SlowComponent from '../_components/SlowComponent';

export default async function SlowPage() {
  await slow();

  return (
    <div>
      SlowPage
      <Suspense fallback={<div>Loading slow component..</div>}>
        <SlowComponent />
      </Suspense>
    </div>
  );
}

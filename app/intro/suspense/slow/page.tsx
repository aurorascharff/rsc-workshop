import React, { Suspense } from 'react';
import SlowComponent from '../_components/SlowComponent';

export default async function SlowPage() {
  await new Promise(resolve => {
    return setTimeout(resolve, 1000);
  });

  return (
    <div>
      SlowPage
      <Suspense fallback={<div>Loading slow component..</div>}>
        <SlowComponent />
      </Suspense>
    </div>
  );
}

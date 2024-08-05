import { Suspense } from 'react';

import { slow } from '@/utils/slow';
import ClientComponent from './_components/ClientComponent';

async function getData(delay?: number) {
  await slow(delay);
  return 2000;
}

async function SlowComponent({ data }: { data: number }) {
  const innerData = await getData(1000);

  return (
    <div>
      SlowComponent {data} {innerData}
    </div>
  );
}

export default async function DataFetchingPage() {
  // getData(1000) will run first, then getData(2000)
  let data1 = await getData(1000);
  let data2 = await getData(data1); // waterfall because data2 depends on data1
  console.log('Sequential, time: ' + new Date().getSeconds());

  // getData(1000) and getData(2000) will run in parallel
  [data1, data2] = await Promise.all([getData(1000), getData(2000)]);
  console.log('Parallell, time: ' + new Date().getSeconds());

  // Pass down promise to suspended client component
  // Can do this to a server comp and await but rather just fetch inside it for composition
  const dataPromise = getData(1000);

  return (
    <div className="flex flex-col gap-8">
      <h1>Data Fetching</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <SlowComponent data={data1} />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <SlowComponent data={data2} />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <ClientComponent dataPromise={dataPromise} />
      </Suspense>
    </div>
  );
}

/* eslint-disable autofix/no-unused-vars */
import { Suspense } from 'react';
import { slow } from '@/utils/slow';
import ClientComponent from './_components/ClientComponent';

async function getData(delay: number) {
  await slow(delay);
  return delay;
}

async function FirstComponent() {
  const delay = await getData(1000);

  // Sequential fetching. SecondComponent will not start fetching until FirstComponent is done.
  return (
    <div>
      FirstComponent
      <Suspense fallback={<div>Loading...</div>}>
        <SecondComponent />
      </Suspense>
      {delay}
    </div>
  );
}

async function SecondComponent() {
  const delay = await getData(2000);

  return <div>SecondComponent {delay}</div>;
}

export default async function DataFetchingPage() {
  // console.log('Start time: ' + new Date().getSeconds());

  // // First, getData(1000) will run, then getData(1000)
  // let data1 = await getData(1000);
  // let data2 = await getData(data1); // Has to be a fetch waterfall because data2 depends on data1
  // console.log('Sequential, time: ' + new Date().getSeconds());

  // // Functions getData(1000) and getData(1000) will run in parallel
  // [data1, data2] = await Promise.all([getData(1000), getData(1000)]);
  // console.log('Parallell, time: ' + new Date().getSeconds());

  // Pass down promise to suspended client component
  // Can do this also to a server comp with await, but its better to just fetch inside the server comp
  const dataPromise = getData(3000);

  // Paralell fetching with suspense. If a suspense wraps the component, it will wait for all promises to resolve, like promise.all().
  return (
    <>
      <h1>Data Fetching</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <FirstComponent />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <SecondComponent />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <ClientComponent dataPromise={dataPromise} />
      </Suspense>
    </>
  );
}

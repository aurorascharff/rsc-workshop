'use client';

import React, { use } from 'react';

type Props = {
  dataPromise: Promise<number>;
};

export default function ClientComponent({ dataPromise }: Props) {
  const data = use(dataPromise);
  console.log('Client component resolved promise: ' + new Date().getSeconds());

  return <div>ClientComponent {data}</div>;
}

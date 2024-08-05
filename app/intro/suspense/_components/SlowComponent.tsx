import React from 'react';
import { slow } from '@/utils/slow';

export default async function SlowComponent() {
  await slow();

  return <div>SlowComponent</div>;
}

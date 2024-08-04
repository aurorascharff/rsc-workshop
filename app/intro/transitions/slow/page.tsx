import React from 'react';

export default async function SlowPage() {
  await new Promise(resolve => {
    return setTimeout(resolve, 1000);
  });

  return <div>SlowPage</div>;
}

import React from 'react';

export default async function SlowComponent() {
  await new Promise(resolve => {
    return setTimeout(resolve, 1000);
  });

  return <div>SlowComponent</div>;
}

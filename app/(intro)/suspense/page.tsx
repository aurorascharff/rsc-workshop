import React from 'react';
import LinkButton from '@/components/ui/LinkButton';

export default function SuspensePage() {
  return (
    <>
      <h1>Suspense</h1>
      <LinkButton href="/suspense/slow">Slow page</LinkButton>
    </>
  );
}

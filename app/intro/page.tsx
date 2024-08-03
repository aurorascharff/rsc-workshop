import Link from 'next/link';
import React from 'react';
import ServerComponent from '@/app/intro/_components/ServerComponent';
import ClientComponent from './_components/ClientComponent';

export default function IntroPage() {
  return (
    <div className="flex flex-col gap-4">
      Client and Server Components
      <ClientComponent content={<ServerComponent />}>
        <ServerComponent />
      </ClientComponent>
      <Link href="/intro/transitions">Transitions</Link>
      <Link href="/intro/suspense">Suspense</Link>
    </div>
  );
}

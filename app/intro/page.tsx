import React from 'react';
import ServerComponent from '@/app/intro/_components/ServerComponent';
import ClientComponent from './_components/ClientComponent';

export default function IntroPage() {
  return (
    <div className="flex flex-col gap-4">
      <ClientComponent content={<ServerComponent />}>
        <ServerComponent />
      </ClientComponent>
    </div>
  );
}

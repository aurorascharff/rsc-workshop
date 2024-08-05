import React from 'react';
import ClientComponent from './_components/ClientComponent';
import ServerComponent from './_components/ServerComponent';

export default function ClientServerPage() {
  return (
    <>
      <h1>Client and Server Components</h1>
      <ClientComponent content={<ServerComponent />}>
        <ServerComponent />
      </ClientComponent>
    </>
  );
}

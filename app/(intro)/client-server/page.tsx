import React from 'react';
import { prisma } from '@/db';
import ClientComponent from './_components/ClientComponent';
import ServerComponent from './_components/ServerComponent';

export default function ClientServerPage() {
  // The function will have a hidden API endpoint created and can be called from the client
  async function mutateData(): Promise<string> {
    'use server';

    const data = await prisma.contact.findMany();
    return data[0].id;
  }

  // We can wrap our client component around server components without converting them to client components
  return (
    <>
      <h1>Client and Server Components</h1>
      <ClientComponent mutateData={mutateData} content={<ServerComponent />}>
        <ServerComponent />
      </ClientComponent>
    </>
  );
}

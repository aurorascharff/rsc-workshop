import React from 'react';
import { prisma } from '@/db';

export default async function ServerComponent() {
  console.log('ServerComponent');

  const data = await prisma.contact.findMany();

  return <div className="border-2 border-blue-500 p-4">ServerComponent {data[0].id}</div>;
}

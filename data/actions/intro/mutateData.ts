'use server';

import { prisma } from '@/db';

// The function will have a hidden API endpoint created and can be called from the client
export async function mutateData(): Promise<string> {
  const data = await prisma.contact.findMany();
  return data[0].id;
}

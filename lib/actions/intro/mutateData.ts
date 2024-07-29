'use server';

import { prisma } from '@/db';

export async function mutateData(): Promise<string> {
  const data = await prisma.contact.findMany();
  return data[0].id;
}

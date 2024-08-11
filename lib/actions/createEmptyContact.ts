'use server';

import { prisma } from '@/db';
import { slow } from '@/utils/slow';

export async function createEmptyContact() {
  await slow();

  return prisma.contact.create({
    data: {},
  });
}

'use server';

import { prisma } from '@/db';
import { slow } from '@/utils/slow';

export async function deleteContact(contactId: string) {
  await slow();

  return prisma.contact.delete({
    where: {
      id: contactId,
    },
  });
}

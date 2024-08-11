'use server';

import { prisma } from '@/db';
import { slow } from '@/utils/slow';

export async function favoriteContact(contactId: string, isFavorite: boolean) {
  await slow();

  return prisma.contact.update({
    data: {
      favorite: !isFavorite,
    },
    where: {
      id: contactId,
    },
  });
}

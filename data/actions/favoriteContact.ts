'use server';

import { prisma } from '@/db';
import { slow } from '@/utils/slow';

export async function favoriteContact(contactId: string, formData: FormData) {
  await slow();

  return prisma.contact.update({
    data: {
      favorite: !(formData.get('favorite') === 'true'),
    },
    where: {
      id: contactId,
    },
  });
}

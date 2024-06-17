'use server';

import { revalidateTag } from 'next/cache';
import { revalidationKeys } from '@/constants/revalidationKeys';
import { prisma } from '../../db';

export async function favoriteContact(contactId: string, isFavorite: boolean) {
  await prisma.contact.update({
    data: {
      favorite: !isFavorite,
    },
    where: {
      id: contactId,
    },
  });

  revalidateTag(revalidationKeys.contacts);
  revalidateTag(revalidationKeys.contact);
}

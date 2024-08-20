'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { cacheKeys } from '@/constants/revalidationKeys';
import { prisma } from '@/db';
import { slow } from '@/utils/slow';
import { routes } from '@/validations/routeSchema';

export async function favoriteContact(contactId: string, isFavorite: boolean) {
  await slow();

  await prisma.contact.update({
    data: {
      favorite: !isFavorite,
    },
    where: {
      id: contactId,
    },
  });

  revalidateTag(cacheKeys.contact); // For unstable-cache
  // revalidateTag(revalidationKeys.contact(contactId)); // For getContactFetch
  // revalidateTag(revalidationKeys.contacts); // For getContactsFetch
  revalidatePath(routes.home());
}

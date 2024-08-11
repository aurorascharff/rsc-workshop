'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/db';
import { routes } from '@/validations/routeSchema';

export async function favoriteContact(contactId: string, isFavorite: boolean) {
  await prisma.contact.update({
    data: {
      favorite: !isFavorite,
    },
    where: {
      id: contactId,
    },
  });

  // revalidateTag(cacheKeys.contact); // For unstable-cache
  // revalidateTag(revalidationKeys.contact(contactId)); // For getContactFetch
  // revalidateTag(revalidationKeys.contacts); // For getContactsFetch
  revalidatePath(routes.home());
}

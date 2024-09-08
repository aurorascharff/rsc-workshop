'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/db';
import { slow } from '@/utils/slow';
import { routes } from '@/validations/routeSchema';

export async function deleteContact(contactId: string) {
  await slow();

  await prisma.contact.delete({
    where: {
      id: contactId,
    },
  });

  revalidatePath(routes.home());
  // revalidateTag(revalidationKeys.contacts); // For getContactsFetch
  redirect(routes.home());
}

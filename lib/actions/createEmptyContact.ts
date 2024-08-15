'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/db';
import { slow } from '@/utils/slow';
import { routes } from '@/validations/routeSchema';

export async function createEmptyContact() {
  await slow();

  const contact = await prisma.contact.create({
    data: {},
  });

  revalidatePath(routes.home());
  // revalidateTag(revalidationKeys.contacts); // For getContactsFetch
  redirect(routes.contactIdEdit({ contactId: contact.id }));
}

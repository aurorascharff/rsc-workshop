'use server';

import { redirect } from 'next/navigation';
import { prisma } from '@/db';
import { slow } from '@/utils/slow';
import { routes } from '@/validations/routeSchema';

export async function createEmptyContact() {
  await slow();

  const contact = await prisma.contact.create({
    data: {},
  });

  // revalidateTag(revalidationKeys.contacts); // For getContactsFetch
  redirect(routes.contactIdEdit({ contactId: contact.id }));
}

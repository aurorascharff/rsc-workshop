'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/db';
import type { ContactSchemaType } from '@/validations/contactSchema';
import { contactSchema } from '@/validations/contactSchema';
import { routes } from '@/validations/routeSchema';

export async function updateContact(contactId: string, data: ContactSchemaType) {
  const result = contactSchema.safeParse(data);

  if (!result.success) {
    return {
      data,
      error: 'Invalid form data!',
    };
  }

  await prisma.contact.update({
    data: result.data,
    where: {
      id: contactId,
    },
  });

  revalidatePath(routes.home());
  // revalidateTag(cacheKeys.contact); // For unstable-cache
  // revalidateTag(revalidationKeys.contact(contactId)); // For getContactFetch
  // revalidateTag(revalidationKeys.contacts); // For getContactsFetch
  redirect(routes.contactId({ contactId }));
}

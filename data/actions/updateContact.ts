'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { cacheKeys } from '@/constants/revalidationKeys';
import { prisma } from '@/db';
import { slow } from '@/utils/slow';
import type { ContactSchemaType } from '@/validations/contactSchema';
import { contactSchema } from '@/validations/contactSchema';
import { routes } from '@/validations/routeSchema';

export async function updateContact(contactId: string, data: ContactSchemaType) {
  await slow();

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
  revalidateTag(cacheKeys.contact); // For unstable-cache
  // revalidateTag(revalidationKeys.contact(contactId)); // For getContactFetch
  // revalidateTag(revalidationKeys.contacts); // For getContactsFetch
  redirect(routes.contactId({ contactId }));
}

export async function updateContactSimple(contactId: string, formData: FormData) {
  const contact = Object.fromEntries(formData);

  await prisma.contact.update({
    data: contact,
    where: {
      id: contactId,
    },
  });

  revalidatePath(routes.home());
  redirect(routes.contactId({ contactId }));
}

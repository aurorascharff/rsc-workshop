'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { prisma } from '@/db';
import { slow } from '@/utils/slow';
import type { ContactSchemaErrorType, ContactSchemaType } from '@/validations/contactSchema';
import { contactSchema } from '@/validations/contactSchema';
import { routes } from '@/validations/routeSchema';

type State = {
  data?: ContactSchemaType;
  errors?: ContactSchemaErrorType;
};

export async function updateContact(contactId: string, _prevState: State, formData: FormData): Promise<State> {
  await slow();

  const contact = Object.fromEntries(formData);
  const result = contactSchema.safeParse(contact);

  if (!result.success) {
    return {
      data: contact as ContactSchemaType,
      errors: result.error.formErrors,
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

'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import invariant from 'tiny-invariant';
import { revalidationKeys } from '@/constants/revalidationKeys';
import { prisma } from '../../db';

export async function updateContact(contactId: string, formData: FormData) {
  invariant(contactId, 'Missing contactId param');
  const updates = Object.fromEntries(formData);
  await prisma.contact.update({
    data: updates,
    where: {
      id: contactId,
    },
  });
  revalidatePath(`/contacts/${contactId}`);
  revalidateTag(revalidationKeys.contact(contactId));
  revalidateTag(revalidationKeys.contacts);
  redirect(`/contacts/${contactId}`);
}

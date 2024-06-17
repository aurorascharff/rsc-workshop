'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { revalidationKeys } from '@/constants/revalidationKeys';
import { prisma } from '../../db';

export async function deleteContact(contactId: string) {
  await prisma.contact.delete({
    where: {
      id: contactId,
    },
  });

  revalidateTag(revalidationKeys.contacts);
  redirect('/');
}

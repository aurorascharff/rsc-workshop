'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { revalidationKeys } from '@/constants/revalidationKeys';
import { prisma } from '../../db';

export async function createEmptyContact() {
  const contact = await prisma.contact.create({
    data: {},
  });

  revalidateTag(revalidationKeys.contacts);
  redirect(`/contacts/${contact.id}/edit`);
}

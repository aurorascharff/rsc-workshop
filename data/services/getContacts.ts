import 'server-only';

import { revalidationKeys } from '@/constants/revalidationKeys';
import { prisma } from '@/db';
import { slow } from '@/utils/slow';
import type { Contact } from '@prisma/client';

export async function getContacts() {
  await slow();

  return prisma.contact.findMany({
    orderBy: [{ first: 'asc' }, { last: 'asc' }],
  });
}

export async function getContactsFetch(): Promise<Contact[]> {
  await slow();

  const apiURL = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${apiURL}/contacts`, {
    next: {
      tags: [revalidationKeys.contacts],
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch contacts');
  }

  return res.json();
}

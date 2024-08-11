import 'server-only';

import { unstable_cache } from 'next/cache';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import { revalidationKeys } from '@/constants/revalidationKeys';
import { prisma } from '@/db';
import { slow } from '@/utils/slow';

export async function getContact(contactId: string) {
  await slow(500);

  const contact = await prisma.contact.findUnique({
    where: {
      id: contactId,
    },
  });
  if (!contact) {
    notFound();
  }
  return contact;
}

export const getContactDedupe = cache(async (contactId: string) => {
  return getContact(contactId);
});

export const getContactCache = unstable_cache(
  async (contactId: string) => {
    return getContactDedupe(contactId);
  },
  ['contact'],
  {
    tags: ['contact'],
  },
);

export async function getContactFetch(contactId: string) {
  const apiURL = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${apiURL}/contacts/${contactId}`, {
    next: {
      tags: [revalidationKeys.contact(contactId)],
    },
  });

  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    }
    throw new Error('Failed to fetch contact');
  }

  return res.json();
}

import 'server-only';

import { notFound } from 'next/navigation';
import { cache } from 'react';
import { revalidationKeys } from '@/constants/revalidationKeys';
import { prisma } from '@/db';
import { slow } from '@/utils/slow';

export async function getContact(contactId: string) {
  await slow();

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

// The function getContact is called multiple times in the same render. Therefore, it has been per-render cached with React cache.
export const getContactCache = cache(async (contactId: string) => {
  return getContact(contactId);
});

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

import { revalidationKeys } from '@/constants/revalidationKeys';
import type { Contact } from '@prisma/client';

export async function getContactsFetch(): Promise<Contact[]> {
  const apiURL = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(apiURL + '/contacts', {
    next: {
      tags: [revalidationKeys.contacts],
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch contacts');
  }

  return res.json();
}

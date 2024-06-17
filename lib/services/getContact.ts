import 'server-only';

import { unstable_cache } from 'next/cache';
import { notFound } from 'next/navigation';
import { revalidationKeys } from '@/constants/revalidationKeys';
import { prisma } from '../../db';

export const getContact = unstable_cache(
  async (contactId: string) => {
    const contact = await prisma.contact.findUnique({
      where: {
        id: contactId,
      },
    });
    if (!contact) {
      notFound();
    }
    return contact;
  },
  ['contact'],
  {
    tags: [revalidationKeys.contact],
  },
);

import 'server-only';

import { unstable_cache } from 'next/cache';
import { revalidationKeys } from '@/constants/revalidationKeys';
import { prisma } from '../../db';

export const getContacts = unstable_cache(
  async () => {
    return prisma.contact.findMany({
      orderBy: [{ first: 'asc' }, { last: 'asc' }],
    });
  },
  ['contacts'],
  {
    tags: [revalidationKeys.contacts],
  },
);

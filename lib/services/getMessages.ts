import 'server-only';

import { prisma } from '@/db';
import { slow } from '@/utils/slow';

export async function getMessages(contactId?: string) {
  await slow(2000);

  return prisma.message.findMany({
    orderBy: { createdAt: 'asc' },
    where: {
      contactId,
    },
  });
}

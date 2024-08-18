'use server';

import { prisma } from '@/db';
import { revalidatePath } from 'next/cache';
import { getCurrentUser } from '../services/getCurrentUser';
import { z } from 'zod';
import { slow } from '@/utils/slow';

const messageSchema = z.object({
  content: z.string().min(1, {
    message: 'Content must be at least 1 characters long',
  }),
  contactId: z.string().uuid({
    message: 'Invalid user ID',
  }),
});

type State = {
  success: boolean;
  error?: string;
  timestamp?: Date;
  content?: string;
};

export async function submitMessage(_prevState: State, formData: FormData): Promise<State> {
  await slow();
  const currentUser = await getCurrentUser();
  const timestamp = new Date();

  const result = messageSchema.safeParse({
    content: formData.get('content'),
    contactId: formData.get('contactId'),
  });

  if (!result.success) {
    return {
      error: 'Invalid message!',
      success: false,
      timestamp,
    };
  }

  await prisma.message.create({
    data: {
      content: result.data.content,
      contactId: result.data.contactId,
      createdById: currentUser.id,
    },
  });

  revalidatePath('/');

  return {
    success: true,
  };
}

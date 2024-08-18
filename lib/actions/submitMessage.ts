'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { prisma } from '@/db';
import { slow } from '@/utils/slow';
import { getCurrentUser } from '../services/getCurrentUser';

const messageSchema = z.object({
  contactId: z.string().uuid({
    message: 'Invalid user ID',
  }),
  content: z.string().min(1, {
    message: 'Content must be at least 1 characters long',
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
    contactId: formData.get('contactId'),
    content: formData.get('content'),
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
      contactId: result.data.contactId,
      content: result.data.content,
      createdById: currentUser.id,
    },
  });

  revalidatePath('/');

  return {
    success: true,
  };
}

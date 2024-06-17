import { z } from 'zod';

export const contactSchema = z.object({
  avatar: z.string().url().or(z.literal('')).nullable(),
  email: z.string().email().or(z.literal('')).nullable(),
  first: z.string().nullable(),
  github: z.string().nullable(),
  last: z.string().nullable(),
  notes: z.string().nullable(),
  position: z.string().nullable(),
});

export type ContactSchemaType = z.infer<typeof contactSchema>;

export type ContactSchemaErrorType = z.inferFlattenedErrors<typeof contactSchema>;

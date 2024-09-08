'use client';

import React, { useTransition } from 'react';
import { favoriteContact } from '@/data/actions/favoriteContact';
import { cn } from '@/utils/cn';
import type { Contact } from '@prisma/client';

export default function FavoritePessimistic({ contact }: { contact: Contact }) {
  const favorite = contact.favorite;
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => {
        startTransition(async () => {
          await favoriteContact(contact.id, favorite);
        });
      }}
      type="submit"
      className={cn(
        favorite || isPending ? 'text-yellow-500' : 'text-gray-dark',
        'flex text-2xl font-normal shadow-none hover:text-yellow-400 hover:shadow-none',
      )}
      aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      {favorite && !isPending ? '★' : '☆'}
    </button>
  );
}

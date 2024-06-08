'use client';

import React, { useOptimistic, useTransition } from 'react';
import { cn } from '@/utils/cn';
import { favoriteContact } from '../lib/actions/favoriteContact';
import type { Contact } from '@prisma/client';

export default function Favorite({ contact }: { contact: Contact }) {
  const favoriteContactById = favoriteContact.bind(null, contact.id, contact.favorite);
  const [optimisticFavorite, addOptimisticFavorite] = useOptimistic(contact.favorite);
  const [, startTransition] = useTransition();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      addOptimisticFavorite(!optimisticFavorite);
      await favoriteContactById();
    });
  };

  return (
    <form action={favoriteContactById} onSubmit={onSubmit}>
      <button
        type="submit"
        className={cn(
          optimisticFavorite ? 'text-secondary' : 'text-gray-400',
          'hover:text-secondary m-0 p-0 text-2xl shadow-none hover:shadow-none',
        )}
        aria-label={optimisticFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {optimisticFavorite ? '★' : '☆'}
      </button>
    </form>
  );
}

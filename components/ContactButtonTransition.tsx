'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useTransition } from 'react';
import { cn } from '@/utils/cn';
import { routes, useSafeSearchParams } from '@/validations/routeSchema';
import type { Contact } from '@prisma/client';

export default function ContactButtonTransition({ contact }: { contact: Contact }) {
  const pathName = usePathname();
  const isActive = pathName.includes(routes.contactId({ contactId: contact.id }));
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { q } = useSafeSearchParams('home');

  return (
    <Link
      className={cn(
        isActive ? 'bg-primary text-white' : 'hover:bg-gray',
        isPending ? 'pending' : '',
        'flex w-full items-center justify-between gap-4 overflow-hidden whitespace-pre rounded-lg p-2 hover:no-underline',
      )}
      href={routes.contactId({ contactId: contact.id, search: { q } })}
      onClick={e => {
        e.preventDefault();
        startTransition(() => {
          router.push(routes.contactId({ contactId: contact.id, search: { q } }));
        });
      }}
    >
      {contact.first || contact.last ? (
        <>
          {contact.first} {contact.last}
        </>
      ) : (
        <i>No Name</i>
      )}{' '}
      {contact.favorite ? (
        <span className={cn('float-right', isActive ? 'text-white' : 'text-secondary')}>★</span>
      ) : null}
    </Link>
  );
}

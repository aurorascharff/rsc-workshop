'use client';

import React, { useTransition } from 'react';
import Button from '@/components/Button';
import LinkButton from '@/components/LinkButton';
import { updateContact } from '@/lib/actions/updateContact';
import type { Contact } from '@prisma/client';

export default function ContactForm({ contact }: { contact: Contact }) {
  const [isPending, startTransition] = useTransition();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startTransition(async () => {
      await updateContact(contact.id, new FormData(event.currentTarget));
    });
  };

  return (
    <form className="flex max-w-[40rem] flex-col gap-4" onSubmit={onSubmit}>
      <div className="grip-rows-6 grid grid-cols-1 gap-4 sm:grid-cols-[1fr_4fr]">
        <span className="flex">Name</span>
        <div className="flex gap-4">
          <input
            defaultValue={contact.first || undefined}
            aria-label="First name"
            name="first"
            type="text"
            placeholder="First"
          />
          <input
            aria-label="Last name"
            defaultValue={contact.last || undefined}
            name="last"
            placeholder="Last"
            type="text"
          />
        </div>
        <label htmlFor="position">Position</label>
        <input defaultValue={contact.position || undefined} name="position" placeholder="Konsulent" type="text" />
        <label htmlFor="email">Email</label>
        <input defaultValue={contact.email || undefined} name="email" placeholder="moa@inmeta.no" type="text" />
        <label htmlFor="github">Github</label>
        <input defaultValue={contact.github || undefined} name="github" placeholder="@moa" type="text" />
        <label htmlFor="avatar">Avatar URL</label>
        <input
          aria-label="Avatar URL"
          defaultValue={contact.avatar || undefined}
          name="avatar"
          placeholder="https://example.com/avatar.jpg"
          type="text"
        />
        <label htmlFor="notes">Notes</label>
        <textarea className="grow" defaultValue={contact.notes || undefined} name="notes" rows={6} />
      </div>
      <div className="flex gap-2 self-end">
        <LinkButton href={`/contacts/${contact.id}`}>Cancel</LinkButton>
        <Button theme="primary" disabled={isPending} className="w-fit" type="submit">
          {isPending ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </form>
  );
}

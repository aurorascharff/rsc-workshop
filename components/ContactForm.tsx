'use client';

import React from 'react';
import { updateContact } from '../lib/actions/updateContact';
import { useLoading } from '../providers/LoadingContext';
import NavButton from './NavButton';
import type { Contact } from '@prisma/client';

export default function ContactForm({ contact }: { contact: Contact }) {
  const updateContactById = updateContact.bind(null, contact.id);
  const { startTransition } = useLoading();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startTransition(async () => {
      await updateContactById(new FormData(event.currentTarget));
    });
  };

  return (
    <form className="flex max-w-[40rem] flex-col gap-4" action={updateContactById} onSubmit={onSubmit} key={contact.id}>
      <div className="grip-rows-6 grid grid-cols-1 gap-2 sm:grid-cols-[1fr_4fr] sm:gap-4">
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
        <label htmlFor="position" className="flex flex-col justify-between gap-4 sm:flex-row">
          Position
        </label>
        <input defaultValue={contact.position || undefined} name="position" placeholder="Konsulent" type="text" />
        <label htmlFor="email" className="flex flex-col justify-between gap-4 sm:flex-row">
          Email
        </label>
        <input defaultValue={contact.email || undefined} name="email" placeholder="moa@inmeta.no" type="text" />
        <label htmlFor="github" className="flex flex-col justify-between gap-4 sm:flex-row">
          Github
        </label>
        <input defaultValue={contact.github || undefined} name="github" placeholder="@moa" type="text" />
        <label htmlFor="avatar" className="flex flex-col justify-between gap-4 sm:flex-row">
          Avatar URL
        </label>
        <input
          aria-label="Avatar URL"
          defaultValue={contact.avatar || undefined}
          name="avatar"
          placeholder="https://example.com/avatar.jpg"
          type="text"
        />
        <label htmlFor="notes" className="flex flex-col justify-between gap-4 sm:flex-row">
          Notes
        </label>
        <textarea className="grow" defaultValue={contact.notes || undefined} name="notes" rows={6} />
      </div>
      <div className="flex gap-2 self-end">
        <button className="w-fit" type="submit">
          Save
        </button>
        <NavButton color="black" href={`/contacts/${contact.id}`}>
          Cancel
        </NavButton>
      </div>
    </form>
  );
}

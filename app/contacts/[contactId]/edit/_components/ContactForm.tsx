'use client';

import React, { useActionState } from 'react';
import Input from '@/components/ui/Input';
import LinkButton from '@/components/ui/LinkButton';
import SubmitButton from '@/components/ui/SubmitButton';
import TextArea from '@/components/ui/TextArea';
import { updateContact } from '@/lib/actions/updateContact';
import type { ContactSchemaErrorType } from '@/validations/contactSchema';
import type { Contact } from '@prisma/client';

export default function ContactForm({ contact }: { contact: Contact }) {
  const updateContactById = updateContact.bind(null, contact.id);

  const [state, updateContactAction] = useActionState(updateContactById, {
    data: contact,
    error: {} as ContactSchemaErrorType,
    success: false,
  });

  return (
    <form className="flex max-w-[40rem] flex-col gap-4" action={updateContactAction}>
      <div className="grip-rows-6 grid grid-cols-1 gap-4 sm:grid-cols-[1fr_4fr]">
        <span className="flex">Name</span>
        <div className="flex gap-4">
          <Input
            defaultValue={state.data?.first || ''}
            aria-label="First name"
            name="first"
            type="text"
            error={state.error?.fieldErrors?.first}
            placeholder="First"
          />
          <Input
            aria-label="Last name"
            defaultValue={state.data?.last || ''}
            name="last"
            placeholder="Last"
            type="text"
            error={state.error?.fieldErrors?.last}
          />
        </div>
        <label htmlFor="position">Position</label>
        <Input
          error={state.error?.fieldErrors?.position}
          defaultValue={state.data?.position || ''}
          name="position"
          placeholder="Konsulent"
          type="text"
        />
        <label htmlFor="email">Email</label>
        <Input
          error={state.error?.fieldErrors?.email}
          defaultValue={state.data?.email || ''}
          name="email"
          placeholder="moa@inmeta.no"
          type="text"
        />
        <label htmlFor="github">Github</label>
        <Input
          error={state.error?.fieldErrors?.github}
          defaultValue={state.data?.github || ''}
          name="github"
          placeholder="@moa"
          type="text"
        />
        <label htmlFor="avatar">Avatar URL</label>
        <Input
          error={state.error?.fieldErrors?.avatar}
          aria-label="Avatar URL"
          defaultValue={state.data?.avatar || ''}
          name="avatar"
          placeholder="https://example.com/avatar.jpg"
          type="text"
        />
        <label htmlFor="notes">Notes</label>
        <TextArea
          error={state.error?.fieldErrors?.notes}
          className="grow"
          defaultValue={state.data?.notes || ''}
          name="notes"
          rows={6}
        />
      </div>
      <div className="flex gap-2 self-end">
        <LinkButton theme="secondary" href={`/contacts/${contact.id}`}>
          Cancel
        </LinkButton>
        <SubmitButton theme="primary">Save</SubmitButton>
      </div>
    </form>
  );
}

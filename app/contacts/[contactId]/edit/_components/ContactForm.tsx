'use client';

import React, { use, useActionState } from 'react';
import Input from '@/components/ui/Input';
import LinkButton from '@/components/ui/LinkButton';
import Skeleton from '@/components/ui/Skeleton';
import SubmitButton from '@/components/ui/SubmitButton';
import TextArea from '@/components/ui/TextArea';
import { updateContact } from '@/data/actions/updateContact';
import type { ContactSchemaErrorType } from '@/validations/contactSchema';
import { routes } from '@/validations/routeSchema';
import type { Contact } from '@prisma/client';

export default function ContactForm({ contactPromise }: { contactPromise: Promise<Contact> }) {
  const contact = use(contactPromise);
  const updateContactById = updateContact.bind(null, contact.id);

  const [state, updateContactAction] = useActionState(updateContactById, {
    data: {
      avatar: contact.avatar,
      email: contact.email,
      first: contact.first,
      github: contact.github,
      last: contact.last,
      notes: contact.notes,
      position: contact.position,
    },
    errors: {} as ContactSchemaErrorType,
  });

  return (
    <form
      // onSubmit={async event => {
      //   event.preventDefault();
      //   const formData = new FormData(event.currentTarget);
      //   await updateContactSimple(contact.id, formData);
      // }}
      className="flex max-w-[40rem] flex-col gap-4 @container"
      action={updateContactAction}
    >
      <div className="grip-rows-6 grid gap-2 @sm:grid-cols-[1fr_4fr] @sm:gap-4">
        <span className="flex">Name</span>
        <div className="flex gap-4">
          <Input
            errors={state.errors?.fieldErrors?.first}
            defaultValue={state.data?.first || undefined}
            aria-label="First name"
            name="first"
            type="text"
            placeholder="First"
          />
          <Input
            errors={state.errors?.fieldErrors?.last}
            aria-label="Last name"
            defaultValue={state.data?.last || undefined}
            name="last"
            placeholder="Last"
            type="text"
          />
        </div>
        <label htmlFor="position">Position</label>
        <Input
          errors={state.errors?.fieldErrors?.position}
          defaultValue={state.data?.position || undefined}
          name="position"
          placeholder="Konsulent"
          type="text"
        />
        <label htmlFor="email">Email</label>
        <Input
          errors={state.errors?.fieldErrors?.email}
          defaultValue={state.data?.email || undefined}
          name="email"
          placeholder="moa@inmeta.no"
          type="text"
        />
        <label htmlFor="github">Github</label>
        <Input
          errors={state.errors?.fieldErrors?.github}
          defaultValue={state.data?.github || undefined}
          name="github"
          placeholder="@moa"
          type="text"
        />
        <label htmlFor="avatar">Avatar URL</label>
        <Input
          errors={state.errors?.fieldErrors?.avatar}
          defaultValue={state.data?.avatar || undefined}
          name="avatar"
          placeholder="https:// media.licdn.com/dms/image/example"
          type="text"
        />
        <label htmlFor="notes">Notes</label>
        <TextArea
          errors={state.errors?.fieldErrors?.notes}
          className="grow"
          defaultValue={state.data?.notes || undefined}
          name="notes"
          rows={6}
        />
      </div>
      <div className="flex gap-2 self-start @sm:self-end">
        <LinkButton theme="secondary" href={routes.contactId({ contactId: contact.id })}>
          Cancel
        </LinkButton>
        <SubmitButton theme="primary">Save</SubmitButton>
      </div>
    </form>
  );
}

export function ContactFormSkeleton() {
  return (
    <div className="flex max-w-[40rem] flex-col gap-4 @container">
      <div className="grip-rows-6 grid gap-4 @sm:grid-cols-[1fr_4fr]">
        <div className="hidden flex-col gap-[72px] @sm:flex @sm:gap-8">
          <span className="flex">Name</span>
          <span>Position</span>
          <span>Email</span>
          <span>Github</span>
          <span>Avatar URL</span>
          <span>Notes</span>
        </div>
        <Skeleton />
      </div>
    </div>
  );
}

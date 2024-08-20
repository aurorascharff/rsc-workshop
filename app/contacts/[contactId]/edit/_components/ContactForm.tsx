'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React, { use } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Input from '@/components/ui/Input';
import LinkButton from '@/components/ui/LinkButton';
import Skeleton from '@/components/ui/Skeleton';
import SubmitButton from '@/components/ui/SubmitButton';
import TextArea from '@/components/ui/TextArea';
import { updateContact } from '@/lib/actions/updateContact';
import { contactSchema, type ContactSchemaType } from '@/validations/contactSchema';
import { routes } from '@/validations/routeSchema';
import type { Contact } from '@prisma/client';

export default function ContactForm({ contactPromise }: { contactPromise: Promise<Contact> }) {
  const contact = use(contactPromise);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<ContactSchemaType>({
    mode: 'onChange',
    resolver: zodResolver(contactSchema),
    values: contact,
  });

  const onSubmit = handleSubmit(async data => {
    const response = await updateContact(contact.id, data);
    if (response?.error) {
      toast.error(response.error);
    } else {
      toast.success('Contact updated');
    }
  });

  return (
    <form className="flex max-w-[40rem] flex-col gap-4 @container" onSubmit={onSubmit}>
      <div className="grip-rows-6 grid grid-cols-1 gap-2 @sm:grid-cols-[1fr_4fr] @sm:gap-4">
        <span className="flex">Name</span>
        <div className="flex gap-4">
          <Input
            error={errors.first?.message}
            {...register('first')}
            aria-label="First name"
            name="first"
            type="text"
            placeholder="First"
          />
          <Input
            error={errors.last?.message}
            {...register('last')}
            aria-label="Last name"
            name="last"
            placeholder="Last"
            type="text"
          />
        </div>
        <label htmlFor="position">Position</label>
        <Input
          error={errors.position?.message}
          {...register('position')}
          name="position"
          placeholder="Konsulent"
          type="text"
        />
        <label htmlFor="email">Email</label>
        <Input
          error={errors.email?.message}
          {...register('email')}
          name="email"
          placeholder="moa@inmeta.no"
          type="text"
        />
        <label htmlFor="github">Github</label>
        <Input error={errors.github?.message} {...register('github')} name="github" placeholder="@moa" type="text" />
        <label htmlFor="avatar">Avatar URL</label>
        <Input
          error={errors.avatar?.message}
          {...register('avatar')}
          name="avatar"
          placeholder="https:// media.licdn.com/dms/image/example"
          type="text"
        />
        <label htmlFor="notes">Notes</label>
        <TextArea error={errors.notes?.message} {...register('notes')} className="grow" name="notes" rows={6} />
      </div>
      <div className="flex gap-2 self-end">
        <LinkButton theme="secondary" href={routes.contactId({ contactId: contact.id })}>
          Cancel
        </LinkButton>
        <SubmitButton loading={isSubmitting}>Save</SubmitButton>
      </div>
    </form>
  );
}

export function ContactFormSkeleton() {
  return (
    <div className="flex max-w-[40rem] flex-col gap-4 @container">
      <div className="grip-rows-6 grid grid-cols-1 gap-4 @sm:grid-cols-[1fr_4fr]">
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

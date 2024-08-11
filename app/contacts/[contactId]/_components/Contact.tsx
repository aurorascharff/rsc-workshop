'use client';

import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react';
import Button from '@/components/ui/Button';
import useDeleteContact from '@/hooks/useDeleteContact';
import useGetContact from '@/hooks/useGetContact';
import useUpdateContact from '@/hooks/useUpdateContact';
import GithubLogo from '@/public/github-mark.svg';
import { cn } from '@/utils/cn';

export default function Contact({ contactId }: { contactId: string }) {
  const { contact } = useGetContact(contactId);
  const { mutate: deleteContact } = useDeleteContact();
  const { mutate: updateContact } = useUpdateContact();
  if (!contact) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      <div>
        {contact.avatar && (
          <Image
            width={192}
            height={192}
            className="mr-8 rounded-3xl bg-gray object-cover"
            alt={`${contact.first} ${contact.last} avatar`}
            key={contact.avatar}
            src={contact.avatar}
          />
        )}
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="flex-start flex items-center gap-4 text-3xl font-bold">
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{' '}
          <button
            onClick={() => {
              updateContact({ ...contact, favorite: !contact.favorite });
            }}
            className={cn(
              contact.favorite ? 'text-yellow-500' : 'text-gray-dark',
              'flex text-2xl font-normal shadow-none hover:text-yellow-400 hover:shadow-none',
            )}
            aria-label={contact.favorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {contact.favorite ? '★' : '☆'}
          </button>
        </h1>

        {contact.position ? <p className="text-2xl">{contact.position}</p> : null}

        {contact.email ? (
          <p className="text-xl">
            <a href={'mailto:' + contact.email} className="no-underline hover:underline">
              {contact.email}
            </a>
          </p>
        ) : null}

        {contact.github ? (
          <div className="flex items-center gap-2">
            <div>
              <Image width={16} height={16} src={GithubLogo} alt="Github Logo" />
            </div>
            <p className="text-xl text-primary">
              <a target="_blank" className="no-underline hover:underline" href={`https://github.com/${contact.github}`}>
                {contact.github}
              </a>
            </p>
          </div>
        ) : null}

        {contact.notes ? <p>{contact.notes}</p> : null}

        <div className="my-4 flex gap-2">
          {/* <LinkButton theme="secondary" href={routes.contactIdEdit({ contactId: contact.id })}>
            Edit
          </LinkButton> */}
          <Button
            onClick={() => {
              const response = confirm('Please confirm you want to delete this record.');
              if (!response) {
                return;
              }
              deleteContact(contact.id);
            }}
            theme="destroy"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

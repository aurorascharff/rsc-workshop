import React from 'react';
import { getCurrentUser } from '@/data/services/getCurrentUser';
import { getMessages } from '@/data/services/getMessages';
import MessageDisplay from './MessageDisplay';
import type { Contact } from '@prisma/client';

type Props = {
  contact: Contact;
};

export default async function Messages({ contact }: Props) {
  const messages = await getMessages(contact.id);
  const user = await getCurrentUser();

  return (
    <>
      {messages.length === 0 && <span className="text-center text-gray-dark">No messages</span>}
      {messages.map(message => {
        return (
          <MessageDisplay
            createdByName={contact.first || 'Unnamed'}
            key={message.id}
            message={message}
            userId={user.id}
          />
        );
      })}
    </>
  );
}

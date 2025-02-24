import React from 'react';
import { getContactCache } from '@/data/services/getContact';
import { getCurrentUser } from '@/data/services/getCurrentUser';
import { getMessages } from '@/data/services/getMessages';
import MessageDisplay from './MessageDisplay';

type Props = {
  contactId: string;
};

export default async function Messages({ contactId }: Props) {
  const messages = await getMessages(contactId);
  const contact = await getContactCache(contactId);
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

import MessageBox from '@/components/message-box/MessageBox';
import { getContactCache } from '@/lib/services/getContact';
import { routes } from '@/validations/routeSchema';
import React from 'react';

type Props = {
  children: React.ReactNode;
  params: unknown;
};

export default async function ContactsLayout({ children, params }: Props) {
  const { contactId } = routes.contactId.$parseParams(params);
  const contact = await getContactCache(contactId);

  return (
    <>
      {children}
      <div className="fixed bottom-8 right-8 ml-8">
        <MessageBox contact={contact} />
      </div>
    </>
  );
}

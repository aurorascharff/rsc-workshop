import React, { Suspense } from 'react';
import MessageBox from '@/components/message-box/MessageBox';
import Skeleton from '@/components/ui/Skeleton';
import { routes } from '@/validations/routeSchema';

type Props = {
  children: React.ReactNode;
  params: Promise<unknown>;
};

export default async function ContactsLayout({ children, params }: Props) {
  const { contactId } = routes.contactId.$parseParams(await params);

  return (
    <Suspense
      fallback={
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="mr-8 h-48 w-48 rounded-3xl bg-gray" />
          <Skeleton className="max-w-[250px]" />
        </div>
      }
    >
      {children}
      <div className="fixed bottom-0 right-8 ml-8">
        <MessageBox contactId={contactId} />
      </div>
    </Suspense>
  );
}

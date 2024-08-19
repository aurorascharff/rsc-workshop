import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import AutomaticScroller from '@/components/AutomaticScroller';
import Skeleton from '../ui/Skeleton';
import MessageInput from './MessageInput';
import Messages from './Messages';
import type { Contact } from '@prisma/client';

type Props = {
  contactPromise: Promise<Contact>;
};

export default async function MessageBox({ contactPromise }: Props) {
  const contact = await contactPromise;

  return (
    <details className="group flex flex-col rounded-t-lg border border-gray bg-white shadow-xl">
      <summary className="flex items-center justify-between gap-4 rounded-t-lg border-b border-gray bg-white px-4 py-1 text-lg font-bold text-primary hover:bg-gray-light group-open:py-3">
        Messages
        <div className="hidden transform pb-[1px] transition-transform group-open:rotate-180 sm:flex">
          <span className="flex text-2xl group-open:hidden">+</span>
          <span className="hidden text-2xl group-open:flex">-</span>
        </div>
      </summary>
      <div className="grid w-full group-open:min-w-[320px] sm:group-open:w-[380px]">
        <AutomaticScroller className="grid h-80 content-start gap-4 overflow-auto border-b border-gray p-4">
          <Suspense fallback={<Skeleton />}>
            <Messages contact={contact} />
          </Suspense>
        </AutomaticScroller>
        <ErrorBoundary fallback={<p className="pb px-6 py-8 text-end">⚠️Something went wrong</p>}>
          <MessageInput contactId={contact.id} />
        </ErrorBoundary>
      </div>
    </details>
  );
}

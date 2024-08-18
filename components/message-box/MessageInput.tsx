'use client';

import React, { useActionState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { submitMessage } from '@/lib/actions/submitMessage';
import SubmitButton from '@/components/ui/SubmitButton';

type Props = {
  contactId: string;
};

export default function MessageInput({ contactId }: Props) {
  const [state, submitMessageAction] = useActionState(submitMessage, {
    success: false,
  });

  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    }
  }, [state.error, state.timestamp]);

  return (
    <>
      <form action={submitMessageAction} className="flex flex-row items-end gap-2 p-3">
        <input
          autoComplete="off"
          defaultValue={state.content}
          required
          minLength={1}
          name="content"
          className="italic shadow-none hover:shadow-none"
          placeholder="Type a message..."
        />
        <input type="hidden" name="contactId" value={contactId} />
        <SubmitButton>Send</SubmitButton>
      </form>
      {state.error && <noscript className="px-6 pb-3 text-end text-red-600">{state.error}</noscript>}
    </>
  );
}

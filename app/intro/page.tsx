import React from 'react';
import LinkButton from '@/components/ui/LinkButton';

export default function IntroPage() {
  return (
    <div className="flex w-fit flex-col gap-4">
      <LinkButton theme="secondary" href="/intro/client-server">
        Client and Server Components
      </LinkButton>
      <LinkButton theme="secondary" href="/intro/transitions">
        Transitions
      </LinkButton>
      <LinkButton theme="secondary" href="/intro/suspense">
        Suspense
      </LinkButton>
      <LinkButton theme="secondary" href="/intro/data-fetching">
        Data Fetching
      </LinkButton>
    </div>
  );
}

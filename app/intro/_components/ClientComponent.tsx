'use client';

import React from 'react';
import { mutateData } from '@/lib/actions/intro/mutateData';
import Button from '../../../components/ui/Button';

type Props = {
  children: React.ReactNode;
  content: React.ReactNode;
};

export default function ClientComponent({ children, content }: Props) {
  console.log('ClientComponent');

  return (
    <div className="flex flex-col gap-4 border-2 border-red-500 p-4">
      <Button
        className="w-fit"
        onClick={async () => {
          // Without "use server" on mutateData this will fail
          const data = await mutateData();
          alert(data);
        }}
      >
        Click me
      </Button>
      ClientComponent
      {content}
      {children}
    </div>
  );
}

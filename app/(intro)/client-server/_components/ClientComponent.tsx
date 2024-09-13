'use client';

import React from 'react';
import Button from '@/components/ui/Button';

type Props = {
  children: React.ReactNode;
  content: React.ReactNode;
  mutateData: () => Promise<string>;
};

export default function ClientComponent({ children, content, mutateData }: Props) {
  console.log('ClientComponent');

  // Without "use client" we cannot use onClick, useState, useEffect, etc.
  return (
    <div className="flex w-fit flex-col gap-4 border-2 border-red-500 p-4">
      <Button
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

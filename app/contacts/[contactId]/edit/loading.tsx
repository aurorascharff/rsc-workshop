import React from 'react';
import Skeleton from '@/components/ui/Skeleton';

export default function Loading() {
  return (
    <div className="flex max-w-[40rem] flex-col gap-4 @container">
      <div className="grip-rows-6 grid gap-4 @sm:grid-cols-[1fr_4fr]">
        <div className="hidden flex-col gap-[72px] @sm:flex @sm:gap-8">
          <span className="flex">Name</span>
          <span>Position</span>
          <span>Email</span>
          <span>Github</span>
          <span>Avatar URL</span>
          <span>Notes</span>
        </div>
        <Skeleton />
      </div>
    </div>
  );
}

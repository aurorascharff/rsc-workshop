import React from 'react';
import BackButton from '@/components/ui/BackButton';

type Props = {
  children: React.ReactNode;
};

export default function IntroLayout({ children }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <BackButton />
      {children}
    </div>
  );
}

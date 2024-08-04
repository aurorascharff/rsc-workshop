import React from 'react';
import LinkButton from '@/components/ui/LinkButton';
import TransitionButton from './_components/TransitionButton';

type Props = {
  children: React.ReactNode;
};

export default function TransitionsLayout({ children }: Props) {
  return (
    <div className="flex flex-col gap-8">
      <h1>Transitions</h1>
      <TransitionButton />
      <LinkButton href="/intro/transitions">Home</LinkButton>
      {children}
    </div>
  );
}

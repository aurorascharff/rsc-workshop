'use client';

import React from 'react';
import { useFormStatus } from 'react-dom';
import Button from './Button';
import { SpinnerIcon } from './icons';

type Props = {
  theme?: 'primary' | 'secondary' | 'destroy';
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
};

export default function SubmitButton({
  children,
  theme = 'primary',
  loading,
  className,
  ...otherProps
}: Props & React.HTMLProps<HTMLButtonElement>) {
  const { pending } = useFormStatus();

  return (
    <Button theme={theme} {...otherProps} disabled={pending || loading} type="submit" className={className}>
      {pending || loading ? (
        <div className="flex items-center justify-center gap-2">
          {children}
          <div className="h-fit w-fit animate-spin">
            <SpinnerIcon width={16} height={16} className={theme === 'secondary' ? 'text-gray-dark' : 'text-white'} />
          </div>
        </div>
      ) : (
        children
      )}
    </Button>
  );
}

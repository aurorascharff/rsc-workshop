import React from 'react';
import { cn } from '@/utils/cn';

export type Props = {
  type?: 'button' | 'submit' | 'reset';
  theme?: 'primary' | 'secondary' | 'destroy';
  children: React.ReactNode;
};

export default function Button({ children, theme, type, ...otherProps }: Props & React.HTMLProps<HTMLButtonElement>) {
  const colorClass =
    theme === 'primary'
      ? 'bg-primary text-white disabled:bg-primary-dark'
      : theme === 'secondary'
        ? 'bg-secondary text-white disabled:bg-secondary-dark'
        : theme === 'destroy'
          ? 'bg-destroy text-white disabled:bg-destroy-dark'
          : 'bg-white text-black disabled:text-gray-dark';

  return (
    <button
      {...otherProps}
      type={type}
      className={cn(
        colorClass,
        'm-0 rounded-lg border-none px-3 py-2 font-medium shadow-sm hover:shadow-md active:shadow-xs active:enabled:translate-y-px disabled:translate-y-px',
      )}
    >
      {children}
    </button>
  );
}

'use client';

import { cn } from '@/utils/cn';
import { useLoading } from '../providers/LoadingContext';

export const Details = ({ children }: { children: React.ReactNode }) => {
  const { isLoading } = useLoading();

  return <div className={cn(isLoading && 'loading', 'w-full flex-1 px-16 py-8')}>{children}</div>;
};

'use client';

import Form from 'next/form';
import { useRouter } from 'next/navigation';
import React, { useTransition } from 'react';
import { useSafeSearchParams } from '@/validations/routeSchema';
import { SearchIcon, SpinnerIcon } from './ui/icons';

export default function Search() {
  const router = useRouter();
  const { q } = useSafeSearchParams('home');
  // const searchParams = useSearchParams();
  // const q = searchParams.get('q') || '';
  const [searching, startTransition] = useTransition();

  return (
    <Form action="" role="search">
      <input
        className="w-full pl-8 outline-offset-1"
        onChange={e => {
          startTransition(() => {
            router.push(`?q=${e.target.value}`);
          });
        }}
        defaultValue={q}
        aria-label="Search contacts"
        name="q"
        placeholder="Search"
        type="search"
      />
      <div aria-hidden="true" className="absolute left-10 top-7">
        {searching ? (
          <div className="h-fit w-fit animate-spin">
            <SpinnerIcon width={16} height={16} className="text-gray-dark" />
          </div>
        ) : (
          <SearchIcon width={16} height={16} className="text-gray-dark" />
        )}
      </div>
    </Form>
  );
}

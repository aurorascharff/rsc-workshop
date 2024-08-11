'use client';

import { matchSorter } from 'match-sorter';
import React from 'react';
import useGetContacts from '@/hooks/useGetContacts';
import { useSafeSearchParams } from '@/validations/routeSchema';
import ContactButton from './ContactButton';
import Skeleton from './ui/Skeleton';

export default function ContactList() {
  // // Can still fetch data "like normal" if needed, but we need an API for this.
  // const [contacts, setContacts] = useState<Contact[]>([]);
  // useEffect(() => {
  //   fetch('/api/contacts')
  //     .then(res => {
  //       return res.json();
  //     })
  //     .then(setContacts);
  // }, []);

  const { q } = useSafeSearchParams('home');
  const { data: contacts, isLoading } = useGetContacts();
  if (!contacts) {
    return;
  }

  const filteredContacts = q
    ? matchSorter(contacts, q, {
        keys: ['first', 'last'],
      })
    : contacts;

  return (
    <nav className="flex-1 overflow-auto px-8 py-4">
      {isLoading ? (
        <Skeleton />
      ) : filteredContacts.length ? (
        <ul>
          {filteredContacts.map(contact => {
            return (
              <li key={contact.id} className="mx-1">
                <ContactButton contact={contact} />
              </li>
            );
          })}
        </ul>
      ) : (
        <p>
          <i>No contacts</i>
        </p>
      )}
    </nav>
  );
}

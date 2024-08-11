import { notFound } from 'next/navigation';
import useGetContacts from './useGetContacts';

export default function useGetContact(contactId: string) {
  const { data } = useGetContacts();
  const contact = data?.find(contact => {
    return contact.id === contactId;
  });

  if (!contact) {
    notFound();
  }

  return { contact };
}

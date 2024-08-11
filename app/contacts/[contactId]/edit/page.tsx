import { Suspense } from 'react';
import { getContact } from '@/lib/services/getContact';
import { routes } from '@/validations/routeSchema';
import ContactForm, { ContactFormSkeleton } from './_components/ContactForm';

type PageProps = {
  params: unknown;
};

export default async function EditContactPage({ params }: PageProps) {
  const { contactId } = routes.contactIdEdit.$parseParams(params);
  const contact = getContact(contactId);

  return (
    <Suspense fallback={<ContactFormSkeleton />}>
      <ContactForm contactPromise={contact} />
    </Suspense>
  );
}

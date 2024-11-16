import { Suspense } from 'react';
import { getContactDedupe } from '@/data/services/getContact';
import { routes } from '@/validations/routeSchema';
import ContactForm, { ContactFormSkeleton } from './_components/ContactForm';

type PageProps = {
  params: Promise<unknown>;
};

export default async function EditContactPage({ params }: PageProps) {
  const { contactId } = routes.contactIdEdit.$parseParams(await params);
  const contact = getContactDedupe(contactId);

  return (
    <Suspense fallback={<ContactFormSkeleton />}>
      <ContactForm contactPromise={contact} />
    </Suspense>
  );
}

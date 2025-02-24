import { getContactCache } from '@/data/services/getContact';
import { routes } from '@/validations/routeSchema';
import ContactForm from './_components/ContactForm';

type PageProps = {
  params: Promise<unknown>;
};

// TODO: Add with v15.2.0-canary.70
// export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
//   const { contactId } = routes.contactId.$parseParams(await params);
//   const contact = await getContactCache(contactId);

//   return contact && contact.first && contact.last
//     ? {
//         description: `Edit contact details for ${contact.first} ${contact.last}`,
//         title: `Edit: ${contact.first} ${contact.last}`,
//       }
//     : {
//         description: 'Edit contact details for an unnamed contact',
//         title: 'Edit: Unnamed Contact',
//       };
// }

export default async function EditContactPage({ params }: PageProps) {
  const { contactId } = routes.contactIdEdit.$parseParams(await params);
  const contact = getContactCache(contactId);

  return <ContactForm contactPromise={contact} />;
}

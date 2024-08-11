import { routes } from '@/validations/routeSchema';
import Contact from './_components/Contact';

type PageProps = {
  params: unknown;
};

// export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
//   const { contactId } = routes.contactId.$parseParams(params);
//   const contact = await getContact(contactId);

//   return contact && contact.first && contact.last
//     ? {
//         description: `Contact details for ${contact.first} ${contact.last}`,
//         title: `${contact.first} ${contact.last}`,
//       }
//     : {
//         description: 'Contact details for an unnamed contact',
//         title: 'Unnamed Contact',
//       };
// }

export default async function ContactPage({ params }: PageProps) {
  const { contactId } = routes.contactId.$parseParams(params);

  return <Contact contactId={contactId} />;
}

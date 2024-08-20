import Image from 'next/image';
import LinkButton from '@/components/ui/LinkButton';
import { getContactCache } from '@/lib/services/getContact';
import GithubLogo from '@/public/github-mark.svg';
import { routes } from '@/validations/routeSchema';
import DeleteContactButton from './_components/DeleteContactButton';
import Favorite from './_components/Favorite';

type PageProps = {
  params: unknown;
};

// // In local development, the `generateMetadata` will not be streamed and will block the page until it resolves, hindering the suspense boundary from showing.
// export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
//   const { contactId } = routes.contactId.$parseParams(params);
//   const contact = await getContactCache(contactId);

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
  const contact = await getContactCache(contactId);

  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      <div>
        {contact.avatar && (
          <Image
            priority
            width={192}
            height={192}
            className="mr-8 rounded-3xl bg-gray object-cover"
            alt={`${contact.first} ${contact.last} avatar`}
            key={contact.avatar}
            src={contact.avatar}
          />
        )}
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="flex-start flex items-center gap-4 text-3xl font-bold">
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{' '}
          <Favorite contact={contact} />
        </h1>

        {contact.position ? <p className="text-2xl">{contact.position}</p> : null}

        {contact.email ? (
          <p className="text-xl">
            <a href={'mailto:' + contact.email} className="no-underline hover:underline">
              {contact.email}
            </a>
          </p>
        ) : null}

        {contact.github ? (
          <div className="flex items-center gap-2">
            <div>
              <Image width={16} height={16} src={GithubLogo} alt="Github Logo" />
            </div>
            <p className="text-xl text-primary">
              <a target="_blank" className="no-underline hover:underline" href={`https://github.com/${contact.github}`}>
                {contact.github}
              </a>
            </p>
          </div>
        ) : null}

        {contact.notes ? <p>{contact.notes}</p> : null}

        <div className="my-4 flex gap-2">
          <LinkButton theme="secondary" href={routes.contactIdEdit({ contactId })}>
            Edit
          </LinkButton>
          <DeleteContactButton contactId={contactId} />
        </div>
      </div>
    </div>
  );
}

import Image from 'next/image';
import DeleteContactButton from '../../../components/DeleteContactButton';
import Favorite from '../../../components/Favorite';
import NavButton from '../../../components/NavButton';
import { getContact } from '../../../lib/services/getContact';
import GithubLogo from '@/public/github-mark.svg';

type PageProps = {
  params: {
    contactId: string;
  };
};

export default async function ContactPage({ params }: PageProps) {
  const contactId = decodeURIComponent(params.contactId);
  const contact = await getContact(contactId);

  return (
    <div className="flex max-w-[40rem]">
      <div>
        {contact.avatar && (
          <Image
            width={192}
            height={192}
            className="mr-8 rounded-3xl bg-gray-background object-cover"
            alt={`${contact.first} ${contact.last} avatar`}
            key={contact.avatar}
            src={contact.avatar}
          />
        )}
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="flex-start flex gap-4 text-3xl font-bold">
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
            <div className="h-4 w-4">
              <Image width={16} height={16} src={GithubLogo} alt="Github Logo" />
            </div>
            <p className="text-xl text-primary">
              <a
                target="_blank"
                className="text-primary no-underline hover:underline"
                href={`https://github.com/${contact.github}`}
              >
                {contact.github}
              </a>
            </p>
          </div>
        ) : null}

        {contact.notes ? <p>{contact.notes}</p> : null}

        <div className="my-4 flex gap-2">
          <NavButton href={`/contacts/${contactId}/edit`}>Edit</NavButton>
          <DeleteContactButton contactId={contactId} />
        </div>
      </div>
    </div>
  );
}

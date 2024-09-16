import { PrismaClient } from '@prisma/client';
import type { User } from '@prisma/client';

const prisma = new PrismaClient();

const CONTACTS = [
  {
    avatar:
      'https://media.licdn.com/dms/image/D4D03AQFrYA7kjR4Wqg/profile-displayphoto-shrink_200_200/0/1668631096577?e=1728518400&v=beta&t=xkw5B7ynjHXcosrUKipY2Y8NqWs0MtvyqhE2HvMBbhE',
    email: 'devlin.duldulao@inmeta.no',
    favorite: true,
    first: 'Devlin',
    github: 'webmasterdevlin',
    id: '0649cf60-ab42-4309-aaff-38c5677653d4',
    last: 'Duldulao',
    notes:
      'Recognized as a Microsoft MVP for developer technologies for five consecutive years, Devlin is a seasoned full-stack web developer specializing in front-end technologies. With broad experience encompassing mobile development and cloud technology, he stands as an authority in his field, which is showcased by his accomplishments as a conference speaker and author of three developer-focused books published by Packt and Apress.',
    position: 'Chief Consultant',
  },
  {
    avatar:
      'https://media.licdn.com/dms/image/D4D03AQHXcpkKQKm3NA/profile-displayphoto-shrink_200_200/0/1721032144371?e=1728518400&v=beta&t=9Nx4RikGOKUoGcke8r9E6-U8i6Lgatr6_4lX0_xjjII',
    email: 'aurora.scharff@inmeta.no',
    favorite: false,
    first: 'Aurora',
    github: 'aurorascharff',
    id: '1cd89022-64e8-4a76-aec6-43433478e32f',
    last: 'Scharff',
    notes:
      'Aurora er en dyktig frontend-utvikler og konsulent hos Inmeta. Med flere års erfaring fra arbeidslivet har hun håndtert komplekse prosjekter og jobbet med et bredt spekter av teknologier, inkludert håndtering av store datamengder og fokus på skalerbarhet.',
    position: 'Konsulent',
  },
  {
    avatar:
      'https://media.licdn.com/dms/image/v2/C5103AQEW-xbR-2s5UA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1516466254031?e=1729728000&v=beta&t=5VlIci2ZTpJZx0HJ1-RkK0-QP4aHlztY8rcwyzYS8uk',
    email: 'caspar.hoegh@inmeta.no',
    favorite: false,
    first: 'Caspar',
    id: '2b3b3b3b-64e8-4a76-aec6-43433478e32f',
    last: 'Høegh',
    notes:
      'Caspar er en erfaren arkitekt, utvikler og fagleder i MSDev avdelingen i Inmeta, med 13 års arbeidserfaring som fullstack-utvikler og en BcS fra HiBu (2013).',
    position: 'Seniorkonsulent / Arkitekt',
  },
];

const USERS: User[] = [
  {
    id: '2bccacd4-64de-4f1d-97ed-9722cdf99cd9',
    name: 'Jane Doe',
  },
  {
    id: '3ea4ae6c-adda-40eb-b254-9cfe0c8e8113',
    name: 'John Doe',
  },
];

const MESSAGES = [
  {
    contactId: '1cd89022-64e8-4a76-aec6-43433478e32f',
    content: 'Hello, how are you doing?',
    createdById: '3ea4ae6c-adda-40eb-b254-9cfe0c8e8113',
  },
  {
    contactId: '0649cf60-ab42-4309-aaff-38c5677653d4',
    content: 'Hi, how are you!',
    createdById: '2bccacd4-64de-4f1d-97ed-9722cdf99cd9',
  },
  {
    contactId: '2b3b3b3b-64e8-4a76-aec6-43433478e32f',
    content: 'Hello :)',
    createdById: '2bccacd4-64de-4f1d-97ed-9722cdf99cd9',
  },
];

async function seedContacts() {
  await Promise.all(
    CONTACTS.map(contact => {
      return prisma.contact.create({
        data: {
          avatar: contact.avatar,
          email: contact.email,
          favorite: contact.favorite,
          first: contact.first,
          github: contact.github,
          id: contact.id,
          last: contact.last,
          notes: contact.notes,
          position: contact.position,
        },
      });
    }),
  )
    .then(() => {
      return console.info('[SEED] Succussfully create contact records');
    })
    .catch(e => {
      return console.error('[SEED] Failed to create contact records', e);
    });

  await Promise.all(
    USERS.map(user => {
      return prisma.user.create({ data: { id: user.id, name: user.name } });
    }),
  )
    .then(() => {
      return console.info('[SEED] Succussfully create user records');
    })
    .catch(e => {
      return console.error('[SEED] Failed to create user records', e);
    });

  await Promise.all(
    MESSAGES.map(message => {
      return prisma.message.create({
        data: {
          contactId: message.contactId,
          content: message.content,
          createdById: message.createdById,
        },
      });
    }),
  )
    .then(() => {
      return console.info('[SEED] Succussfully create message records');
    })
    .catch(e => {
      return console.error('[SEED] Failed to create message records', e);
    });
}

seedContacts();

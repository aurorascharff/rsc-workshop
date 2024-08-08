import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const CONTACTS = [
  {
    avatar:
      'https://media.licdn.com/dms/image/D4D03AQFrYA7kjR4Wqg/profile-displayphoto-shrink_200_200/0/1668631096577?e=1728518400&v=beta&t=xkw5B7ynjHXcosrUKipY2Y8NqWs0MtvyqhE2HvMBbhE',
    email: 'devlin.duldulao@inmeta.no',
    favorite: true,
    first: 'Devlin',
    github: 'webmasterdevlin',
    last: 'Duldulao',
    position: 'Chief Consultant',
  },
  {
    avatar:
      'https://media.licdn.com/dms/image/D4D03AQHXcpkKQKm3NA/profile-displayphoto-shrink_200_200/0/1721032144371?e=1728518400&v=beta&t=9Nx4RikGOKUoGcke8r9E6-U8i6Lgatr6_4lX0_xjjII',
    email: 'aurora.scharff@inmeta.no',
    favorite: false,
    first: 'Aurora',
    github: 'aurorascharff',
    last: 'Scharff',
    position: 'Konsulent',
  },
];

function seedContacts() {
  Promise.all(
    CONTACTS.map(n => {
      return prisma.contact.create({
        data: {
          avatar: n.avatar,
          email: n.email,
          favorite: n.favorite,
          first: n.first,
          github: n.github,
          last: n.last,
          position: n.position,
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
}

seedContacts();

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const CONTACTS = [
  {
    avatar:
      'https://media.licdn.com/dms/image/D4D03AQFrYA7kjR4Wqg/profile-displayphoto-shrink_200_200/0/1668631096577?e=1723075200&v=beta&t=tDOKwL6oZgRXkC-i2KUPgqUfUVbfyaBqQ0KX1-_xC9g',
    email: 'devlin.duldulao@inmeta.no',
    favorite: true,
    first: 'Devlin',
    github: 'webmasterdevlin',
    last: 'Duldulao',
    position: 'Chief Consultant',
  },
  {
    avatar:
      'https://media.licdn.com/dms/image/D4D03AQEls0WFu3XSAQ/profile-displayphoto-shrink_400_400/0/1718224389043?e=1724284800&v=beta&t=82Hbka1jgP_r-6LsE3Un5ZhrzRG_3MbaIGkg8IRux3I',
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

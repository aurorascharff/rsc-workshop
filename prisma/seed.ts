import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const CONTACTS = [
  {
    avatar:
      'https://media.licdn.com/dms/image/D4D03AQFrYA7kjR4Wqg/profile-displayphoto-shrink_200_200/0/1668631096577?e=1723075200&v=beta&t=tDOKwL6oZgRXkC-i2KUPgqUfUVbfyaBqQ0KX1-_xC9g',
    favorite: true,
    first: 'Devlin',
    last: 'Duldulao',
    github: '@webmasterdevlin',
    email: 'devlin.duldulao@inmeta.no',
  },
  {
    avatar:
      'https://media.licdn.com/dms/image/D4D03AQEnOlZcEP5iOQ/profile-displayphoto-shrink_200_200/0/1686000056465?e=1723075200&v=beta&t=wfrlybg0hPmqqmPrH1waGDtjy06HVrFBhqAVpHDqtUE',
    favorite: true,
    first: 'Aurora',
    last: 'Scharff',
    github: '@aurorascharff',
    email: 'aurora.scharff@inmeta.no',
  },
];

function seedContacts() {
  Promise.all(
    CONTACTS.map(n => {
      return prisma.contact.create({
        data: {
          avatar: n.avatar,
          first: n.first,
          last: n.last,
          github: n.github,
          email: n.email,
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

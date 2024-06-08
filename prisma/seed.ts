import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const CONTACTS = [
  {
    avatar:
      'https://media.licdn.com/dms/image/D4D03AQFrYA7kjR4Wqg/profile-displayphoto-shrink_200_200/0/1668631096577?e=1723075200&v=beta&t=tDOKwL6oZgRXkC-i2KUPgqUfUVbfyaBqQ0KX1-_xC9g',
    favorite: true,
    first: 'Devlin',
    position: 'Chief Consultant',
    last: 'Duldulao',
    github: 'webmasterdevlin',
    email: 'devlin.duldulao@inmeta.no',
  },
  {
    avatar:
      'https://media.licdn.com/dms/image/D4D03AQEnOlZcEP5iOQ/profile-displayphoto-shrink_200_200/0/1686000056465?e=1723075200&v=beta&t=wfrlybg0hPmqqmPrH1waGDtjy06HVrFBhqAVpHDqtUE',
    favorite: false,
    first: 'Aurora',
    position: 'Konsulent',
    last: 'Scharff',
    github: 'aurorascharff',
    email: 'aurora.scharff@inmeta.no',
  },
  {
    avatar:
      'https://media.licdn.com/dms/image/C4E03AQHAhn3cB29yCQ/profile-displayphoto-shrink_400_400/0/1597822542155?e=1723075200&v=beta&t=GcB7_HRRPU6DDJlqBa-aWB6Ucw2XQC_ihXUckj3GTgQ',
    favorite: true,
    first: 'Mohammad',
    position: 'Head of Engineering',
    last: 'Yassin',
    email: 'mohammad.yassin@inmeta.no',
  },
  {
    avatar:
      'https://media.licdn.com/dms/image/C5603AQEQqxVKZtLmLw/profile-displayphoto-shrink_200_200/0/1523361335746?e=1723075200&v=beta&t=8MORN6bIjwxVzooGAnqMTWkO4cTI7qZiSMToso5jRvc',
    favorite: true,
    first: 'Jon',
    position: 'Leder MSDev',
    last: 'Sandvand',
    email: 'jon.sandvand@inmeta.no',
  },
  {
    avatar:
      'https://media.licdn.com/dms/image/C5103AQEW-xbR-2s5UA/profile-displayphoto-shrink_200_200/0/1516466254031?e=1723075200&v=beta&t=7mMVUobGkrZ_dpyHsfP0m7jsh0EM-9AIePSbbuOBYRU',
    favorite: false,
    first: 'Caspar',
    position: 'Seniorkonsulent/ Arkitekt',
    last: 'Høegh',
    email: 'caspar.hoegh@inmeta.no',
  },
  {
    avatar:
      'https://media.licdn.com/dms/image/C4E03AQGoRdgleJrNJw/profile-displayphoto-shrink_200_200/0/1533665491993?e=1723075200&v=beta&t=1ERUHpy6L9hHskcWgSNO5DXlzimxr7NIxb4OB5mdWMo',
    favorite: false,
    first: 'Ola',
    position: 'Nestleder',
    last: 'Solberg',
    email: 'ola.solberg@inmeta.no',
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
          favorite: n.favorite,
          github: n.github,
          position: n.position,
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

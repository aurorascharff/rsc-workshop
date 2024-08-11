export const revalidationKeys = {
  contact: (contactId: string) => {
    return `contact-${contactId}`;
  },
  contacts: 'contacts',
} as const;

export const queryKeys = {
  contacts: 'contacts',
} as const;

export const cacheKeys = {
  contact: 'contact',
} as const;

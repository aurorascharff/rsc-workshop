import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateContact } from '@/lib/actions/updateContact';
import type { Contact } from '@prisma/client';

export default function useUpdateContact() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: contact => {
      return updateContact(contact.id, contact);
    },
    onError: (_err, _variables, context) => {
      if (context?.backup) queryClient.setQueryData<Contact[]>(['contacts'], context.backup.data);
    },

    onMutate: async (contact: Contact) => {
      await queryClient.cancelQueries({ queryKey: ['contacts'] });

      const backup = queryClient.getQueryData<{ data: Contact[] }>(['contacts']);

      if (backup)
        queryClient.setQueryData<{ data: Contact[] }>(['contacts'], {
          data: [
            ...backup.data.map(h => {
              return h.id === contact.id ? contact : h;
            }),
          ],
        });

      return { backup };
    },
    onSettled: () => {
      return queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });
}

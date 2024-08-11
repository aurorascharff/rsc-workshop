import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { deleteContact } from '@/lib/actions/deleteContact';
import { routes } from '@/validations/routeSchema';
import type { Contact } from '@prisma/client';

export default function useDeleteContact() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: contactId => {
      return deleteContact(contactId);
    },
    onError: (_err, _variables, context) => {
      if (context?.backup) queryClient.setQueryData<Contact[]>(['contacts'], context.backup.data);
    },

    onMutate: async (contactId: string) => {
      await queryClient.cancelQueries({ queryKey: ['contacts'] });
      const backup = queryClient.getQueryData<{ data: Contact[] }>(['contacts']);

      if (backup)
        queryClient.setQueryData<{ data: Contact[] }>(['contacts'], {
          data: [
            ...backup.data.filter(h => {
              return h.id !== contactId;
            }),
          ],
        });

      router.push(routes.home());
      return { backup };
    },
    onSettled: () => {
      return queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });
}

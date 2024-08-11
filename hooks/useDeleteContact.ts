import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { queryKeys } from '@/constants/revalidationKeys';
import { deleteContact } from '@/lib/actions/deleteContact';
import { routes } from '@/validations/routeSchema';
import type { Contact } from '@prisma/client';

export default function useDeleteContact() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (contactId: string) => {
      return deleteContact(contactId);
    },
    onSettled: contact => {
      if (!contact) return;
      router.push(routes.home());
    },
    onSuccess: contact => {
      queryClient.setQueryData<Contact[]>([queryKeys.contacts], cache => {
        return cache
          ? [
              ...cache.filter(c => {
                return c.id !== contact.id;
              }),
            ]
          : [];
      });
    },
  });
}

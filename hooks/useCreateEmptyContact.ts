import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { queryKeys } from '@/constants/revalidationKeys';
import { createEmptyContact } from '@/lib/actions/createEmptyContact';
import { routes } from '@/validations/routeSchema';
import type { Contact } from '@prisma/client';

export default function useCreateEmptyContact() {
  const queryClient = useQueryClient();

  const router = useRouter();

  return useMutation({
    mutationFn: () => {
      return createEmptyContact();
    },
    onSettled: contact => {
      if (!contact) return;
      router.push(routes.contactIdEdit({ contactId: contact.id }));
    },
    onSuccess: contact => {
      queryClient.setQueryData<Contact[]>([queryKeys.contacts], cache => {
        return cache ? [...cache, contact] : [contact];
      });
    },
  });
}

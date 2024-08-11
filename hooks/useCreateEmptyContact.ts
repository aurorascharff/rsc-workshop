import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
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
    onSuccess: contact => {
      queryClient.setQueryData<{ data: Contact[] }>(['contacts'], cache => {
        return cache?.data ? { data: [...cache.data, contact] } : { data: [contact] };
      });
      router.push(routes.contactIdEdit({ contactId: contact.id }));
    },
  });
}

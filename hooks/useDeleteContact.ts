import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { queryKeys } from '@/constants/revalidationKeys';
import { deleteContact } from '@/lib/actions/deleteContact';
import type { Contact } from '@prisma/client';
import { routes } from '@/validations/routeSchema';
import { useRouter } from 'next/navigation';

export default function useDeleteContact() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (contactId: string) => {
      return deleteContact(contactId);
    },
    onMutate: () => {
      router.push(routes.home());
    },
    onError: error => {
      toast.error('Failed to delete contact');
    },
    onSuccess: contact => {
      toast.success('Contact deleted');
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

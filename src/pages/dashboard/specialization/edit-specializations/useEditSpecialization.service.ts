/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from '@/components/ui/use-toast';
import { queryClient } from '@/providers';
import { usePATCH } from '@/hooks/usePATCH.hook';
import { SpecializationItems } from '@/types/specialization';

export const useEditSpecialization = (specialization: SpecializationItems) => {
  const { mutate, isPending } = usePATCH(
    `specializations/${specialization?.id}`,
    {
      contentType: 'application/json',
      method: 'PUT',
    }
  );

  const editSpecialization = async (data: any) => {
    return new Promise<void>((resolve, reject) => {
      mutate(data, {
        onSuccess: response => {
          const title = response.title;
          const keywords =
            response.keywords
              ?.map((kw: { keyword: string }) => kw.keyword)
              .join(', ') || 'N/A';

          toast({
            title: 'Success',
            description: `You have successfully modified the specialization, ${title}, with the keywords - ${keywords}.`,
            variant: 'default',
          });

          queryClient.invalidateQueries({
            predicate: (query: any) =>
              query.queryKey.includes(['specialization', 'keywords']),
          });

          resolve();
        },
        onError: (error: any) => {
          const errorMessages = Array.isArray(error.detail)
            ? error.detail.map((err: { msg: string }) => err.msg).join(', ')
            : 'An unexpected error occurred';

          toast({
            title: 'Error',
            description: errorMessages,
            variant: 'destructive',
          });

          reject(error);
        },
      });
    });
  };

  return { editSpecialization, isPending };
};

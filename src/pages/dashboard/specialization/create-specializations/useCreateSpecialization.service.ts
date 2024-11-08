/* eslint-disable @typescript-eslint/no-explicit-any */
import { usePOST } from '@/hooks/usePOST.hook';
import { toast } from '@/components/ui/use-toast';

export const useCreateSpecialization = () => {
  const { mutate, isPending } = usePOST('specializations', {
    contentType: 'application/json',
  });

  const createSpecialization = async (data: any) => {
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
            description: `You have successfully created the specialization, ${title}, with the keywords - ${keywords}.`,
            variant: 'default',
          });

          resolve();
        },
        onError: (error: any) => {
          const errorMessage = Array.isArray(error.detail)
            ? error.detail[0]?.msg || 'An error occurred'
            : error.detail || 'An unexpected error occurred';

          toast({
            title: 'Error',
            description: errorMessage,
            variant: 'destructive',
          });

          reject(error);
        },
      });
    });
  };

  return { createSpecialization, isPending };
};

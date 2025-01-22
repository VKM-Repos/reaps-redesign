/* eslint-disable @typescript-eslint/no-explicit-any */
import RenderDeleteSheet from '@/components/custom/DeleteSheet';
import Delete from '@/components/custom/Icons/Delete';
import Loader from '@/components/custom/Loader';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import { toast } from '@/components/ui/use-toast';
import { useDELETE } from '@/hooks/useDelete.hook';
import { useGET } from '@/hooks/useGET.hook';
import { SpecializationItems } from '@/types/specialization';

type Props = {
  specialization: SpecializationItems;
};

const DeleteSpecialization = ({ specialization }: Props) => {
  const { mutate, isPending } = useDELETE(
    `specializations/${specialization.id}`,
    {
      withAuth: true,
    }
  );

  const { refetch } = useGET({
    queryKey: ['specialization', 'keywords'],
    url: 'specializations',
    withAuth: true,
  });

  return (
    <>
      {isPending && <Loader />}
      <Sheet>
        <SheetTrigger className="px-0">
          <Delete />
        </SheetTrigger>
        <RenderDeleteSheet
          text="Are you sure you want to delete this specialization?"
          data={specialization}
          deleteItem={data => {
            mutate(data.id, {
              onSuccess: () => {
                toast({
                  title: 'Success',
                  description: `You have successfully deleted the specialization`,
                  variant: 'default',
                });
                refetch();
              },
              onError: (error: any) => {
                const errorMessages = Array.isArray(error.detail)
                  ? error.detail
                      .map((err: { msg: string }) => err.msg)
                      .join(', ')
                  : 'An unexpected error occurred';

                toast({
                  title: 'Error',
                  description: errorMessages,
                  variant: 'destructive',
                });

                refetch();
              },
            });
          }}
        />
      </Sheet>
    </>
  );
};

export default DeleteSpecialization;

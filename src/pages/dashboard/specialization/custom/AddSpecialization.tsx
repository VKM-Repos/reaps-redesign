import AddIcon from '@/components/custom/Icons/AddIcon';
import HoverCancel from '@/components/custom/Icons/HoverCancel';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useMediaQuery } from 'react-responsive';
import Specialization from '../create-specializations/CreateSpecializaton';
import AddKeyword from '../create-specializations/AddKeyword';
import { useSpecializationsStore } from '@/store/specializationsFormStore';
import { useState } from 'react';
import { useCreateSpecialization } from '../create-specializations/useCreateSpecialization.service';
import Loader from '@/components/custom/Loader';
import { ChevronLeft } from 'lucide-react';
import { useGET } from '@/hooks/useGET.hook';

const AddSpecialization = () => {
  const { data, step, setStep, resetStore } = useSpecializationsStore();
  const { createSpecialization, isPending } = useCreateSpecialization();
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const [open, setOpen] = useState(false);

  const handleNext = () => setStep(step + 1);
  const handlePrevious = () => setStep(step - 1);
  const { refetch } = useGET({
    queryKey: ['specialization', 'keywords'],
    url: 'specializations',
    withAuth: true,
  });
  const onSubmitHandler = async () => {
    const formData = new FormData();
    try {
      const specialization = data?.specializationsDetails.title ?? '';
      formData.append('title', specialization);
      const keywords = Array.isArray(data?.specializationsDetails.keyword)
        ? data?.specializationsDetails.keyword.join(', ')
        : data?.specializationsDetails.keyword ?? '';

      formData.append('keywords', keywords);
      await createSpecialization(formData);
      refetch();
      resetStore();
      setOpen(false);
    } catch (error) {
      console.error('Error creating specialization', error);
    }
  };

  const RenderDialog = () => {
    switch (step) {
      case 1:
        return <Specialization handleNext={handleNext} />;
      case 2:
        return <AddKeyword handleNext={onSubmitHandler} />;
      default:
        return null;
    }
  };

  return (
    <>
      {isPending && <Loader />}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button className="flex max-w-[16.75rem] items-center justify-center gap-4 px-6 py-3">
            <span>
              <AddIcon />
            </span>
            Add New specialization
          </Button>
        </SheetTrigger>
        <SheetContent
          side={isMobile ? 'bottom' : 'top'}
          className={` ${isMobile ? 'inset-x-auto inset-y-0' : 'inset-x-[30%] inset-y-auto rounded-3xl md:!pb-12 md:!pt-0'} mx-auto overflow-y-hidden px-2 focus-visible:outline-none md:max-w-[30rem]`}
        >
          {step > 1 && (
            <button
              onClick={handlePrevious}
              className="absolute left-5 top-[2rem] mx-auto flex w-fit items-center rounded-full !px-4 py-2 opacity-70 transition-opacity hover:bg-[#14155E14] hover:opacity-100 focus:outline-none disabled:pointer-events-none"
            >
              <ChevronLeft size={24} />
              go back
            </button>
          )}
          <SheetClose className="absolute right-6 mx-auto flex w-fit rounded-full !px-0 py-0 opacity-70 transition-opacity hover:bg-[#14155E14] hover:opacity-100 focus:outline-none disabled:pointer-events-none">
            <HoverCancel />
          </SheetClose>
          <div className="flex h-full w-full flex-col gap-[2.5rem] border-none md:max-h-[26.5rem]">
            <RenderDialog />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default AddSpecialization;

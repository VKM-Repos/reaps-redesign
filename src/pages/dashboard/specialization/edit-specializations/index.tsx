import EditKeyword from './EditKeywords';
import EditSpecialization from './EditSpecialization';
import Loader from '../../../../components/custom/Loader';
import HoverCancel from '@/components/custom/Icons/HoverCancel';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useMediaQuery } from 'react-responsive';
import { SpecializationItems } from '@/types/specialization';
import { useState } from 'react';
import PencilEdit from '@/components/custom/Icons/PencilEdit';
import { ChevronLeft } from 'lucide-react';
import { useEditSpecialization } from './useEditSpecialization.service';
import { useGET } from '@/hooks/useGET.hook';

type Props = {
  specialization: SpecializationItems;
};

const ModifySpecialization = ({ specialization }: Props) => {
  const { editSpecialization, isPending } =
    useEditSpecialization(specialization);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: specialization.title,
    keywords: specialization.keywords,
  });

  const { refetch } = useGET({
    queryKey: ['specialization', 'keywords'],
    url: 'specializations',
    withAuth: true,
  });

  const handleNext = () => setStep(step + 1);
  const handlePrevious = () => setStep(step - 1);

  const handleSubmit = async () => {
    const formValues = new FormData();
    try {
      console.log('Submitting:', formData);
      formValues.append('title', formData.title);

      const keywords = Array.isArray(formData.keywords)
        ? formData.keywords.map(k => k.keyword).join(', ')
        : formData.keywords ?? '';
      formValues.append('keywords', keywords);

      await editSpecialization(formData);
      refetch();
      setOpen(false);
    } catch (error) {
      console.error('Error modifying specialization', error);
    }
  };

  const RenderEdit = () => {
    switch (step) {
      case 1:
        return (
          <EditSpecialization
            handleNext={handleNext}
            data={formData.title}
            setData={title => setFormData(prev => ({ ...prev, title }))}
          />
        );
      case 2:
        return (
          <EditKeyword
            data={formData.keywords}
            setData={keywords => setFormData(prev => ({ ...prev, keywords }))}
            handleNext={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {isPending && <Loader />}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button>
            <PencilEdit />
          </button>
        </SheetTrigger>
        <SheetContent
          side={isMobile ? 'bottom' : 'top'}
          className={`${isMobile ? 'inset-x-auto inset-y-0' : 'inset-x-[30%] inset-y-auto rounded-3xl md:!pb-12 md:!pt-0'} mx-auto overflow-y-hidden px-2 focus-visible:outline-none md:max-w-[30rem]`}
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
            <RenderEdit />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ModifySpecialization;

import { useSpecializationsStore } from '@/store/specializationsFormStore';
import EditKeyword from './EditKeywords';
import EditSpecialization from './EditSpecialization';
import Loader from '../../../../components/custom/Loader';
import { SheetClose, SheetContent } from '@/components/ui/sheet';
import { useMediaQuery } from 'react-responsive';
import HoverCancel from '@/components/custom/Icons/HoverCancel';

type EditProps = {
  step: number;
  specialization: string;
  keywordArray: [];
  handleNext: () => void;
  onSaveSpecializations: (specialization: string) => void;
  onSaveKeywords: (keywords: string[]) => void;
};

function EditSpecializations({
  step,
  specialization,
  keywordArray,
  handleNext,
  onSaveSpecializations,
  onSaveKeywords,
}: EditProps) {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const { data, resetStore, loading, setLoading } = useSpecializationsStore();

  const RenderEdit = () => {
    async function handleSubmit() {
      const formData = new FormData();
      setLoading(true);
      try {
        const specialization =
          data?.specializationsDetails.specialization ?? '';
        formData.append('specialization', specialization);

        const keywords = Array.isArray(data?.specializationsDetails.keyword)
          ? data?.specializationsDetails.keyword.join(', ')
          : data?.specializationsDetails.keyword ?? '';
        formData.append('keyword', keywords);

        setTimeout(() => {
          handleNext();

          setLoading(false);
          resetStore();
        }, 5000);
      } catch (error) {
        console.error(error);
      }
    }

    switch (step) {
      case 1:
        return (
          <EditSpecialization
            handleNext={handleNext}
            specialization={specialization}
            onSave={onSaveSpecializations}
          />
        );

      case 2:
        return (
          <EditKeyword
            keywordArray={keywordArray}
            handleNext={handleSubmit}
            onSave={onSaveKeywords}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {loading && <Loader />}
      <SheetContent
        side={isMobile ? 'bottom' : 'top'}
        className={` ${isMobile ? 'inset-x-auto inset-y-0' : 'inset-x-[30%] inset-y-auto rounded-3xl md:!pb-12 md:!pt-0'} mx-auto overflow-y-hidden px-2 focus-visible:outline-none md:max-w-[30rem]`}
      >
        <SheetClose className="absolute right-6 mx-auto flex w-fit rounded-full !px-0 py-0 opacity-70 transition-opacity hover:bg-[#14155E14] hover:opacity-100 focus:outline-none disabled:pointer-events-none">
          <HoverCancel />
        </SheetClose>
        <div
          className={`flex h-full w-full flex-col gap-[2.5rem] border-none md:max-h-[26.5rem]`}
        >
          <RenderEdit />
        </div>
      </SheetContent>
    </>
  );
}

export default EditSpecializations;

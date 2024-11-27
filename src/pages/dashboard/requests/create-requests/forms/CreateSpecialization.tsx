import { useSpecializationsStore } from "@/store/specializationsFormStore";
import Specialization from "@/pages/dashboard/specialization/create-specializations/CreateSpecializaton";
import AddKeyword from "@/pages/dashboard/specialization/create-specializations/AddKeyword";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useMediaQuery } from "react-responsive";
import HoverCancel from "@/components/custom/Icons/HoverCancel";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Loader from "@/components/custom/Loader";
import { useCreateSpecialization } from "@/pages/dashboard/specialization/create-specializations/useCreateSpecialization.service";
import { useGET } from "@/hooks/useGET.hook";
import { ChevronLeft } from "lucide-react";

type Props = {
  handleSpecNext: () => void;
};

const RequestSpecialization = ({ handleSpecNext }: Props) => {
  const { step, setStep, resetStore } = useSpecializationsStore();
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const { createSpecialization, isPending } = useCreateSpecialization();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleNext = () => setStep(step + 1);
  const handlePrevious = () => setStep(step - 1);
  const { refetch } = useGET({
    queryKey: ["specialization", "keywords"],
    url: "specializations",
    withAuth: true,
  });

  const onSubmitHandler = async () => {
    setLoading(true);
    try {
      const { data } = useSpecializationsStore.getState();
      const payload = {
        title: data?.specializationsDetails?.title,
        keywords: Array.isArray(data?.specializationsDetails.keyword)
          ? data?.specializationsDetails.keyword.join(", ")
          : data?.specializationsDetails.keyword ?? "",
      };

      await createSpecialization(payload);
      refetch();
      resetStore();
      setOpen(false);
      handleSpecNext();
    } catch (error) {
      console.error("Error creating specialization", error);
    } finally {
      setLoading(false);
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
      {isPending || (loading && <Loader />)}
      <div className="flex flex-col gap-[1.25rem] my-8 px-4">
        <div className="w-full my-0 mx-auto flex flex-col justify-center items-center">
          <div className="flex flex-col gap-8 w-full max-w-[37rem] text-center">
            <h1 className="text-[1.625rem] leading-8 font-bold">
              You need to create a specialization first
            </h1>
            <p>
              It is required to create your specialization before you can
              request ethics approval
            </p>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button className="flex gap-4 items-center justify-center py-3 px-6">
                  Create specialization
                </Button>
              </SheetTrigger>
              <SheetContent
                side={isMobile ? "bottom" : "top"}
                className={` ${
                  isMobile
                    ? "inset-y-0 inset-x-auto"
                    : "inset-y-auto inset-x-[30%] rounded-3xl md:!pb-12 md:!pt-0"
                } mx-auto px-2 md:max-w-[30rem] focus-visible:outline-none overflow-y-hidden`}
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

                <SheetClose className="absolute right-6 w-fit mx-auto py-0 !px-0 flex opacity-70 rounded-full hover:bg-[#14155E14] transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none">
                  <HoverCancel />
                </SheetClose>
                <div
                  className={`h-full md:max-h-[26.5rem] border-none w-full flex flex-col gap-[2.5rem]`}
                >
                  <RenderDialog />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </>
  );
};

export default RequestSpecialization;

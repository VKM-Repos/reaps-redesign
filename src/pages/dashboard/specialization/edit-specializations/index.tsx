import { useState } from "react";
import { useSpecializationsStore } from "@/context/specializationsFormStore";
import EditKeyword from "./EditKeywords";
import EditSpecialization from "./EditSpecialization";
import Loader from "../../../../components/custom/Loader";
import { SheetClose, SheetContent } from "@/components/ui/sheet";
import HoverCancel from "@/components/custom/Icons/HoverCancel";



type EditProps = {
    step: number;
    specialization: string;
    keywordArray: [];
    handleNext: Function;
    onSaveSpecializations: (specialization: string) => void
    onSaveKeywords: (keywords: string[]) => void

}

function EditSpecializations({step, specialization, keywordArray, handleNext, onSaveSpecializations, onSaveKeywords }: EditProps) {
    const [isLoading, setIsLoading] = useState(false);
    
    let formData = new FormData();
    function handleSubmit() {
        setIsLoading(true);
        try {
            const { data } = useSpecializationsStore.getState();
                const specialization = data?.specializationsDetails.specialization ?? '';
                formData.append("specialization", specialization);
                const keywords = Array.isArray(data?.specializationsDetails.keyword)
                    ? data?.specializationsDetails.keyword.join(', ')
                    : data?.specializationsDetails.keyword ?? '';
                formData.append("keyword", keywords);
                

                handleNext();
            } catch (error) {
                console.error(error);
            }
            finally {
                setIsLoading(false);
            }
        }


  return (
    <>
        {isLoading && <Loader /> }
        <SheetContent side="top" className="inset-y-auto inset-l-auto inset-x-[30%] mx-auto rounded-3xl px-6 pb-16 px-2">
            <SheetClose className="md:pr-4 w-[90%] md:absolute md:py-0 md:right-6 md:w-fit mx-auto py-4 !px-0 flex rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none"><HoverCancel /></SheetClose>
            <div className="md:max-w-[30rem] md:max-h-[26.5rem] rounded-3xl border-none pb-8 w-full flex flex-col gap-[2.5rem]">
                {step == 1 && (
                    <>
                        <EditSpecialization handleNext={handleNext} specialization={specialization} onSave={onSaveSpecializations}/>
                    </>
                )}
                {step == 2 && (
                    <>
                        <EditKeyword keywordArray={keywordArray} handleNext={handleSubmit} onSave={onSaveKeywords}/>
                    </>
                )}
            </div>
        </SheetContent>
    </>
  )
}

export default EditSpecializations


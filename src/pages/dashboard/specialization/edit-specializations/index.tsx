import { useState } from "react";
import { useSpecializationsStore } from "@/context/specializationsFormStore";
import EditKeyword from "./EditKeywords";
import EditSpecialization from "./EditSpecialization";
import Loader from "../../../../components/custom/Loader";
import { SheetClose, SheetContent } from "@/components/ui/sheet";
import HoverCancel from "@/components/custom/Icons/HoverCancel";
import { useMediaQuery } from "react-responsive";



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
    const isMobile = useMediaQuery({query: '(max-width: 768px)'});
    
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
                setTimeout(() => { 
                    setIsLoading(false); 
                    handleNext();
                  }, 5000);
                
            } catch (error) {
                console.error(error);
            }
        }


  return (
    <>
        {isLoading && <Loader /> }
        <SheetContent side={isMobile ? "bottom" : "top"} className={` ${isMobile ? "inset-y-0 inset-x-auto" : "inset-y-auto inset-x-[30%] rounded-3xl md:!pb-12 md:!pt-0"} mx-auto px-2 md:max-w-[30rem] focus-visible:outline-none overflow-y-hidden`}>
            <SheetClose className="absolute right-6 w-fit mx-auto py-0 !px-0 flex opacity-70 rounded-full hover:bg-[#14155E14] transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none"><HoverCancel /></SheetClose>
            <div className={`h-full md:max-h-[26.5rem] border-none w-full flex flex-col gap-[2.5rem]`}>  
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


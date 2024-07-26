import { DialogContent } from "../../../../components/ui/dialog"
import { useState } from "react";
import { useSpecializationsStore } from "@/context/specializationsFormStore";
import EditKeyword from "./EditKeywords";
import EditSpecialization from "./EditSpecialization";
import Loader from "../../../../components/custom/Loader";



type EditProps = {
    step: number;
    specialization: string;
    keywordArray: [];
    handleNext: Function;
    onSaveSpecializations: (specialization: string) => void
    onSaveKeywords: (keywords: string[]) => void

  }

function EditDialog({step, specialization, keywordArray, handleNext, onSaveSpecializations, onSaveKeywords }: EditProps) {
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
        console.log(step);


  return (
    <>
    {isLoading && <Loader /> }
    <DialogContent className="px-2 md:max-w-[30rem] md:max-h-[26.5rem] rounded-3xl border-none px-6 pb-8 w-full flex flex-col gap-[2.5rem]">
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
        
    </DialogContent>
</>
  )
}

export default EditDialog


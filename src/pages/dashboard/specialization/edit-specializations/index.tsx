import { useSpecializationsStore } from "@/context/specializationsFormStore";
import EditKeyword from "./EditKeywords";
import EditSpecialization from "./EditSpecialization";
import Loader from "../../../../components/custom/Loader";
import { SheetClose, SheetContent } from "@/components/ui/sheet";
import { useMediaQuery } from "react-responsive";

type EditProps = {
    step: number;
    specialization: string;
    keywordArray: [];
    handleNext: Function;
    onSaveSpecializations: (specialization: string) => void
    onSaveKeywords: (keywords: string[]) => void

}

function EditSpecializations({ step, specialization, keywordArray, handleNext, onSaveSpecializations, onSaveKeywords }: EditProps) {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const { data, resetStore, loading, setLoading } = useSpecializationsStore();

    
    async function handleSubmit() {
        const formData = new FormData();
        setLoading(true);
        try {
            const specialization = data?.specializationsDetails.specialization ?? '';
            formData.append("specialization", specialization);

            const keywords = Array.isArray(data?.specializationsDetails.keyword)
                ? data?.specializationsDetails.keyword.join(', ')
                : data?.specializationsDetails.keyword ?? '';
            formData.append("keyword", keywords);

            setTimeout(() => {
                handleNext();
                resetStore();
                setLoading(false);
            }, 5000)

        } catch (error) {
            console.error(error);
        } 
    }


    return (
        <>
            {loading && <Loader />}
            <SheetContent side={isMobile ? "bottom" : "top"} className={` ${isMobile ? "inset-y-0 inset-x-auto" : "inset-y-auto inset-x-[30%] rounded-3xl md:!pb-12 md:!pt-0"} mx-auto px-2 md:max-w-[30rem] focus-visible:outline-none overflow-y-hidden`}>
                <SheetClose className="absolute right-6 w-fit mx-auto py-0 !px-0 flex opacity-70 rounded-full hover:bg-[#14155E14] transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none" />
                <div className={`h-full md:max-h-[26.5rem] border-none w-full flex flex-col gap-[2.5rem]`}>
                    {step === 1 && (
                        <>
                            <EditSpecialization handleNext={handleNext} specialization={specialization} onSave={onSaveSpecializations} />
                        </>
                    )}
                    {step === 2 && (
                        <>
                            <EditKeyword keywordArray={keywordArray} handleNext={handleSubmit} onSave={onSaveKeywords} />
                        </>
                    )}
                </div>
            </SheetContent>
        </>
    );
}

export default EditSpecializations;
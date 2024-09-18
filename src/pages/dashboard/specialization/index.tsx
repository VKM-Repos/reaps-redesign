import { SpecializationsStore, useSpecializationsStore } from "@/store/specializationsFormStore"
import { useForm, SubmitHandler } from "react-hook-form";
import Specialization from "@/pages/dashboard/specialization/create-specializations/CreateSpecializaton"
import AddKeyword from "@/pages/dashboard/specialization/create-specializations/AddKeyword"
import SpecialisationsTable from "@/pages/dashboard/specialization/custom/TableSpecialisations"
import EmptySpecializations from "@/pages/dashboard/specialization/custom/EmptySpecialization"
import { Button } from "@/components/ui/button";
import AddIcon from "@/components/custom/Icons/AddIcon";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useMediaQuery } from "react-responsive";
import HoverCancel from "@/components/custom/Icons/HoverCancel";
import Loader from "@/components/custom/Loader";

const tableData = [
    {
        id: "1",
        specialization: 'MBBS',
        keyword: ["Surgery", "Bone", ]
    },
    {
        id: "2",
        specialization: 'Law',
        keyword: ["Judiciary", "Executive", ]
    },
    {
        id: "3",
        specialization: 'MBBS',
        keyword: ["Surgery", "Bone", ]
    },
    {
        id: "4",
        specialization: 'MBBS',
        keyword: ["Surgery", "Bone", ]
    }
]

const CreateSpecialization = () => {
    const { step, setStep, resetStore, loading, setLoading } = useSpecializationsStore();
    const isMobile = useMediaQuery({query: '(max-width: 768px)'});

    const DrawerData = new FormData();

    const RenderDialog = () => {
        const handleNext = () => {
            setStep(step + 1);   
        };

        const createSpecializationsDetails = async () => {
            setLoading(true);
            try {
                const { data } = useSpecializationsStore.getState();
                const specialization = data?.specializationsDetails.specialization ?? '';
                DrawerData.append("specialization", specialization);
                const keywords = Array.isArray(data?.specializationsDetails.keyword)
                    ? data?.specializationsDetails.keyword.join(', ')
                    : data?.specializationsDetails.keyword ?? '';
                DrawerData.append("keyword", keywords);

                setTimeout(() => {
                    resetStore();
                    setLoading(false);
                }, 5000)
            }
            catch (error: any) {
                console.error("Error creating form", error);
            }
        }

        const { handleSubmit } = useForm<SpecializationsStore>();
        const onSubmitHandler: SubmitHandler<SpecializationsStore> = async () => {
            await handleSubmit(createSpecializationsDetails)();

        };

       
        switch (step) {
            case 1: 
                return <Specialization handleNext={handleNext} />
            case 2: 
                return <AddKeyword handleNext={onSubmitHandler}/>
            default:
                return null;
        }

    }
    return (
        <>
        {loading && <Loader />}
            <div className="flex flex-col gap-[1.25rem]">
                <div className="flex flex-col md:flex-row gap-5 md:gap-auto justify-between md:items-center mx-auto w-full">
                    <h1 className="text-[1.875rem] font-bold">Specializations</h1>
                    {tableData.length > 0 &&
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button className="flex gap-4 items-center justify-center py-3 px-6 max-w-[16.75rem]"><span><AddIcon /></span>Add New specialization</Button>
                            </SheetTrigger>
                            <SheetContent side={isMobile ? "bottom" : "top"} className={` ${isMobile ? "inset-y-0 inset-x-auto" : "inset-y-auto inset-x-[30%] rounded-3xl md:!pb-12 md:!pt-0"} mx-auto px-2 md:max-w-[30rem] focus-visible:outline-none overflow-y-hidden`}>
                                <SheetClose className="absolute right-6 w-fit mx-auto py-0 !px-0 flex opacity-70 rounded-full hover:bg-[#14155E14] transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none"><HoverCancel /></SheetClose>
                                <div className={`h-full md:max-h-[26.5rem] border-none w-full flex flex-col gap-[2.5rem]`}>
                                    <RenderDialog />
                                </div>
                            </SheetContent>  
                        </Sheet>
                    }
                </div>
                <div className="w-full my-0 mx-auto flex flex-col justify-center items-center">
                    <>
                        {tableData.length > 0 ? 
                            <SpecialisationsTable tableData={tableData} />
                            :
                            <EmptySpecializations>
                                <RenderDialog />
                            </EmptySpecializations>
                        }
                    </>
                </div>
            </div>
        </>
        
    )
}




export default CreateSpecialization
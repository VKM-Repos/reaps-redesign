import { SpecializationsStore, useSpecializationsStore } from "@/context/specializationsFormStore"
import { useForm, SubmitHandler } from "react-hook-form";
import Specialization from "@/components/forms/specializationsPage/specialization"
import AddKeyword from "@/components/forms/specializationsPage/AddKeyword"
import SpecialisationsTable from "@/components/forms/specializationsPage/TableSpecialisations"
import EmptySpecializations from "@/components/custom/EmptySpecialization"
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AddIcon from "@/components/custom/Icons/AddIcon";

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
    const { step, setStep, resetStore } = useSpecializationsStore();

    const dialogData = new FormData();

    const RenderDialog = () => {
        if (step === 3) {
            resetStore();
        }

        const handleNext = () => {
            setStep(step + 1);
            
        };

        const createSpecializationsDetails = async () => {
            try {
                const { data } = useSpecializationsStore.getState();
                const specialization = data?.specializationsDetails.specialization ?? '';
                dialogData.append("specialization", specialization);
                const keywords = Array.isArray(data?.specializationsDetails.keyword)
                    ? data?.specializationsDetails.keyword.join(', ')
                    : data?.specializationsDetails.keyword ?? '';
                dialogData.append("keyword", keywords);

                setTimeout(() => {
                    handleNext();
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
        <div className="flex flex-col gap-[1.25rem]">
            <div className="flex justify-between">
                <h1 className="text-[1.875rem] font-bold">Specializations</h1>
                {tableData.length > 0 &&
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="flex gap-4 items-center justify-center py-3 px-6"><span><AddIcon /></span>Add specialization</Button>
                        </DialogTrigger>
                        <RenderDialog />
                    </Dialog>
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
    )
}


export default CreateSpecialization
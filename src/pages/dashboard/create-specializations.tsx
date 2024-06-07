import Puzzle from "@/components/custom/Icons/Puzzle"
import { Button } from "@/components/ui/button"
import AddIcon from "@/components/custom/Icons/AddIcon"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { SpecializationsStore, useSpecializationsStore } from "@/context/specializationsFormStore"
import { useForm, SubmitHandler } from "react-hook-form";
import Specialization from "@/components/forms/specializationsPage/specialization"
import AddKeyword from "@/components/forms/specializationsPage/AddKeyword"

const CreateSpecialization = () => {
    const { step, setStep } = useSpecializationsStore();

    const RenderDialog = () => {
        const handleNext = () => {
            setStep(step + 1);
        };

        const createSpecializationsDetails = async () => {
            try {
                const { data } = useSpecializationsStore.getState();

                let dialogData = new FormData();

                dialogData.append("specialization", data?.specializationsDetails.specialization);
                dialogData.append("keywords", data?.specializationsDetails.keywords);

                setTimeout(() => {
                    handleNext();
                }, 5000)
            }
            catch (error: any) {
                console.error("Error creating dialog", error);
            }
        }

        const { handleSubmit } = useForm<SpecializationsStore>();
        const onSubmitHandler: SubmitHandler<SpecializationsStore> = async () => {
            await handleSubmit(createSpecializationsDetails)();
            
        };

        switch (step) {
            case 1: 
            return (
                <Specialization handleNext={handleNext} />
            )

            case 2: 
            return (
                <AddKeyword handleNext={onSubmitHandler} />
            )
            default:
                return  null;
        }

    }
    return (
        <div>
            <h1 className="text-[1.875rem] font-bold py-2">Specializations</h1>
            <div className="w-full my-0 mx-auto flex flex-col justify-center items-center">
                <div className="w-[96px] h-[96px] pl-2 mx-auto my-[6rem] rounded-full flex justify-center items-center bg-[#FFD13A] ">
                    <Puzzle />
                </div>
                <div className="flex flex-col gap-8 w-full max-w-[37rem] text-center">
                    <h1 className="text-[1.625rem] leading-8 font-bold">Create and manage specializations</h1>
                    <p>You can create specializations for your requests, add keywords that fits your request, and manage specialization</p>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="flex gap-4 items-center justify-center py-3 px-6 mx-auto focus:outline-none border-none"><span><AddIcon /></span>Create specialization</Button>
                        </DialogTrigger>
                        <RenderDialog />
                    </Dialog>
                    
                </div>
            </div>
        </div>
    )
}

export default CreateSpecialization
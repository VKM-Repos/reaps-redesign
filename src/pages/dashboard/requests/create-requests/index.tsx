import { useRequestsStore, RequestsStore } from "@/store/RequestFormStore"
import { SubmitHandler, useForm } from "react-hook-form";
import SelectSpecialization from "../specialization/select/SelectSpecialization";
import ResearchInfo from "./ResearchInfo";
import AppInfo from "./AppInfo";
import SupportDoc from "./SupportDoc";
import AppSummary from "./AppSummary";
import RequestsLayout from "@/layouts/RequestsLayout";

const CreateRequests = () => {
    const { step, setStep, resetStore } = useRequestsStore();

    const RequestsData = new FormData();

    const RenderRequestsForm = () => {
        const handleNext = () => {
            setStep(step + 1);
        }

        

        const createRequestsDetails = async () => {
            try {
                const { data } = useRequestsStore.getState();
                const specialization = data?.requestsDetails.specialisation ?? '';
                RequestsData.append("specialization", specialization);
                const institution = data?.requestsDetails.institution ?? '';
                RequestsData.append("institution", institution);
                

                setTimeout(() => {
                    resetStore();
                }, 5000)
            }
            catch (error: any) {
                console.error("Error creating form", error);
            }
        }

        const { handleSubmit } = useForm<RequestsStore>();
        const onSubmitHandler: SubmitHandler<RequestsStore> = async () => {
            await handleSubmit(createRequestsDetails)();

        };

        switch (step) {
            case 1:
                return <SelectSpecialization handleNext={handleNext}/>
            case 2:
                return <AppInfo handleNext={handleNext} />
            case 3:
                return <ResearchInfo handleNext={handleNext} />
            case 4:
                return <SupportDoc handleNext={handleNext} />
            case 5:
                return <AppSummary handleNext={onSubmitHandler}  />
            default: 
                return null;    
        }

    }
    return (
        <div className="flex flex-col gap-[1.25rem] mb-20">
            <div className="flex flex-col md:flex-row gap-5 md:gap-auto justify-between md:items-center mx-auto w-full">
                <h1 className="text-[1.875rem] font-bold">Requests</h1>
            </div>
            <div className="w-full my-0 mx-auto flex flex-col justify-center items-center">
                <RequestsLayout>
                    <RenderRequestsForm />
                </RequestsLayout>
            </div>
        </div>
    )
}

export default CreateRequests
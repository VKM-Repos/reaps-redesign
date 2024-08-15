import { useRequestsStore, RequestsStore } from "@/context/RequestFormStore"
import { SubmitHandler, useForm } from "react-hook-form";
// import { useMediaQuery } from "react-responsive";
import EmptyRequests from "./custom/EmptyRequests";
import SelectSpecialization from "./specialization/SelectSpecialization";
import ResearchInfo from "./create-requests/ResearchInfo";
import AppInfo from "./create-requests/AppInfo";
import SupportDoc from "./create-requests/SupportDoc";
import AppSummary from "./create-requests/AppSummary";

const CreateRequests = () => {
    const { step, setStep, resetStore } = useRequestsStore();
    // const isMobile = useMediaQuery({query: '(max-width: 768px)'});

    const RequestsData = new FormData();

    const RenderRequestsForm = () => {
        console.log(step);
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
                return <EmptyRequests handleNext={handleNext} />
            case 2:
                return <SelectSpecialization handleNext={handleNext}/>
            case 3:
                return <AppInfo handleNext={handleNext} />
            case 4:
                return <ResearchInfo handleNext={handleNext} />
            case 5:
                return <SupportDoc handleNext={handleNext} />
            case 6:
                return <AppSummary handleNext={onSubmitHandler} />
            default: 
                return null;    
        }

    }
    return (
        <div className="flex flex-col gap-[1.25rem]">
            <div className="flex flex-col md:flex-row gap-5 md:gap-auto justify-between md:items-center mx-auto w-full">
                <h1 className="text-[1.875rem] font-bold">Requests</h1>
            </div>
            <RenderRequestsForm />
        </div>
    )
}

export default CreateRequests
import { useRequestsStore } from "@/store/RequestFormStore"
import SelectSpecialization from "../forms/SelectSpecialization";
import ResearchInfo from "../create-requests/ResearchInfo";
import AppInfo from "../create-requests/AppInfo";
import SupportDoc from "../create-requests/SupportDoc";
import AppSummary from "../create-requests/AppSummary";
import RequestsLayout from "@/layouts/RequestsLayout";
import { RequestItems } from "@/types/requests";

type Props = {
    request: RequestItems;
}

const ModifyRequest = ({ request }: Props) => {
    const { step, setStep } = useRequestsStore();

    const handleNext = () => setStep(step + 1);

    const handleSubmit = async () => {
        try {
            console.log(request);
            // resetStore();
            // setOpen(false)
        } catch (error) {
            console.error("Error modifying request", error);
        }
    }

    const RenderEdit = () => {
        switch(step) {
            case 1:
                return <SelectSpecialization handleNext={handleNext}/>
            case 2:
                return <AppInfo handleNext={handleNext} />
            case 3:
                return <ResearchInfo handleNext={handleNext} />
            case 4:
                return <SupportDoc handleNext={handleNext} />
            case 5:
                return <AppSummary handleNext={handleSubmit}  />
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
                    <RenderEdit />
                </RequestsLayout>
            </div>
        </div>
    )
}

export default ModifyRequest;
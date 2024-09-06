import { useRequestsStore, RequestsStore } from "@/store/RequestFormStore"
import { SubmitHandler, useForm } from "react-hook-form";
// import { useMediaQuery } from "react-responsive";
import { useState } from "react";
import EmptyRequests from "./custom/EmptyRequests";
import SelectSpecialization from "./specialization/SelectSpecialization";
import ResearchInfo from "./create-requests/ResearchInfo";
import AppInfo from "./create-requests/AppInfo";
import SupportDoc from "./create-requests/SupportDoc";
import AppSummary from "./create-requests/AppSummary";
import RequestsLayout from "@/layouts/RequestsLayout";
import TableRequests from "./custom/table-requests";
import { reviewTableData, tableData } from "@/lib/helpers";
import { Button } from "@/components/ui/button"
import GoogleDoc from "@/components/custom/Icons/GoogleDoc"


const CreateRequests = () => {
    const { step, setStep, resetStore } = useRequestsStore();
    // const isMobile = useMediaQuery({query: '(max-width: 768px)'});

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
                return <AppSummary handleNext={onSubmitHandler}  />
            default: 
                return null;    
        }

    }

    // const [submittedRequest, setSubmittedRequest] = useState(false);

    // const openSubmittedRequest = () => {
    //         setSubmittedRequest(true)
    
    return (
        <div className="flex flex-col gap-[1.25rem] mb-20">
            <div className="w-full flex items-center justify-between">
                <h1 className="text-[1.875rem] font-bold">Requests</h1>
                {tableData.length > 0 && <Button
                     
                      className=" flex gap-4 items-center justify-center place-items-end py-3 px-6" ><span><GoogleDoc /></span>Request Ethical Approval
                </Button> }
            </div>
            {/* <div className="w-full border-b-[1.5px] gap-[2rem] flex px-5 py-1.5">
                <h3 className="font-bold text-[1.2rem]">My requests</h3>
                <h3 className="font-bold text-[1.2rem]">Review requests</h3>
            </div> */}
            <div>
                
            </div>
            <div className="w-full my-0 mx-auto flex flex-col justify-center items-center">
                {tableData.length > 0 ? 
                    <TableRequests tableData={tableData} reviewTableData={reviewTableData}/>
                    : 
                    (step === 1 ? (
                        <RenderRequestsForm />
                    ) : (
                        <RequestsLayout>
                            <RenderRequestsForm />
                        </RequestsLayout>
                    ))
                }
            </div>
        </div>
    )
}

export default CreateRequests
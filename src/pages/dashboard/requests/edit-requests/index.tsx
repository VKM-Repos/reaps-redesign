/* eslint-disable @typescript-eslint/no-explicit-any */
import RequestsLayout from "@/layouts/RequestsLayout";
import ResearchInformation from "../components/edit-ethical-request-forms/research-information";
import ApplicationInformation from "../components/edit-ethical-request-forms/application-information";
import SupportingDocuments from "../components/edit-ethical-request-forms/supporting-document";
import SavingLoader from "../components/SavingLoader";
import { useEthicalRequestStore } from "@/store/ethicalRequestStore";
import ApplicationSummary from "../components/edit-ethical-request-forms/application-summary";
import { toast } from "@/components/ui/use-toast";
import Loader from "@/components/custom/Loader";
import SelectSpecialization from "../components/edit-ethical-request-forms/select-specialization";
import { useLocation, useNavigate } from "react-router-dom";
import { queryClient } from "@/providers";
import { useGET } from "@/hooks/useGET.hook";
import { usePATCH } from "@/hooks/usePATCH.hook";
import PaymentCart from "../components/edit-ethical-request-forms/payment-cart";
import { RequestService } from "@/services/requestService";

const ModifyRequest = () => {
  const { step, setStep, resetStore } = useEthicalRequestStore();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const request_id = searchParams.get("id");
  const requestService = RequestService.getInstance();

  const { data: user } = useGET({
    url: "auth/me",
    queryKey: ["GET_USER"],
  });

  const { data: payment_config, isPending: isConfigPending } = useGET({
    url: `payment-configs/context/${user?.institution_context}`,
    queryKey: ["GET_PAYMENT_CONFIGS"],
  });

  const isManual = payment_config?.payment_type?.toLowerCase() === "manual";

  const { data: request_details } = useGET({
    url: `requests/${request_id}`,
    queryKey: ["GET_REQUEST_DETAILS"],
  });

  const { mutate: editRequest, isPending: isRequestPending } = usePATCH(
    `requests/${request_id}`,
    { method: "PUT", contentType: "multipart/form-data" }
  );

  const handleSaveAndContinue = async () => {
    try {
      const formData = await requestService.editRequest("save", isManual);
      editRequest(formData, {
        onSuccess: () => {
          toast({
            description: "Request saved successfully",
          });
          queryClient.invalidateQueries({
            predicate: (query: any) => query.queryKey.includes(["requests"]),
          });
          resetStore();
          navigate("/requests");
        },
        onError: () => {
          toast({
            variant: "destructive",
            description: "Failed to save request",
          });
        },
      });
    } catch (error) {
      console.error("Error in save action:", error);
      toast({
        variant: "destructive",
        description: "An error occurred while saving",
      });
    }
  };

  const handleMakePayment = async () => {
    try {
      const formData = await requestService.editRequest("payment", isManual);
      editRequest(formData, {
        onSuccess: () => {
          toast({
            description: "Payment processed successfully",
          });
          queryClient.invalidateQueries({
            predicate: (query: any) => query.queryKey.includes(["requests"]),
          });
          resetStore();
          navigate("/requests");
        },
        onError: () => {
          toast({
            variant: "destructive",
            description: "Failed to process payment",
          });
        },
      });
    } catch (error) {
      console.error("Error in payment action:", error);
      toast({
        variant: "destructive",
        description: "An error occurred while processing payment",
      });
    }
  };

  const RenderRequestsForm = () => {
    const handleNext = () => {
      setStep(step + 1);
    };

    switch (step) {
      case 1:
        return <SelectSpecialization handleNext={handleNext} />;
      case 2:
        return (
          <ResearchInformation
            handleNext={handleNext}
            requestDetails={request_details}
          />
        );
      case 3:
        return (
          <ApplicationInformation
            handleNext={handleNext}
            requestDetails={request_details}
          />
        );
      case 4:
        return (
          <SupportingDocuments
            handleNext={handleNext}
            requestDetails={request_details}
          />
        );
      case 5:
        return (
          <ApplicationSummary
            requestDetails={request_details}
            handleNext={handleNext}
          />
        );
      case 6:
        return (
          <PaymentCart
            isLoading={isConfigPending || isRequestPending}
            isManual={isManual}
            onSaveAndContinue={handleSaveAndContinue}
            onMakePayment={handleMakePayment}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {isRequestPending && <Loader />}
      <div className="flex flex-col gap-[1.25rem] mb-20">
        <div className="flex flex-col md:flex-row gap-5 md:gap-auto justify-between md:items-center mx-auto w-full">
          <h1 className="text-[1.875rem] font-bold">Requests</h1>
        </div>
        <div className="w-full my-0 mx-auto flex flex-col justify-center items-center">
          <RequestsLayout>
            <div className="relative md:w-[80%] mx-auto">
              {step > 1 && <SavingLoader />}
            </div>
            <RenderRequestsForm />
          </RequestsLayout>
        </div>
      </div>
    </>
  );
};

export default ModifyRequest;

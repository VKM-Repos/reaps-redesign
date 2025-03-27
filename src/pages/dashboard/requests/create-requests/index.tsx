/* eslint-disable @typescript-eslint/no-explicit-any */
import RequestsLayout from "@/layouts/RequestsLayout";
import ResearchInformation from "../components/ethical-request-forms/research-information";
import ApplicationInformation from "../components/ethical-request-forms/application-information";
import SupportingDocuments from "../components/ethical-request-forms/supporting-document";
import SavingLoader from "../components/SavingLoader";
import { useEthicalRequestStore } from "@/store/ethicalRequestStore";
import ApplicationSummary from "../components/ethical-request-forms/application-summary";
import SelectSpecialization from "../components/ethical-request-forms/select-specialization";
import PaymentCart from "../components/ethical-request-forms/payment-cart";
import { useGET } from "@/hooks/useGET.hook";
import { usePOST } from "@/hooks/usePOST.hook";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { queryClient } from "@/providers";
import { RequestService } from "@/services/requestService";
import Loader from "@/components/custom/Loader";

const CreateRequests = () => {
  const { step, setStep } = useEthicalRequestStore();
  const navigate = useNavigate();
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

  const { mutate, isPending: isRequestPending } = usePOST("requests", {
    contentType: "multipart/form-data",
  });

  const handleSaveAndContinue = async () => {
    try {
      const formData = await requestService.createRequest("save", isManual);
      mutate(formData, {
        onSuccess: () => {
          toast({
            description: "Request saved successfully",
          });
          queryClient.invalidateQueries({ queryKey: ["GET_REQUESTS"] });
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
      const formData = await requestService.createRequest("payment", isManual);
      mutate(formData, {
        onSuccess: () => {
          toast({
            description: "Payment processed successfully",
          });
          queryClient.invalidateQueries({ queryKey: ["GET_REQUESTS"] });
          navigate("/dashboard/requests");
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
        return <ResearchInformation handleNext={handleNext} />;
      case 3:
        return <ApplicationInformation handleNext={handleNext} />;
      case 4:
        return <SupportingDocuments handleNext={handleNext} />;
      case 5:
        return <ApplicationSummary handleNext={handleNext} />;
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

export default CreateRequests;

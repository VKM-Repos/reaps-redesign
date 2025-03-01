/* eslint-disable @typescript-eslint/no-explicit-any */
import { SubmitHandler, useForm } from "react-hook-form";
import RequestsLayout from "@/layouts/RequestsLayout";
import ResearchInformation from "../components/edit-ethical-request-forms/research-information";
import ApplicationInformation from "../components/edit-ethical-request-forms/application-information";
import SupportingDocuments from "../components/edit-ethical-request-forms/supporting-document";
import SavingLoader from "../components/SavingLoader";
import {
  EthicalRequestStore,
  useEthicalRequestStore,
} from "@/store/ethicalRequestStore";
import ApplicationSummary from "../components/edit-ethical-request-forms/application-summary";
import { toast } from "@/components/ui/use-toast";
import Loader from "@/components/custom/Loader";
import SelectSpecialization from "../components/edit-ethical-request-forms/select-specialization";
import { useLocation, useNavigate } from "react-router-dom";
import { queryClient } from "@/providers";
import { useGET } from "@/hooks/useGET.hook";
import { usePATCH } from "@/hooks/usePATCH.hook";
import PaymentCart from "../components/edit-ethical-request-forms/payment-cart";

const ModifyRequest = () => {
  const { data, step, setStep, resetStore } = useEthicalRequestStore();
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  const request_id = searchParams.get("id");

  const { data: payment_config } = useGET({
    url: `payment-configs-by-context`,
    queryKey: ["GET_PAYMENT_CONFIGS"],
  });

  const isManual = payment_config?.payment_type?.toLowerCase() === "manual";

  const { data: request_details } = useGET({
    url: `requests/${request_id}`,
    queryKey: ["GET_REQUEST_DETAILS"],
  });

  const { mutate: editRequest, isPending: isEditing } = usePATCH(
    `requests/${request_id}`,
    { method: "PUT", contentType: "multipart/form-data" }
  );

  const RenderRequestsForm = () => {
    const handleNext = () => {
      setStep(step + 1);
    };

    const { handleSubmit } = useForm<EthicalRequestStore>();

    const onSubmitHandler: SubmitHandler<EthicalRequestStore> = async () => {
      const formData = new FormData();

      Object.entries(data.ethical_request_files).forEach(([fileName, file]) => {
        if (file) {
          formData.append(fileName, file);
        }
      });

      Object.entries(data.ethical_request_questions).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value.toString());
        }
      });

      formData.append("can_edit", JSON.stringify(true));

      if (isManual) {
        const fileEntries = Object.entries(data.evidence_of_payment);

        if (fileEntries.length > 0) {
          const [, file] = fileEntries[0];
          if (file instanceof File) {
            formData.append("evidence_of_payment", file);
          } else {
            console.error("Invalid file format:", file);
          }
        } else {
          console.error("No file found in evidence_of_payment");
        }
      }

      editRequest(formData, {
        onSuccess: (response) => {
          console.log(response);

          toast({
            title: "Success",
            description: `Request updated`,
            variant: "default",
          });

          queryClient.invalidateQueries({
            predicate: (query: any) => query.queryKey.includes(["requests"]),
          });

          resetStore();

          navigate("/requests");
        },
        onError: (error: any) => {
          console.error("Error received:", error);

          const errorMessage =
            error?.detail ||
            (Array.isArray(error) && error[0]?.message) ||
            (error?.response?.data && error.response.data.detail) ||
            "An unexpected error occurred";

          toast({
            title: "Error",
            description: errorMessage,
            variant: "destructive",
          });
        },
      });
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
        return <PaymentCart handleNext={handleSubmit(onSubmitHandler)} />;
      default:
        return null;
    }
  };

  return (
    <>
      {isEditing && <Loader />}
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

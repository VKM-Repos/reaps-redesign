/* eslint-disable @typescript-eslint/no-explicit-any */
import { type SubmitHandler, useForm } from "react-hook-form";
import RequestsLayout from "@/layouts/RequestsLayout";
import ResearchInformation from "../components/ethical-request-forms/research-information";
import ApplicationInformation from "../components/ethical-request-forms/application-information";
import SupportingDocuments from "../components/ethical-request-forms/supporting-document";
import SavingLoader from "../components/SavingLoader";
import {
  type EthicalRequestStore,
  useEthicalRequestStore,
} from "@/store/ethicalRequestStore";
import ApplicationSummary from "../components/ethical-request-forms/application-summary";
import { usePOST } from "@/hooks/usePOST.hook";
import { toast } from "@/components/ui/use-toast";
import Loader from "@/components/custom/Loader";
import SelectSpecialization from "../components/ethical-request-forms/select-specialization";
import { queryClient } from "@/providers";
import { useNavigate } from "react-router-dom";
import PaymentCart from "../components/ethical-request-forms/payment-cart";
import { useGET } from "@/hooks/useGET.hook";
import useUserStore from "@/store/user-store";
import { CategoryChecks } from "@/components/custom/category-check";

const CreateRequests = () => {
  const { data, step, setStep, resetStore } = useEthicalRequestStore();

  const navigate = useNavigate();
  const { user, categoryExist } = useUserStore();
  console.log(user, categoryExist, "checks");
  if (categoryExist) {
    console.log("Req");
  } else {
    console.log("No Req");
  }
  const { data: payment_config } = useGET({
    url: "payment-configs-by-context",
    queryKey: ["GET_PAYMENT_CONFIGS"],
  });

  const isManual = payment_config?.payment_type?.toLowerCase() === "manual";

  const { mutate, isPending } = usePOST("requests", {
    contentType: "multipart/form-data",
  });

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

      formData.append("can_edit", JSON.stringify(false));

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

      mutate(formData, {
        onSuccess: () => {
          toast({
            title: "Success",
            description: `Request created`,
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
        return <ResearchInformation handleNext={handleNext} />;
      case 3:
        return <ApplicationInformation handleNext={handleNext} />;
      case 4:
        return <SupportingDocuments handleNext={handleNext} />;
      case 5:
        return <ApplicationSummary handleNext={handleNext} />;
      case 6:
        return <PaymentCart handleNext={handleSubmit(onSubmitHandler)} />;

      default:
        return null;
    }
  };

  return (
    <>
      {isPending && <Loader />}
      {!categoryExist ? (
        <CategoryChecks isOpen={true} />
      ) : (
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
      )}
    </>
  );
};

export default CreateRequests;

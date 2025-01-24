/* eslint-disable @typescript-eslint/no-explicit-any */
import ArrowLeft from "@/components/custom/Icons/ArrowLeft";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import ReceiptImage from "@/assets/ethicalrequest.png";
import { useGET } from "@/hooks/useGET.hook";
import {
  EthicalRequestStore,
  useEthicalRequestStore,
} from "@/store/ethicalRequestStore";
import { useNavigate } from "react-router-dom";
import { usePOST } from "@/hooks/usePOST.hook";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { queryClient } from "@/providers";
import Loader from "@/components/custom/Loader";

type Props = {
  showApproval: () => void;
};

export default function PaymentCart({ showApproval }: Props) {
  const { data, resetStore } = useEthicalRequestStore();

  const navigate = useNavigate();

  const { data: user } = useGET({
    url: "auth/me",
    queryKey: ["GET_USER"],
  });

  const {
    mutate,
    isPending,
    data: checkoutUrl,
  } = usePOST("requests", {
    contentType: "multipart/form-data",
  });

  console.log(checkoutUrl ?? "not available");

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

    mutate(formData, {
      onSuccess: (response) => {
        console.log(response);

        toast({
          title: "Success",
          description: `Payment Successful`,
          variant: "default",
        });

        queryClient.invalidateQueries({
          predicate: (query: any) => query.queryKey.includes(["requests"]),
        });

        resetStore();

        // im supposed to get a respose from server containing checkout url which should
        // redirect to payment gateway page, after successful payment, redirect to transcations page

        navigate("/pricing/your-transactions");
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

  return (
    <>
      {isPending && <Loader />}
      <div className="w-full px-4 max-w-[800px] md:px-0 mx-auto my-0 antialiased relative flex flex-col gap-6 ">
        <div className="rounded-xl border-t-8 border-t-primary border-[#0C0C0F] p-[1.875rem] ">
          <div className="w-full my-0 border-b border-b-[#E0E0E0] relative flex md:justify-between flex-wrap">
            <div className="flex flex-col gap-[3.875rem] items-start justify-center">
              <div className="flex gap-1 flex-col md:flex-row">
                <h1 className="text-[1.375rem] text-[#040C21] font-semibold">
                  Ethical Approval Request Fee
                </h1>
                <Badge className="text-primary bg-[#192C8A1A] w-full max-w-fit flex items-center justify-center hover:bg-[#192C8A1A] text-[0.625rem] font-semibold">
                  {user?.user_type}
                </Badge>
              </div>
              <h1 className="font-extrabold text-3xl text-[#192C8A] plus-jarkata-sans">
                ₦{"2,000"}
              </h1>
            </div>
            <img
              src={ReceiptImage}
              alt="Illustration of man carrying receipt"
              className="h-full max-h-[80px] "
            />
          </div>
        </div>

        <div className="flex items-center py-3 flex-col-reverse md:flex-row md:justify-between">
          <Button
            onClick={() => showApproval()}
            className="!bg-inherit w-full md:max-w-fit py-[0.5rem] px-5 !border-none rounded-[0.375rem] text-destructive font-semibold text-sm !hover:bg-inherit !hover:text-destructive !hover:dropdown-shadow"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit(onSubmitHandler)}
            className="w-full md:max-w-[12.5rem] py-3 px-6 rounded-1 text-white font-semibold flex md:justify-between items-center"
          >
            <span>Proceed to pay</span>
            <span>
              <ArrowLeft />
            </span>
          </Button>
        </div>
      </div>
    </>
  );
}

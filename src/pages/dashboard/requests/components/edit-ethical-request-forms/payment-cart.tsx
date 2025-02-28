/* eslint-disable @typescript-eslint/no-explicit-any */
import ArrowLeft from "@/components/custom/Icons/ArrowLeft";
import { Button } from "@/components/ui/button";
// import { useGET } from "@/hooks/useGET.hook";
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
import { LockKeyhole } from "lucide-react";

type Props = {
  showApproval: () => void;
};

export default function PaymentCart({ showApproval }: Props) {
  const { data, resetStore } = useEthicalRequestStore();

  const navigate = useNavigate();

  // const { data: user } = useGET({
  //   url: "auth/me",
  //   queryKey: ["GET_USER"],
  // });

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

  return (
    <>
      {isPending && <Loader />}
      <div className="w-full max-w-[560px] relative mx-auto my-0 antialiased  flex flex-col gap-y-4 p-6 items-center justify-start border rounded-xl">
        <div className="w-full absolute top-0 left-0 inset-x-0 rounded-t-xl border-t-[10px] border-t-primary border-[#0C0C0F] " />
        <h6 className="text-[0.85rem] text-[#040C21] font-light">
          Total Amount
        </h6>
        <h1 className="font-extrabold text-3xl text-[#192C8A] plus-jarkata-sans">
          ₦{"30,000.00"}
        </h1>

        <span className="w-2/3 mx-auto flex items-start justify-center gap-x-1">
          <LockKeyhole size={14} color="#34A853" />
          <p className="text-xs text-[#040C21]">Secure Payment</p>
        </span>

        <div className=" flex flex-col items-center justify-start gap-y-6 py-4 border-y w-full">
          <h5 className="text-[1.05rem] text-[#040C21]">
            Payment details and breakdown
          </h5>

          <div className="flex items-center justify-between w-full">
            <p className="text-sm text-[#868687] font-semibold text-left">
              Transaction Id
            </p>
            <p className="text-sm text-[#040C21] font-light text-right">
              #4846545944IJY
            </p>
          </div>
          <div className="flex items-center justify-between w-full">
            <p className="text-sm text-[#868687] font-semibold text-left">
              Applicant Name
            </p>
            <p className="text-sm text-[#040C21] font-light text-right">
              Ayebo Ayeba
            </p>
          </div>
          <div className="flex items-center justify-between w-full">
            <p className="text-sm text-[#868687] font-semibold text-left">
              Applicant Email
            </p>
            <p className="text-sm text-[#040C21] font-light text-right">
              ayeboba@gmail.com
            </p>
          </div>
          <div className="flex items-center justify-between w-full">
            <p className="text-sm text-[#868687] font-semibold text-left">
              Category
            </p>
            <p className="text-sm text-[#040C21] font-light text-right">
              Undergraduate
            </p>
          </div>
          <div className="flex items-center justify-between w-full">
            <p className="text-sm text-[#868687] font-semibold text-left">
              Ethics Approval Request Fee
            </p>
            <p className="text-sm text-[#040C21] font-light text-right">
              ₦25,000.00
            </p>
          </div>
          <div className="flex items-center justify-between w-full">
            <p className="text-sm text-[#868687] font-semibold text-left">
              Tax payable (0.5%)
            </p>
            <p className="text-sm text-[#040C21] font-light text-right">
              ₦5,000.00
            </p>
          </div>
          <div className="flex items-center justify-between w-full">
            <p className="text-lg text-[#040C21] font-bold text-left">Total</p>
            <p className="text-sm text-[#192C8A] font-bold text-right">
              ₦30,000.00
            </p>
          </div>
        </div>

        <div className="w-full flex items-center py-3 flex-col-reverse md:flex-row md:justify-between">
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
            <span>Make Payment</span>
            <span>
              <ArrowLeft />
            </span>
          </Button>
        </div>
      </div>
    </>
  );
}

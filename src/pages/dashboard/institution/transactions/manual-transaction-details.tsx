import { useMediaQuery } from "react-responsive";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet";
import HoverCancel from "@/components/custom/Icons/HoverCancel";
import { useToast } from "@/components/ui/use-toast";
import { useRef, useState } from "react";
import { useGET } from "@/hooks/useGET.hook";
import Loader from "@/components/custom/Loader";
import View from "@/components/custom/Icons/View";
import { Button } from "@/components/ui/button";
import useUserStore from "@/store/user-store";

type Props = {
  id: string;
  evidence_of_payment: string;
  status: any;
};

export default function ManualTransactionDetails({
  id,
  evidence_of_payment,
  status,
}: Props) {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const close_dialog_ref = useRef<HTMLButtonElement | null>(null);

  const handle_close_dialog = () => {
    close_dialog_ref?.current?.click();
  };
  return isMobile ? (
    <Sheet>
      <SheetTrigger
        className={`text-black flex justify-center items-center gap-2 ${
          isMobile ? "p-2" : "p-3"
        }`}
      >
        <View />
        {isMobile ? null : <span>View</span>}
      </SheetTrigger>
      <SheetContent className="w-full h-full pt-[1.25rem] pb-[1.125rem] flex flex-col gap-4">
        <SheetClose className="absolute right-6 top-6 !w-fit mx-auto py-0 px-0 ml-4 flex items-center justify-start opacity-70 rounded-full hover:bg-[#14155E14] transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none">
          <HoverCancel />
        </SheetClose>
        <ManualTransactionDetailsContent
          status={status}
          evidence_of_payment={evidence_of_payment}
          close_dialog={handle_close_dialog}
          id={id}
        />
      </SheetContent>
    </Sheet>
  ) : (
    <Dialog>
      <DialogTrigger
        className={`text-black flex justify-center items-center gap-2 ${
          isMobile ? "p-2" : "p-3"
        }`}
      >
        <View />
        {isMobile ? null : <span>View</span>}
      </DialogTrigger>
      <DialogDescription className="hidden">
        Details of the selected transaction
      </DialogDescription>
      <DialogContent className="w-full max-w-[800px] h-full md:max-h-[650px] pt-[1.25rem] pb-[1.125rem] flex flex-col gap-4 rounded-[1.25rem]">
        <ManualTransactionDetailsContent
          status={status}
          evidence_of_payment={evidence_of_payment}
          close_dialog={handle_close_dialog}
          id={id}
        />
      </DialogContent>
      <DialogClose>
        <span ref={close_dialog_ref} className="hidden" />
      </DialogClose>
    </Dialog>
  );
}

function ManualTransactionDetailsContent({
  id,
  evidence_of_payment,
  close_dialog,
  status,
}: {
  id: string;
  close_dialog: () => void;
  evidence_of_payment: string;
  status: any;
}) {
  const { toast } = useToast();
  const { accessToken } = useUserStore.getState();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { refetch } = useGET({
    queryKey: ["MANUAL_TRANSACTIONS_BY_CONTEXT"],

    url: "manual-transactions/by-context",
  });

  const handleTogglePayment = async () => {
    setIsLoading(true);
    try {
      const baseURL = import.meta.env.VITE_APP_BASE_URL;

      const response = await fetch(
        `${baseURL}manual-transactions/${id}/toggle-status`,
        {
          method: "GET",
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            "institution-context": "ai",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.detail || "error logging out";
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
        throw new Error(errorMessage);
      }
      refetch();
      toast({
        title: "Payment status changed!",
        description:
          "It will take a while before you can change the status again!",
        variant: "default",
      });
      close_dialog();
    } catch (error) {
      console.error("Payment toggle error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col justify-between items-center h-full w-full">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <img
            src={evidence_of_payment}
            alt="Evidence of payment"
            className="max-w-[500px] max-h-[500px] w-[500px] h-[500px] aspect-square"
          />
          <div className="flex justify-end text-white gap-3 w-full px-10">
            <Button
              onClick={handleTogglePayment}
              disabled={status}
              className={`${
                status ? "cursor-not-allowed" : ""
              } bg-[#34A853] hover:bg-[#34A872]`}
            >
              Approve
            </Button>
            <Button
              onClick={handleTogglePayment}
              disabled={!status}
              className={`${
                status ? "" : "cursor-help"
              } bg-[#E74848] hover:bg-[#E74869]`}
            >
              Decline
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

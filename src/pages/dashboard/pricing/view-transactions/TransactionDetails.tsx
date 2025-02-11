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
import { Badge } from "@/components/ui/badge";
import { statusColorMap } from "./transaction-table/columns";
import { usePATCH } from "@/hooks/usePATCH.hook";
import { useToast } from "@/components/ui/use-toast";
import { useRef } from "react";
import { useGET } from "@/hooks/useGET.hook";
import Loader from "@/components/custom/Loader";
import View from "@/components/custom/Icons/View";
import { TransactionItem } from "@/types/transaction";

type Props = {
  id: string;
};

export default function TransactionDetails({ id }: Props) {
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
        {isMobile ? null : <span>Transaction</span>}
      </SheetTrigger>
      <SheetContent className="w-full h-full pt-[1.25rem] pb-[1.125rem] flex flex-col gap-4">
        <SheetClose className="absolute right-6 top-6 !w-fit mx-auto py-0 px-0 ml-4 flex items-center justify-start opacity-70 rounded-full hover:bg-[#14155E14] transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none">
          <HoverCancel />
        </SheetClose>
        <TransactionDetailsContent close_dialog={handle_close_dialog} id={id} />
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
        {isMobile ? null : <span>Transaction</span>}
      </DialogTrigger>
      <DialogDescription className="hidden">
        Details of the selected transaction
      </DialogDescription>
      <DialogContent className="w-full max-w-[800px] h-full md:max-h-[650px] pt-[1.25rem] pb-[1.125rem] flex flex-col gap-4 rounded-[1.25rem]">
        <TransactionDetailsContent close_dialog={handle_close_dialog} id={id} />
      </DialogContent>
      <DialogClose>
        <span ref={close_dialog_ref} className="hidden"></span>
      </DialogClose>
    </Dialog>
  );
}

function TransactionDetailsContent({
  id,
  close_dialog,
}: {
  id: string;
  close_dialog: () => void;
}) {
  const { toast } = useToast();

  const {
    data,
    isPending: isTransactionsLoading,
    isError,
    refetch,
  } = useGET({
    url: `transactions/by-request/${id}`,
    queryKey: ["request_transaction"],
  });

  const transaction: TransactionItem = data;

  const { mutate: requery, isPending: isRequerying } = usePATCH(
    `transactions/${transaction?.transaction_reference}/re-query`,
    { method: "PUT" }
  );

  const formattedAmount = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(transaction?.amount);

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(new Date(transaction?.request.created_at));

  const handleRequeryTransaction = () => {
    toast({
      title: "Re-query in progress",
      description: "Please wait while we check the transaction status.",
      variant: "default",
    });

    requery(
      { self: "true" },
      {
        onSuccess: (data) => {
          toast({
            title: "Re-query Successful",
            description: `Transaction status: ${data.status}`,
            variant: "default",
          });
          refetch();
          close_dialog();
        },
        onError: (error) => {
          const errorMessage =
            error?.response.data.detail ||
            "Unable to re-query the transaction?.";
          toast({
            title: "Re-query Failed",
            description: errorMessage,
            variant: "destructive",
          });
        },
      }
    );
  };

  return (
    <>
      {isTransactionsLoading && <Loader />}
      {isError &&
        toast({
          title: "Something went wrong",
          description: "cannot fetch transaction details",
          variant: "destructive",
        })}

      <div className="border-[#0E0F0C1F] border-b flex justify-between items-center text-[#040C21] w-full">
        <p className="pb-4 px-[1.125rem] font-semibold text-xl2">
          Transaction Details
        </p>
      </div>
      <div className="w-full flex flex-col gap-4">
        <div className="w-full max-w-[85%] md:max-w-[95%] mx-auto my-0 border border-[#0E0F0C1F] rounded-[1.25rem] flex flex-col gap-4 justify-between p-5">
          <div className="flex flex-col gap-4 md:flex-row md:gap-unset md:justify-between md:items-center">
            <div className="flex flex-col gap-2 text-sm justify-center text-[#515152] w-full">
              <p className="text-bold font-semibold">Name of Researcher</p>
              <p className="text-[#868687]">
                {transaction?.request.user.first_name +
                  " " +
                  transaction?.request.user.last_name}
              </p>
            </div>
            <div className="flex flex-col gap-2 text-sm justify-center text-[#515152] w-full">
              <p className="text-bold font-semibold">Category</p>
              <p className="text-[#868687] capitalize">
                {transaction?.request.user.description ?? "Undergraduate"} -{" "}
                <strong>
                  {transaction?.request.user.education_level ?? "Researcher"}
                </strong>
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 text-sm justify-center text-[#515152]">
            <p className="text-bold font-semibold">Amount</p>
            <p className="text-[#868687]">{formattedAmount}</p>
          </div>
        </div>
        <div className="w-full max-w-[85%] md:max-w-[95%] mx-auto my-0 border border-[#0E0F0C1F] text-[#868687] rounded-[1.25rem] flex flex-col justify-between gap-3 p-6">
          <div className="font-semibold py-4">
            <p>Details</p>
          </div>
          <div className="flex flex-col md:flex-row gap-3 md:gap-5 text-sm items-start md:items-center text-[#515152]">
            <p className="font-bold text-sm">Request ID:</p>
            <p>{transaction?.id ?? "---"}</p>
          </div>
          <div className="flex flex-col md:flex-row gap-3 md:gap-5 text-sm items-start md:items-center text-[#515152]">
            <p className="font-bold text-sm">Research Topic:</p>
            <p>{transaction?.request.research_title ?? "---"}</p>
          </div>
          <div className="flex flex-col md:flex-row gap-3 md:gap-5 text-sm items-start md:items-center text-[#515152]">
            <p className="font-bold text-sm">Transaction Reference:</p>
            <p>{transaction?.transaction_reference ?? "---"}</p>
          </div>
          <div className="flex flex-col md:flex-row gap-3 md:gap-5 text-sm items-start md:items-center text-[#515152]">
            <p className="font-bold text-sm">Remita Reference:</p>
            <p>{transaction?.rrr ?? "---"}</p>
          </div>

          <div className="flex flex-col md:flex-row gap-3 md:gap-5 text-sm items-start md:items-center text-[#515152]">
            <p className="font-bold text-sm">Date of Transaction:</p>
            <p className="flex items-center gap-2">
              <span>{formattedDate ?? "---"}</span>
            </p>
          </div>
          <div className="flex gap-5 text-sm items-center text-[#515152]">
            <p className="font-bold">Status:</p>
            <Badge
              style={{
                color: statusColorMap[transaction?.status]?.text || "#000000",
                backgroundColor:
                  statusColorMap[transaction?.status]?.bg || "#192C8A",
              }}
              className="flex gap-1 items-center justify-center py-1 px-2 rounded-[2.25rem] font-[400]"
            >
              <div
                style={{
                  backgroundColor:
                    statusColorMap[transaction?.status]?.text || "#192C8A",
                }}
                className="w-[5px] h-[5px] rounded-full "
              ></div>
              {transaction?.status.toLowerCase() ?? "---"}
            </Badge>
          </div>
        </div>
        <button
          onClick={handleRequeryTransaction}
          className="min-w-[13.75rem] py-[0.313rem] px-3 rounded border border-[#14155E] text-[#0D1F00] bg-white fixed bottom-6 right-6"
          disabled={isRequerying}
        >
          <p className="font-bold text-sm">
            {isRequerying ? "Re-querying..." : "Re-query transaction status"}
          </p>
        </button>
      </div>
    </>
  );
}

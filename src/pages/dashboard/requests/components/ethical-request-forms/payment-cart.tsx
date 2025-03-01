/* eslint-disable @typescript-eslint/no-explicit-any */
import ArrowLeft from "@/components/custom/Icons/ArrowLeft";
import { Button } from "@/components/ui/button";
import { useEthicalRequestStore } from "@/store/ethicalRequestStore";
import { LockKeyhole } from "lucide-react";
import { useGET } from "@/hooks/useGET.hook";
import { formatCurrency } from "@/lib/utils";
import ManualPayment from "./manual-payment";

type Props = {
  handleNext: () => void;
};

export default function PaymentCart({ handleNext }: Props) {
  const { data } = useEthicalRequestStore();

  const { data: user } = useGET({
    url: "auth/me",
    queryKey: ["GET_USER"],
  });

  const { data: payment_config } = useGET({
    url: `payment-configs-by-context`,
    queryKey: ["GET_PAYMENT_CONFIGS"],
  });

  const { data: price_category } = useGET({
    url: "price-categories-by-context",
    queryKey: ["GET_PRICE_CATEGORY"],
  });

  const isManual = payment_config?.payment_type?.toLowerCase() === "manual";

  const payment = price_category?.find(
    (category: any) =>
      category.category.toLowerCase() === user?.description.toLowerCase()
  );

  const paymentDetails = {
    price: payment?.price ?? 0.0,
    name: payment?.category ?? "N/A",
  };

  console.log(data.evidence_of_payment ?? "not available");

  return (
    <div className="p-4">
      <div className="w-full max-w-[560px] relative mx-auto my-0 antialiased  flex flex-col gap-y-4 p-6 items-center justify-start border rounded-xl">
        <div className="w-full absolute top-0 left-0 inset-x-0 rounded-t-xl border-t-[10px] border-t-primary border-[#0C0C0F] " />
        <h6 className="text-[0.85rem] text-[#040C21] font-light">
          Total Amount
        </h6>
        <h1 className="font-extrabold text-3xl text-[#192C8A] plus-jarkata-sans">
          ₦{formatCurrency(paymentDetails.price)}
        </h1>

        <span className="w-2/3 mx-auto flex items-start justify-center gap-x-1">
          <LockKeyhole size={14} color="#34A853" />
          <p className="text-xs text-[#040C21]">Secure Payment</p>
        </span>

        <div className=" flex flex-col items-center justify-start gap-y-6 py-4 border-y w-full">
          <h5 className="text-[1.05rem] text-[#040C21]">
            Payment details and breakdown
          </h5>

          {!isManual && (
            <div className="flex items-center justify-between w-full">
              <p className="text-sm text-[#868687] font-semibold text-left">
                Transaction Id
              </p>
              <p className="text-sm text-[#040C21] font-light text-right">
                #4846545944IJY
              </p>
            </div>
          )}
          <div className="flex items-center justify-between w-full">
            <p className="text-sm text-[#868687] font-semibold text-left">
              Applicant Name
            </p>
            <p className="text-sm text-[#040C21] font-light text-right">
              {`${user?.first_name ?? ""} ${user?.last_name ?? ""}`}
            </p>
          </div>
          <div className="flex items-center justify-between w-full">
            <p className="text-sm text-[#868687] font-semibold text-left">
              Applicant Email
            </p>
            <p className="text-sm text-[#040C21] font-light text-right">
              {user?.email ?? ""}
            </p>
          </div>
          <div className="flex items-center justify-between w-full">
            <p className="text-sm text-[#868687] font-semibold text-left">
              Category
            </p>
            <p className="text-sm text-[#040C21] font-light text-right">
              {paymentDetails?.name ?? ""}
            </p>
          </div>
          <div className="flex items-center justify-between w-full">
            <p className="text-sm text-[#868687] font-semibold text-left">
              Ethics Approval Request Fee
            </p>
            <p className="text-sm text-[#040C21] font-light text-right">
              ₦{formatCurrency(paymentDetails.price)}
            </p>
          </div>
          {!isManual && (
            <div className="flex items-center justify-between w-full">
              <p className="text-sm text-[#868687] font-semibold text-left">
                Tax payable (0.5%)
              </p>
              <p className="text-sm text-[#040C21] font-light text-right">
                ₦5,000.00
              </p>
            </div>
          )}
          <div className="flex items-center justify-between w-full">
            <p className="text-lg text-[#040C21] font-bold text-left">Total</p>
            <p className="text-sm text-[#192C8A] font-bold text-right">
              ₦{formatCurrency(paymentDetails.price)}
            </p>
          </div>
        </div>

        <div className="w-full flex items-center py-3 flex-col-reverse md:flex-row md:justify-between gap-4">
          <Button
            variant="outline"
            onClick={handleNext}
            className="rounded-[2.75rem] py-[1.375rem] px-6 focus:outline-none button-hover w-full md:max-w-[15.625rem]"
          >
            Save & Continue later
          </Button>
          {isManual ? (
            <ManualPayment handleNext={handleNext} />
          ) : (
            <Button
              onClick={handleNext}
              className="w-full md:max-w-[12.5rem] py-3 px-6 rounded-1 text-white font-semibold flex md:justify-between items-center"
            >
              <span>Make Payment</span>
              <span>
                <ArrowLeft />
              </span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

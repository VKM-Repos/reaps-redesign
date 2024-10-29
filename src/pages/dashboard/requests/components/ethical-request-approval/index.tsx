import ArrowLeft from "@/components/custom/Icons/ArrowLeft";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ReceiptImage from "@/assets/ethicalrequest.png";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import Loader from "@/components/custom/Loader";
import PaymentModes from "./PaymentModes";
import { useRequestsStore } from "@/store/RequestFormStore";
import PaymentMethod from "./PaymentCards";

type Props = {
  educationLevel: string;
  amountToPay: string;
  showApproval: () => void;
};

export default function EthicalApprovalPayment({
  educationLevel,
  amountToPay,
  showApproval,
}: Props) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { resetStore } = useRequestsStore();

const RenderPaymentsCards = () => {
  const handleNext = () => {
    setStep(step + 1);
  }

  const onSubmit = () => {
    setLoading(true);
    setOpen(false);
    setStep(1);
    setTimeout(() => {
      setLoading(false);
      resetStore();
    }, 5000);
  };

  // use open and openchange


  switch (step) {
    case 1:
      return <PaymentMethod handleNext={handleNext}/>
    case 2:
      return <PaymentModes onSubmit={onSubmit} />
    default:
      null
  }
}

  return (
    <div className="z-[1000]">
      <div className="w-full px-4 max-w-[800px] md:px-0 mx-auto my-0 antialiased relative flex flex-col gap-6 ">
        <div className="rounded-xl border-t-8 border-t-primary border-[#0C0C0F] p-[1.875rem] ">
          <div className="w-full my-0 border-b border-b-[#E0E0E0] relative flex md:justify-between flex-wrap">
            <div className="flex flex-col gap-[3.875rem] items-start justify-center">
              <div className="flex gap-1 flex-col md:flex-row">
                <h1 className="text-[1.375rem] text-[#040C21] font-semibold">
                  Ethical Approval Request Fee
                </h1>
                <Badge className="text-primary bg-[#192C8A1A] w-full max-w-fit flex items-center justify-center hover:bg-[#192C8A1A] text-[0.625rem] font-semibold">
                  {educationLevel}
                </Badge>
              </div>
              <h1 className="font-extrabold text-3xl text-[#192C8A] plus-jarkata-sans">
                ₦{amountToPay}
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
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="w-full md:max-w-[12.5rem] py-3 px-6 rounded-1 text-white font-semibold flex md:justify-between items-center">
                <span>Proceed to pay</span>
                <span>
                  <ArrowLeft />
                </span>
              </Button>
            </DialogTrigger>  
          {loading && <Loader />}
          <DialogContent className={`w-full ${step === 1 ? "max-w-[800px]" : "max-w-[600px]"} pt-[1.25rem] pb-[1.125rem] flex flex-col gap-8`}>
            <RenderPaymentsCards />
          </DialogContent>
            
          </Dialog>
        </div>
      </div>
    </div>
  );
}

// if you click on proceed to pay it'll trigger a card, click on that card, (step 1 - etical approval card)
// it'll trigger another card(payments), (step 2 - payments method)
// click on that card, it'll trigger payments mode (step 3 - payments mode),
// click on payments mode, online takes you somewhere (do whatever you want),
// offline triggers a popup


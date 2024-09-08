import ArrowLeft from "@/components/custom/Icons/ArrowLeft";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import CategoryPopOver from "./CategoryPopOver";
import PaymentCardPopup from "./PaymentCards";
import { usePaymentStore } from "@/store/PaymentStore";
import { categories } from "./data/categories";
import ReceiptImage from "@/assets/ethicalrequest.png"

type Props = {
    educationLevel: string,
    amountToPay: string,
}


export default function EthicalApprovalCard({ educationLevel, amountToPay }: Props) {
    const { step, setStep } = usePaymentStore();

    const handleNext = () => {
        setStep(step + 1);
    };

    const SelectToPay = () => {
        switch (step) {
            case 1:
                return <CategoryPopOver handleNext={handleNext} categories={categories} />;
            case 2:
                return <PaymentCardPopup />
            default:
                return null;
        }
    };

    return (
        <div className="z-[1000]">
            <div className="w-full px-4 md:w-3/5 md:px-0 mx-auto my-0 antialiased relative flex flex-col gap-6 ">
                <div className="rounded-xl border-t-xl border-t-primary border-[#0C0C0F29] p-[1.875rem] ">
                    <div className="w-[90%] mx-auto my-0 border-b border-b-[#E0E0E0] relative">
                        <div className="flex flex-col gap-[3.875rem] items-center">
                            <div className="flex gap-1">
                                <h1 className="text-[1.375rem] text-[#040C21]">
                                    Ethical Approval Request Fee
                                </h1>
                                <Badge className="text-primary bg-[#192C8A1A] flex items-center justify-center hover:bg-[#192C8A1A] text-[0.625rem] font-semibold">
                                    {educationLevel}
                                </Badge>
                            </div>
                            <h1 className="text-primary font-extrabold text-3xl">
                                {amountToPay}
                            </h1>
                        </div>
                        <img
                            src={ReceiptImage}
                            alt="Illustration of man carrying receipt"
                        />
                    </div>
                </div>
                <div className="flex items-center justify-between py-3">
                    <Button className="w-full md:max-w-[5.57rem] py-[0.5rem] px-5 rounded-[0.375rem] text-destructive font-semibold text-sm">
                        Cancel
                    </Button>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button className="w-full md:max-w-[12.5rem] py-3 px-6 rounded-1 text-white font-semibold flex justify-between items-center">
                                <span>Proceed to pay</span>
                                <span>
                                    <ArrowLeft />
                                </span>
                            </Button>
                        </PopoverTrigger>
                        <SelectToPay />
                    </Popover>
                </div>
            </div>
        </div>
    );
}
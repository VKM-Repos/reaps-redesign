import { Button } from "@/components/ui/button"
import { DialogContent } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Paystack from "@/assets/Paystack.png"
import Remita from "@/assets/remita_orange_new_logo.png"
import ArrowLeft from "@/components/custom/Icons/ArrowLeft"
import { useState } from "react"
import { useRequestsStore } from "@/store/RequestFormStore"
import Loader from "@/components/custom/Loader"



export default function PaymentCardPopup() {
    const [selectedPayment, setSelectedPayment] = useState<string>();
    const [loading, setLoading] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(true);
    const { resetStore } = useRequestsStore();

    const handleSelection = (value: string) => {
        setSelectedPayment(value);
    };

    const handleNext = () => {
        setLoading(true);
        setIsDialogOpen(false);
        setTimeout(() => {
            resetStore();
            setLoading(false);
            setIsDialogOpen(true);
        }, 5000)
    }

    return (
        <>
            {loading && <Loader />}
            {isDialogOpen && 
                <DialogContent className="w-full max-w-[800px] pt-[1.25rem] pb-[1.125rem] flex flex-col gap-8">
                <div className="border-[#0E0F0C1F] border-b  flex justify-between items-center text-[#040C21] w-full">
                    <p className="pb-4 px-[1.125rem] font-semibold">Select your Payment Method</p>
                </div>
                <div className="flex flex-col w-full mx-auto my-0 max-w-[95%] px-[1.125rem]  md:gap-5 gap-[5.75rem] ">
                    <RadioGroup value={selectedPayment} onValueChange={handleSelection} className="py-6 px-3 rounded-[1.25rem] border-[#0E0F0C1F]  flex flex-col md:flex-row gap-[1.875rem] justify-center items-center w-full max-w-[90%] mx-auto">
                        <div className="border-[#898989] border rounded-[1.25rem] py-[2.5rem] px-5 flex flex-col gap-6 font-semibold text-[#454745] w-full max-w-[23.5rem]">
                            <RadioGroupItem className="!bg-primary !h-full !w-full" value="remita" checked={selectedPayment === "remita"}/>
                            <div className="rounded-[0.375rem] border border-[#B6B6B6] flex items-center justify-center w-full max-w-[8.75rem] p-4"><img src={Remita} /></div>
                        </div>
                        <div className="border-[#898989] border rounded-[1.25rem] py-[2.5rem] px-5 flex flex-col gap-6 font-semibold text-[#454745] w-full max-w-[23.5rem]">
                            <RadioGroupItem className="!bg-primary !h-full !w-full" value="paystack" checked={selectedPayment === "paystack"}/>
                            <div className="rounded-[0.375rem] border border-[#B6B6B6] flex items-center justify-center w-full max-w-[8.75rem] p-4"><img src={Paystack} /></div>
                        </div>
                    </RadioGroup>
                    <Button onClick={handleNext} variant={loading || !selectedPayment ? "ghost" : "default"} className={`${loading || !selectedPayment ? "text-[#292929]" : "text-white"} mx-auto my-0 py-3 px-6 rounded-1 flex justify-between items-center`}>
                        <span>Next</span>
                        <span>
                            <ArrowLeft />
                        </span>
                    </Button>
                </div>
            </DialogContent>
            }
            </>
     
    )
}

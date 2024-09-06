import Cancel from "@/components/custom/Icons/Cancel"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { PopoverClose, PopoverContent } from "@radix-ui/react-popover"


export default function PaymentCardPopup() {
    return (
        <PopoverContent className="pt-[6.25rem] pb-[3.125rem] px-[3.125rem] w-full">
            <div className="border-b-[#0E0F0C1F] flex justify-between items-center text-[#040C21] w-full">
                <h1 className="text-lg">Select your Payment Method</h1>
                <PopoverClose><Cancel /></PopoverClose> 
            </div>
            <div className="flex flex-col w-full max-w-[25rem] md:gap-5 gap-[5.75rem] ">
                <RadioGroup defaultValue="remita" className="py-6 px-3 rounded-[1.25rem] border-[#0E0F0C1F] flex flex-col justify-center items-center">
                    <RadioGroupItem value="remita" className="py-[2.5rem] px-5 flex gap-3 font-semibold text-[#454745]"><img src="img/remita_orange_new_logo.png" /><p className="text-lg">Pay with Remita</p></RadioGroupItem>
                    <RadioGroupItem value="paystack" className="py-[2.5rem] px-5 flex gap-3 font-semibold text-[#454745]"><img src="img/Paystack.png" /><p className="text-lg">Pay with Paystack</p></RadioGroupItem>
                </RadioGroup>
                <Button>Continue</Button>
            </div>
        </PopoverContent>
    )
}

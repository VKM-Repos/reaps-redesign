import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ViewIcon from '@/assets/view.svg'
import { X } from "lucide-react";


export default function ViewPayment() {

    return (
        <Sheet>
            <SheetTrigger className={`text-black flex justify-center items-center gap-2`}>
                <span className="flex gap-3 items-center justify-center text-[#333740] text-sm">View <img src={ViewIcon} /></span>
            </SheetTrigger>
            <SheetContent 
                side='top' 
                className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-full md:max-h-[650px]  pt-[1.25rem] pb-[1.125rem] flex flex-col gap-4 rounded-[1.25rem]`}>
            <SheetClose className="w-full flex justify-end px-5"><X /></SheetClose>
                Payment Details
            </SheetContent>
        </Sheet>
    )
}
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ViewIcon from '@/assets/view.svg'


export default function ViewPayment() {

    return (
        <Sheet>
            <SheetTrigger className={`text-black flex justify-center items-center gap-2`}>
                <span className="flex gap-3 items-center justify-center text-[#333740] text-sm">View <img src={ViewIcon} /></span>
            </SheetTrigger>
            <SheetContent 
                side='bottom' className={`fixed inset-x-auto inset-y-0
                 w-full max-w-[800px] h-full md:max-h-[650px] pt-[1.25rem] pb-[1.125rem] flex flex-col gap-4 rounded-[1.25rem]`}>
                
            </SheetContent>
        </Sheet>
    )
}
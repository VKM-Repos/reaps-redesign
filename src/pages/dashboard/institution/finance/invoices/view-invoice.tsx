import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Eye from "@/components/custom/Icons/Eye";

export default function ViewInvoice() {
    return (
        <Sheet>
            <SheetTrigger className={`text-black flex justify-center items-center gap-2`}>
                <span className="flex gap-4 items-center text-[#333740]">View <Eye /></span>
            </SheetTrigger>
            <SheetContent className="w-full max-w-[800px] h-full md:max-h-[650px] pt-[1.25rem] pb-[1.125rem] flex flex-col gap-4 rounded-[1.25rem]">
                Invoice Details
            </SheetContent>
        </Sheet>
    )
}
import AddIcon from "@/components/custom/Icons/AddIcon";
import HoverCancel from "@/components/custom/Icons/HoverCancel";
import Loader from "@/components/custom/Loader";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

export default function Templates() {
    const [loading, setLoading] = useState(false);
    const isMobile = useMediaQuery({query: '(max-width: 768px)'});

    return (
        <>
            {loading && <Loader />}
            <div className="flex flex-col gap-[1.25rem]">
                <div className="flex flex-col md:flex-row gap-5 md:gap-auto justify-between md:items-center mx-auto w-full">
                    <h1 className="text-[1.875rem] font-bold">Research Templates</h1>
                    <Sheet>
                            <SheetTrigger asChild>
                                <Button className="flex gap-4 items-center justify-center py-3 px-6 max-w-[16.75rem]"><span><AddIcon /></span>Upload</Button>
                            </SheetTrigger>
                            <SheetContent side={isMobile ? "bottom" : "top"} className={` ${isMobile ? "inset-y-0 inset-x-auto" : "inset-y-auto inset-x-[30%] rounded-3xl md:!pb-12 md:!pt-0"} mx-auto px-2 md:max-w-[30rem] focus-visible:outline-none overflow-y-hidden`}>
                                <SheetClose className="absolute right-6 w-fit mx-auto py-0 !px-0 flex opacity-70 rounded-full hover:bg-[#14155E14] transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none"><HoverCancel /></SheetClose>
                                <div className={`h-full md:max-h-[26.5rem] border-none w-full flex flex-col gap-[2.5rem]`}>
                                    {/* <RenderDialog /> */}
                                </div>
                            </SheetContent>  
                        </Sheet>
                </div>
            </div>
        </>
    )
}
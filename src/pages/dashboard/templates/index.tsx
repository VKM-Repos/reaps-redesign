import AddIcon from "@/components/custom/Icons/AddIcon";
import Loader from "@/components/custom/Loader";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTemplateStore } from "@/store/templates-store";
import { useMediaQuery } from "react-responsive";
import UploadTemplate from "./components/upload-templates";
import EmptyState from "./components/emptystate";
import UploadedTemplates from "./components/uploaded-templates";
import { mock_templates } from "@/lib/helpers";


export default function Templates() {
    const { loading } = useTemplateStore();
    const isMobile = useMediaQuery({query: '(max-width: 768px)'});

    return (
        <>
            {loading && <Loader />}
            <div className="flex flex-col gap-[2rem]">
                <div className="flex flex-col md:flex-row gap-5 md:gap-auto justify-between md:items-center mx-auto w-full">
                    <h1 className="text-[1.875rem] font-bold">Research Templates</h1>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button className="flex gap-4 items-center justify-center py-3 px-6 max-w-fit md:max-w-[16.75rem]"><span><AddIcon /></span>Upload</Button>
                        </SheetTrigger>
                        <SheetContent side={isMobile ? "bottom" : "top"} className={` ${isMobile ? "inset-y-0 inset-x-auto" : "inset-y-auto inset-x-[30%] rounded-3xl md:!pb-12 md:!pt-0"} mx-auto px-2 md:max-w-[35rem] focus-visible:outline-none overflow-y-hidden`}>
                            <div className={`h-full md:max-h-[31.5rem] border-none w-full flex flex-col gap-[2.5rem] rounded-2xl `}>
                                <UploadTemplate />
                            </div>
                        </SheetContent>  
                    </Sheet>
                </div>
                <div className="mb-24">
                {mock_templates.length !== 0 ? 
                    <UploadedTemplates />
                    :
                    <EmptyState />
                }
                </div>
            </div>
        </>
    )
}
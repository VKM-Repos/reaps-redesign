import HoverCancel from "@/components/custom/Icons/HoverCancel";
import Loader from "@/components/custom/Loader";
import {  SheetClose, SheetContent } from "@/components/ui/sheet";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import CategorySheet from "./Category";
import { CategoryStore, useCategoryStore } from "@/store/category-store";
import { SubmitHandler, useForm } from "react-hook-form";
import PricingSheet from "./Price";


export default function CreateCategory() {
    const [loading, setLoading] = useState(false); 
    const isMobile = useMediaQuery({query: '(max-width: 768px)'});
    const { setStep, step, resetStore } = useCategoryStore();
    const CategoryData = new FormData();




    const RenderDialog = () => {
        const handleNext = () => {
            setStep(step + 1);   
        };

        const createCategoryDetails = async () => {
            setLoading(true);
            try {
                const { data } = useCategoryStore.getState();
                const title = data?.categoryDetails.title ?? '';
                CategoryData.append("title", title);
                const pricing = data?.categoryDetails.pricing ?? '';
                CategoryData.append("pricing", pricing);
                
            

                setTimeout(() => {
                    resetStore();
                    setLoading(false);
                }, 5000)
            }
            catch (error: any) {
                console.error("Error creating form", error);
            }
        }

        const { handleSubmit } = useForm<CategoryStore>();
        const onSubmitHandler: SubmitHandler<CategoryStore> = async () => {
            await handleSubmit(createCategoryDetails)();

        };

       
        switch (step) {
            case 1: 
                return <CategorySheet handleNext={handleNext} />
            case 2: 
                return <PricingSheet handleNext={onSubmitHandler}/>
            default:
                return null;
        }

    }


    return (
        <> {loading && <Loader />}
        
            <SheetContent side={isMobile ? "bottom" : "top"} className={` ${isMobile ? "inset-y-0 inset-x-auto" : "inset-y-auto inset-x-[30%] rounded-3xl md:!pb-12 md:!pt-0"} mx-auto px-2 md:max-w-[30rem] focus-visible:outline-none overflow-y-hidden`}>
                <SheetClose className="absolute right-6 w-fit mx-auto py-0 !px-0 flex opacity-70 rounded-full hover:bg-[#14155E14] transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none"><HoverCancel /></SheetClose>
                <div className={`h-full md:max-h-[26.5rem] border-none w-full flex flex-col gap-[2.5rem]`}>
                    <RenderDialog />
                </div>
            </SheetContent>  

        </>
    )
}
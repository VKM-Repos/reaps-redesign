import FormInput from "@/components/custom/FormInput";
import { Button } from "@/components/ui/button";
import { SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCategoryStore } from "@/store/category-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useForm } from "react-hook-form";
import { z } from "zod";


type CategoryProps = {
    handleNext: Function;
}

const formSchema = z.object({
    title: z
        .string()
        .min(1, {message: "Please fill this field"})
})

export default function CategorySheet({ handleNext }: CategoryProps) {
    const { data, setData } = useCategoryStore();
   
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),

    });
    const { register, formState: { isValid } } = form;

    function onSubmit(values: z.infer<typeof formSchema>) {
        try{
            setData({
                categoryDetails: {
                    ...data.categoryDetails,
                    title: values.title
                }
            });
            handleNext();
        } catch (error: any) {
            console.error(error);
        }
    }

    return (
        <>
        <SheetHeader className="px-1 mt-24 md:mt-16">
            <SheetTitle className="text-left md:text-center font-bold text-[1.625rem] inter">Add New Category</SheetTitle>
            <SheetDescription className="text-left md:text-center text-[#454745] text-sm inter">Enter the name of the category below. </SheetDescription>
        </SheetHeader>
        <div className="w-full mx-auto my-0 px-1">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-[3.75rem] !focus:border-none">
                    <FormInput
                        {...register("title", {
                        required: "This field is required",
                        })}
                    />
                    
                    <Button variant={isValid ? "default" : "ghost"} className={`focus:outline-none`}>Next</Button>
                </form>
            </Form>
        </div>
    </>
    )
}
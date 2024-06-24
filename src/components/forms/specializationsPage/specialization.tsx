import { DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/custom/FormInput";
import { Form } from "@/components/ui/form";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
import { useSpecializationsStore } from "@/context/specializationsFormStore";
import Loader from "@/components/custom/Loader";

type Props = {
    handleNext: Function;
}

const formSchema = z.object({
    specialization: z
        .string()
        .min(1, {message: "Please fill this field"})
})

export default function Specialization({ handleNext }: Props) {
    const { data, setData } = useSpecializationsStore();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),

    });
    const { register, formState: { isValid } } = form;

    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setData({
                specializationsDetails: {
                    ...data.specializationsDetails,
                    specialization: values.specialization
                }
            });
            handleNext();
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <DrawerContent className="px-2 md:max-w-[30rem] md:max-h-[26.5rem] rounded-3xl border-none px-6 pb-8 w-full flex flex-col gap-[2.5rem]">
                <DrawerHeader className="px-1 mt-16">
                    <DrawerTitle className="font-bold text-[1.625rem] inter">Create a specialization</DrawerTitle>
                    <DrawerDescription className="text-[#454745] text-sm inter">Specify your specialization to Help us understand the field of your research, think of it as defining your unique area of expertise.</DrawerDescription>
                </DrawerHeader>
                <div className="w-full mx-auto my-0 px-1">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-[3.75rem] !focus:border-none">
                            <FormInput
                                {...register("specialization", {
                                required: "This field is required",
                                })}
                            />
                           
                            <Button variant={isValid ? "default" : "ghost"} className={`focus:outline-none`}>Next</Button>
                            
                            
                        </form>
                    </Form>
                </div>
            </DrawerContent>
            
        </>
        
    )
}
import { SheetDescription, SheetHeader, SheetTitle} from "@/components/ui/sheet"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/custom/FormInput";
import { Form } from "@/components/ui/form";
import { useSpecializationsStore } from "@/context/specializationsFormStore";
import { useState } from "react";



type Props = {
    specialization: string;
    handleNext: Function;
    onSave: (specialization: string) => void;
}

const formSchema = z.object({
    specialization: z
        .string()
        .min(1, {message: "Please fill this field"})
})

export default function EditSpecialization({ specialization, handleNext, onSave }: Props) {
    const { data, setData } = useSpecializationsStore();
    const [newSpecialization, setNewSpecialization] = useState(specialization)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            specialization: specialization
        }

    });
    const { register, watch, formState: { isValid } } = form;

    const handleSpecialization = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewSpecialization(e.target.value)
    }

   

    function onSubmit() {
        try {
            setData({
                specializationsDetails: {
                    ...data.specializationsDetails,
                    specialization: newSpecialization
                }
            });
            onSave(newSpecialization);
            handleNext();
         
        }
        catch (error) {
            console.error(error);
        }
    }

    
    


    return (
        <>
            <SheetHeader className="px-1 mt-16">
                <SheetTitle className="font-bold text-[1.625rem] inter">Edit specialization</SheetTitle>
                <SheetDescription className="text-[#454745] text-sm inter">You can change the name of your specialization below. Make sure to click the “Next” button to save your changes</SheetDescription>
            </SheetHeader>
            <div className="w-full mx-auto my-0 px-1">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-[3.75rem] !focus:border-none">
                        <FormInput
                            {...register("specialization", {
                            required: "This field is required",
                            onChange:(e) => { handleSpecialization(e as React.ChangeEvent<HTMLInputElement>)}
                            })}
                            value={watch('specialization')}
                        />
                        
                        <Button variant={isValid ? "default" : "ghost"} className={`focus:outline-none`}>Next</Button>
                    </form>
                </Form>
            </div>
        
        </>
        
    )
}
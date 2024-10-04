import { useForm } from "react-hook-form";
import FormInput from "@/components/custom/FormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useOnboardingFormStore } from "@/store/CreateOnboardingFormStore";
import Loader from "@/components/custom/Loader";


export const EmailSettings = ({ onSave }: { onSave: () => void }) => {
    const formSchema = z.object({
        email: z
            .string()
            .min(1, { message: "Please fill this field"})
            .email({ message: "Invalid email address"})
    });


    const { data, setData } = useOnboardingFormStore();
    const defaultValues = {
        email: data.onboardingDetails.email  || ''
    }
    const [loading, setLoader ] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues,
      });
      const { register, formState: { isValid }, reset } = form;


    function onSubmit(values: z.infer<typeof formSchema>) {
        setLoader(true);
        try {
            setData({
                onboardingDetails: {
                    ...data.onboardingDetails,
                    email: values.email,
                }
            }); 
            setTimeout(() => {
                setLoader(false);
                onSave();
                reset();
            }, 3000)
        } catch (error) {
          console.error(error);
        }
    }

    return (
        <>
        {loading && <Loader />}
        <div className="md:w-3/5 w-full max-w-[358px] md:max-w-[526px] my-0">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
             <FormInput
                label="First enter your email address"
                {...register("email", {
                required: "This field is required"
                })}
            />
             <Button variant={isValid ? "default" : "ghost"} className={`my-4 focus:outline-none py-4`}>Save</Button>
            </form>
           
        </Form>
        </div>
        </>
        
       
    )

}
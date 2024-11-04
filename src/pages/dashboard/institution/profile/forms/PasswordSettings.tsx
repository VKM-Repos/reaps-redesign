import { useForm } from "react-hook-form";
import FormInput from "@/components/custom/FormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useOnboardingFormStore } from "@/store/CreateOnboardingFormStore";
import Loader from "@/components/custom/Loader";


export const PasswordSettings = ({ onSave }: { onSave: () => void }) => {
    const formSchema = z.object({
        password: z
        .string({ required_error: "Password is required" })
        .min(1, { message: "Please fill this field" })
        .min(7, {message: "Password must contain a minimum of 7 characters"})
        .regex(/^(?=.*[a-zA-Z])(?=.*\d).+$/, {message: "Password must contain a number and a letter"})
    });

    const { data, setData } = useOnboardingFormStore();

    const defaultValues = {
        password: data.onboardingDetails.password,
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues
    });


    const { register, formState: { isValid}, reset } = form;
    const [ loading, setLoader ] = useState(false);

    function onSubmit(values: z.infer<typeof formSchema>) {
        setLoader(true);
        try {
            setData({
                onboardingDetails: {
                    ...data.onboardingDetails,
                    password: values.password,
                }
            });
            setTimeout(() => {
                setLoader(false);
                onSave();
                reset();
            }, 3000);
        }
        catch (error) {
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
                        label="Your password"
                        type="password"
                        placeholder="********"
                        {...register("password", {
                        required: "This field is required",
                        })}
                        />
                        <Button variant={isValid ? "default" : "ghost"} className={`my-4 focus:outline-none py-4`}>Save</Button>
                    </form>
                </Form>
            </div>
           
        </>
    )
}
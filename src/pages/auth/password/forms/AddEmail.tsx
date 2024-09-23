import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import FormInput from "@/components/custom/FormInput";
import { useState } from "react";
import Loader from "@/components/custom/Loader";
import { Form } from "@/components/ui/form";
import { usePasswordStore } from "@/store/recoverPasswordStore";

type Props = {
    handleNext: Function;
}

const formSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Please fill this field"})
        .email({ message: "Invalid email address"})
});


export default function AddEmail({ handleNext }: Props) {
    const { data, setData } = usePasswordStore();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
      });
      const [isLoading, setIsLoading] = useState(false);

    const { register, formState: { isValid } } = form;

    function onSubmit(values: z.infer<typeof formSchema>) {
    try {
        setData({
            passwordDetails: {
                ...data.passwordDetails,
                email: values.email
            }
        });
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
        handleNext();
        } 
        catch (error) {
         console.error(error);
        }
    }

        return (
            <>
            <div className="py-[2rem] px-[1.25rem] max-h-[124px] md:p-[3.625rem] md:max-h-[130px] border-b border-[#0C0C0F29]">
            <div className="flex justify-between items-center w-full sm:w-4/5 mx-auto my-0">
                
                <div className="flex items-center">
                    <img src="icons/mark.svg" alt="Mark logo" />
                    <img className="md:block hidden" src="icons/reap-icon.svg" alt="Reap logo for website" />
                </div>
                <div>
                    <button className="bg-inherit focus:outline-none notransition border-none hover:border hover:bg-accent hover:rounded-full p-2.5"><img src="icons/cancel-01.svg" alt="Close/Open button" /></button>
                </div>
            </div>
            </div>
            <div className="w-full px-4 md:w-4/5 md:px-0 mx-auto my-0 antialiased inter">
                <div className="flex flex-col justify-center items-center pt-[2.5rem]">
                    <div className="w-[96px] h-[96px] rounded-full flex justify-center items-center bg-[#FFD13A]">
                        <img className="w-[2.5rem] h-[2.125rem]" src="icons/square-lock-01.svg" alt="padlock in yellow background" />
                    </div>
                    
                </div>
                <div className="md:w-3/5 w-full max-w-[358px] md:max-w-[526px] mx-auto my-0">
                    <h1 className="text-xl2 font-semibold pt-10 pb-5 md:py-5 text-center">Reset password</h1>
                    <p className="pt-2 pb-10 text-sm text-center">Just enter the email address you registered with and we'll send you a 6-digit code to reset your password</p>
                {isLoading && <Loader />}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
                        <FormInput
                            label="First enter your email address"
                            placeholder="johndoe@email.com"
                            {...register("email", {
                            required: "This field is required",
                            })}
                        />
                        <Button variant={isValid ? "default" : "ghost"} className={`my-4 focus:outline-none`}>Send Password reset code</Button>
                    </form>
                </Form>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <p className="pt-2 pb-10 text-sm">Need help? <a href="/" className="underline font-semibold text-black hover:text-black" >Contact us</a></p>
                </div>
            </div>
            </>
        
    )

}
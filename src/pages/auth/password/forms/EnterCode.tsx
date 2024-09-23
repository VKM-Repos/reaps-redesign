import { Button } from "@/components/ui/button";
import BackButton from "@/components/custom/BackButton";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/custom/FormInput";
import { useMobileContext } from "@/context/MobileContext";
import TopBar from "@/components/custom/TopBar";
import { usePasswordStore } from "@/store/recoverPasswordStore";
import { useState } from "react";
import Loader from "@/components/custom/Loader";

type Props = {
    handleNext: Function,
    handleGoBack: Function
}
const formSchema = z.object({
    code: z
    .string()
    .max(6, {message: "Please input the code sent to your email"})
    .min(6, {message: "Please input the code sent to your email"})
    .regex(/^\d+$/, { message: "Code should contain only digits" })
});

export default function EnterCode({ handleNext, handleGoBack }: Props) {
    const { isMobile } = useMobileContext();
    const [loading, setLoading] = useState(false);
    const { data, setData } = usePasswordStore();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const { register, formState: {isValid} } = form;

   // using async because usestate is being blocked

   async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true); 
  

      await new Promise((resolve) => setTimeout(resolve, 3000));
  
      // After async task completes, update state and perform actions
      setData({
        passwordDetails: {
          ...data.passwordDetails,
          code: values.code,
        },
      });

        setLoading(false);
        handleNext();
      
    } catch (error) {
      console.error("Error in onSubmit:", error);
      setLoading(false); 
    }
  }


      return(
        <>
            {loading && <Loader />}
            <TopBar title="Back" />
            <div className="w-full md:w-4/5 px-4 md:mx-auto my-0 antialiased relative">
                
                <div className="flex flex-col justify-center items-center relative w-full">
                    <div className="absolute left-0">
                    {!isMobile ? <BackButton title="Back" goBack={handleGoBack}/>: ''}
                    </div>
                    <div className="pt-[2.5rem]">
                        <div className="w-[96px] h-[96px] rounded-full flex justify-center items-center bg-[#FFD13A] ">
                            <img className="w-[2.5rem] h-[2.125rem]" src="icons/mail-01.svg" alt="padlock in yellow background" />
                        </div>
                    </div>   
                </div>
                <div className="md:w-3/5 w-full max-w-[375px] md:max-w-[526px] mx-auto my-0">
                   {/* {isLoading && <Loader />} */}
                   <h1 className="font-semibold p-[1rem] text-[1.625rem] leading-[2rem] text-center">Check your email</h1>
                    <div className="pt-2 pb-10">
                        <p className="text-sm text-center text-[#454745] leading-[14px]">We've sent a 6-digit code to <span className="font-bold font-black">{data.passwordDetails.email}</span>.  If you don’t get the email soon, check your spam folder. Still need help?</p>
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
                            <FormInput
                                label="Enter 6-digit code"
                                type="number"
                                {...register("code", {
                                required: "This field is required",
                                })}
                                className="no-spinner"
                            />
                            <div className="flex flex-col justify-center items-center">
                                <p className="pt-2 pb-7 text-sm">Still need help? <a href="/" className="underline font-semibold text-black hover:text-black" >Contact us</a></p>
                            </div>
                            <Button variant={isValid ? "default" : "ghost"} className={`my-4 focus:outline-none`}>Submit</Button>
                        </form>
                    </Form>
                </div>
            </div>
        </>
    )
}
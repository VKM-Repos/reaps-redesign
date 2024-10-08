import { Button } from "@/components/ui/button";
import BackButton from "@/components/custom/BackButton";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/custom/FormInput";
import { useOnboardingFormStore } from "@/store/CreateOnboardingFormStore";
import { useMobileContext } from "@/context/MobileContext";
import Loader from "@/components/custom/Loader";
import { useEffect, useState } from "react";

type Props = {
    handleNext: Function,
    handleGoBack: Function
}
const formSchema = z.object({
    code: z
        .string()
        .max(6, {message: "Please input the code sent to your email"})
        .min(6, {message: "Please input the code sent to your email"})
        .regex(/^\d+$/, { message: "Code must contain only digits" })
});

export default function SendCode({ handleNext, handleGoBack }: Props) {  
    const { isMobile } = useMobileContext();
    const { data, setData, loading, setLoading } = useOnboardingFormStore();
    const [ sendAgain, setSendAgain ] = useState(true);
    const [countdown, setCountdown] = useState(0); 
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });


    const handleResend = () => {
      if (sendAgain) {
        setCountdown(60);  
        setSendAgain(false); 
      }
    };
  

    useEffect(() => {
      if (countdown > 0) {
        const timer = setInterval(() => {
          setCountdown((prev) => prev - 1);
        }, 1000);
  
        return () => clearInterval(timer);
      } else {
        setSendAgain(true);  
      }
    }, [countdown]);

    const { register, formState: {isValid} } = form;
  

    function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);
        try {
            setData({
                onboardingDetails: {
                  ...data.onboardingDetails,
                  code: values.code
                }
            });
            setTimeout(() => {
                handleNext();
                setLoading(false);
            }, 3000);
        } catch (error) {
          console.error(error);
        }
      }

    return(
        <>
             {loading && <Loader />}
            <div className="w-full md:w-4/5 px-4 md:mx-auto my-0 antialiased relative pt-[2.5rem]">
                    {!isMobile ? <BackButton title="Back" goBack={handleGoBack}/>: ''}
                <div className="md:w-3/5 w-full max-w-[375px] md:max-w-[526px] mx-auto my-0">
                    <div className="flex flex-col justify-center items-center">
                        <h1 className="text-xl2 font-semibold pt-10 pb-5 md:py-5 text-center">Enter the 6-digit code</h1>
                        <div className="pt-2 pb-5">
                            <p className="text-sm text-center leading-[14px] text-[#454745]">For security, we've sent you an email to <span className="font-bold font-black">{data.onboardingDetails.email}</span>.  Simply enter the code in the email into the box below to proceed.</p>
                        </div>
                    </div>
                  
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
                            <FormInput
                                label="Your 6-digit code"
                                type="number"
                                {...register("code", {
                                required: "This field is required",
                                })}
                                className="no-spinner"
                            />
                            <div className="flex flex-col justify-center items-center">
                                <p className="pt-2 pb-7 text-sm text-[#454745]">Didn't get an email? {sendAgain ? <a onClick={handleResend} className="underline font-semibold text-black hover:text-black" >Send it again</a> : <span className="font-semibold text-black">{countdown}s</span>}</p>
                            </div>
                            <Button variant={isValid ? "default" : "ghost"} className={`my-4 focus:outline-none`}>Continue</Button>
                        </form>
                    </Form>
                </div>
            </div>
        </>
    )
}
import { Button } from "@/components/ui/button";
import BackButton from "@/components/custom/BackButton";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/custom/FormInput";
import { Props } from "@/types/forms.types"
import { useOnboardingFormStore } from "@/store/CreateOnboardingFormStore";
import { useMobileContext } from "@/context/MobileContext";
import TopBar from "@/components/custom/TopBar";
import Loader from "@/components/custom/Loader";


const formSchema = z.object({
    password: z
    .string({ required_error: "Password is required" })
    .min(1, { message: "Please fill this field" })
    .min(7, {message: "Password must contain a minimum of 7 characters"})
    .regex(/^(?=.*[a-zA-Z])(?=.*\d).+$/, {message: "Password must contain a number and a letter"})
});


export default function Password({ handleGoBack, handleNext }: Props) {
  const { data, setData, loading, setLoading } = useOnboardingFormStore();
  const { isMobile } = useMobileContext();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { register, formState: { isValid } } = form;

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
        setData({
            onboardingDetails: {
              ...data.onboardingDetails,
              password: values.password
            }
        });
        setTimeout(() => {
            setLoading(false);
            handleNext();
        }, 3000);
        } 
        catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            {loading && <Loader />}
            <TopBar title="Personal Info" />
            <div className= "md:w-4/5 w-full px-4 md:px-0 mx-auto my-0 antialiased relative pt-[2.5rem]">
                {!isMobile && <BackButton title="Back" goBack={handleGoBack}/>}
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-xl2 text-center font-semibold pt-10 pb-5 md:py-5">Create your password</h1>
                </div>

                <div className="md:w-3/5 w-full max-w-[358px] md:max-w-[526px] mx-auto my-0">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-center gap-2">
                            <FormInput
                                label="Your password"
                                type="password"
                                placeholder="********"
                                {...register("password", {
                                required: "This field is required",
                                })}
                            />
                             <p className="my-5 text-center text-sm">Password must contain a <span className="font-semibold">letter</span> and a <span className="font-semibold">number</span>, and be minimum of 7 <span className="font-semibold">characters</span> long</p>
                            <Button variant={isValid ? "default" : "ghost"} className={`my-4 focus:outline-none`}>Continue</Button>
                        </form>
                    </Form>
                    
                </div>
            </div>
        </>
    )
}


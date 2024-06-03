import AuthLayout from "@/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/custom/BackButton";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { useState } from "react";
import FormInput from "@/components/custom/FormInput";
import { Props } from "@/components/forms/forms.types";
import { useOnboardingFormStore } from "@/context/CreateOnboardingFormStore";
import { useMobileContext } from "@/context/MobileContext";
import TopBar from "@/components/custom/TopBar";
import countryCodes from "@/data/CountryCodes.json"


const formSchema = z.object({
    firstName: z
        .string()
        .min(1, { message: "Please fill this field"}),
    lastName: z
        .string()
        .min(1, {message: "Please fill this field"}),
    phoneNumber: z
        .string()
        .min(1, { message: "Please fill this field"})
});

export function PersonalInfo({ handleNext, handleGoBack }: Props) {
    const [countryCode, setCountryCode] = useState("");
    const { isMobile } = useMobileContext();
    const { data, setData } = useOnboardingFormStore();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const { register, formState: { isValid } } = form;
    
    // const combinedPhoneNumber = `+${countryCode}${values.phoneNumber}`;

    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setData({
                onboardingDetails: {
                    ...data.onboardingDetails,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    //set combined phone number
                    phoneNumber: values.phoneNumber
                }
            }); 
            handleNext();
        } catch (error) {
          console.error(error);
        }
    }
    return(
        <AuthLayout>
            <TopBar title="Verification" />
            <div className="w-full px-4 md:w-4/5 md:px-0 mx-auto my-0 antialiased inter relative">
                {!isMobile && <BackButton title="Back" goBack={handleGoBack}/>}
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-xl2 font-semibold pt-10 pb-5 md:py-5">Enter your Personal Information</h1>
                </div>
                <div className="md:w-3/5 w-full max-w-[358px] md:max-w-[526px] mx-auto my-0">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
                            <FormInput
                                label="Your first name"
                                {...register("firstName", {
                                required: "This field is required",
                                })}
                            />
                            <FormInput
                                label="Your last name"
                                {...register("lastName", {
                                required: "This field is required",
                                })}
                            />
                            
                            <FormInput
                                label="Phone number"
                                {...register("phoneNumber", {
                                required: "This field is required",
                                })}
                            />
                            <Button variant={isValid ? "default" : "ghost"} className={`my-4 focus:outline-none`}>Continue</Button>
                        </form>
                    </Form>
                </div>
            </div>
        </AuthLayout>
    )
}

export default PersonalInfo;
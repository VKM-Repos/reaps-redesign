import { useForm } from "react-hook-form";
import FormInput from "@/components/custom/FormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useOnboardingFormStore } from "@/store/CreateOnboardingFormStore";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import countryCodes from "@/lib/CountryCodes.json"
import { Label } from "@/components/ui/label";
import CustomFormField, { FormFieldType } from "@/components/custom/CustomFormField";
import Loader from "@/components/custom/Loader";



export const ProfileSettings = () => {
    const [dialCode, setDialCode] = useState("+234");
    const [loading, setLoader] = useState(false);
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
        .regex(/^\d+$/, { message: "Phone number should contain only numbers" }),
    dob: z
        .date()
    })

    const { data, setData } = useOnboardingFormStore();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
      });
      const { register, formState: { isValid }, reset} = form;


    function onSubmit(values: z.infer<typeof formSchema>) {
        const dialNumber = dialCode + values.phoneNumber;
        setLoader(true);
        try {
            setData({
                onboardingDetails: {
                    ...data.onboardingDetails,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    phoneNumber: dialNumber,
                    dob: values.dob,
                }
            }); 
            setTimeout(() => {
                setLoader(false);
                reset();
            }, 3000);
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
            <div className="flex flex-col gap-6">
                <FormInput
                    label="Your First Name"
                    type="text"
                    placeholder="John"
                    {...register("firstName", {
                    required: "This field is required",
                    })}
                    />
                    <FormInput
                    label="Your Last Name"
                    type="text"
                    placeholder="Doe"
                    {...register("lastName", {
                    required: "This field is required",
                    })}
                    />
                    <CustomFormField 
                        name="dob"
                        fieldType={FormFieldType.DATE}
                        control={form.control}
                        label="Date of Birth"
                    />
                    <div className="flex gap-2">
                        <div className="flex flex-col text-xs mt-2">
                            <Select onValueChange={(value: string) => {
                                    const selectedCountry: any = countryCodes.find(country => country.name === value);
                                    if (selectedCountry) {
                                    setDialCode(selectedCountry.dial_code);
                                    }
                                }}>
                                <Label className="font-md">Country Code</Label>
                                <SelectTrigger className="max-w-28 mt-2">
                                    <SelectValue placeholder={dialCode} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup> 
                                        <SelectLabel>Country Codes</SelectLabel>
                                        {countryCodes && countryCodes.map((country) => (
                                                <SelectItem
                                                    value={country.name}
                                                >
                                                    {country.dial_code}
                                                </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        
                        <div className="w-full">
                            <FormInput
                                label="Phone number"
                                {...register("phoneNumber", {
                                required: "This field is required",
                                })}   
                            />
                        </div>  
                    </div>
                </div>
                <Button variant={isValid ? "default" : "ghost"} className={`my-4 focus:outline-none py-4`}>Save</Button>
            </form>
            </Form>
            </div>
        </>
       
    )
}
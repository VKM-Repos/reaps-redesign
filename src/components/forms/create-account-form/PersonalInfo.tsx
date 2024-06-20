import { Button } from "@/components/ui/button";
import BackButton from "@/components/custom/BackButton";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/custom/FormInput";
import { Props } from "@/components/forms/forms.types";
import { useOnboardingFormStore } from "@/context/CreateOnboardingFormStore";
import { useMobileContext } from "@/context/MobileContext";
import TopBar from "@/components/custom/TopBar";
import countryCodes from "@/lib/CountryCodes.json"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";

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

type CountryCode = {
    name?: string,
    dial_code?: string,
    code?: string
}

const filterUniqueCountries = (countries: CountryCode[]): CountryCode[] => {
    const seenNames = new Set<string>();
    return countries.filter((country) => {
      if (seenNames.has(country.name as string)) {
        return false;
      } else {
        seenNames.add(country.name as string);
        return true;
      }
    });
  };

export function PersonalInfo({ handleNext, handleGoBack }: Props) {
    const [dialCode, setDialCode] = useState("");

    const [open, setOpen] = useState(false);
    const { isMobile } = useMobileContext();
    const { data, setData } = useOnboardingFormStore();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    

    const { register, formState: { isValid } } = form;
    
    // const combinedPhoneNumber = `+${countryCode}${values.phoneNumber}`;

    function onSubmit(values: z.infer<typeof formSchema>) {
        const code = dialCode;
        const dialNumber = code + values.phoneNumber;
        console.log(dialNumber);
        try {
            setData({
                onboardingDetails: {
                    ...data.onboardingDetails,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    //set combined phone number
                    phoneNumber: dialNumber
                }
            }); 
            handleNext();
        } catch (error) {
          console.error(error);
        }
    }

    // const filteredCountryCodes = filterUniqueCountries(countryCodes);
    

    
    return(
        <>
            <TopBar title="Verification" />
            <div className="w-full px-4 md:w-4/5 md:px-0 mx-auto my-0 antialiased relative">
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
                            <div className="flex gap-2">
                                <div className="flex flex-col text-xs mt-3">
                                    <Select>
                                        <Label className="text-xs">Country Code</Label>
                                        <SelectTrigger className="w-[80px]">
                                            <SelectValue placeholder="+234" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup> 
                                                <SelectLabel>Country Codes</SelectLabel>
                                                {countryCodes && countryCodes.map((country) => (
                                                        <SelectItem 
                                                            value={country.name}
                                                            onChange={() => {
                                                                setDialCode(country.dial_code);
                                                                setOpen(false);
                                                            }}
                                                        >
                                                            {country?.dial_code}
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
                            <Button variant={isValid ? "default" : "ghost"} className={`my-4 focus:outline-none`}>Continue</Button>
                        </form>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default PersonalInfo;


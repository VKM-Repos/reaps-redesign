import { Button } from "@/components/ui/button";
import BackButton from "@/components/custom/BackButton";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/custom/FormInput";
import { Props } from "@/types/forms.types";
import { useOnboardingFormStore } from "@/store/CreateOnboardingFormStore";
import { useMobileContext } from "@/context/MobileContext";
import TopBar from "@/components/custom/TopBar";
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
import Loader from "@/components/custom/Loader";
import { countries, CountryListItemType } from "country-list-json";
import countryFlags from "@/lib/data/countries.json"


const formSchema = z.object({
    firstName: z
        .string()
        .min(1, { message: "Please fill this field"}),
    lastName: z
        .string()
        .min(1, {message: "Please fill this field"}),
    phoneNumber: z
        .string()
        .min(8, { message: "Please fill this field"})
        .max(12, { message: "Phone number should not contain more than 12 characters"})
        .regex(/^\d+$/, { message: "Phone number should contain only numbers" })
});

type FlagData = { 
    url: string; 
    alpha3: string; 
    name: string; 
    file_url: string; 
    license: string; 
}




export function PersonalInfo({ handleNext, handleGoBack }: Props) {
    const [dialCode, setDialCode] = useState("+93");
    const { isMobile } = useMobileContext();
    const { data, setData, loading, setLoading } = useOnboardingFormStore();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const { register, formState: { isValid } } = form;

    const [flags, setFlags] = useState<FlagData[]>([]);
    const [countriesData, setCountries] = useState<CountryListItemType[]>([])

    useEffect(() => {
        setCountries(countries);
        setFlags(countryFlags);
    }, []);



    const combinedData = countriesData
        .filter(country => flags.some(f => f.name === country.name))
        .map(country => {
        const flag = flags.find(f => f.name === country.name);
        return {
            ...country,
            flag: flag?.file_url || ''
        };
    });


    function onSubmit(values: z.infer<typeof formSchema>) {
        const dialNumber = dialCode + values.phoneNumber;
        setLoading(true);
        try {
            setData({
                onboardingDetails: {
                    ...data.onboardingDetails,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    phoneNumber: dialNumber
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
                                placeholder="Jane"
                                {...register("firstName", {
                                required: "This field is required",
                                })}
                            />
                            <FormInput
                                label="Your last name"
                                placeholder="Doe"
                                {...register("lastName", {
                                required: "This field is required",
                                })}
                            />
                            <div className="flex gap-2">
                                <div className="flex flex-col text-xs mt-2">
                                    <Select onValueChange={(value: string) => {
                                            const selectedCountry: any = combinedData.find(country => country.name === value);
                                            if (selectedCountry) {
                                            setDialCode(selectedCountry.dial_code);
                                            }
                                        }}>
                                        <Label className="font-md">Country Code</Label>
                                        <SelectTrigger className="max-w-32 mt-2">
                                            <SelectValue placeholder={dialCode}>{dialCode}</SelectValue>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup> 
                                                <SelectLabel>Country Codes</SelectLabel>
                                                {combinedData && combinedData.map((country) => (
                                                        <SelectItem 
                                                        key={country.name} value={country.name}
                                                        >
                                                            <div className="flex gap-4 items-center justify-center">
                                                                <span><img src={country.flag} height="24px" width="24px"/></span>
                                                                <span>{country.name}</span>
                                                                <span>{country.dial_code}</span>
                                                            </div>
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


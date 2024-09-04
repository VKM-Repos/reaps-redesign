// add all forms
import { useForm } from "react-hook-form";
import FormInput from "@/components/custom/FormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "react-router-dom";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useOnboardingFormStore } from "@/store/CreateOnboardingFormStore";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import countryCodes from "@/lib/CountryCodes.json"
import { Label } from "@/components/ui/label";
import { useRequestsStore } from "@/store/RequestFormStore";
import CustomFormField, { FormFieldType } from "@/components/custom/CustomFormField";

type FormWrapperProps = {
   
    formSchema: any,
    onSubmit: (values: any) => void,
    children: React.ReactNode,
}

export const ProfileSettings = () => {
    const [dialCode, setDialCode] = useState("+234");
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
        .regex(/^\d+$/, { message: "Phone number should contain only numbers" })
    })

    const { data, setData } = useOnboardingFormStore();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
      });
      const { register } = form;


    function onSubmit(values: z.infer<typeof formSchema>) {
        const dialNumber = dialCode + values.phoneNumber;
        try {
            setData({
                onboardingDetails: {
                    ...data.onboardingDetails,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    phoneNumber: dialNumber
                }
            }); 
        } catch (error) {
          console.error(error);
        }
    }
    return (
      <FormWrapper formSchema={formSchema} onSubmit={onSubmit}>
            <FormInput
            label=""
            type="password"
            placeholder="********"
            {...register("firstName", {
            required: "This field is required",
            })}
            />
            <FormInput
            label="Your password"
            type="password"
            placeholder="********"
            {...register("lastName", {
            required: "This field is required",
            })}
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
      </FormWrapper>
    )
}
export const EmailSettings = () => {
    const formSchema = z.object({
        email: z
            .string()
            .min(1, { message: "Please fill this field"})
            .email({ message: "Invalid email address"})
    });

    const { data, setData } = useOnboardingFormStore();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
      });
      const { register } = form;


    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setData({
                onboardingDetails: {
                    ...data.onboardingDetails,
                    firstName: values.email,
                }
            }); 
        } catch (error) {
          console.error(error);
        }
    }

    return (
        <FormWrapper formSchema={formSchema} onSubmit={onSubmit}>
             <FormInput
                label="First enter your email address"
                placeholder="johndoe@email.com"
                {...register("email", {
                required: "This field is required",
                })}
            />
        </FormWrapper>
    )

}
export const InstitutionSettings = () => {
    const formSchema = z.object({
        institution: z
            .string()
            .min(1, { message: "Please fill this field"})
    })
    
    const institutions = ["University of Abuja", "University of PortHarcourt", "University of Lagos", "University of Benin"];
    const { data, setData } = useRequestsStore();
    const [ institute, setInstitute ] = useState("");
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const {  setValue } = form;

    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setData({
                requestsDetails: {
                    ...data.requestsDetails,
                    institution: values.institution,
                }
            });
        }
        catch (error) {
            console.error(error);
        }
    }
    return (  
        <FormWrapper formSchema={formSchema} onSubmit={onSubmit}>
            <div className="flex flex-col text-xs mt-2">
                <Select onValueChange={(value: string) => {
                    setValue("institution", value, { shouldValidate: true });
                    setInstitute(value);
                }}>
                    <Label className="font-sm">Select your Institution</Label>
                    <SelectTrigger className="w-full mt-2">
                        <SelectValue placeholder={institute} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel></SelectLabel>
                            {institutions && institutions.map((institute) =>(
                                <SelectItem value={institute}>{institute}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </FormWrapper>
       
    )

}
export const EducationSettings = () => {
    const educationLevels = ["Undergraduate", "Postgraduate", "Postgraduate"]
    const formSchema = z.object({
        education: z
            .string()
            .min(1, { message: "Please fill this field"}),
        orcid: z
            .string()
            .min(1, { message: "Please fill this field"})
    });

    const [ education, setEducation ] = useState("Post Graduate");
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const {  setValue, register } = form;

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return (
        <FormWrapper formSchema={formSchema} onSubmit={onSubmit}>
            <div className="mt-2 flex flex-col gap-6">
                <div className="flex flex-col text-xs mt-2">
                    <Select onValueChange={(value: string) => {
                        setValue("education", value, { shouldValidate: true });
                        setEducation(value);
                    }}>
                        <Label className="font-sm">Select your Education</Label>
                        <SelectTrigger className="w-full mt-2">
                            <SelectValue placeholder={education} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel></SelectLabel>
                                {educationLevels && educationLevels.map((educationLevel) =>(
                                    <SelectItem value={educationLevel}>{educationLevel}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <FormInput 
                    label="ORCID ID"
                    {...register("orcid", {
                    required: "This field is required",
                    })}
                />
            </div>
        </FormWrapper>
    )

}
export const NotificationsSettings = () => {
    const formSchema = z.object({
        notifications: z.
            boolean()
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return (
        <FormWrapper formSchema={formSchema} onSubmit={onSubmit}>

            <CustomFormField 
                name="notifications"
                fieldType={FormFieldType.SWITCH}
                control={form.control}
                />
        </FormWrapper>
    )

}
export const PasswordSettings = () => {
    const formSchema = z.object({
        password: z
        .string({ required_error: "Password is required" })
        .min(1, { message: "Please fill this field" })
        .min(7, {message: "Password must contain a minimum of 7 characters"})
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const { data, setData } = useOnboardingFormStore();
    const { register } = form;

    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setData({
                onboardingDetails: {
                  ...data.onboardingDetails,
                  password: values.password
                }
            });
            } 
            catch (error) {
                console.error(error);
            }
        }
    
    return (
        <FormWrapper formSchema={formSchema} onSubmit={onSubmit}>
            <FormInput
            label="Your password"
            type="password"
            placeholder="********"
            {...register("password", {
            required: "This field is required",
            })}
            />
        </FormWrapper>
        

    )
}


export const FormWrapper = ({ onSubmit, formSchema, children }: FormWrapperProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
      });

      const { formState: { isValid } } = form;
    return (
        <div className="md:w-3/5 w-full max-w-[358px] md:max-w-[526px] my-0">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
                    {children}
                    <Button variant={isValid ? "default" : "ghost"} className={`my-4 focus:outline-none`}>Save</Button>
                </form>
            </Form>
        </div>
    )
}
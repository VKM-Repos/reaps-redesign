import { useForm } from "react-hook-form";
import FormInput from "@/components/custom/FormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useOnboardingFormStore } from "@/store/CreateOnboardingFormStore";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import Loader from "@/components/custom/Loader";


export const EducationSettings = ({ onSave }: { onSave: () => void }) => {
    const educationLevels = ["Undergraduate", "Postgraduate", "Graduate"]
    const formSchema = z.object({
        education: z
            .string()
            .min(1, { message: "Please fill this field"}),
        orcid: z
            .string()
            .min(1, { message: "Please fill this field"})
    });

    const [ education, setEducation ] = useState("Graduate");
    const [ loading, setLoader ] = useState(false);
    const { data, setData } = useOnboardingFormStore();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const {  setValue, register, formState: { isValid }, reset } = form;

    function onSubmit(values: z.infer<typeof formSchema>) {
        setLoader(true);
       try {
        setData({
            onboardingDetails: {
                ...data.onboardingDetails,
                education: values.education,
            }
        });
        setTimeout(() => {
            setLoader(false);
            onSave();
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
            <Button variant={isValid ? "default" : "ghost"} className={`my-4 focus:outline-none py-4`}>Save</Button>
            </form>
          
        </Form>
        </div>
        </>
        
    )

}
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useRequestsStore } from "@/store/RequestFormStore";
import Loader from "@/components/custom/Loader";


export const InstitutionSettings = ({ onSave }: { onSave: () => void }) => {
    const formSchema = z.object({
        institution: z
            .string()
            .min(1, { message: "Please fill this field"})
    })
    
    const institutions = ["University of Abuja", "University of PortHarcourt", "University of Lagos", "University of Benin"];
    const { data, setData } = useRequestsStore();
    const defaultValues = {
        institution: data.requestsDetails.institution,
    }
    const [ institute, setInstitute ] = useState("");
    const [loading, setLoader ] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    const {  setValue, formState: { isValid }, reset } = form;

    function onSubmit(values: z.infer<typeof formSchema>) {
        setLoader(true);
        try {
            setData({
                requestsDetails: {
                    ...data.requestsDetails,
                    institution: values.institution,
                }
            });
            setTimeout(() => {
                setLoader(false);
                onSave();
                reset();
            }, 3000);
        }
        catch (error) {
            console.error(error);
        }
    }
    return (  
        <>
        {loading && <Loader />}
        <div className="md:w-3/5 w-full max-w-[358px] md:max-w-[526px] my-0">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
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
                <Button variant={isValid ? "default" : "ghost"} className={`my-4 focus:outline-none py-4`}>Save</Button>
            </form>
           
        </Form>
        </div>
        </>
       
       
    )

}
import { Label } from "@/components/ui/label";
import { useRequestsStore } from "@/context/RequestFormStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useForm } from "react-hook-form";
import { z } from "zod";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import { useState } from "react";

type Props = {
    handleSpecNext: Function
}

const formSchema = z.object({
    institution: z
        .string()
        .min(1, { message: "Please fill this field"})
})

const institutions = ["University of Abuja", "University of PortHarcourt", "University of Lagos", "University of Benin"];


const SelectInstitution = ({handleSpecNext}: Props) => {
    const { data, setData } = useRequestsStore();
    const [ institute, setInstitute ] = useState("")


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const { formState: { isValid }, setValue } = form;

    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setData({
                requestsDetails: {
                    ...data.requestsDetails,
                    institution: values.institution,
                }
            });
            handleSpecNext();
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            {institutions.length > 0 &&
                <>
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-xl2 font-semibold pt-10 pb-5 md:py-5">Select your Institution</h1>
                </div>
                <div className="md:w-3/5 w-full max-w-[358px] md:max-w-[526px] mx-auto my-0">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
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
                            <Button variant={isValid ? "default" : "ghost"} className={`my-4 focus:outline-none`}>Continue</Button>
                        </form>
                    </Form>
                </div>
            </>
            }
        </>
    )

}

export default SelectInstitution;
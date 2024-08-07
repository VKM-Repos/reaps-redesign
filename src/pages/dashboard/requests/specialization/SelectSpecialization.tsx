import { useRequestsStore } from "@/context/RequestFormStore";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useState } from "react";
import RequestSpecialization from "./RequestSpecialization";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type Props = {
    handleNext: Function;
}


const formSchema = z.object({
    specialisation: z.string().refine(
        (val) => specialization.includes(val as any),
        { message: "Please select a valid specialization" }
    )
});

const specialization = ["Medicine", "Law", "Engineering", "Architecture"];


export default function SelectSpecialization({ handleNext }: Props) {
    const { data, setData } = useRequestsStore();
    const [spec, setSpec] = useState("");
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const { formState: { isValid } } = form;
    

    function onSubmit(values: z.infer<typeof formSchema>) {
       
        try {
            setData({
                requestsDetails: {
                    ...data.requestsDetails,
                    specialisation: values.specialisation,
                }
            });
            handleNext();
        }
        catch (error) {
            console.error(error);
        }
    }



  return (
    <>
    {specialization.length > 0 ?
        <>
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-xl2 font-semibold pt-10 pb-5 md:py-5">Select your specialization</h1>
            </div>
            <div className="md:w-3/5 w-full max-w-[358px] md:max-w-[526px] mx-auto my-0">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
                        <div className="flex flex-col text-xs mt-2">
                            <Select onValueChange={(value: string) => {
                                const selectedSpec: any = specialization.find(specValue => specValue === value);
                                if (selectedSpec) {
                                    setSpec(selectedSpec);
                                    // console.log(spec);
                                }
                            }}>
                                <Label className="font-sm">Select your Specialisation</Label>
                                <SelectTrigger className="w-full mt-2">
                                    <SelectValue placeholder={spec} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel></SelectLabel>
                                        {specialization && specialization.map((spec) =>(
                                            <SelectItem value={spec}>{spec}</SelectItem>
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
        :
        <>
            <RequestSpecialization handleSpecNext={handleNext}/>
        </>
    }
        
    </>
    
  )
}


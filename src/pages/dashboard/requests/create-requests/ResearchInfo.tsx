import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/custom/FormInput";
import { useRequestsStore } from "@/store/RequestFormStore";
import { useStepper } from "@/context/StepperContext";
import { useEffect } from "react";
import CustomFormField, { FormFieldType } from "@/components/custom/CustomFormField";
import SavingLoader from "../components/SavingLoader";

const formSchema = z.object({
    title: z
        .string()
        .min(1, { message: "Please fill this field"}),
    objectives: z
        .string()
        .min(1, { message: "Please fill this field"})
})

type Props = {
    handleNext: Function
}

const ResearchInfo = ({ handleNext }: Props) => {
    const { data, setData } = useRequestsStore();
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const { formState: {isValid, errors }, register} = form;
    const { setStepper } = useStepper();

    const updateStep = () => {
        setStepper(1);
      }
  
      

    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setData({
                requestsDetails: {
                    ...data.requestsDetails,
                    title: values.title,
                    objectives: values.objectives,
                }
            });
            handleNext();
        }
        catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        updateStep();
      }, [updateStep])

  return (
    <div className="flex flex-col gap-[1.25rem] w-full px-4 md:w-4/5 md:px-0 my-0 mx-auto">
        <SavingLoader />
        <div className=" my-4 flex flex-col gap-6 justify-center items-center">
            <div className="flex flex-col gap-8 w-full max-w-[37rem] text-center">
                <h1 className="text-[1.625rem] leading-8 font-bold">Research Information</h1>
            </div>
            <div className="md:w-3/5 w-full max-w-[358px] md:max-w-[526px] mx-auto my-0">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 text-sm text-[#454745]">
                            <FormInput
                                label="Title of research"
                                {...register("title", {
                                required: "This field is required",
                                })}
                                required
                                className="font-normal capitalize"
                            />
                            <CustomFormField 
                                fieldType={FormFieldType.TEXTAREA}
                                name="objectives"
                                error={errors["objectives"]}
                                control={form.control}
                                label="Objectives of the study"
                                labelClassName="!font-medium "
                                className="!pb-[12rem] flex"
                                required
                            />
                           
                            <Button variant={isValid ? "default" : "ghost"} className={`my-4 focus:outline-none`}>Continue</Button>
                    </form>
                </Form>
            </div>
        </div>
    </div>
  )
}

export default ResearchInfo
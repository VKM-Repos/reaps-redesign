import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import {  useRequestsStore } from "@/store/RequestFormStore";
import { Button } from "@/components/ui/button";
import CustomFormField, { FormFieldType } from "@/components/custom/CustomFormField";
import { questions } from "@/lib/helpers";
import { useEffect } from "react";

import { useStepper } from "@/context/StepperContext";

const formSchema = z.object({
  question1: z.enum(["yes", "no"], { required_error: "This field is required." }),
  question2: z.enum(["yes", "no"], { required_error: "This field is required." }),
  question3: z.enum(["yes", "no"], { required_error: "This field is required." }),
  question4: z.enum(["yes", "no"], { required_error: "This field is required." }),
  question5: z.enum(["yes", "no"], { required_error: "This field is required." }),
  question6: z.enum(["yes", "no"], { required_error: "This field is required." }),
  question7: z.string().min(1, { message: "This field is required"}),
});



type Props = {
    handleNext: Function
}


export default function AppInfo({ handleNext}: Props) {
    const { data, setData } = useRequestsStore();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          question1: "no",
          question2: "no",
          question3: "no",
          question4: "no",
          question5: "no",
          question6: "no",
          question7: "1",

        }
        
    });
    const { setStepper } = useStepper();

    const updateStep = () => {
      setStepper(0);
    }

    useEffect(() => {
      updateStep();
    }, [updateStep])

  
     
   
    

    
    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setData({
                requestsDetails: {
                    ...data.requestsDetails,
                    checkbox: {
                        question1: values.question1,
                        question2: values.question2,
                        question3: values.question3,
                        question4: values.question4,
                        question5: values.question5,
                        question6: values.question6,
                        question7: values.question7,

                    }
                }
            })
            handleNext();
        } catch(error) {
            console.error(error);
        }
    }

    return (
        <div className="w-full px-4 md:w-4/5 md:px-0 mx-auto my-0 antialiased relative flex flex-col gap-6">
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-xl2 font-semibold pt-10 pb-5 md:py-5">Application Information</h1>
            </div>
            <div className="md:w-4/5 w-full max-w-[368px] md:max-w-[526px] mx-auto my-0">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
                    <div className="flex flex-col gap-8 ">

                    {questions.map((question) => (
                      <CustomFormField
                          key={question.name}
                          name={question.name}
                          control={form.control}
                          label={question.label}
                          fieldType={FormFieldType.RADIO}
                          options={[
                              { label: "Yes", value: "yes" },
                              { label: "No", value: "no" },
                         ]}
                          required={true}
                      />
                  ))}
                        <CustomFormField 
                            name="question7"
                            fieldType={FormFieldType.COUNTER}
                            label="What is the duration of the research"
                            control={form.control}
                            required
                        />
                        </div>
                      <Button className={`my-4 focus:outline-none`}>Continue</Button>
                    </form>
                </Form>
            </div>
        </div>
    )
  }
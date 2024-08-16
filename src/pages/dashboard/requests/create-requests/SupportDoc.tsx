// if specific question checkbox is true, doc support field should be filled
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { useRequestsStore } from "@/context/RequestFormStore";
import { Button } from "@/components/ui/button";
import { requirements } from "@/lib/questions";
import CustomFormField, { FormFieldType } from "@/components/custom/CustomFormField";
import { useStepper } from "@/context/StepperContext";
import { useEffect } from "react";


type Props = {
  handleNext: Function
}

const MAX_FILE_SIZE = 3000000;
const ACCEPTED_FILE_TYPES = [".pdf", ".doc", ".docx"];

const formSchema = z.object({
    file: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 3MB.`)
    .refine(
    (file) => ACCEPTED_FILE_TYPES.includes(file?.type),
    "Only .doc, .docx, .pdf and .webp formats are supported."
    )
  })



const SupportDoc = ({handleNext}: Props) => {
  const { data, setData } = useRequestsStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const { setStep } = useStepper();

    const updateStep = () => {
        setStep(2);
      }

      
    useEffect(() => {
      updateStep();
    }, [updateStep])
  

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
        setData({
            requestsDetails: {
                ...data.requestsDetails,
                files: values
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
          <h1 className="text-xl2 font-semibold pt-10 pb-5 md:py-5">Supporting Document</h1>
      </div>
      <div className="md:w-4/5 w-full max-w-[368px] md:max-w-[526px] mx-auto my-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
            <div className="flex flex-col gap-8 ">
              {requirements.map((requirement) => (
                <CustomFormField
                  key={requirement.name}
                  name={requirement.name}
                  control={form.control}
                  label={requirement.label}
                  fieldType={FormFieldType.UPLOAD}
                  required={true}
                />
              ))}
            </div>
            <Button className={`my-4 focus:outline-none`}>Continue</Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default SupportDoc
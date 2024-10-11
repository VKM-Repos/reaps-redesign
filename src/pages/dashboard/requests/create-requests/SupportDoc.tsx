// if specific question checkbox is true, doc support field should be filled
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldError, useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { CheckboxGroup, useRequestsStore } from "@/store/RequestFormStore";
import { Button } from "@/components/ui/button";
import { requirements } from "@/lib/helpers";
import CustomFormField, { FormFieldType } from "@/components/custom/CustomFormField";
import { useStepper } from "@/context/StepperContext";
import { useEffect } from "react";
import SavingLoader from "../components/SavingLoader";


type Props = {
  handleNext: Function
}

const MAX_FILE_SIZE = 3000000;
const ACCEPTED_FILE_TYPES = [
  "application/pdf", 
  "application/msword", 
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
];

const fileSchema = z
.instanceof(File, { message: "Please upload a file" })
.refine((file) => file.size <= MAX_FILE_SIZE, "Max file size is 3MB.")
.refine(
  (file) => ACCEPTED_FILE_TYPES.includes(file.type),
  "Only .doc, .docx, and .pdf formats are supported."
);


  // call api to check if file exists
  // set data to url
  // useForm
  // map data to name to url

  // set default values for files


const SupportDoc = ({handleNext}: Props) => {
  // destructure and define variables
  const { data, setData } = useRequestsStore();
  const { checkbox, files } = data.requestsDetails;
  const requiredFiles = getRequiredFilesBasedOnYes(checkbox as CheckboxGroup);

  // create fileschemas based on required files
  const createFileSchema = () => {
    // return fileschema object based on callback function
    const fileSchemaObject = requiredFiles.reduce((schemas, requirement) => {
      if (requirement.id === "requirement6" || requirement.id === "requirement7") {
        return schemas;
      }
  
      schemas[requirement.id] = fileSchema.nullable().refine(
        file => file !== null, 
        { message: `${requirement.label} is required.` }
      );
      return schemas;
    }, {} as { [key: string]: any });
  
    return z.object(fileSchemaObject);  
  };
  
  const formSchema = z.object({
    files: createFileSchema(),  // Dynamically create the files schema
  });
  

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      files: {
        ...files,
      },
    }
  });
  

  const { setStepper } = useStepper();
  const { formState: { isValid, errors } } = form;


  const updateStep = () => {
      setStepper(2);
    }
    
  useEffect(() => {
    updateStep();
  }, [updateStep]) 

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
        setData({
          requestsDetails: {
            ...data.requestsDetails,
            files: values.files,
        }
        })
        handleNext();
    } catch(error) {
        console.error(error);
    }
}

  return (
    <div className="w-full px-4 md:w-4/5 md:px-0 mx-auto my-0 antialiased relative flex flex-col gap-6">
      <SavingLoader />
      <div className="flex flex-col justify-center items-center">
          <h1 className="text-xl2 font-semibold pt-5 pb-5 md:py-2">Supporting Document</h1>
      </div>
      <div className="md:w-4/5 w-full max-w-[368px] md:max-w-[526px] mx-auto my-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
            <div className="flex flex-col gap-8 ">
              {requiredFiles.map((requirement) => (
                <CustomFormField
                  key={requirement.id} 
                  name={`files.${requirement.id}`}
                  error={(errors.files as any)?.[requirement.id] as FieldError | undefined}
                  control={form.control}
                  label={requirement.label}
                  labelClassName="!font-semibold !text-black"
                  fieldType={FormFieldType.UPLOAD}
                  required={requirement.id === "requirement6" || requirement.id === "requirement7" ? false : true}
                />
              ))}
            </div>
            <Button variant={isValid ? "default" : "ghost"} type="submit" className={`my-4 focus:outline-none`}>Continue</Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default SupportDoc


  // returns an array of requirements based on "yes" answers
export function getRequiredFilesBasedOnYes(checkbox: CheckboxGroup) {
  const requiredFiles: { id: string; label: string; name: string;  }[] = Object.keys(requirements)
    .filter((questionKey) => checkbox[questionKey as keyof CheckboxGroup] === "yes") // Filter only questions marked "yes"
    // map through each object array, returns a 1d array
    .flatMap((questionKey) => 
      requirements[questionKey].map((requirement) => ({
        name: requirement.name,
        id: requirement.id,
        label: requirement.label,
      }))
    );

  return requiredFiles;
}

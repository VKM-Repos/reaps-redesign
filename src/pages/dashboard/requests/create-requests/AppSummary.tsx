// set up summary of all steps so far
// import { useRequestsStore } from '@/context/RequestFormStore';
import CustomFormField, { FormFieldType } from '@/components/custom/CustomFormField';
import FormInput from '@/components/custom/FormInput';
import PencilEdit from '@/components/custom/Icons/PencilEdit';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useRequestsStore } from '@/context/RequestFormStore';
import { useStepper } from '@/context/StepperContext';
import { application, requirements } from '@/lib/questions';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type Props = {
    handleNext: Function
}

const formSchema = z.object({
  title: z
      .string()
      .min(1, { message: "Please fill this field"}),
  objectives: z
      .string()
      .min(1, { message: "Please fill this field"}),
  checkbox: z
  .object({
    question1: z.string(),
    question2: z.string(),
    question3: z.string(),
    question4: z.string(),
    question5: z.string(),
    question6: z.string(),
    question7: z.string()
  }),
  files: z
  .object({
    file: z
    .any()
  })
})

const AppSummary = ({ handleNext }: Props) => {

    const { data, setData, setStep } = useRequestsStore();


    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        title: data.requestsDetails.title,
        objectives: data.requestsDetails.objectives,
        checkbox: data.requestsDetails.checkbox,
        files: data.requestsDetails.files

      }
    });

  

    const { register } = form;
    const { setStepper } = useStepper();
  
      const updateStep = () => {
          setStepper(3);
        }
      
        const handleGoBack = (step: number) => {
          setStep(step);
        }
  
        
      useEffect(() => {
        updateStep();
      }, [updateStep])

      function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setData({
                requestsDetails: {
                    ...data.requestsDetails,
                    title: values.title,
                    objectives: values.objectives,
                    checkbox: values.checkbox,
                    files: values.files
                }
            });
            handleNext();
        }
        catch (error) {
            console.error(error)
        }
    }
  
      
  return (
    <div className="w-full px-4 md:w-4/5 md:px-0 mx-auto my-0 antialiased relative flex flex-col gap-6">
      <div className="flex flex-col justify-center items-center">
          <h1 className="text-xl2 font-semibold pt-10 pb-5 md:py-5">Your application summary</h1>
          <p className='text-sm text-[#868786]'>Please ensure all data is inputted correctly  before making payments</p>
      </div>
      <div className="md:4/5 w-full mx-auto my-0 flex flex-col gap-4">
        <div className='flex justify-between items-center'>
          <h1 className="text-xl2 font-semibold pt-10 pb-5 md:py-5">Research Information</h1>
          <Button onClick={() => {handleGoBack(4)}}>
            <span className='flex items-center justify-center gap-2'><PencilEdit /> Edit</span>
          </Button>
        </div>
        <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 text-sm text-[#454745]">
                            <FormInput
                                label="Title of research"
                                {...register("title", {
                                required: "This field is required",
                                })}
                                required
                            />
                            <CustomFormField
                                fieldType={FormFieldType.TEXTAREA}
                                name="objectives"
                                control={form.control}
                                label="Objectives of the study"
                                className="!pb-[12rem] flex"
                                required
                            />
                            <div className='flex justify-between items-center'>
                              <h1 className="text-xl2 font-semibold pt-10 pb-5 md:py-5">Application Information</h1>
                              <Button onClick={() => {handleGoBack(3)}}>
                               <span className='flex items-center justify-center gap-2'><PencilEdit /> Edit</span>
                               
                              </Button>
                            </div>
                            <div className="grid grid-cols-2 gap-8 ">
                              <>
                                {application.map((question) => {
                                  return (
                                    <CustomFormField
                                      key={question.name}
                                      name={question.label}
                                      control={form.control}
                                      label={question.label}
                                      fieldType={FormFieldType.RADIO}
                                      options={question.options}
                                      className="px-3 py-2 border border-[#040C21] bg-[#192C8A14] rounded-md"
                                    />
                                  );
                                })}
                                
                                </>    
                                  </div>
                                <div className='flex justify-between items-center'>
                                    <h1 className="text-xl2 font-semibold pt-10 pb-5 md:py-5">Support Docs</h1>
                                    <Button onClick={() => {handleGoBack(5)}}>
                                      <span className='flex items-center justify-center gap-2'><PencilEdit /> Edit</span>
                                    </Button>
                                </div>
                                <div className="md:grid md:grid-cols-2 gap-8 flex flex-col">
                                  {requirements.map((requirement) => (
                                    <CustomFormField
                                    key={requirement.name} 
                                    name={`file.${requirement.name}`}
                                    control={form.control}
                                    label={requirement.label}
                                    fieldType={FormFieldType.UPLOAD}
                                    required={true}
                                  />
                                  ))}
                                </div>
                            <div className='flex justify-center items-center gap-4'>
                              <Button variant="outline" className={`my-4 focus:outline-none`}>Save & Continue later</Button>
                              <Button className={`my-4 focus:outline-none`}>Proceed to pay</Button>
                            </div>
                            
                    </form>
                </Form>

      </div>
      </div>
  )
}

export default AppSummary


{/* {answers.map(([questionKey, selectedAnswer]) => {
                                const question = questions.find(q => q.name === questionKey);

                                if (!question) return null;  // Skip if the question is not found

                                return (
                                  <CustomFormField
                                    key={questionKey}
                                    name={questionKey}
                                    control={form.control}
                                    label={question.label}
                                    fieldType={FormFieldType.RADIO}
                                    options={[
                                      { label: 'Yes', value: 'yes' },
                                      { label: 'No', value: 'no' },
                                    ]}
                                    
                                  />
                                );
                              })} */}
                             {/* {questions.map((question) => (
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
                              ))} */}
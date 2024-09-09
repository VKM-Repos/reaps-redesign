// set up summary of all steps so far
import CustomFormField, { FormFieldType } from '@/components/custom/CustomFormField';
import FormInput from '@/components/custom/FormInput';
import PencilEdit from '@/components/custom/Icons/PencilEdit';
import Loader from '@/components/custom/Loader';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useRequestsStore } from '@/store/RequestFormStore';
import { useStepper } from '@/context/StepperContext';
import { application, requirements } from '@/lib/helpers';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import EthicalApprovalCard from '../components/ethical-request-approval';


type Props = {
    handleNext?: Function
}



const AppSummary = ({ handleNext }: Props) => {

    const { data, setStep } = useRequestsStore();
    const { title, objectives, checkbox, files } = data.requestsDetails;
    const [loading, setLoading] = useState(false);
    const [showEthicalApprovalCard, setShowEthicalApprovalCard] = useState(false);
    const { resetStore } = useRequestsStore();



    const form = useForm({
      defaultValues: {
        title: title,
        objectives: objectives,
        checkbox: checkbox,
        files: files,


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

      function onSubmit() {
        // handle final submit
        setLoading(true);
        try {
            // setData({
            //     requestsDetails: {
            //         ...data.requestsDetails,
            //         title: values.title,
            //         objectives: values.objectives,
            //         checkbox: values.checkbox,
            //         files: values.files
            //     }
            // });
            setTimeout(() => {
              setLoading(false);
              if (handleNext) {
                handleNext();
              }
              
              resetStore();

            }, 5000);
        }
        catch (error) {
            console.error(error)
        }
    }

    const proceedToPay = (event:  React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();
      setShowEthicalApprovalCard(true);
    }
  
      
  return (
    <>
      {loading && <Loader />}
      {showEthicalApprovalCard ? 
      <EthicalApprovalCard educationLevel='Undergraduate' amountToPay='25000' showApproval={() => {setShowEthicalApprovalCard(false)}}/> 
      :
      <div className="w-full px-4 md:w-4/5 md:px-0 mx-auto my-0 antialiased relative flex flex-col gap-6">
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-xl2 font-semibold pt-10 pb-5 md:py-5">Your application summary</h1>
            <p className='text-sm text-[#868786]'>Please ensure all data is inputted correctly  before making payments</p>
        </div>
        <div className="md:4/5 w-full mx-auto my-0 flex flex-col gap-4">
          <div className='flex justify-between items-center'>
            <h1 className="text-xl2 font-semibold pt-10 pb-5 md:py-5">Research Information</h1>
            <Button onClick={() => {handleGoBack(4)}}>
              <span className='flex items-center justify-center gap-2 text-white'><PencilEdit /> Edit</span>
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
                          className='pointer-events-none'
                      />
                      <CustomFormField
                          fieldType={FormFieldType.TEXTAREA}
                          name="objectives"
                          control={form.control}
                          label="Objectives of the study"
                          className="!pb-[12rem] flex pointer-events-none"
                          required
                          
                      />
                      <div className='flex justify-between items-center'>
                        <h1 className="text-xl2 font-semibold pt-10 pb-5 md:py-5">Application Information</h1>
                        <Button onClick={() => {handleGoBack(3)}}>
                          <span className='flex items-center justify-center gap-2 text-white'><PencilEdit /> Edit</span>
                          
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
                                <span className='flex items-center justify-center gap-2 text-white'><PencilEdit /> Edit</span>
                              </Button>
                          </div>
                          <div className="md:grid md:grid-cols-2 gap-8 flex flex-col">
                            {requirements.map((requirement) => (
                              <CustomFormField
                              key={requirement.name} 
                              name={`file.${requirement.id}`}
                              control={form.control}
                              label={requirement.label}
                              fieldType={FormFieldType.UPLOAD}
                              required={true}
                              disabled={true}
                            />
                            ))}
                          </div>
                      <div className='flex flex-col md:flex-row justify-center items-center gap-5 my-4 '>
                        <Button type="submit" variant="outline" className={`rounded-[2.75rem] py-[1.375rem] px-6 focus:outline-none button-hover w-full md:max-w-[15.625rem]`}>Save & Continue later</Button>
                        <Button onClick={(event) => {proceedToPay(event)}} className={`focus:outline-none w-full md:max-w-[15.625rem] py-3 px-6`}>Proceed to pay</Button>
                      
                      </div>
                      
              </form>
            </Form>
          </div>
      </div>
      }
      
    </>
    
  )
}

export default AppSummary
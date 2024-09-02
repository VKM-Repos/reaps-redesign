import CustomFormField, { FormFieldType } from '@/components/custom/CustomFormField';
import FormInput from '@/components/custom/FormInput';
import Loader from '@/components/custom/Loader';
import { Form } from '@/components/ui/form';
import { useRequestsStore } from '@/store/RequestFormStore';
import { application, requirements } from '@/lib/helpers';
import {  useState } from 'react';
import { useForm } from 'react-hook-form';


const Summary = () => {

    const { data } = useRequestsStore();
    const { title, objectives, checkbox, files } = data.requestsDetails;
    const [loading, setLoading] = useState(false);
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
  
  

      function onSubmit() {
        setLoading(true);
        try {
            setTimeout(() => {
              resetStore();
              setLoading(false);
            }, 5000);
        }
        catch (error) {
            console.error(error)
        }
    }
  
      
  return (
    <>
      {loading && <Loader />}
      <div className="w-full flex items-center justify-center">
      
      <div className="md:4/5 md:ml-20 py-10 flex flex-col gap-10 max-w-4xl">
        <div className='flex justify-between items-center'>
          <h1 className="text-[1.375rem] font-semibold pt-10 md:pb-5 md:py-5">Research Information</h1>
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
                      <h1 className="text-[1.375rem] font-semibold pt-10 pb-5 md:py-5">Application Information</h1>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 ">
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
                            <h1 className="text-[1.375rem] font-semibold pt-10 pb-5 md:py-5">Support Docs</h1>
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
                    {/* <div className='flex justify-center items-center gap-4'>
                      <Button type="submit" variant="outline" className={`my-4 focus:outline-none`}>Save & Continue later</Button>
                      <Button className={`my-4 focus:outline-none`}>Proceed to pay</Button>
                    </div> */}
                    
            </form>
          </Form>
        </div>
      </div>
    </>
    
  )
}

export default Summary
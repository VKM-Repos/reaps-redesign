import CustomFormField, { FormFieldType } from '@/components/custom/CustomFormField';
import FormInput from '@/components/custom/FormInput';
// import Loader from '@/components/custom/Loader';
import { Form } from '@/components/ui/form';
import { useRequestsStore } from '@/store/RequestFormStore';
// import { application, requirements } from '@/lib/helpers';
// import {  useState } from 'react';
import { Label } from "@/components/ui/label";
import GoogleDoc from "@/components/custom/Icons/GoogleDoc";
import Download from "@/components/custom/Icons/Download";
import { useForm } from 'react-hook-form';



const Summary = () => {

    const { data } = useRequestsStore();
    const { title, objectives, checkbox, files } = data.requestsDetails;
    // const [loading, setLoading] = useState(false);
    // const { resetStore } = useRequestsStore();


    const form = useForm({
      defaultValues: {
        title: title,
        objectives: objectives,
        checkbox: checkbox,
        files: files,


      }
    });


  

    const { register } = form;
  
  

    //   function onSubmit() {
    //     setLoading(true);
    //     try {
    //         setTimeout(() => {
    //           resetStore();
    //           setLoading(false);
    //         }, 3000);
    //     }
    //     catch (error) {
    //         console.error(error)
    //     }
    // }
  
      
  return (
    <>
      {/* {loading && <Loader />} */}
      <div className="w-full items-center flex justify-center">
      
      <div className="md:4/5 pb-10 flex flex-col gap-10 w-full">
        <div className='flex'>
          <h1 className="text-[1.375rem] font-semibold text-black">Research Information</h1>
        </div>
        <Form {...form}>
            <form  className="flex flex-col gap-4 text-sm text-[#454745]">
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
            <h1 className="text-[1.375rem] font-semibold pt-10 pb-5 md:py-5 text-black">Application Information</h1>
          </div>
          <div className="grid md:grid-cols-2 gap-8 ">
            <>
              {Object.entries(checkbox).filter(([key]) => 
                key !== "question7").map(([key, question])=>(
                  <div key={key}
                       className="flex items-center gap-4 px-3 py-2 border border-[#040C21] bg-[#192C8A14] rounded-md w-full max-w-[6rem]"
                  >
                      <div className="flex justify-center items-center aspect-square h-[1.375rem] w-[1.375rem] rounded-full border border-[#868687] text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                          <div className="flex items-center justify-center rounded-full h-[0.875rem] w-[0.875rem] bg-black"></div>
                      </div>
                      <Label className="text-base capitalize">{question}</Label>
                  </div>
                ))              
                }

              </>
              
          </div>
              <div className='flex flex-col md:flex-row justify-between gap-2 items-center text-black'>
                  <h1 className="text-[1.375rem] font-semibold pt-10 pb-5 md:py-5">Supporting Documents</h1>
                  <p className='text-[#000066] flex gap-2 items-center font-semibold cursor-pointer'> <span className='underline'>download all supporting documents</span> <Download /></p>
              </div>
              <div className="md:grid md:grid-cols-2 gap-8 flex flex-col w-full">
                    {Object.entries(files).map(([key, file]) =>
                    <div key={key}  className="w-full border border-gray-300 p-2 rounded-md mb-2">
                        <span className='flex justify-between items-center'>
                          
                          <div className='flex gap-4 items-center'>
                            <span className='text-black text-[0.8rem]'><GoogleDoc /></span>
                            <span className="text-[0.8rem]">{file.path}</span>
                          </div>  
                          <a href={file.path} className='text-black cursor-pointer' download><Download /></a>
                        </span>
                    </div>
                    )}
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
    
  );
};

export default Summary
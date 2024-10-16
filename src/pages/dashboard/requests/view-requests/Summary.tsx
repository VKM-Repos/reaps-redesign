import CustomFormField, { FormFieldType } from '@/components/custom/CustomFormField';
import FormInput from '@/components/custom/FormInput';
import { Form } from '@/components/ui/form';
import { useRequestsStore } from '@/store/RequestFormStore';
import { application, supportDocData, tableData } from '@/lib/helpers';
import { useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import GreenCheckmark from '@/components/custom/Icons/GreenCheckmark';
import { Button } from '@/components/ui/button';
import { useMediaQuery } from 'react-responsive';

type SummaryPageProps = {
    isApproval: boolean,
    handlePrint: () => void
}
const Summary = ({ handlePrint, isApproval } : SummaryPageProps) => {

  const { data } = useRequestsStore();
  const { objectives, checkbox, files } = data.requestsDetails;

  const { title } = tableData[1];

  const form = useForm({
    defaultValues: {
      title: title,
      objectives: objectives,
      checkbox: {
        ...checkbox,
      },
      files: {
        ...files,
      },
    },
  });

  const { register } = form;
  const isMobile = useMediaQuery({ query: '(max-width: 767px)'})

  function onSubmit() {
    try {
      setTimeout(() => {
      handlePrint();
      }, 3000);
    }
    catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <div className="w-full flex items-center justify-center">
        {/* add status tracker */}
        <div className="md:4/5 md:ml-20 md:my-10 mb-10 flex flex-col gap-10 max-w-4xl">
          <div className='flex justify-between items-center'>
            <h1 className="text-[1.375rem] font-semibold pt-10 md:pb-5 md:py-5 text-black">Research Information</h1>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 text-sm text-[#454745]">
              <FormInput
                label="Title of research"
                {...register("title", {
                  required: "This field is required",
                })}
                required
                className='pointer-events-none !font-normal' />
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                name="objectives"
                control={form.control}
                label="Objectives of the study"
                labelClassName='!font-medium'
                className="!pb-[12rem] flex pointer-events-none"
                required />
              <div className='flex justify-between items-center'>
                <h1 className="text-[1.375rem] font-semibold pt-10 pb-5 md:py-5 text-black">Application Information</h1>
              </div>
              <div className="grid md:grid-cols-2 gap-8 ">
                <>
                  {application
                    .map((question) => (
                      <div className="flex flex-col gap-2">
                        <div className="text-sm text-[#454745]">{question.label}&nbsp;<span className="text-red-500">*</span></div>
                        <div
                          key={question.name}
                          className={`flex items-center gap-4 px-3 py-2 border border-[#040C21] ${question.name === "question7" ? "bg-inherit" : "bg-[#192C8A14]"} rounded-md w-full max-w-fit`}
                        >
                          {question.name === "question7" ?
                            <Label className="text-base capitalize">
                              {question.value}
                            </Label>
                            :
                            <>
                              <div className="flex justify-center items-center aspect-square h-[1.375rem] w-[1.375rem] rounded-full border border-[#868687] text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                                <div className="flex items-center justify-center rounded-full h-[0.875rem] w-[0.875rem] bg-black"></div>
                              </div>
                              <Label className="text-base capitalize">
                                {question.value}
                              </Label>
                            </>}
                        </div>
                      </div>

                    ))}

                </>
              </div>
              <div className='flex justify-between items-center'>
                <h1 className="text-[1.375rem] font-semibold pt-10 pb-5 md:py-5 text-black">Support Docs</h1>
              </div>
              <div className="md:grid md:grid-cols-2 gap-8 flex flex-col">
                {supportDocData.map((file) => {
                  return (
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col gap-1 md:gap-2 md:flex-row md:justify-between">
                        <div className="font-semibold text-sm">{file.label}<span className="text-red-500">&ensp;*</span></div>
                        <div className="text-[#868687] text-xs">.Doc, .Docx, .Pdf (Max of 3MB)</div>
                      </div>
                      <div
                        key={file.id}
                        className="w-full flex justify-between items-center border border-gray-300 p-2 rounded-md mb-2"
                      >
                        <span className="flex gap-2 items-center justify-center">
                          <span>
                            <GreenCheckmark />
                          </span>
                          <span>{file.name}</span>
                        </span>
                        <span className="p-2">
                          <span className="text-[1rem]">x</span>
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              {isMobile && <div className='w-full my-4 flex items-center justify-center'><Button className={`${isApproval ? 'text-white rounded-2 py-3 !bg-primary ' : 'text-[#6A6C6A] rounded-[2.75rem] py-[1.375rem]'} !max-w-[9.375rem] w-full font-semibold px-6 border border-[#0C0C0F29] bg-inherit hover:bg-inherit hover:border-[#0C0C0F29]`} disabled={isApproval ? false : true}>Print</Button></div>}
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Summary
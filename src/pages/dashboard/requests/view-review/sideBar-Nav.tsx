import { Button } from '@/components/ui/button'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTrigger,
  } from "@/components/ui/sheet"
  import { useForm } from 'react-hook-form'
  import form from 'react'
  import Smile from "@/components/custom/Icons/Smileface"
  import Unamused from "@/components/custom/Icons/unAmusedFace"
  import Unhappy from '@/components/custom/Icons/unhappyFace' 
  import UploadIcon from '@/components/custom/Icons/UploadIcon'
  import { useRef } from 'react'
import { Form } from '@/components/ui/form'
import CustomFormField, { FormFieldType } from '@/components/custom/CustomFormField'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

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

  


const formSchema = z.object({
  files: z.object({
    document: fileSchema.nullable().refine(file => file !== null, {
      message: "This field is required."
    }),
    
  }),
});



const reviewComment = [
    {
        id: 1,
        comment: "Satisfactory",
        background: "bg-[#e6ffe6]",
        border: "border-[#009900]",
        text: "text-[#34A853]",
        reaction: <Smile />
    },
    {
        id: 2,
        comment: "Unsatisfactory",
        background: "bg-[#ffe6e6]",
        border: "border-[#ff3333]",
        text: "text-[#BF1E2C]",
        reaction: <Unhappy />
    }, 
    {
        id: 3,
        comment: "Further review",
        background: "bg-[#e6e6ff]",
        border: "border-[#6666ff]",
        text: "text-[#608FEB]",
        reaction: <Unamused />
    }
]
export default function SideBar() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
      });

    
    const onSubmit = (data: any) => {
        console.log(data)
    
    };

    
    return(
        <>
            <aside className='text-[0.875rem] flex-col md:flex gap-5 md:w-[20%] w-[50%] md:fixed'>
             
            <Sheet>
                <SheetTrigger>
                      <Button className='rounded-full flex self-start md:w-[80%] w-full h-[3.5rem]'>Write your Review</Button>
                </SheetTrigger>
                <SheetContent side="bottom" className='md:w-[55%] w-[90%] h-[95%] flex flex-col justify-self-center rounded-t-lg items-center'>
                        <h1 className='text-[1.7rem] font-bold'>Write your review</h1>
                        <p  className=' font-bold text-center'>how satisfied are you with the quality of the request?</p>
                        <div className='flex flex-col md:flex-row w-full items-center md:gap-4 gap-10'>
                            {reviewComment.map((item) =>
                            <div key={item.id} className={`flex flex-col md:w-full items-center px-14 cursor-pointer w-[80%] py-3 gap-2 border-2 rounded-lg ${item.background} ${item.border} ${item.text}`}>
                                <p>{item.reaction}</p>
                                <p>{item.comment}</p>
                            </div>
                        )}
                        </div>
                        <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
                            
                            {/* <div className='flex flex-col gap-4'>
                                <p className='text-center font-semibold '>provide your feedback on this request</p>
                                <textarea name="feedback" id="feedback" className='w-full min-h-28 border p-4'></textarea>
                            </div> */}
                             <p className='text-center font-semibold'>provide your feedback on this request</p>
                            <CustomFormField 
                                fieldType={FormFieldType.TEXTAREA}
                                name="objectives"
                                // error={errors["objectives"]}
                                control={form.control}
                                // label="Objectives of the study"
                                className="max-h-24 flex md:w-full w-[90%] mx-5 md:mx-auto"
                                // required
                            />

                            <div className="flex flex-col gap-8 md:w-[60%] w-[90%] mx-5  md:mx-auto">
                                {/* <p className='flex gap-4 items-center mt-5'><span>Correction/Explanatory document</span></p> */}
                                <CustomFormField
                                name={`document`}
                                
                                // error={(errors.files as any)?.[requirement.id] as FieldError | undefined}
                                control={form.control}
                                label={'Correction/Explanatory document'}
                                fieldType={FormFieldType.UPLOAD}
                                // required={true}
                                />
                            </div>
                            <div className='hidden md:block'>
                                <CustomFormField
                                  key="reviewComment"
                                  name="comment"
                                  control={form.control}
                    
                                  // error={
                                  //   (errors as any)?.[question.name] as
                                  //     | FieldError
                                  //     | undefined
                                  // }
                                  
                                  className='bg-[#cdefc] hover:bg-[#83d08] border-red-500'
                                  
                                  fieldType={FormFieldType.RADIO}
                                  options={[
                                    { label: "Satisfactory", value: "Satisfactory" },
                                    { label: "Unsatisfactory", value: "Unsatisfactory" },
                                    { label: "Further Review", value: "Further Review" },
                                  ]}
                                  required={true}
                                />
                            </div>
                            <Button variant={ "default" } type="submit" className={`my-4 focus:outline-none w-[30%] flex self-center`}>Submit review</Button>
                        </form>
                        </Form>
                        {/* <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col mt-5'>
                            <div className='flex flex-col gap-4'>
                                <p className='text-center font-semibold '>provide your feedback on this request</p>
                                <textarea name="feedback" id="feedback" className='w-full min-h-28 border p-4'></textarea>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <p className='flex gap-4 items-center mt-5'><span>Correction/Explanatory document</span> <span className='text-[0.8rem]'>.Doc, .Docx, .Pdf (Max Of 3mb)</span></p>
                                <div className='border w-[60%] h-10 rounded-lg flex gap-2 items-center pl-10 cursor-pointer hover:bg-[#f2f2f2]' onClick={handleFileClick}>
                                    <UploadIcon /> <span>Click to Upload</span>
                                    <input
                                     type="file" 
                                     ref={(e) => {
                                        fileInputRef.current = e; 
                                        register('document').ref(e);
                                      }}
                                      className="hidden" 
                                      id="fileInput"
                                      accept=".doc, .docx, .pdf"
                                      onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) setValue('document', file);
                                      }}
                                     />
                                </div>
                               <button type='submit' className='mt-4'><Button className='rounded-lg w-[25%] h-[3rem]'>Submit review</Button></button>
                            </div>
                        </form> */}
                </SheetContent>
            </Sheet>
            </aside>
        </>
    );
}
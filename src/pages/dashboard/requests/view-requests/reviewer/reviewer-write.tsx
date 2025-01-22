import { Button } from '@/components/ui/button'
import {
    Sheet,
    SheetContent,
    SheetClose,
    SheetTrigger,
  } from "@/components/ui/sheet"
  import { useForm } from 'react-hook-form'
  import  { useState } from 'react'
  import Smile from "@/components/custom/Icons/Smileface"
  import Unamused from "@/components/custom/Icons/unAmusedFace"
  import Unhappy from '@/components/custom/Icons/unhappyFace' 
import { Form } from '@/components/ui/form'
import CustomFormField, { FormFieldType } from '@/components/custom/CustomFormField'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Cancel from '@/components/custom/Icons/Cancel'

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
        background: "hover:bg-[#e6ffe6]",
        bg: "bg-[#e6ffe6]",
        border: "border-[#009900]",
        text: "text-[#34A853]",
        reaction: <Smile />
    },
    {
        id: 2,
        comment: "Unsatisfactory",
        background: "hover:bg-[#ffe6e6]",
        bg: "bg-[#ffe6e6]",
        border: "border-[#ff3333]",
        text: "text-[#BF1E2C]",
        reaction: <Unhappy />
    }, 
    {
        id: 3,
        comment: "Further review",
        background: "hover:bg-[#e6f0ff]",
        bg: "bg-[#e6f0ff]",
        border: "border-[#6666ff]",
        text: "text-[#608FEB]",
        reaction: <Unamused />
    }
]
export default function ReviewerWriteReview() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
      });

    
    const onSubmit = (data: any) => {
        console.log(data)
    
    };
    const [selectedValue, setSelectedValue] = useState<string>("");
    
    return(
        <>
            <aside className='text-[0.875rem] flex-col md:flex gap-5 w-full'>
                <Sheet>
                    <SheetTrigger>
                        <button className='bg-primary text-white rounded-full flex items-center justify-center max-w-[13rem] md:max-w-[90%] px-6 py-[1.375rem] w-full h-[3.5rem] md:relative md:right-auto md:bottom-auto fixed bottom-4 right-6'>Write your Review</button>
                    </SheetTrigger>
                    <SheetContent side="bottom" className='md:w-[60%] w-full h-full md:h-[95%] flex flex-col justify-self-center rounded-t-lg items-center'>
                        <SheetClose className='bg-inherit focus:outline-none border-none hover:border hover:bg-accent hover:rounded-full p-2.5 h-fit flex self-end md:mt-[-2rem]'><Cancel /></SheetClose>
                        <h1 className='text-[1.7rem] font-bold'>Write your review</h1>
                        <p  className=' font-bold text-center'>How satisfied are you with the quality of the request?</p>
                
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
                                <div className='flex flex-col md:flex-row w-full items-center md:gap-4 gap-10'>
                                    {reviewComment.map((item) =>
                                    <div onClick={ () => setSelectedValue(item.comment)} key={item.id} className={`flex flex-col md:w-full items-center hover:border-[3px]  px-14 cursor-pointer w-[80%] py-3 gap-2 ${selectedValue === item.comment ? `border-[3px] ${item.bg}` : "border bg-opacity-5"} rounded-lg ${item.background} ${item.border} ${item.text}`}>
                                        <p>{item.reaction}</p>
                                        <p>{item.comment}</p>
                                        <input type="radio" value={item.comment} checked={selectedValue === item.comment} onChange={ () => setSelectedValue(item.comment)} className='hidden' />
                                    </div>
                                )}
                                </div>
                                <p className='text-center font-semibold'>Provide your feedback on this request</p>
                                <CustomFormField 
                                    fieldType={FormFieldType.TEXTAREA}
                                    name="objectives"
                                    control={form.control}
                                    className="max-h-24 flex md:w-full w-[90%] mx-5 md:mx-auto"
                                />

                                <div className="flex flex-col gap-8 md:w-[60%] w-[90%] mx-5  md:mx-0">
                                    <CustomFormField
                                    name={`document`}
                                    control={form.control}
                                    label={'Correction/Explanatory document'}
                                    fieldType={FormFieldType.UPLOAD}
                                    />
                                </div>
                                <Button variant={ "default" } type="submit" className={`my-4 focus:outline-none w-[30%] flex self-center`}>Submit review</Button>
                            </form>
                        </Form> 
                    </SheetContent>
                </Sheet>
            </aside>
        </>
    );
}
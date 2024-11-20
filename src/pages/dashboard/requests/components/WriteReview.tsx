import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "@/components/custom/CustomFormField";
import { Button } from "@/components/ui/button";
import { DialogContent } from "@/components/ui/dialog";
import { useMediaQuery } from "react-responsive";
import { SheetClose, SheetContent } from "@/components/ui/sheet";
import HoverCancel from "@/components/custom/Icons/HoverCancel";

const formSchema = z.object({
    review_remark: z.string().min(1, { message: "You have to select one item"}),
    feedback: z.string().min(1, { message: "Please input some feedback"}),
    correction_doc: z.instanceof(File, { message: "Please upload a file" }).optional()
})

interface ReviewRemark {
    id: string;
    text: string;
    color: string;
    icon: string;
  }
  
  interface WriteReviewProps {
    setLoader: (loading: boolean) => void;
    remarks: ReviewRemark[];
    buttonText: string;
  }

export default function WriteReview({ setLoader, remarks, buttonText }: WriteReviewProps) {
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        // defaultValues,
      });

    const { formState: { isValid, errors }, reset } = form;


    function onSubmit(values: z.infer<typeof formSchema>) {
        setLoader(true);
        try {
            console.log(values)
            // setData({
            //     onboardingDetails: {
            //         ...data.onboardingDetails,
            //         email: values.email,
            //     }
            // }); 
            setTimeout(() => {
                setLoader(false);
                // onSave();
                reset();
            }, 3000)
        } catch (error) {
          console.error(error);
        }
    }

    return (
       <WriteReviewWrapper>
            <div className="pb-6 px-6 mt-12 overflow-y-scroll scrollbar scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-w-1.5 scrollbar-thumb-gray-500">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
                        <div className="py-2 px-4 flex flex-col gap-6 w-full">
                            <div className="flex flex-col gap-[3.125rem] w-full">
                                <p className="text-xl2 font-semibold text-center">Write your review</p>
                                <div className="flex flex-col gap-5">
                                    <p className="text-center text-lg font-semibold">How satisfied are you with the quality of the request?</p>
                                    <div className="!w-full">
                                    <FormField control={form.control} name="review_remark" render={() => (
                                        <FormItem className="w-full flex gap-3 items-center justify-center">
                                            {remarks.map((remark) => (
                                                <FormField key={remark.id} control={form.control} name="review_remark" render={({ field }) => (
                                                    <FormItem className="!w-full min-w-[28rem] md:min-w-0 justify-self-end !my-0">
                                                        <FormControl>
                                                            <label className={"h-[5.5rem] w-full flex flex-col items-center justify-center rounded-lg gap-1 w-full cursor-pointer !my-0"}
                                                                style={{ border: field.value === remark.id ? "0.2rem solid " + remark.color : "0.5px solid " + remark.color, color: `${remark.color}` }}>
                                                                <input
                                                                    type="radio"
                                                                    checked={field.value === remark.id}
                                                                    onChange={() => field.onChange(remark.id)}
                                                                    hidden
                                                                />
                                                                <span style={{ color: `${remark.color}` }}><img src={remark.icon} style={{ color: `${remark.color}` }}/></span>
                                                                <span style={{ color: `${remark.color}` }}>{remark.text}</span>
                                                            </label>
                                                        </FormControl>
                                                    </FormItem>
                                                )} />
                                            ))}
                                        </FormItem>
                                    )} 
                                        /> 
                                    </div>
                                </div>
                                <div className="flex flex-col gap-5">
                                    <p className="text-center text-lg font-semibold">How satisfied are you with the quality of the request?</p>
                                    <div>
                                        <CustomFormField 
                                            fieldType={FormFieldType.TEXTAREA}
                                            name="feedback"
                                            error={errors["feedback"]}
                                            control={form.control}
                                            placeholder="Enter message"
                                            className="!pb-[5rem] flex"
                                            />
                                    </div>
                                </div>
                                <div className="w-full max-w-[28rem]">
                                    <CustomFormField
                                        fieldType={FormFieldType.UPLOAD}
                                        name="correction_doc"
                                        error={errors["correction_doc"]}
                                        control={form.control}
                                        label="Correction/Explanatory Document"
                                        labelClassName="!font-semibold text-sm text-[#040C21]"
                                    />
                                </div>
                            </div>
                            <div className="w-full flex items-center justify-center">
                                <Button variant={isValid ? "default" : "ghost"} className="w-full max-w-[9.375rem]">{buttonText}</Button>
                            </div>
                            
                        </div>
                        
                    </form>
                </Form>
                
                
            </div>
        </WriteReviewWrapper>
        
    )
}

const WriteReviewWrapper = ({ children }: {children: React.ReactNode}) => {
    const isMobile = useMediaQuery({ query: '(max-width: 767px)'})
    return (
        <>
        {isMobile ? 
        <SheetContent className="w-full h-full  pt-[1.25rem] pb-[1.125rem] flex flex-col gap-4">
            <SheetClose className="absolute right-6 top-6 !w-fit mx-auto py-0 px-0 ml-4 flex items-center justify-start opacity-70 rounded-full hover:bg-[#14155E14] transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none"><HoverCancel /></SheetClose>
            {children}
        </SheetContent>
        :
        <DialogContent className='fixed !w-full !max-w-[56rem] h-[90%] mx-auto '>
            {children}
        </DialogContent>
        }
      </>
    )
}
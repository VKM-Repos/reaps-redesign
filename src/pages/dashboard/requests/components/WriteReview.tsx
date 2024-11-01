import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Smile from "@/assets/smile.svg";
import Unhappy from "@/assets/unhappy.svg";
import Unamused from "@/assets/unamused.svg";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "@/components/custom/CustomFormField";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
    review_remarks: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "You have to select at least one item.",
      }),
    feedback: z.string().min(1, { message: "Please input some feedback"}),
    correction_doc: z.instanceof(File, { message: "Please upload a file" })
})

export default function WriteReview() {
    const review_remarks = [
        { id: "1", text: "Satisfactory", color: "#34A853", icon: Smile },
        { id: "2", text: "Unsatisfactory", color: "#D03238", icon: Unhappy },
        { id: "3", text: "Unamused", color: "#608FEB", icon: Unamused },
    ];

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        // defaultValues,
      });

    const { formState: { isValid, errors } } = form;

    function onSubmit(values: z.infer<typeof formSchema>) {
        // setLoader(true);
        try {
            console.log(values)
            // setData({
            //     onboardingDetails: {
            //         ...data.onboardingDetails,
            //         email: values.email,
            //     }
            // }); 
            // setTimeout(() => {
            //     setLoader(false);
            //     onSave();
            //     reset();
            // }, 3000)
        } catch (error) {
          console.error(error);
        }
    }

    return (
        <div className="pb-6 px-6 mt-12 overflow-y-scroll">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
                    <div className="py-2 px-4 flex flex-col gap-6 w-full">
                        <div className="flex flex-col gap-[3.125rem] w-full">
                            <p className="text-xl2 font-semibold text-center">Write your review</p>
                            <div className="flex flex-col gap-5">
                                <p className="text-center text-lg font-semibold">How satisfied are you with the quality of the request?</p>
                                <div className="!w-full">
                                <FormField control={form.control} name="review_remarks" render={() => (
                                    <FormItem className="w-full grid md:grid-cols-3 grids-col-1 gap-3 items-center justify-center">
                                        {review_remarks.map((remark) => (
                                            <FormField key={remark.id} control={form.control} name="review_remarks" render={({ field }) => (
                                                <FormItem className="!w-full min-w-[28rem] md:min-w-0 justify-self-end !my-0">
                                                    <FormControl>
                                                        <label className={"h-[5.5rem] w-full flex flex-col items-center justify-center rounded-lg gap-1 w-full cursor-pointer !my-0"}
                                                              style={{ border: field.value?.includes(remark.id) ? "2px solid " + remark.color : "0.5px solid " + remark.color, color: `${remark.color}` }}>
                                                            <input
                                                                type="checkbox"
                                                                checked={field.value?.includes(remark.id)}
                                                                onChange={(e) => {
                                                                    const isChecked = e.target.checked;
                                                                    const currentValues = field.value || [];
                                                                    if (isChecked) {
                                                                        field.onChange([...currentValues, remark.id]);
                                                                    } else {
                                                                        field.onChange(currentValues.filter((value) => value !== remark.id));
                                                                    }
                                                                }}
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
                            <Button variant={isValid ? "default" : "ghost"} className="w-full max-w-[9.375rem]">Submit review</Button>
                        </div>
                        
                    </div>
                    
                </form>
            </Form>
            
            
        </div>
    )
}
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { useOnboardingFormStore } from "@/store/CreateOnboardingFormStore";
import CustomFormField, { FormFieldType } from "@/components/custom/CustomFormField";
import MailIcon from "@/components/custom/Icons/MailIcon";


export const NotificationsSettings = () => {
    const formSchema = z.object({
        notifications: z.
            boolean()
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });
    const { data, setData } = useOnboardingFormStore();


    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
         setData({
             onboardingDetails: {
                 ...data.onboardingDetails,
                 notifications: values.notifications,
             }
         });
 
        } catch (error) {
         console.error(error);
        }
     }
 

    return (
        <div className="md:w-3/5 w-full max-w-[358px] md:max-w-[526px] my-0 flex flex-col">
            <Form {...form}>
            
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex justify-between items-center">
                <div className="flex gap-4 items-center justify-center">
                    <div className="bg-accent p-2.5 rounded-full"><MailIcon /></div>
                    <div className="font-semibold text-[#040C21]">Email notification</div>
                </div>
                <CustomFormField 
                name="notifications"
                fieldType={FormFieldType.SWITCH}
                control={form.control}
                />
               
                </form>
            </Form>

        </div>
    )

}
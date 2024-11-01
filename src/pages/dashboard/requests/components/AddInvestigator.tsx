import CustomFormField, { FormFieldType } from "@/components/custom/CustomFormField"
import FormInput from "@/components/custom/FormInput"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Form } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
    first_name: z.string().min(1, { message: "Please input your first name"}),
    last_name: z.string().min(1, { message: "Please input your first name"}),
    email: z.string().email({ message: 'Invalid email address' }).min(1, { message: 'Please fill this field' }),
    phone_number: z
        .string()
        .min(8, { message: 'Please fill this field' })
        .max(12, {
        message: 'Phone number should not contain more than 12 characters',
        })
        .regex(/^\d+$/, { message: 'Phone number should contain only numbers' }),
    letter_of_support: z.instanceof(File, { message: "Please upload a file" })
});

export default function AddInvestigator() {
    const form = useForm<z.infer<typeof formSchema>>(
        {resolver: zodResolver(formSchema)}
    )
    const {formState: { isValid, errors }, register } = form;

    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            console.log(values);
        } catch (error) {
            console.error(error)
        }
    }
    return (
      <div className="w-full">
        <Dialog>
            <DialogTrigger>
                <div className="bg-[#0DD138] rounded-full w-[30px] h-[30px] flex items-center w-full justify-start gap-4"><span className="text-white w-[1.25rem] h-[1.25rem]">+</span><span className="text-sm font-medium text-[#201630]">Add Co-Principal Investigator</span></div>
            </DialogTrigger>
            <DialogContent className="w-full md:max-w-[95%] h-full md:max-h-[32rem] flex flex-col gap-[1.875rem]">
                <h1 className="text-[18px] py-4 px-6 border border-[#0E0F0C1F]">Add Co-Principal Investigator</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}  className="grid grid-cols-1 gap-8">
                    <div className="flex flex-col md:flex-row gap-5">
                        <FormInput
                            label="First name"
                            {...register('first_name', {
                            required: 'This field is required',
                            })}
                        />
                        <FormInput
                            label="Last name"
                            {...register('last_name', {
                            required: 'This field is required',
                            })}
                        />
                    </div>
                    <div className="flex flex-col md:flex-row gap-5">
                        <FormInput
                            label="Email"
                            {...register('email', {
                            required: 'This field is required',
                            })}
                        />
                        <FormInput
                            label="Phone Numer"
                            {...register('phone_number', {
                            required: 'This field is required',
                            })}
                        />
                    </div>
                    <CustomFormField 
                        fieldType={FormFieldType.UPLOAD}
                        name="letter_of_support"
                        error={errors["letter_of_support"]}
                        control={form.control}
                        label="Upload letters of support from co-investigators"
                        labelClassName="!text-black !font-bold"/>
                    </form>
                </Form>
                <Button className={isValid ? "default" : "ghost"}></Button>
            </DialogContent>
        </Dialog>
      </div>
    )
  }
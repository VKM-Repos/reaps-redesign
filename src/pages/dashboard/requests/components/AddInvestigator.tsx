import CustomFormField, { FormFieldType } from "@/components/custom/CustomFormField"
import FormInput from "@/components/custom/FormInput"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Form } from "@/components/ui/form"
import { useDonorInvestigatorStore } from "@/store/DonorsandInvestigatorsStore"
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

export default function AddInvestigator({ setLoading }: { setLoading: (loading: boolean) => void}) {
    const form = useForm<z.infer<typeof formSchema>>(
        {resolver: zodResolver(formSchema)}
    )
    const {formState: { isValid, errors }, register, reset } = form;
    const { donor_investigator_data, setDonorInvestigatorData } = useDonorInvestigatorStore();
    const { co_principal_investigators } = donor_investigator_data.details;

   

    function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);
        try {
            setTimeout(() => {
                setDonorInvestigatorData({
                    ...donor_investigator_data,
                    details: {
                        ...donor_investigator_data.details,
                        co_principal_investigators: [
                            ...co_principal_investigators,
                            {
                                first_name: values.first_name,
                                last_name: values.last_name,
                                email: values.email,
                                phone_number: values.phone_number,
                                letter_of_support: values.letter_of_support,
                            },
                        ],
                    },
                });
                setLoading(false);
                reset();
            }, 3000)
            
        } catch (error) {
            console.error(error)
        }
    }

    return (
      <div className="w-full">
        <Dialog>
            <DialogTrigger>
            <div className="flex items-center w-full justify-start gap-4">
                <span className="bg-[#0DD138] inline-block rounded-full text-[1.375rem] leading-none text-center text-white w-[2rem] h-[2rem] flex items-center justify-center">
                    +
                </span>
                <span className="text-sm font-medium text-[#201630]">Add Co-Principal Investigator</span>
            </div>
            </DialogTrigger>
            <DialogContent className="w-full md:max-w-[70%] h-full md:max-h-[32rem] flex flex-col gap-[1.875rem] !rounded-[1.25rem]">
                <h1 className="text-[18px] py-6 px-6 border border-[#0E0F0C1F]">Add Co-Principal Investigator</h1>
                <Form {...form}>
                    <form className="grid grid-cols-1 gap-8 px-[3.125rem]">
                    <div className="flex flex-col md:flex-row gap-5 w-full">
                        <div className="w-full">
                            <FormInput
                                label="First name"
                                {...register('first_name', {
                                required: 'This field is required',
                                })}
                            />
                        </div>
                        <div className="w-full">
                            <FormInput
                                label="Last name"
                                {...register('last_name', {
                                required: 'This field is required',
                                })}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-5">
                    <div className="w-full">
                        <FormInput
                                label="Email"
                                {...register('email', {
                                required: 'This field is required',
                                })}
                            />
                        </div>
                        <div className="w-full">
                            <FormInput
                                label="Phone Numer"
                                {...register('phone_number', {
                                required: 'This field is required',
                                })}
                            />
                        </div>
                    </div>
                    <CustomFormField 
                        fieldType={FormFieldType.UPLOAD}
                        name="letter_of_support"
                        error={errors["letter_of_support"]}
                        control={form.control}
                        label="Upload letters of support from co-investigators"
                        labelClassName="!text-black !font-bold"/>
                    <DialogClose disabled={!isValid} className="w-full" >
                        <Button type="button" variant={isValid ? "default" : "ghost"} className=" w-full" onClick={form.handleSubmit(onSubmit)}>Add</Button>
                    </DialogClose>
                    </form>
                </Form>
                
                
            </DialogContent>
        </Dialog>
      </div>
    )
  }
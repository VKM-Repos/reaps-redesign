import { DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/custom/FormInput";
import { Form } from "@/components/ui/form";
import { useSpecializationsStore } from "@/context/specializationsFormStore";

type Props = {
    handleNext: Function;
}

const formSchema = z.object({
    specialization: z
            .string()
            .min(1, {message: "Please fill this field"})
})

export default function Specialization({ handleNext }: Props) {
    const { data, setData } = useSpecializationsStore();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),

    });
    const { register, formState: { isValid } } = form;

    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setData({
                specializationsDetails: {
                    ...data.specializationsDetails,
                    specialization: values.specialization
                }
            });
            handleNext();
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <DialogContent className="px-2 md:max-w-[540px] w-full flex flex-col gap-[4.75rem] ">
            <DialogHeader>
                <DialogTitle className="font-bold text-[1.625rem] mt-[1.5rem">Create a specialization</DialogTitle>
                <DialogDescription className="text-[454745] text-sm">Specify your specialization to Help us understand the field of your research, think of it as defining your unique area of expertise.</DialogDescription>
            </DialogHeader>
            <div className="max-w-[358px] md:max-w-[526px] mx-auto my-0">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
                        <FormInput
                            {...register("specialization", {
                            required: "This field is required",
                            })}
                        />
                        <Button variant={isValid ? "default" : "ghost"} className={`my-4 focus:outline-none`}>Send Password reset code</Button>
                    </form>
                </Form>
                </div>
        </DialogContent>
    )
}
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
    keywords: z
        .string()
        .min(1, {message: "Please fill this field"})
        // .array()
})


export default function AddKeyword({handleNext}: Props) {
    const { data, setData, resetStore } = useSpecializationsStore();
    

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),

    });
    const { register, formState: { isValid } } = form;

    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setData({
                specializationsDetails: {
                    ...data.specializationsDetails,
                    keywords: values.keywords
                }
            });
            handleNext();
            resetStore();
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <DialogContent className="px-2 md:max-w-[540px] w-full flex flex-col gap-[4.75rem]">
            <DialogHeader>
                <DialogTitle className="font-bold text-[1.625rem] mt-[1.5rem]">Awesome, now add some keywords</DialogTitle>
                <DialogDescription className="text-[454745] text-sm">Enter some keywords related to your research. Enter as many as you like separated by comma(,)</DialogDescription>
            </DialogHeader>
            <div className="max-w-[358px] md:max-w-[526px] w-full mx-auto my-0">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
                        <FormInput
                            {...register("keywords", {
                            required: "This field is required",
                            })}
                        />
                        <Button type="submit" variant={isValid ? "default" : "ghost"} className={`my-4 focus:outline-none`}>Finish</Button>
                    </form>
                </Form>
            </div>            
        </DialogContent>
    )
}
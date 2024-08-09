// import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
// import FormCheckBox from "@/components/custom/FormCheckBox";
// import { useMediaQuery } from "react-responsive";
import { useRequestsStore } from "@/context/RequestFormStore";
import { Checkbox } from "@radix-ui/react-checkbox";


const formSchema = z.
object({
    checkbox: z
    .object({
        key: z.object({
            id: z.string(),
            label: z.string(),
            value: z.boolean()
        })
    })
})

const questions = [
    {
    key: {
        id: "1",
        label: "Why",
        value: true,
    }
},
    {
    key: {
        id: "2",
        label: "How",
        value: true,
    }
},
    {
    key: {
        id: "3",
        label: "What",
        value: true,
    }
},
]


type Props = {
    handleNext: Function
}


export function AppInfo({ handleNext}: Props) {
    // const isMobile = useMediaQuery({query: 'min-width: 768px'});

    const { data, setData } = useRequestsStore();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });
    const { control } = form;

    // const { register, reset, formState: { isValid }} = form;
    // const [checkbox, setCheckbox] = useState<string>("");
    // const [checkboxArray, setCheckboxArray] = useState<string[]>([]);

    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setData({
                requestsDetails: {
                    ...data.requestsDetails,
                    checkbox: values.checkbox
                }
            });
            handleNext();
        } catch(error) {
            console.error(error);
        }
    }

    return (
        <div className="w-full px-4 md:w-3/5 md:px-0 mx-auto my-0 antialiased relative">
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-xl2 font-semibold pt-10 pb-5 md:py-5">Application Information</h1>
            </div>
            <div className="md:w-3/5 w-full max-w-[358px] md:max-w-[526px] mx-auto my-0">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
                        <FormField
                            control={control}
                            name="checkbox"
                            render={() => (
                                <FormItem>
                                    <div>
                                        {questions.map(({ key }) => (
                                            <FormField
                                                key={key.id}
                                                control={control}
                                                name="checkbox"
                                                render={({ field }) => {
                                                    // const { value, onChange } = field;
                                                    return (
                                                        <FormItem 
                                                            key={key.id}
                                                            >
                                                             <FormLabel>{key.label}</FormLabel>
                                                                <FormControl>
                                                                <Checkbox
                                                                    checked={key.value === true}
                                                                    onCheckedChange={field.onChange}
                                                                    >Yes</Checkbox>
                                                                </FormControl>
                                                                <FormControl>
                                                                <Checkbox
                                                                    checked={key.value === false}
                                                                    onCheckedChange={field.onChange}
                                                                >No</Checkbox>
                                                                </FormControl>
                                                            </FormItem>
                                                    )
                                                }}>

                                            </FormField>
                                        ))}
                                    </div>
                                </FormItem>
                            )}
                            />
                    </form>

                </Form>
            </div>


        </div>
    )
}